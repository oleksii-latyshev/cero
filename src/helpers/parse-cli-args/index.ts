import { parseArgs } from 'node:util'
import Bun from 'bun'

export function parseCliArgs() {
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
      'keep-metadata': {
        type: 'boolean',
        short: 'm',
        default: false,
      },
    },
    strict: true,
  })

  return {
    imagePath: values['image-path'],
    quality: values.quality ? Number.parseInt(values.quality, 10) : undefined,
    keepMetadata: values['keep-metadata'] ?? false,
  }
}
