export type CompressOptions = {
  quality: number
  inputPath: string
  outputPath: string
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
