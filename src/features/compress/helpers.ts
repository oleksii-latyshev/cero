import { extname } from 'node:path'

import { type ImageFormat, SUPPORTED_FORMATS } from './constants'

export function getImageFormat(filePath: string): ImageFormat {
  const ext = extname(filePath).toLowerCase()
  const format = SUPPORTED_FORMATS[ext]

  if (!format) {
    const supported = Object.keys(SUPPORTED_FORMATS).join(', ')
    throw new Error(`Unsupported format: ${ext}. Supported: ${supported}`)
  }

  return format
}
