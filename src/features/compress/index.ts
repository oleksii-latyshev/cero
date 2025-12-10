import { mkdir } from 'node:fs/promises'
import { basename, join } from 'node:path'
import Bun from 'bun'

import { compressImage } from 'src/features/compress/core'
import { formatBytes } from 'src/helpers/format-bytes'

import { DEFAULT_QUALITY, OUTPUT_DIR } from './constants'
import { getImageFormat } from './helpers'
import type { CompressArgs } from './types'

export async function compress({
  imagePath,
  quality = DEFAULT_QUALITY,
}: CompressArgs): Promise<void> {
  const inputFile = Bun.file(imagePath)

  const isFileExists = await inputFile.exists()

  if (!isFileExists) {
    throw new Error(`File not found: ${imagePath}`)
  }

  const format = getImageFormat(imagePath)

  await mkdir(OUTPUT_DIR, { recursive: true })

  const fileName = basename(imagePath)
  const outputPath = join(OUTPUT_DIR, fileName)

  console.log(`Compressing (${format}): ${imagePath}`)

  const result = await compressImage({
    inputPath: imagePath,
    outputPath,
    quality,
    format,
  })

  console.log(`✓ Saved to: ${outputPath}`)
  console.log(
    `  ${formatBytes(result.originalSize)} → ${formatBytes(result.compressedSize)} (${result.savedPercent}% smaller)`
  )
}
