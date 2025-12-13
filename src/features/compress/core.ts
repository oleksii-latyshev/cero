import type { CompressOptions, CompressResult } from './types'

export async function compressImage({
  inputBuffer,
  quality,
  format,
}: CompressOptions): Promise<CompressResult> {
  const sharp = (await import('sharp')).default

  let sharpInstance = sharp(inputBuffer)

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

  const buffer = await sharpInstance.toBuffer()

  return {
    buffer,
    compressedSize: buffer.length,
  }
}
