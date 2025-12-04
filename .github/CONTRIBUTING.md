# Contributing

Thanks for your interest in contributing! We appreciate all contributions, big or small.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v22.19.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (v11.5.1 or higher) - Comes with Node.js
- **Git** (v2.50.1 or higher) - [Download here](https://git-scm.com/)

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/rakheOmar/Markdrop.git`
3. Install dependencies: `npm install`
4. Set up environment variables (see [Environment Setup](#environment-setup) below)
5. Create a branch: `git checkout -b feature/your-feature-name`

## Environment Setup

### Required Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Supabase Configuration (Optional for basic functionality)
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Note:** The application will work without these environment variables, but some features like user authentication and data persistence will be limited.

### Getting Supabase Credentials

1. Go to [Supabase](https://supabase.com) and create a new project
2. In your project dashboard, go to Settings > API
3. Copy the Project URL and anon/public key
4. Add them to your `.env` file

## Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Code Quality

We use Biome for linting and formatting. Before committing:

**Linting:**

```bash
npm run clean:lint
```

**Formatting:**

```bash
npm run clean:format
```

**Or run both:**

```bash
npm run clean:lint-format
```

## Making Changes

1. Make your changes in your feature branch
2. Test your changes thoroughly
3. Run `npm run clean:lint-format` to ensure code quality
4. Commit with a clear message following our commit conventions (see below)
5. Push to your fork
6. Open a pull request

## Commit Message Conventions

We follow the Conventional Commits specification for clear and consistent commit messages:

**Format:**

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring without changing functionality
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks (dependencies, build config, etc.)
- `ci`: CI/CD changes

**Examples:**

```bash
feat(builder): add drag and drop support for blocks
fix(editor): resolve markdown rendering issue
docs: update installation instructions
chore(deps): update dependencies
ci: add automated testing workflow
```

**Scope** (optional): The area of the codebase affected (e.g., `builder`, `editor`, `ui`, `deps`)

**Breaking Changes:**
Add `!` after the type/scope or include `BREAKING CHANGE:` in the footer:

```bash
feat(api)!: change response format
```

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

```
📁 Markdrop
└── 📁public                — Static public assets              
└── 📁src
    ├── 📁assets            — Images, icons, and static files
    ├── 📁components        — Reusable UI components
    │   ├── 📁blocks        — Background components
    │   ├── 📁background    — Block components
    │   └── 📁ui            — Shadcn/UI components
    ├── 📁config            — Configuration files
    ├── 📁context           — React context providers
    ├── 📁hooks             — Custom React hooks
    ├── 📁lib               — Utility functions and helpers
    ├── 📁pages             — Page components
    ├── App.jsx             — Main app component
    ├── index.css           — Root styles
    └── main.jsx            — App entry point
```

## Need Help?

Feel free to open an issue if you have questions or need clarification on anything.

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.
