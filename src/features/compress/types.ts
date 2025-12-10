import type { ImageFormat } from 'src/features/compress/constants'

export type CompressOptions = {
  quality: number
  inputPath: string
  outputPath: string
  format: ImageFormat
}

export type CompressResult = {
  originalSize: number
  compressedSize: number
  savedPercent: number
}

export type CompressArgs = {
  imagePath: string
  quality?: number
}
