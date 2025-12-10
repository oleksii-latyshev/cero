export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function calculateSavedPercent(originalSize: number, compressedSize: number): number {
  return Number(((1 - compressedSize / originalSize) * 100).toFixed(1))
}
