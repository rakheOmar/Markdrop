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

          const badgesMarkdown = badges
            .filter((badge) => {
              if (badge.type === "custom") {
                return badge.label && badge.message;
              } else {
                const githubBadges = [
                  "stars",
                  "forks",
                  "issues",
                  "license",
                  "last-commit",
                  "repo-size",
                  "languages",
                  "contributors",
                  "pull-requests",
                ];
                const socialBadges = [
                  "twitter",
                  "youtube",
                  "discord",
                  "twitch",
                  "instagram",
                  "linkedin",
                  "github-followers",
                  "reddit",
                ];
                const devMetrics = [
                  "npm-downloads",
                  "npm-version",
                  "pypi-downloads",
                  "pypi-version",
                  "codecov",
                  "coveralls",
                  "travis-ci",
                  "github-actions",
                  "docker-pulls",
                  "docker-stars",
                ];
                const docPlatforms = [
                  "gitbook",
                  "notion",
                  "confluence",
                  "docusaurus",
                  "mkdocs",
                  "sphinx",
                ];

                const needsRepo =
                  githubBadges.includes(badge.type) ||
                  [
                    "codecov",
                    "coveralls",
                    "travis-ci",
                    "github-actions",
                  ].includes(badge.type);
                const needsPackage =
                  devMetrics.includes(badge.type) &&
                  ![
                    "codecov",
                    "coveralls",
                    "travis-ci",
                    "github-actions",
                  ].includes(badge.type);
                const needsUsername = socialBadges.includes(badge.type);

                return (
                  (needsRepo && badge.username && badge.repo) ||
                  (needsPackage && badge.package) ||
                  (needsUsername && badge.username) ||
                  (docPlatforms.includes(badge.type) && badge.label)
                );
              }
            })
            .map((badge) => {
              const baseUrl = "https://img.shields.io";

              if (badge.type === "custom") {
                const label = badge.label;
                const message = badge.message;
                const color = badge.color || "blue";
                let url = `${baseUrl}/badge/${encodeURIComponent(
                  label
                )}-${encodeURIComponent(message)}-${color}`;
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
                return `![${label}](${url})`;
              } else {
                // All other badge types
                const { type, username, repo, label, package: pkg } = badge;

                switch (type) {
                  // GitHub badges
                  case "stars":
                    return `![${label}](${baseUrl}/github/stars/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
                      label
                    )}&logo=github&logoColor=white)`;
                  case "forks":
                    return `![${label}](${baseUrl}/github/forks/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
                      label
                    )}&logo=github&logoColor=white)`;
                  case "issues":
                    return `![${label}](${baseUrl}/github/issues/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
                      label
                    )}&logo=github&logoColor=white)`;
                  case "license":
                    return `![${label}](${baseUrl}/github/license/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
                      label
                    )}&logo=github&logoColor=white)`;
                  case "last-commit":
                    return `![${label}](${baseUrl}/github/last-commit/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
                      label
                    )}&logo=github&logoColor=white)`;
                  case "repo-size":
                    return `![${label}](${baseUrl}/github/repo-size/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
                      label
                    )}&logo=github&logoColor=white)`;
                  case "languages":
                    return `![${label}](${baseUrl}/github/languages/top/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
                      label
                    )}&logo=github&logoColor=white)`;
                  case "contributors":
                    return `![${label}](${baseUrl}/github/contributors/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
                      label
                    )}&logo=github&logoColor=white)`;
                  case "pull-requests":
                    return `![${label}](${baseUrl}/github/issues-pr/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
                      label
                    )}&logo=github&logoColor=white)`;

                  // Documentation platforms
                  case "gitbook":
                    return `![${label}](${baseUrl}/static/v1?label=${encodeURIComponent(
                      label
                    )}&message=GitBook&color=3884FF&logo=gitbook&logoColor=white&style=flat-square)`;
                  case "notion":
                    return `![${label}](${baseUrl}/static/v1?label=${encodeURIComponent(
                      label
                    )}&message=Notion&color=000000&logo=notion&logoColor=white&style=flat-square)`;
                  case "confluence":
                    return `![${label}](${baseUrl}/static/v1?label=${encodeURIComponent(
                      label
                    )}&message=Confluence&color=172B4D&logo=confluence&logoColor=white&style=flat-square)`;
                  case "docusaurus":
                    return `![${label}](${baseUrl}/static/v1?label=${encodeURIComponent(
                      label
                    )}&message=Docusaurus&color=2E8555&logo=docusaurus&logoColor=white&style=flat-square)`;
                  case "mkdocs":
                    return `![${label}](${baseUrl}/static/v1?label=${encodeURIComponent(
                      label
                    )}&message=MkDocs&color=000000&logo=markdown&logoColor=white&style=flat-square)`;
                  case "sphinx":
                    return `![${label}](${baseUrl}/static/v1?label=${encodeURIComponent(
                      label
                    )}&message=Sphinx&color=4B8B3B&logo=sphinx&logoColor=white&style=flat-square)`;

                  // Social badges
                  case "twitter":
                    return `![${label}](${baseUrl}/twitter/follow/${username}?style=flat-square&label=${encodeURIComponent(
                      label
                    )}&logo=twitter&logoColor=white)`;
                  case "youtube":
                    return `![${label}](${baseUrl}/youtube/channel/subscribers/${username}?style=flat-square&label=${encodeURIComponent(
                      label
                    )}&logo=youtube&logoColor=red)`;
                  case "discord":
                    return `![${label}](${baseUrl}/discord/${username}?style=flat-square&label=${encodeURIComponent(
                      label
                    )}&logo=discord&logoColor=white)`;
                  case "twitch":
                    return `![${label}](${baseUrl}/twitch/status/${username}?style=flat-square&label=${encodeURIComponent(
                      label
                    )}&logo=twitch&logoColor=white)`;
                  case "instagram":
                    return `![${label}](${baseUrl}/instagram/followers/${username}?style=flat-square&label=${encodeURIComponent(
                      label
                    )}&logo=instagram&logoColor=white)`;
                  case "linkedin":
                    return `![${label}](${baseUrl}/linkedin/followers/${username}?style=flat-square&label=${encodeURIComponent(
                      label
                    )}&logo=linkedin&logoColor=white)`;
                  case "github-followers":
                    return `![${label}](${baseUrl}/github/followers/${username}?style=flat-square&label=${encodeURIComponent(
                      label
                    )}&logo=github&logoColor=white)`;
                  case "reddit":
                    return `![${label}](${baseUrl}/reddit/user-karma/${username}?style=flat-square&label=${encodeURIComponent(
                      label
                    )}&logo=reddit&logoColor=white)`;

                  // Dev metrics
                  case "npm-downloads":
                    return `![${label}](${baseUrl}/npm/dm/${pkg}?style=flat-square&label=${encodeURIComponent(
                      label
                    )}&logo=npm&logoColor=white)`;
                  case "npm-version":
                    return `![${label}](${baseUrl}/npm/v/${pkg}?style=flat-square&label=${encodeURIComponent(
                      label
                    )}&logo=npm&logoColor=white)`;
                  case "pypi-downloads":
                    return `![${label}](${baseUrl}/pypi/dm/${pkg}?style=flat-square&label=${encodeURIComponent(
                      label
                    )}&logo=pypi&logoColor=white)`;
                  case "pypi-version":
                    return `![${label}](${baseUrl}/pypi/v/${pkg}?style=flat-square&label=${encodeURIComponent(
                      label
                    )}&logo=pypi&logoColor=white)`;
                  case "codecov":
                    return `![${label}](${baseUrl}/codecov/c/github/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
                      label
                    )}&logo=codecov&logoColor=white)`;
                  case "coveralls":
                    return `![${label}](${baseUrl}/coveralls/github/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
                      label
                    )}&logo=coveralls&logoColor=white)`;
                  case "travis-ci":
                    return `![${label}](${baseUrl}/travis-ci/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
                      label
                    )}&logo=travis-ci&logoColor=white)`;
                  case "github-actions":
                    return `![${label}](${baseUrl}/github/workflows/status/${username}/${repo}/main?style=flat-square&label=${encodeURIComponent(
                      label
                    )}&logo=github-actions&logoColor=white)`;
                  case "docker-pulls":
                    return `![${label}](${baseUrl}/docker/pulls/${pkg}?style=flat-square&label=${encodeURIComponent(
                      label
                    )}&logo=docker&logoColor=white)`;
                  case "docker-stars":
                    return `![${label}](${baseUrl}/docker/stars/${pkg}?style=flat-square&label=${encodeURIComponent(
                      label
                    )}&logo=docker&logoColor=white)`;

                  default:
                    return "";
                }
              }
            })
            .filter(Boolean)
            .join(" ");

          if (align === "center") {
            return `<div align="center">\n\n${badgesMarkdown}\n\n</div>`;
          } else if (align === "right") {
            return `<div align="right">\n\n${badgesMarkdown}\n\n</div>`;
          }
          return badgesMarkdown;
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

  return (
    <div className="w-full h-full rounded-lg transition-colors relative">
      {blocks.length === 0 ? (
        <div className="absolute inset-4 flex items-center justify-center border-2 border-dashed rounded-lg border-muted-foreground/20">
          <p className="text-center text-sm text-muted-foreground px-4">
            No content to preview yet. Add some blocks in the editor!
          </p>
        </div>
      ) : (
        <div className="h-full overflow-y-auto overflow-x-hidden">
          <div className="p-2 sm:p-4">
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
                  h3: ({ ...props }) => (
                    <h3
                      className="text-xl font-semibold mt-6 mb-2"
                      {...props}
                    />
                  ),
                  h4: ({ ...props }) => (
                    <h4
                      className="text-lg font-semibold mt-6 mb-2"
                      {...props}
                    />
                  ),
                  h5: ({ ...props }) => (
                    <h5
                      className="text-base font-semibold mt-6 mb-2"
                      {...props}
                    />
                  ),
                  h6: ({ ...props }) => (
                    <h6
                      className="text-sm font-semibold mt-6 mb-2 text-muted-foreground"
                      {...props}
                    />
                  ),
                  p: ({ ...props }) => (
                    <p className="text-base leading-7 mb-4" {...props} />
                  ),
                  ul: ({ ...props }) => (
                    <ul className="list-disc ml-6 mb-4 space-y-2" {...props} />
                  ),
                  ol: ({ ...props }) => (
                    <ol
                      className="list-decimal ml-6 mb-4 space-y-2"
                      {...props}
                    />
                  ),
                  li: ({ ...props }) => <li className="text-base" {...props} />,
                  code: ({ inline, children, ...props }) =>
                    inline ? (
                      <code
                        className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono"
                        {...props}
                      >
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
                  hr: ({ ...props }) => (
                    <hr className="my-8 border-border border-t-4" {...props} />
                  ),
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
                        <video
                          src={src}
                          controls
                          className="max-w-full h-auto rounded"
                          {...props}
                        />
                      </div>
                    );
                  },
                  table: ({ ...props }) => (
                    <div className="overflow-x-auto my-4">
                      <table
                        className="border-collapse border border-border"
                        {...props}
                      />
                    </div>
                  ),
                  thead: ({ ...props }) => (
                    <thead className="bg-muted" {...props} />
                  ),
                  tbody: ({ ...props }) => <tbody {...props} />,
                  tr: ({ ...props }) => (
                    <tr className="border-b border-border" {...props} />
                  ),
                  th: ({ ...props }) => (
                    <th
                      className="border border-border px-4 py-2 text-left font-semibold"
                      {...props}
                    />
                  ),
                  td: ({ ...props }) => (
                    <td className="border border-border px-4 py-2" {...props} />
                  ),
                }}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
