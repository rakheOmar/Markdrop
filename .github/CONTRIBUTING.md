# Contributing

Thanks for your interest in contributing! We appreciate all contributions, big or small.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/rakheOmar/Markdrop.git`
3. Install dependencies: `pnpm install`
4. Create a branch: `git checkout -b feature/your-feature-name`

## Development

Start the development server:

```bash
pnpm dev
```

The app will be available at `http://localhost:3000`

## Code Quality

We use Biome for linting and formatting. Before committing:

**Linting:**
```bash
pnpm lint
```

**Formatting:**
```bash
pnpm format
```

**Or run both:**
```bash
pnpm clean
```

## Making Changes

1. Make your changes in your feature branch
2. Test your changes thoroughly
3. Run `pnpm clean` to ensure code quality
4. Commit with a clear message describing your changes
5. Push to your fork
6. Open a pull request

## Pull Request Guidelines

- Keep PRs focused on a single feature or fix
- Write clear descriptions of what your PR does
- Include screenshots of the issue fixed with output/fix
- Reference any related issues
- Ensure all checks pass
- Be responsive to feedback

## Code Style

- Use Javascript for type safety
- Follow React best practices
- Keep components small and focused
- Use meaningful variable and function names
- Add comments for complex logic

## Project Structure

- `/src/components` - Reusable UI components
- `/src/pages` - Page components
- `/src/lib` - Utility functions and helpers

## Need Help?

Feel free to open an issue if you have questions or need clarification on anything.

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.
