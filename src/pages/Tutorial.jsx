import { Link } from "react-router-dom";
import TutorialCard from "@/components/Tutorial/TutorialCard";
import TutorialSteps from "@/components/Tutorial/TutorialSteps";
import Navbar from "@/components/blocks/Navbar/Navbar";

export default function Tutorial() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-4xl mx-auto p-6 sm:p-10">
        <h1 className="text-3xl font-extrabold mb-4">Get started with Markdrop</h1>
        <p className="text-muted-foreground mb-6">
          This short guide walks you through creating your first profile and adding a repository markdown (MD).
          By the end you'll have a public markdown you can share.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-8">
          <TutorialCard
            title="Create a profile"
            description="Set up your profile so others can find you. Add a short bio and avatar."
            ctaText="Create profile"
            ctaHref="/signup"
          />

          <TutorialCard
            title="Make a repo MD"
            description="Create a new markdown file describing a project. Use headings, code, and images."
            ctaText="Go to Builder"
            ctaHref="/builder"
          />

          <TutorialCard
            title="Share & contribute"
            description="Publish your markdown and share the link. Learn how to write good READMEs."
            ctaText="Learn more"
            ctaHref="/about"
          />
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Step-by-step</h2>
          <TutorialSteps />
        </section>

        <section className="bg-card p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Quick example markdown</h3>
          <div className="bg-surface p-4 rounded border border-border text-sm overflow-auto">
            {`# My Project\n\nA short description of my project.\n\n## Features\n- Fast\n- Simple\n\n## Usage\n\n\`\`\`bash\nnpm install\n\`\`\`\n\nInclude images with: \n\n![screenshot](https://example.com/image.png)`}
          </div>

          <div className="mt-4 flex gap-3">
            <Link to="/builder" className="btn btn-primary">
              Open Builder
            </Link>
            <Link to="/signup" className="btn btn-outline">
              Create profile
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
