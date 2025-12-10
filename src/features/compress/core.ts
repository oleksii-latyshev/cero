import Bun from 'bun'

import { calculateSavedPercent } from './helpers'
import type { CompressOptions, CompressResult } from './types'

export async function compressImage({
  inputPath,
  outputPath,
  quality,
  format,
}: CompressOptions): Promise<CompressResult> {
  const file = Bun.file(inputPath)
  const originalSize = file.size
  const buffer = await file.arrayBuffer()

  const sharp = (await import('sharp')).default
  let sharpInstance = sharp(buffer)

  switch (format) {
    case 'jpeg':
      sharpInstance = sharpInstance.jpeg({ quality, mozjpeg: true })
      break
    case 'png':
      sharpInstance = sharpInstance.png({ quality, compressionLevel: 9 })
      break
    case 'webp':
      sharpInstance = sharpInstance.webp({ quality })
      break
  }

  const compressedBuffer = await sharpInstance.toBuffer()
  await Bun.write(outputPath, compressedBuffer)

  const compressedSize = Bun.file(outputPath).size
  const savedPercent = calculateSavedPercent(originalSize, compressedSize)

  return {
    originalSize,
    compressedSize,
    savedPercent,
  }
}
