/**
 * Export Utilities
 * Purpose: Handle various export formats for markdown documents
 * @version 1.0
 * @package Markdrop
 */

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { marked } from 'marked';

// Configure marked for GFM support
marked.setOptions({
  breaks: true,
  gfm: true,
  silent: true
});

/**
 * Convert markdown blocks to markdown string
 * @param {Array} blocks - Array of markdown blocks
 * @returns {string} Markdown string
 */
export const blocksToMarkdown = (blocks) => {
  if (!blocks || blocks.length === 0) {
    return '';
  }

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
          return block.content || '';
      }
    })
    .filter(Boolean)
    .join("\n\n");
};

/**
 * Convert markdown blocks to HTML with proper styling
 * @param {Array} blocks - Array of markdown blocks
 * @returns {string} HTML string with embedded styles
 */
export const blocksToHTML = (blocks) => {
  if (!blocks || blocks.length === 0) {
    return getHTMLTemplate('');
  }

  try {
    const markdown = blocksToMarkdown(blocks);
    const html = marked.parse(markdown, { breaks: true, gfm: true });
    return getHTMLTemplate(html);
  } catch (error) {
    console.error('Error converting blocks to HTML:', error);
    const fallbackHTML = blocks
      .map((block) => {
        if (block.type === 'html') {
          return block.content;
        }
        return `<p>${escapeHtml(block.content || '')}</p>`;
      })
      .join('\n');
    return getHTMLTemplate(fallbackHTML);
  }
};

/**
 * Get HTML template with styles
 * @param {string} content - HTML content
 * @returns {string} Complete HTML document
 */
const getHTMLTemplate = (content) => {
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
        h1 { font-size: 2em; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }
        h2 { font-size: 1.5em; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }
        h3 { font-size: 1.25em; }
        h4 { font-size: 1em; }
        h5 { font-size: 0.875em; }
        h6 { font-size: 0.85em; color: #6a737d; }
        p { margin-bottom: 1em; }
        blockquote {
            margin: 0 0 1em 0;
            padding: 0 1em;
            color: #6a737d;
            border-left: 0.25em solid #dfe2e5;
        }
        code {
            padding: 0.2em 0.4em;
            margin: 0;
            font-size: 85%;
            background-color: rgba(27,31,35,0.05);
            border-radius: 3px;
            font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
        }
        pre {
            padding: 16px;
            overflow: auto;
            font-size: 85%;
            line-height: 1.45;
            background-color: #f6f8fa;
            border-radius: 6px;
            margin-bottom: 1em;
        }
        pre code {
            background-color: transparent;
            padding: 0;
            border-radius: 0;
            display: block;
        }
        ul, ol {
            margin-bottom: 1em;
            padding-left: 2em;
        }
        li {
            margin-bottom: 0.25em;
        }
        table {
            border-collapse: collapse;
            border-spacing: 0;
            width: 100%;
            margin-bottom: 1em;
        }
        table th, table td {
            padding: 6px 13px;
            border: 1px solid #dfe2e5;
        }
        table th {
            font-weight: 600;
            background-color: #f6f8fa;
        }
        img {
            max-width: 100%;
            height: auto;
            margin: 1em 0;
            display: block;
        }
        hr {
            height: 0.25em;
            padding: 0;
            margin: 24px 0;
            background-color: #e1e4e8;
            border: 0;
        }
        a {
            color: #0366d6;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        @media print {
            body { margin: 0; padding: 20px; }
            h1, h2 { page-break-after: avoid; }
            pre, blockquote { page-break-inside: avoid; }
        }
    </style>
</head>
<body>
    ${content}
</body>
</html>`;
};

/**
 * Escape HTML characters
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
const escapeHtml = (text) => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

/**
 * Export document as PDF using iframe approach
 * @param {Array} blocks - Array of markdown blocks
 * @param {string} filename - Output filename
 * @returns {Promise<boolean>}
 */
export const exportToPDF = async (blocks, filename = 'document.pdf') => {
  if (!blocks || blocks.length === 0) {
    throw new Error('No content to export');
  }

  const htmlContent = blocksToHTML(blocks);
  const iframe = document.createElement('iframe');
  iframe.style.position = 'absolute';
  iframe.style.left = '-9999px';
  iframe.style.top = '0';
  iframe.style.width = '800px';
  iframe.style.height = '600px';
  iframe.style.border = 'none';
  document.body.appendChild(iframe);

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error('PDF export timed out'));
    }, 30000);

    const cleanup = () => {
      clearTimeout(timeout);
      if (iframe.parentNode) {
        document.body.removeChild(iframe);
      }
    };

    const handleLoad = async () => {
      try {
        await new Promise((r) => setTimeout(r, 1000));

        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!iframeDoc || !iframeDoc.body) {
          cleanup();
          reject(new Error('Unable to access iframe content'));
          return;
        }

        const body = iframeDoc.body;
        const canvas = await html2canvas(body, {
          scale: 1.5,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: false,
          onclone: (clonedDoc) => {
            const clonedBody = clonedDoc.body;
            if (clonedBody) {
              clonedBody.style.width = '800px';
              clonedBody.style.overflow = 'visible';
            }
          }
        });

        const imgData = canvas.toDataURL('image/png', 0.92);
        const pdf = new jsPDF('p', 'mm', 'a4');

        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          pdf.addPage();
          const yPosition = -(heightLeft - imgHeight);
          pdf.addImage(imgData, 'PNG', 0, yPosition, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        cleanup();
        pdf.save(filename);
        resolve(true);
      } catch (error) {
        cleanup();
        console.error('PDF generation error:', error);
        reject(new Error('Failed to generate PDF: ' + (error.message || 'Unknown error')));
      }
    };

    iframe.onload = handleLoad;
    iframe.onerror = () => {
      cleanup();
      reject(new Error('Failed to load iframe'));
    };

    try {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(htmlContent);
        iframeDoc.close();
      } else {
        cleanup();
        reject(new Error('Unable to initialize iframe'));
      }
    } catch (error) {
      cleanup();
      reject(new Error('Failed to write HTML to iframe: ' + error.message));
    }
  });
};

/**
 * Export document as HTML file
 * @param {Array} blocks - Array of markdown blocks
 * @param {string} filename - Output filename
 * @returns {boolean}
 */
export const exportToHTML = (blocks, filename = 'document.html') => {
  if (!blocks || blocks.length === 0) {
    throw new Error('No content to export');
  }

  try {
    const htmlContent = blocksToHTML(blocks);
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error('HTML export error:', error);
    throw new Error('Failed to export HTML: ' + error.message);
  }
};

/**
 * Export document as Markdown file
 * @param {Array} blocks - Array of markdown blocks
 * @param {string} filename - Output filename
 * @returns {boolean}
 */
export const exportToMarkdown = (blocks, filename = 'document.md') => {
  if (!blocks || blocks.length === 0) {
    throw new Error('No content to export');
  }

  try {
    const markdown = blocksToMarkdown(blocks);
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error('Markdown export error:', error);
    throw new Error('Failed to export Markdown: ' + error.message);
  }
};