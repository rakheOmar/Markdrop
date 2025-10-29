<p align="center">
  <img width="300" height="177" alt="markdrop_repo" src="https://github.com/user-attachments/assets/c8b043ef-c392-4b4c-bd21-65bcc30b7c77" />
</p>

<p align="center">
  <strong>Turn Ideas Into Beautiful Markdown</strong>
</p>

<p align="center">
  A modern, visual markdown editor that makes creating professional <code>.md</code> files as easy as writing naturally.
</p>

<p align="center">
  <a href="https://markdrop.vercel.app/">Website</a> •
  <a href=".github/ROADMAP.md">Roadmap</a> •
  <a href=".github/CONTRIBUTING.md">Contributing</a> •
  <a href=".github/CODE_OF_CONDUCT.md">Code of Conduct</a> •
  <a href="LICENSE">License</a>
</p>

## Demo

<p align="center">
  <img width="98%" alt="MarkDrop Demo" src="https://github.com/user-attachments/assets/c3056dad-7bd8-4ddb-9274-b12df6fe6119" />
</p>

#### Builder Preview

<p align="center">
  <img width="49%" alt="Builder View" src="https://github.com/user-attachments/assets/930555f8-58a8-4e50-be80-19db9e9e4ab8" />
  <img width="49%" alt="Preview View" src="https://github.com/user-attachments/assets/ccfd8a52-0e73-432b-8934-bfda516ce1d0" />
</p>

## Features

### Visual Block-Based Editor

- **Drag & Drop Interface** - Intuitive block-based editing with drag-and-drop reordering
- **Live Preview** - Real-time markdown preview alongside your editor
- **Multiple View Modes** - Switch between Editor, Raw Markdown, and Preview modes

### Rich Content Blocks

- **Headings** - H1-H6 with proper formatting
- **Text Elements** - Paragraphs, blockquotes, and formatted text
- **Lists** - Bullet lists, numbered lists, and task lists with checkboxes
- **Code Blocks** - Syntax-highlighted code with language support
- **Media** - Images with alignment options, videos, and links
- **Tables** - Full table support with editing capabilities
- **Special Elements** - Shield badges, skill icons, HTML blocks, and horizontal separators

### Productivity Features

- **Import/Export** - Import existing markdown files and export to multiple formats (.md, .pdf, .html)
- **Undo/Redo** - Full history management with keyboard shortcuts
- **Auto-save** - Automatic saving to local storage
- **Statistics** - Real-time word count, character count, and reading time estimation
- **Reset Functionality** - Quick reset to start fresh

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

## Tech Stack

| Category                | Technologies     |
| ----------------------- | ---------------- |
| **Frontend Framework**  | React 18         |
| **Build Tool**          | Vite             |
| **UI Components**       | Shadcn/UI        |
| **Styling**             | Tailwind CSS     |
| **Drag & Drop**         | @dnd-kit         |
| **Markdown Processing** | Remark, Rehype   |
| **Code Highlighting**   | Prism.js / Shiki |
| **Database & Backend**  | Supabase         |

## Contributing

We welcome contributions! Read our [contributing guide](.github/CONTRIBUTING.md) to get started.

## Support

If you find this project helpful, please consider:

- **Starring the repository** to show your support
- **Reporting bugs** you encounter
- **Suggesting new features**
- **Contributing** to the codebase
- **Sharing** with others who might find it useful

---

<p align="center">
  <sub>Turn your ideas into beautiful markdown, one block at a time.</sub>
</p>
