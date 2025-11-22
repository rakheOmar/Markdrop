import { CheckIcon, CopyIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// Helper to convert blocks to markdown
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
        case "alert": {
          const alertType = (block.alertType || "note").toUpperCase();
          const content = block.content || "";
          const lines = content.split("\n");
          const quotedLines = lines.map((line) => `> ${line}`).join("\n");
          return `> [!${alertType}]\n${quotedLines}`;
        }
        case "code":
          return block.content;
        case "math":
          return block.content;
        case "diagram":
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

          // Wrap with alignment div if not left
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
          const videoTag = `<video src= "${block.content}"/>`;
          const content = title ? `<h3>${title}</h3>${videoTag}` : videoTag;

          if (align === "center") {
            return `<div align="center">${content}</div>`;
          } else if (align === "right") {
            return `<div align="right">${content}</div>`;
          }
          return `<div align="left">${content}</div>`;
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
                  ["codecov", "coveralls", "travis-ci", "github-actions"].includes(badge.type);
                const needsPackage =
                  devMetrics.includes(badge.type) &&
                  !["codecov", "coveralls", "travis-ci", "github-actions"].includes(badge.type);
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
        case "typing-svg": {
          const lines = block.lines || ["Hi there! I'm a developer 👋"];
          const font = block.font || "Fira Code";
          const size = block.size || "28";
          const duration = block.duration || "3000";
          const pause = block.pause || "1000";
          const color = block.color || "00FFB3";
          const center = block.center !== false;
          const vCenter = block.vCenter !== false;
          const width = block.width || "900";
          const height = block.height || "80";

          const baseUrl = "https://readme-typing-svg.herokuapp.com";
          const params = new URLSearchParams();

          params.append("font", font);
          params.append("size", size);
          params.append("duration", duration);
          params.append("pause", pause);
          params.append("color", color.replace("#", ""));
          params.append("center", center.toString());
          params.append("vCenter", vCenter.toString());
          params.append("width", width);
          params.append("height", height);

          // Join lines with semicolon separator as a single parameter
          const filteredLines = lines.filter((line) => line.trim() !== "");
          if (filteredLines.length > 0) {
            params.append("lines", filteredLines.join(";"));
          }

          const typingSvgUrl = `${baseUrl}?${params.toString()}`;
          return `![Typing SVG](${typingSvgUrl})`;
        }
        case "github-profile-cards": {
          const username = block.username || "";
          const cards = block.cards || [];
          const align = block.align || "left";

          if (!username.trim() || cards.length === 0) {
            return "";
          }

          const baseUrl = "http://github-profile-summary-cards.vercel.app/api/cards";

          const cardMarkdown = cards
            .map((card) => {
              let url = `${baseUrl}/${card.cardType}?username=${username}&theme=${card.theme}`;

              // Add utcOffset only for productive-time card
              if (card.cardType === "productive-time") {
                url += `&utcOffset=${card.utcOffset}`;
              }

              // Use HTML img tag if height or width is specified
              if (card.height || card.width) {
                const attributes = [];
                if (card.height) attributes.push(`height="${card.height}"`);
                if (card.width) attributes.push(`width="${card.width}"`);
                return `<img ${attributes.join(" ")} src="${url}" />`;
              }

              return `![GitHub ${card.cardType}](${url})`;
            })
            .join(" ");

          // Apply alignment
          if (align === "center") {
            return `<div align="center">\n\n  ${cardMarkdown}\n\n</div>`;
          } else if (align === "right") {
            return `<div align="right">\n\n  ${cardMarkdown}\n\n</div>`;
          } else if (align === "left") {
            return `<div align="left">\n\n  ${cardMarkdown}\n\n</div>`;
          }

          return cardMarkdown;
        }
        default:
          return block.content;
      }
    })
    .join("\n\n");
};

// Helper to parse markdown back to blocks
const markdownToBlocks = (markdown) => {
  const lines = markdown.split("\n");
  const blocks = [];
  let blockCounter = 0;
  let codeBlockContent = [];
  let inCodeBlock = false;
  let htmlBlockContent = [];
  let inHtmlBlock = false;

  const generateUniqueId = () => {
    return `${Date.now()}-${blockCounter++}-${Math.random().toString(36).substr(2, 9)}`;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Handle HTML blocks (div align with badges/images)
    if (line.match(/^<div align=["'](center|left|right)["']>/)) {
      inHtmlBlock = true;
      htmlBlockContent = [line];
      continue;
    }

    if (inHtmlBlock) {
      htmlBlockContent.push(line);
      if (line.trim() === "</div>") {
        // Parse the HTML block content
        const htmlContent = htmlBlockContent.join("\n");
        const align = htmlContent.match(/align=["'](center|left|right)["']/)?.[1] || "left";

        // Check if it contains a video element
        const videoMatch = htmlContent.match(/<video src=\s*["']([^"']+)["']\s*\/>/);
        if (videoMatch) {
          const videoUrl = videoMatch[1];
          const titleMatch = htmlContent.match(/<h3>([^<]+)<\/h3>/);
          const title = titleMatch ? titleMatch[1] : "";

          blocks.push({
            id: generateUniqueId(),
            type: "video",
            content: videoUrl,
            title,
            align,
          });
        }
        // Check if it contains shield badges
        else if (htmlContent.includes("img.shields.io")) {
          const badgeMatches = [
            ...htmlContent.matchAll(
              /!\[(.*?):\s*(.*?)\]\((https:\/\/img\.shields\.io\/badge\/.*?)\)/g
            ),
          ];
          if (badgeMatches.length > 0) {
            const badges = badgeMatches.map((match) => {
              const label = match[1];
              const message = match[2];
              const url = match[3];
              const colorMatch = url.match(/-([^-?]+)(\?|$)/);
              const color = colorMatch ? colorMatch[1] : "blue";
              const styleMatch = url.match(/style=([^&]+)/);
              const style = styleMatch ? styleMatch[1] : "flat";
              const logoMatch = url.match(/logo=([^&]+)/);
              const logo = logoMatch ? decodeURIComponent(logoMatch[1]) : "";

              return { label, message, color, style, logo };
            });

            blocks.push({
              id: generateUniqueId(),
              type: "shield-badge",
              badges,
              align,
            });
          }
        }
        // Check if it contains an img tag (aligned image)
        else if (htmlContent.match(/<img\s+[^>]*>/)) {
          const imgMatch = htmlContent.match(/<img\s+[^>]*>/);
          if (imgMatch) {
            const imgTag = imgMatch[0];
            const srcMatch = imgTag.match(/src=["']([^"']+)["']/);
            const altMatch = imgTag.match(/alt=["']([^"']+)["']/);
            const widthMatch = imgTag.match(/width=["']([^"']+)["']/);
            const heightMatch = imgTag.match(/height=["']([^"']+)["']/);

            blocks.push({
              id: generateUniqueId(),
              type: "image",
              content: srcMatch ? srcMatch[1] : "",
              alt: altMatch ? altMatch[1] : "",
              width: widthMatch ? widthMatch[1] : "",
              height: heightMatch ? heightMatch[1] : "",
              align,
            });
          }
        }
        // Check if it contains markdown image (aligned)
        else if (htmlContent.match(/!\[.*?\]\(.*?\)/)) {
          const imgMatch = htmlContent.match(/!\[(.*?)\]\((.*?)\)/);
          if (imgMatch) {
            blocks.push({
              id: generateUniqueId(),
              type: "image",
              content: imgMatch[2],
              alt: imgMatch[1],
              width: "",
              height: "",
              align,
            });
          }
        }
        // Check if it contains skill icons
        else if (htmlContent.includes("skillicons.dev")) {
          const iconMatch = htmlContent.match(
            /!\[.*?\]\((https:\/\/skillicons\.dev\/icons\?i=([^)]+))\)/
          );
          if (iconMatch) {
            const url = iconMatch[1];
            const iconsMatch = url.match(/i=([^&]+)/);
            const icons = iconsMatch ? iconsMatch[1] : "js,html,css";
            const themeMatch = url.match(/theme=([^&]+)/);
            const theme = themeMatch ? themeMatch[1] : "dark";
            const perLineMatch = url.match(/perline=([^&]+)/);
            const perLine = perLineMatch ? perLineMatch[1] : "15";

            blocks.push({
              id: generateUniqueId(),
              type: "skill-icons",
              icons,
              theme,
              perLine,
              align,
            });
          }
        }

        htmlBlockContent = [];
        inHtmlBlock = false;
      }
      continue;
    }

    // Handle code blocks
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        const language = codeBlockContent[0]?.replace("```", "").trim() || "plaintext";
        const code = codeBlockContent.slice(1).join("\n");
        blocks.push({
          id: generateUniqueId(),
          type: "code",
          content: `\`\`\`${language}\n${code}\n\`\`\``,
        });
        codeBlockContent = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
        codeBlockContent.push(line);
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // Skip empty lines
    if (!line.trim()) continue;

    // Parse headings
    if (line.startsWith("# ")) {
      blocks.push({
        id: generateUniqueId(),
        type: "h1",
        content: line.slice(2),
      });
    } else if (line.startsWith("## ")) {
      blocks.push({
        id: generateUniqueId(),
        type: "h2",
        content: line.slice(3),
      });
    } else if (line.startsWith("### ")) {
      blocks.push({
        id: generateUniqueId(),
        type: "h3",
        content: line.slice(4),
      });
    } else if (line.startsWith("#### ")) {
      blocks.push({
        id: generateUniqueId(),
        type: "h4",
        content: line.slice(5),
      });
    } else if (line.startsWith("##### ")) {
      blocks.push({
        id: generateUniqueId(),
        type: "h5",
        content: line.slice(6),
      });
    } else if (line.startsWith("###### ")) {
      blocks.push({
        id: generateUniqueId(),
        type: "h6",
        content: line.slice(7),
      });
    } else if (line.startsWith("> ")) {
      // Check if it's an alert (GitHub-flavored markdown alert)
      const alertMatch = line.match(/^>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i);
      if (alertMatch) {
        const alertType = alertMatch[1].toLowerCase();
        const alertContent = [];

        // Collect all subsequent lines that start with >
        i++;
        while (i < lines.length && lines[i].startsWith(">")) {
          const contentLine = lines[i].slice(1).trim();
          if (contentLine) {
            alertContent.push(contentLine);
          }
          i++;
        }
        i--; // Step back one line since the loop will increment

        blocks.push({
          id: generateUniqueId(),
          type: "alert",
          alertType: alertType,
          content: alertContent.join("\n"),
        });
      } else {
        // Regular blockquote
        blocks.push({
          id: generateUniqueId(),
          type: "blockquote",
          content: line.slice(2),
        });
      }
    } else if (line === "---") {
      blocks.push({ id: generateUniqueId(), type: "separator", content: "" });
    } else if (line.match(/^<img\s+[^>]*>/)) {
      // Parse img tag with attributes
      const srcMatch = line.match(/src=["']([^"']+)["']/);
      const altMatch = line.match(/alt=["']([^"']+)["']/);
      const widthMatch = line.match(/width=["']([^"']+)["']/);
      const heightMatch = line.match(/height=["']([^"']+)["']/);

      blocks.push({
        id: generateUniqueId(),
        type: "image",
        content: srcMatch ? srcMatch[1] : "",
        alt: altMatch ? altMatch[1] : "",
        width: widthMatch ? widthMatch[1] : "",
        height: heightMatch ? heightMatch[1] : "",
        align: "left",
      });
    } else if (line.startsWith("![")) {
      const match = line.match(/!\[(.*?)\]\((.*?)\)/);
      if (match) {
        blocks.push({
          id: generateUniqueId(),
          type: "image",
          content: match[2],
          alt: match[1],
          width: "",
          height: "",
          align: "left",
        });
      }
    } else if (line.startsWith("[") && line.includes("](")) {
      const match = line.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        blocks.push({
          id: generateUniqueId(),
          type: "link",
          content: match[1],
          url: match[2],
        });
      }
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      // Collect list items
      let listContent = [line];
      while (
        i + 1 < lines.length &&
        (lines[i + 1].startsWith("- ") || lines[i + 1].startsWith("* "))
      ) {
        i++;
        listContent.push(lines[i]);
      }
      blocks.push({
        id: generateUniqueId(),
        type: "ul",
        content: listContent.join("\n"),
      });
    } else if (/^\d+\.\s/.test(line)) {
      // Collect ordered list items
      let listContent = [line];
      while (i + 1 < lines.length && /^\d+\.\s/.test(lines[i + 1])) {
        i++;
        listContent.push(lines[i]);
      }
      blocks.push({
        id: generateUniqueId(),
        type: "ol",
        content: listContent.join("\n"),
      });
    } else if (line.startsWith("|")) {
      // Collect table rows
      let tableContent = [line];
      while (i + 1 < lines.length && lines[i + 1].startsWith("|")) {
        i++;
        tableContent.push(lines[i]);
      }
      blocks.push({
        id: generateUniqueId(),
        type: "table",
        content: tableContent.join("\n"),
      });
    } else {
      blocks.push({ id: generateUniqueId(), type: "paragraph", content: line });
    }
  }

  return blocks;
};

export default function Raw({ blocks = [], onBlocksChange }) {
  const [markdown, setMarkdown] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setMarkdown(blocksToMarkdown(blocks));
  }, [blocks]);

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  const handleBlur = () => {
    try {
      const newBlocks = markdownToBlocks(markdown);
      onBlocksChange(newBlocks);
      toast.success("Markdown updated");
    } catch (_error) {
      toast.error("Failed to parse markdown");
    }
  };

  const copyMarkdown = async () => {
    try {
      if (!navigator.clipboard) {
        const textArea = document.createElement("textarea");
        textArea.value = markdown;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          setIsCopied(true);
          toast.success("Markdown copied to clipboard");
          setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
          console.error("Fallback copy failed:", err);
          toast.error("Failed to copy");
        }

        document.body.removeChild(textArea);
        return;
      }

      await navigator.clipboard.writeText(markdown);
      setIsCopied(true);
      toast.success("Markdown copied to clipboard");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
      toast.error("Failed to copy markdown");
    }
  };

  return (
    <div className="w-full h-full rounded-lg transition-colors relative">
      <div className="h-full overflow-y-auto overflow-x-hidden">
        <div className="p-2 sm:p-4">
          <div className="relative bg-muted rounded-lg border-0 shadow-none h-full">
            <Button
              variant="ghost"
              size="icon"
              onClick={copyMarkdown}
              aria-label="Copy markdown to clipboard"
              className="absolute top-3 right-3 z-10 h-8 w-8 hover:bg-background/80 rounded-md"
            >
              {isCopied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
            </Button>
            <Textarea
              value={markdown}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="# Your markdown here..."
              className="h-full min-h-[calc(100vh-12rem)] font-mono text-sm p-4 pr-14 resize-none bg-transparent border-0 shadow-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
