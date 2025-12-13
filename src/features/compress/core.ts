import { ImageFormat } from 'src/features/compress/constants'

import type { CompressOptions, CompressResult } from './types'

export async function compressImage({
  inputBuffer,
  quality,
  format,
}: CompressOptions): Promise<CompressResult> {
  const sharp = (await import('sharp')).default

  let sharpInstance = sharp(inputBuffer)

  switch (format) {
    case ImageFormat.JPEG:
      sharpInstance = sharpInstance.jpeg({ quality, mozjpeg: true })
      break
    case ImageFormat.PNG:
      sharpInstance = sharpInstance.png({ quality, compressionLevel: 9 })
      break
    case ImageFormat.WEBP:
      sharpInstance = sharpInstance.webp({ quality })
      break
    default:
      throw new Error(`Unsupported image format: ${format}`)
  }

  const buffer = await sharpInstance.toBuffer()

  return {
    buffer,
    compressedSize: buffer.length,
  }
}
