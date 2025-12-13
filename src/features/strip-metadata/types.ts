export type StripMetadataOptions = {
  inputBuffer: ArrayBuffer | Buffer
  autoRotate?: boolean
}

export type StripMetadataResult = {
  buffer: Buffer
  metadataRemoved: boolean
}
