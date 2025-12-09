# Cero - AI Agent Instructions

## Project Overview

Cero is a command-line utility designed to reduce the size of images. To use it, simply call the utility and specify an image or the folder where the image is stored to perform simple image minification, which will reduce the image size while minimizing the image's quality.

## Tech Stack

- **Runtime**: Bun (for maximum performance and native TypeScript support)
- **Language**: TypeScript (strict mode)
- **Linter/Formatter**: Biome
- **Git Hooks**: Lefthook
- **Package Manager**: Bun

## Architecture Guidelines

### Project Structure

```
src/
  main.ts           # Entry point, CLI logic
  algorithms/       # Compression algorithms
    index.ts        # Exports all algorithms
    jpeg.ts         # JPEG compression
    png.ts          # PNG compression
    webp.ts         # WebP compression
  utils/            # Helper utilities
  types/            # TypeScript type definitions
```

## Development Principles

### 1. Minimal Bundle Size

- Install only essential dependencies that significantly improve code quality or security
- Prefer native Bun/Node APIs over external packages when possible
- Before suggesting a dependency, consider:
  - Is it absolutely necessary?
  - Can we implement this functionality ourselves with minimal code?
  - What is the package size and its dependency tree?

### 2. Performance First

- Leverage Bun's native performance capabilities
- Use streaming for large file operations
- Process files in parallel when possible
- Avoid blocking operations in the main thread

### 3. CLI Design

- The tool will be published to NPM for global installation
- Support both `npx cero <path>` and global `cero <path>` usage
- Provide clear, helpful error messages
- Show progress for batch operations
- Support common CLI flags (--help, --version, --verbose, etc.)

## Compression Algorithms

The `algorithms/` folder contains modular compression strategies:

- Each algorithm should be a separate module with a consistent interface
- Support fallback to default algorithm if specific one is not available
- Allow users to specify preferred algorithm via CLI flags

## NPM Publishing Preparation

- Maintain clean `package.json` with proper fields (name, version, description, bin, files, etc.)
- Include TypeScript declarations
- Configure proper entry points for ESM
- Add `bin` field for CLI executable

## Git Conventions

Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages:

- `feat:` — new feature
- `fix:` — bug fix
- `docs:` — documentation changes
- `build:` — build system or dependencies
- `refactor:` — code refactoring without feature changes
- `test:` — adding or updating tests
- `chore:` — maintenance tasks

## Response Guidelines

When helping with this project:

1. **Prioritize Bun-native solutions** over Node.js alternatives
2. **Suggest minimal dependencies** - explain why each is necessary
3. **Optimize for performance** - consider memory usage and execution speed
4. **Provide TypeScript-first solutions** with proper typing
5. **Consider CLI UX** - helpful messages, progress indicators, error handling
