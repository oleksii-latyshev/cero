export type StripMetadataOptions = {
  inputBuffer: ArrayBuffer
  autoRotate?: boolean
}

export type StripMetadataResult = {
  buffer: Buffer
  metadataRemoved: boolean
}
