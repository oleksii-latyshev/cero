import { parseArgs } from 'node:util'
import Bun from 'bun'

import { compress } from 'src/features/compress'

function parseCliArgs() {
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

  return {
    imagePath: values['image-path'],
    quality: values.quality ? Number.parseInt(values.quality, 10) : undefined,
  }
}

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
