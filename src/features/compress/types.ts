import type { ImageFormat } from 'src/features/compress/constants'

export type CompressOptions = {
  inputBuffer: ArrayBuffer | Buffer
  quality: number
  format: ImageFormat
}

export type CompressResult = {
  buffer: Buffer
  compressedSize: number
}

export type CompressArgs = {
  imagePath: string
  quality?: number
}
