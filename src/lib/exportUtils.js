import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { marked } from "marked";

marked.setOptions({
  breaks: true,
  gfm: true,
  silent: true,
});

const ATTRIBUTION_FOOTER = `

---

<div align="center">
  <sub>Created with <a href="https://markdrop.vercel.app">Markdrop</a> | <a href="https://github.com/rakheOmar/Markdrop">⭐ Star on GitHub</a></sub>
</div>`;

export const blocksToMarkdown = (blocks, includeAttribution = true) => {
  if (!blocks || blocks.length === 0) {
    return "";
  }

  const content = blocks
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
        case "html":
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

          if (block.width || block.height) {
            const attrs = [`src="${block.content}"`];
            if (block.alt) attrs.push(`alt="${block.alt}"`);
            if (block.width) attrs.push(`width="${block.width}"`);
            if (block.height) attrs.push(`height="${block.height}"`);
            imageMarkdown = `<img ${attrs.join(" ")} />`;
          } else {
            imageMarkdown = `![${block.alt || ""}](${block.content})`;
          }

          if (align === "center") {
            return `<p align="center">\n\n${imageMarkdown}\n\n</p>`;
          } else if (align === "right") {
            return `<p align="right">\n\n${imageMarkdown}\n\n</p>`;
          }
          return imageMarkdown;
        }
        case "link":
          return `[${block.content}](${block.url || ""})`;
        case "table":
          return block.content;
        case "shield-badge": {
          const label = block.label || "label";
          const message = block.message || "message";
          const color = block.badgeColor || "blue";
          let url = `https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(message)}-${color}`;
          const params = [];
          if (block.style && block.style !== "flat") {
            params.push(`style=${block.style}`);
          }
          if (block.logo) {
            params.push(`logo=${encodeURIComponent(block.logo)}`);
          }
          if (params.length > 0) {
            url += `?${params.join("&")}`;
          }
          return `![${label}: ${message}](${url})`;
        }
        case "skill-icons": {
          const icons = block.icons || "js,html,css";
          let url = `https://skillicons.dev/icons?i=${icons}`;
          if (block.theme && block.theme !== "dark") {
            url += `&theme=${block.theme}`;
          }
          if (block.perLine && block.perLine !== "15") {
            url += `&perline=${block.perLine}`;
          }
          return `![Skill Icons](${url})`;
        }
        default:
          return block.content || "";
      }
    })
    .filter(Boolean)
    .join("\n\n");

  return includeAttribution ? content + ATTRIBUTION_FOOTER : content;
};

export const blocksToHTML = (blocks, includeAttribution = true) => {
  if (!blocks || blocks.length === 0) {
    return getHTMLTemplate("", includeAttribution);
  }

  try {
    const markdown = blocksToMarkdown(blocks, includeAttribution);
    const html = marked.parse(markdown, { breaks: true, gfm: true });
    const container = document.createElement("div");
    container.innerHTML = html;
    const labelMap = {
      js: "JS",
      javascript: "JS",
      ts: "TS",
      typescript: "TS",
      html: "HTML5",
      css: "CSS",
    };
    container.querySelectorAll("pre > code").forEach((codeEl) => {
      const cls = codeEl.className || "";
      const match = cls.match(/language-([a-z0-9+#]+)/i);
      const lang = match ? match[1].toLowerCase() : "";
      const label = labelMap[lang] || (lang ? lang.toUpperCase() : "");
      if (!label) return;
      const wrapper = document.createElement("div");
      wrapper.style.position = "relative";
      const badge = document.createElement("span");
      badge.textContent = label;
      badge.style.position = "absolute";
      badge.style.top = "8px";
      badge.style.right = "8px";
      badge.style.fontSize = "10px";
      badge.style.padding = "2px 6px";
      badge.style.borderRadius = "6px";
      if (lang === "js" || lang === "javascript") {
        badge.style.background = "#fbbf24";
        badge.style.color = "#111827";
      } else if (lang === "html") {
        badge.style.background = "#f97316";
        badge.style.color = "#ffffff";
      } else if (lang === "css") {
        badge.style.background = "#3b82f6";
        badge.style.color = "#ffffff";
      } else if (lang === "ts" || lang === "typescript") {
        badge.style.background = "#2563eb";
        badge.style.color = "#ffffff";
      } else {
        badge.style.background = "#e5e7eb";
        badge.style.color = "#6b7280";
      }
      const pre = codeEl.parentElement;
      pre.parentElement?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);
      wrapper.appendChild(badge);
    });
    return getHTMLTemplate(container.innerHTML, includeAttribution);
  } catch (error) {
    console.error("Error converting blocks to HTML:", error);
    const fallbackHTML = blocks
      .map((block) => {
        if (block.type === "html") {
          return block.content;
        }
        return `<p>${escapeHtml(block.content || "")}</p>`;
      })
      .join("\n");
    return getHTMLTemplate(fallbackHTML, includeAttribution);
  }
};

const getHTMLTemplate = (content, includeAttribution = true) => {
  const attribution = includeAttribution
    ? `
    <hr style="margin: 3rem 0 2rem; border: none; border-top: 1px solid #e5e7eb;">
    <div style="text-align: center; font-size: 0.875rem; color: #6b7280; margin-top: 2rem;">
        <p>Created with <a href="https://markdrop.vercel.app" style="color: #0366d6; text-decoration: none;">Markdrop</a> | 
        <a href="https://github.com/rakheOmar/Markdrop" style="color: #0366d6; text-decoration: none;">⭐ Star on GitHub</a></p>
    </div>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdrop Document</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            color: #333;
            background: #fff;
        }
        h1, h2, h3, h4, h5, h6 {
            margin-top: 2em;
            margin-bottom: 1em;
            font-weight: 600;
            line-height: 1.25;
        }
        h1 { font-size: 1.875rem; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem; margin-top: 1.5rem; margin-bottom: 1rem; }
        h2 { font-size: 1.5rem; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem; margin-top: 1.5rem; margin-bottom: 1rem; }
        h3 { font-size: 1.25rem; margin-top: 1.5rem; margin-bottom: 0.75rem; }
        h4 { font-size: 1.125rem; margin-top: 1.5rem; margin-bottom: 0.5rem; }
        h5 { font-size: 1rem; margin-top: 1.5rem; margin-bottom: 0.5rem; }
        h6 { font-size: 0.875rem; color: #6b7280; margin-top: 1.5rem; margin-bottom: 0.5rem; }
        p { margin-bottom: 1rem; line-height: 1.75; }
        blockquote {
            margin: 1rem 0;
            padding-left: 1rem;
            color: #6b7280;
            border-left: 4px solid #e5e7eb;
        }
        code {
            padding: 0.15em 0.4em;
            margin: 0;
            font-size: 0.875rem;
            background-color: #f3f4f6;
            border-radius: 4px;
            font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
        }
        pre {
            padding: 16px;
            overflow: auto;
            font-size: 0.875rem;
            line-height: 1.6;
            background-color: #f3f4f6;
            border-radius: 8px;
            margin: 1rem 0;
        }
        pre code {
            background-color: transparent;
            padding: 0;
            border-radius: 0;
            display: block;
            white-space: pre-wrap;
        }
        ul, ol {
            margin-bottom: 1rem;
            padding-left: 1.5rem;
        }
        li {
            margin-bottom: 0.5rem;
            font-size: 1rem;
        }
        table {
            border-collapse: collapse;
            border-spacing: 0;
            width: 100%;
            margin: 1rem 0;
        }
        table th, table td {
            padding: 10px 16px;
            border: 1px solid #e5e7eb;
        }
        table th {
            font-weight: 600;
            background-color: #f3f4f6;
        }
        img {
            max-width: 100%;
            height: auto;
            margin: 1rem 0;
            border-radius: 6px;
            display: block;
        }
        hr {
            height: 0;
            border: none;
            border-top: 4px solid #e5e7eb;
            margin: 2rem 0;
        }
        a {
            color: #0366d6;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        .task-list-item { list-style: none; }
        .task-list-item input[type="checkbox"] { margin-right: 0.5em; vertical-align: middle; }
        @media print {
            body { margin: 0; padding: 20px; }
            h1, h2 { page-break-after: avoid; }
            pre, blockquote { page-break-inside: avoid; }
        }
    </style>
</head>
<body>
    ${content}
    ${attribution}
</body>
</html>`;
};

const escapeHtml = (text) => {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
};

export const exportToPDF = async (blocks, filename = "document.pdf", includeAttribution = true) => {
  if (!blocks || blocks.length === 0) {
    throw new Error("No content to export");
  }

  const htmlContent = blocksToHTML(blocks, includeAttribution);
  const iframe = document.createElement("iframe");
  iframe.style.position = "absolute";
  iframe.style.left = "-9999px";
  iframe.style.top = "0";
  iframe.style.width = "800px";
  iframe.style.height = "600px";
  iframe.style.border = "none";
  document.body.appendChild(iframe);

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error("PDF export timed out"));
    }, 30000);

    const cleanup = () => {
      clearTimeout(timeout);
      if (iframe.parentNode) {
        document.body.removeChild(iframe);
      }
    };

    const handleLoad = async () => {
      try {
        await new Promise((r) => setTimeout(r, 1500));

        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!iframeDoc || !iframeDoc.body) {
          cleanup();
          reject(new Error("Unable to access iframe content"));
          return;
        }

        const body = iframeDoc.body;
        const canvas = await html2canvas(body, {
          scale: 1.5,
          useCORS: true,
          allowTaint: false,
          imageTimeout: 15000,
          backgroundColor: "#ffffff",
          logging: false,
          onclone: (clonedDoc) => {
            const clonedBody = clonedDoc.body;
            if (clonedBody) {
              clonedBody.style.width = "800px";
              clonedBody.style.overflow = "visible";
            }
          },
        });

        const imgData = canvas.toDataURL("image/png", 0.92);
        const pdf = new jsPDF("p", "mm", "a4");

        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          pdf.addPage();
          const yPosition = -(heightLeft - imgHeight);
          pdf.addImage(imgData, "PNG", 0, yPosition, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        cleanup();
        pdf.save(filename);
        resolve(true);
      } catch (error) {
        cleanup();
        console.error("PDF generation error:", error);
        reject(new Error("Failed to generate PDF: " + (error.message || "Unknown error")));
      }
    };

    iframe.onload = handleLoad;
    iframe.onerror = () => {
      cleanup();
      reject(new Error("Failed to load iframe"));
    };

    try {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(htmlContent);
        iframeDoc.close();
      } else {
        cleanup();
        reject(new Error("Unable to initialize iframe"));
      }
    } catch (error) {
      cleanup();
      reject(new Error("Failed to write HTML to iframe: " + error.message));
    }
  });
};

export const exportToHTML = (blocks, filename = "document.html", includeAttribution = true) => {
  if (!blocks || blocks.length === 0) {
    throw new Error("No content to export");
  }

  try {
    const htmlContent = blocksToHTML(blocks, includeAttribution);
    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error("HTML export error:", error);
    throw new Error("Failed to export HTML: " + error.message);
  }
};

export const exportToMarkdown = (blocks, filename = "document.md", includeAttribution = true) => {
  if (!blocks || blocks.length === 0) {
    throw new Error("No content to export");
  }

  try {
    const markdown = blocksToMarkdown(blocks, includeAttribution);
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error("Markdown export error:", error);
    throw new Error("Failed to export Markdown: " + error.message);
  }
};
