import { compress } from 'src/features/compress'
import { parseCliArgs } from 'src/helpers/parse-cli-args'

async function main(): Promise<void> {
  const args = parseCliArgs()

  if (!args.imagePath) {
    console.error('Error: --image-path is required')
    console.error('Usage: bun run main.ts --image-path=./image.jpeg [-q 80]')
    process.exit(1)
  }

  await compress({
    imagePath: args.imagePath,
    quality: args.quality,
  })
}

main().catch((error) => {
  console.error('Error:', error.message)
  process.exit(1)
})
