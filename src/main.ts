import { mkdir } from 'node:fs/promises'
import { basename, join } from 'node:path'
import { parseArgs } from 'node:util'
import Bun from 'bun'

const OUTPUT_DIR = './output'
const DEFAULT_QUALITY = 80

async function compressJpeg(inputPath: string, outputPath: string, quality: number): Promise<void> {
  const file = Bun.file(inputPath)
  const buffer = await file.arrayBuffer()

  const sharp = (await import('sharp')).default
  const compressedBuffer = await sharp(buffer).jpeg({ quality, mozjpeg: true }).toBuffer()

  await Bun.write(outputPath, compressedBuffer)
}

async function main(): Promise<void> {
  const { values } = parseArgs({
    args: Bun.argv.slice(2),
    options: {
      'image-path': {
        type: 'string',
      },
      quality: {
        type: 'string',
        short: 'q',
      },
    },
    strict: true,
  })

  const imagePath = values['image-path']
  const quality = values.quality ? Number.parseInt(values.quality, 10) : DEFAULT_QUALITY

  if (!imagePath) {
    console.error('Error: --image-path is required')
    console.error('Usage: bun run main.ts --image-path=./image.jpeg [-q 80]')
    process.exit(1)
  }

  const inputFile = Bun.file(imagePath)
  if (!(await inputFile.exists())) {
    console.error(`Error: File not found: ${imagePath}`)
    process.exit(1)
  }

  await mkdir(OUTPUT_DIR, { recursive: true })

  const fileName = basename(imagePath)
  const outputPath = join(OUTPUT_DIR, fileName)

  const originalSize = inputFile.size

  console.log(`Compressing: ${imagePath}`)

  await compressJpeg(imagePath, outputPath, quality)

  const outputFile = Bun.file(outputPath)
  const compressedSize = outputFile.size
  const savedPercent = ((1 - compressedSize / originalSize) * 100).toFixed(1)

  console.log(`✓ Saved to: ${outputPath}`)
  console.log(
    `  ${formatBytes(originalSize)} → ${formatBytes(compressedSize)} (${savedPercent}% smaller)`
  )
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

main().catch((error) => {
  console.error('Error:', error.message)
  process.exit(1)
})
