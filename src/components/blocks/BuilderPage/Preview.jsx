import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

const blocksToMarkdown = (blocks) => {
  return blocks
    .map((block) => {
      switch (block.type) {
        case "h1":
          return `# ${block.content}`;
        case "h2":
          return `## ${block.content}`;
        case "h3":
          return `### ${block.content}`;
        case "h4":
          return `#### ${block.content}`;
        case "h5":
          return `##### ${block.content}`;
        case "h6":
          return `###### ${block.content}`;
        case "paragraph":
          return block.content;
        case "blockquote":
          return `> ${block.content}`;
        case "code":
          return block.content;
        case "ul":
          return block.content;
        case "ol":
          return block.content;
        case "task-list":
          return block.content;
        case "separator":
          return "---";
        case "image": {
          const align = block.align || "left";
          let imageMarkdown;

          // If width or height is specified, use HTML img tag
          if (block.width || block.height) {
            const attrs = [`src="${block.content}"`];
            if (block.alt) attrs.push(`alt="${block.alt}"`);
            if (block.width) attrs.push(`width="${block.width}"`);
            if (block.height) attrs.push(`height="${block.height}"`);
            imageMarkdown = `<img ${attrs.join(" ")} />`;
          } else {
            imageMarkdown = `![${block.alt || ""}](${block.content})`;
          }

          // Wrap with alignment p tag if not left
          if (align === "center") {
            return `<p align="center">\n\n${imageMarkdown}\n\n</p>`;
          } else if (align === "right") {
            return `<p align="right">\n\n${imageMarkdown}\n\n</p>`;
          }
          return imageMarkdown;
        }
        case "video": {
          const align = block.align || "left";
          const title = block.title || "";
          const videoTag = `<video src="${block.content}" controls class="max-w-full h-auto rounded"></video>`;
          const content = title ? `<h3>${title}</h3>\n${videoTag}` : videoTag;

          if (align === "center") {
            return `<div align="center">\n\n${content}\n\n</div>`;
          } else if (align === "right") {
            return `<div align="right">\n\n${content}\n\n</div>`;
          }
          return `<div align="left">\n\n${content}\n\n</div>`;
        }
        case "link":
          return `[${block.content}](${block.url || ""})`;
        case "table":
          return block.content;
        case "shield-badge": {
          const badges = block.badges || [];
          const align = block.align || "left";

          if (badges.length === 0) return "";

          const badgeMarkdown = badges
            .filter((b) => b.label && b.message)
            .map((badge) => {
              const label = badge.label;
              const message = badge.message;
              const color = badge.color || "blue";
              let url = `https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(message)}-${color}`;
              const params = [];
              if (badge.style && badge.style !== "flat") {
                params.push(`style=${badge.style}`);
              }
              if (badge.logo) {
                params.push(`logo=${encodeURIComponent(badge.logo)}`);
              }
              if (params.length > 0) {
                url += `?${params.join("&")}`;
              }
              return `![${label}: ${message}](${url})`;
            })
            .join(" ");

          if (align === "center") {
            return `<div align="center">\n\n${badgeMarkdown}\n\n</div>`;
          } else if (align === "right") {
            return `<div align="right">\n\n${badgeMarkdown}\n\n</div>`;
          }
          return badgeMarkdown;
        }
        case "skill-icons": {
          const icons = block.icons || "js,html,css";
          const align = block.align || "left";
          let url = `https://skillicons.dev/icons?i=${icons}`;
          if (block.theme && block.theme !== "dark") {
            url += `&theme=${block.theme}`;
          }
          if (block.perLine && block.perLine !== "15") {
            url += `&perline=${block.perLine}`;
          }
          const markdown = `![Skill Icons](${url})`;

          if (align === "center") {
            return `<div align="center">\n\n${markdown}\n\n</div>`;
          } else if (align === "right") {
            return `<div align="right">\n\n${markdown}\n\n</div>`;
          }
          return markdown;
        }
        default:
          return block.content;
      }
    })
    .join("\n\n");
};

export default function Preview({ blocks = [] }) {
  const markdown = blocksToMarkdown(blocks);

  if (blocks.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <p className="text-center text-sm text-muted-foreground">
          No content to preview yet. Add some blocks in the editor!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[500px] rounded-lg p-4">
      <div className="prose prose-slate dark:prose-invert max-w-none prose-sm">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            h1: ({ ...props }) => (
              <h1
                className="text-3xl font-semibold mt-6 mb-4 pb-2 border-b border-border"
                {...props}
              />
            ),
            h2: ({ ...props }) => (
              <h2
                className="text-2xl font-semibold mt-6 mb-4 pb-2 border-b border-border"
                {...props}
              />
            ),
            h3: ({ ...props }) => <h3 className="text-xl font-semibold mt-6 mb-2" {...props} />,
            h4: ({ ...props }) => <h4 className="text-lg font-semibold mt-6 mb-2" {...props} />,
            h5: ({ ...props }) => <h5 className="text-base font-semibold mt-6 mb-2" {...props} />,
            h6: ({ ...props }) => (
              <h6 className="text-sm font-semibold mt-6 mb-2 text-muted-foreground" {...props} />
            ),
            p: ({ ...props }) => <p className="text-base leading-7 mb-4" {...props} />,
            ul: ({ ...props }) => <ul className="list-disc ml-6 mb-4 space-y-2" {...props} />,
            ol: ({ ...props }) => <ol className="list-decimal ml-6 mb-4 space-y-2" {...props} />,
            li: ({ ...props }) => <li className="text-base" {...props} />,
            code: ({ inline, children, ...props }) =>
              inline ? (
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                  {children}
                </code>
              ) : (
                <code
                  className="block bg-transparent p-0 text-sm font-mono whitespace-pre-wrap"
                  {...props}
                >
                  {children}
                </code>
              ),
            pre: ({ children, ...props }) => (
              <pre
                className="bg-muted p-4 rounded-md my-4 overflow-x-auto text-sm font-mono whitespace-pre-wrap"
                {...props}
              >
                {children}
              </pre>
            ),
            blockquote: ({ ...props }) => (
              <blockquote
                className="border-l-4 border-border pl-4 my-4 text-muted-foreground"
                {...props}
              />
            ),
            hr: ({ ...props }) => <hr className="my-8 border-border border-t-4" {...props} />,
            img: ({ src, alt, ...props }) => {
              if (!src) return null;
              return (
                <img
                  src={src}
                  alt={alt || ""}
                  className="max-w-full h-auto rounded my-4 inline-block"
                  {...props}
                />
              );
            },
            video: ({ src, ...props }) => {
              if (!src) return null;
              return (
                <div className="my-4">
                  <video src={src} controls className="max-w-full h-auto rounded" {...props} />
                </div>
              );
            },
            table: ({ ...props }) => (
              <div className="overflow-x-auto my-4">
                <table className="border-collapse border border-border" {...props} />
              </div>
            ),
            thead: ({ ...props }) => <thead className="bg-muted" {...props} />,
            tbody: ({ ...props }) => <tbody {...props} />,
            tr: ({ ...props }) => <tr className="border-b border-border" {...props} />,
            th: ({ ...props }) => (
              <th className="border border-border px-4 py-2 text-left font-semibold" {...props} />
            ),
            td: ({ ...props }) => <td className="border border-border px-4 py-2" {...props} />,
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
}
