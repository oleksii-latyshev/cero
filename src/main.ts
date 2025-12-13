import { mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import { basename, join } from 'node:path'

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

  try {
    const fileStats = await stat(args.imagePath)
    if (!fileStats.isFile()) {
      console.error(`Error: Path is not a file: ${args.imagePath}`)
      process.exit(1)
    }

    const originalSize = fileStats.size
    let buffer: Buffer = await readFile(args.imagePath)

    console.log(`Processing: ${args.imagePath}`)

    // Step 1: Strip metadata (if not keeping)
    if (!args.keepMetadata) {
      const stripped = await stripMetadata({ inputBuffer: buffer })
      buffer = stripped.buffer // sharp returns Buffer
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

    await writeFile(outputPath, result.buffer)

    const savedPercent = ((1 - result.compressedSize / originalSize) * 100).toFixed(1)

    console.log(`✓ Saved to: ${outputPath}`)
    console.log(
      `  ${formatBytes(originalSize)} → ${formatBytes(result.compressedSize)} (${savedPercent}% smaller)`
    )
  } catch (error: unknown) {
    if (error instanceof Error) {
      const err = error as NodeJS.ErrnoException
      if (err.code === 'ENOENT') {
        console.error(`Error: File not found: ${args.imagePath}`)
      } else {
        console.error('Error processing file:', error.message)
      }
    } else {
      console.error('Error processing file:', error)
    }
    process.exit(1)
  }
}

main().catch((error) => {
  console.error('Error:', error.message)
  process.exit(1)
})
