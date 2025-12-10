import { mkdir } from 'node:fs/promises'
import { basename, join } from 'node:path'
import Bun from 'bun'

import { DEFAULT_QUALITY, OUTPUT_DIR } from './constants'
import { calculateSavedPercent, formatBytes } from './helpers'
import type { CompressArgs, CompressOptions, CompressResult } from './types'

async function compressJpeg(options: CompressOptions): Promise<CompressResult> {
  const { inputPath, outputPath, quality } = options

  const file = Bun.file(inputPath)
  const originalSize = file.size
  const buffer = await file.arrayBuffer()

  const sharp = (await import('sharp')).default
  const compressedBuffer = await sharp(buffer).jpeg({ quality, mozjpeg: true }).toBuffer()

  await Bun.write(outputPath, compressedBuffer)

  const compressedSize = Bun.file(outputPath).size
  const savedPercent = calculateSavedPercent(originalSize, compressedSize)

  return {
    originalSize,
    compressedSize,
    savedPercent,
  }
}

export async function compress({
  imagePath,
  quality = DEFAULT_QUALITY,
}: CompressArgs): Promise<void> {
  const inputFile = Bun.file(imagePath)

  const isFileExists = await inputFile.exists()

  if (!isFileExists) {
    throw new Error(`File not found: ${imagePath}`)
  }

  await mkdir(OUTPUT_DIR, { recursive: true })

  const fileName = basename(imagePath)
  const outputPath = join(OUTPUT_DIR, fileName)

  console.log(`Compressing: ${imagePath}`)

  const result = await compressJpeg({
    inputPath: imagePath,
    outputPath,
    quality,
  })

  console.log(`✓ Saved to: ${outputPath}`)
  console.log(
    `  ${formatBytes(result.originalSize)} → ${formatBytes(result.compressedSize)} (${result.savedPercent}% smaller)`
  )
}
