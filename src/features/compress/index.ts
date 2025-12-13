import { compressImage } from 'src/features/compress/core'

import { DEFAULT_QUALITY } from './constants'
import { getImageFormat } from './helpers'
import type { CompressArgs, CompressResult } from './types'

export { DEFAULT_QUALITY, OUTPUT_DIR } from './constants'
export { getImageFormat } from './helpers'
export type { CompressArgs, CompressResult } from './types'

export async function compress(
  inputBuffer: ArrayBuffer | Buffer,
  { imagePath, quality = DEFAULT_QUALITY }: CompressArgs
): Promise<CompressResult> {
  const format = getImageFormat(imagePath)

  return compressImage({
    inputBuffer,
    quality,
    format,
  })
}
