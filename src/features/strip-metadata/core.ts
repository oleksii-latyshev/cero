import type { Sharp } from 'sharp'

import { DEFAULT_AUTO_ROTATE } from './constants'
import type { StripMetadataOptions, StripMetadataResult } from './types'

export async function stripMetadata({
  inputBuffer,
  autoRotate = DEFAULT_AUTO_ROTATE,
}: StripMetadataOptions): Promise<StripMetadataResult> {
  const sharp = (await import('sharp')).default

  let sharpInstance: Sharp = sharp(inputBuffer)

  // Auto-rotate based on EXIF orientation before stripping
  // This ensures the image displays correctly after metadata removal
  if (autoRotate) {
    sharpInstance = sharpInstance.rotate()
  }

  // toBuffer without withMetadata option strips all metadata
  const buffer = await sharpInstance.toBuffer()

  return {
    buffer,
    metadataRemoved: true,
  }
}

export async function preserveMetadata(sharpInstance: Sharp): Promise<Buffer> {
  return sharpInstance.withMetadata().toBuffer()
}
