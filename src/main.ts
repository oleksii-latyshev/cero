import { mkdir } from 'node:fs/promises'
import { basename, join } from 'node:path'
import Bun from 'bun'

import { compress, OUTPUT_DIR } from 'src/features/compress'
import { stripMetadata } from 'src/features/strip-metadata'
import { formatBytes } from 'src/helpers/format-bytes'
import { parseCliArgs } from 'src/helpers/parse-cli-args'

async function main(): Promise<void> {
  const args = parseCliArgs()

  if (!args.imagePath) {
    console.error('Error: --image-path is required')
    console.error('Usage: bun run main.ts --image-path=./image.jpeg [-q 80] [--keep-metadata]')
    process.exit(1)
  }

  const inputFile = Bun.file(args.imagePath)

  if (!(await inputFile.exists())) {
    console.error(`Error: File not found: ${args.imagePath}`)
    process.exit(1)
  }

  const originalSize = inputFile.size
  let buffer: ArrayBuffer | Buffer = await inputFile.arrayBuffer()

  console.log(`Processing: ${args.imagePath}`)

  // Step 1: Strip metadata (if not keeping)
  if (!args.keepMetadata) {
    const stripped = await stripMetadata({ inputBuffer: buffer })
    buffer = stripped.buffer
    console.log('  ✓ Metadata stripped')
  }

  // Step 2: Compress image
  const result = await compress(buffer, {
    imagePath: args.imagePath,
    quality: args.quality,
  })

  // Step 3: Write output
  await mkdir(OUTPUT_DIR, { recursive: true })
  const fileName = basename(args.imagePath)
  const outputPath = join(OUTPUT_DIR, fileName)
  await Bun.write(outputPath, result.buffer)

  const savedPercent = ((1 - result.compressedSize / originalSize) * 100).toFixed(1)

  console.log(`✓ Saved to: ${outputPath}`)
  console.log(
    `  ${formatBytes(originalSize)} → ${formatBytes(result.compressedSize)} (${savedPercent}% smaller)`
  )
}

main().catch((error) => {
  console.error('Error:', error.message)
  process.exit(1)
})
