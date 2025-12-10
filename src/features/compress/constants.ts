export const DEFAULT_QUALITY = 80
export const OUTPUT_DIR = './output'

export enum ImageFormat {
  JPEG = 'jpeg',
  PNG = 'png',
  WEBP = 'webp',
}

export const SUPPORTED_FORMATS: Record<string, ImageFormat> = {
  '.jpg': ImageFormat.JPEG,
  '.jpeg': ImageFormat.JPEG,
  '.png': ImageFormat.PNG,
  '.webp': ImageFormat.WEBP,
}
