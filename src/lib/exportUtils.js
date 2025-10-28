/**
 * Export Utilities
 * Purpose: Handle various export formats for markdown documents
 * Features:
 * - PDF export using jsPDF and html2canvas
 * - HTML export with proper styling
 * - Markdown export (existing functionality)
 * @version 1.0
 * @package Markdrop
 */

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Convert markdown blocks to HTML with proper styling
 * @param {Array} blocks - Array of markdown blocks
 * @returns {string} HTML string with embedded styles
 */
export const blocksToHTML = (blocks) => {
  const markdown = blocksToMarkdown(blocks);
  
  // Convert markdown to HTML using a simple parser
  const html = markdownToHTML(markdown);
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdrop Document</title>
    <style>
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
        
        .task-list-item {
            list-style-type: none;
        }
        
        .task-list-item input[type="checkbox"] {
            margin-right: 0.5em;
        }
        
        @media print {
            body { margin: 0; padding: 20px; }
            h1, h2 { page-break-after: avoid; }
            pre, blockquote { page-break-inside: avoid; }
        }
    </style>
</head>
<body>
    ${html}
</body>
</html>`;
};

/**
 * Convert markdown blocks to markdown string
 * @param {Array} blocks - Array of markdown blocks
 * @returns {string} Markdown string
 */
export const blocksToMarkdown = (blocks) => {
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
          return block.content;
      }
    })
    .join("\n\n");
};

/**
 * Convert markdown string to HTML
 * @param {string} markdown - Markdown string
 * @returns {string} HTML string
 */
const markdownToHTML = (markdown) => {
  let html = markdown;
  
  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  
  // Bold and italic
  html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
  html = html.replace(/\*(.*)\*/gim, '<em>$1</em>');
  
  // Code blocks
  html = html.replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>');
  html = html.replace(/`(.*?)`/gim, '<code>$1</code>');
  
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>');
  
  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/gim, '<img src="$2" alt="$1" />');
  
  // Blockquotes
  html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');
  
  // Horizontal rules
  html = html.replace(/^---$/gim, '<hr>');
  
  // Lists
  html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
  html = html.replace(/^- (.*$)/gim, '<li>$1</li>');
  html = html.replace(/^(\d+)\. (.*$)/gim, '<li>$2</li>');
  
  // Wrap consecutive list items in ul/ol
  html = html.replace(/(<li>.*<\/li>)/gims, (match) => {
    const lines = match.split('\n');
    const listItems = lines.filter(line => line.trim().startsWith('<li>'));
    if (listItems.length > 0) {
      return `<ul>\n${match}\n</ul>`;
    }
    return match;
  });
  
  // Paragraphs
  html = html.replace(/^(?!<[h1-6]|<ul|<ol|<li|<blockquote|<pre|<hr)(.*)$/gim, '<p>$1</p>');
  
  // Clean up empty paragraphs
  html = html.replace(/<p><\/p>/gim, '');
  html = html.replace(/<p>\s*<\/p>/gim, '');
  
  return html;
};

/**
 * Export document as PDF
 * @param {Array} blocks - Array of markdown blocks
 * @param {string} filename - Output filename
 * @returns {Promise<void>}
 */
export const exportToPDF = async (blocks, filename = 'document.pdf') => {
  try {
    // Create HTML content
    const htmlContent = blocksToHTML(blocks);
    
    // Create a temporary container
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = htmlContent;
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = '800px';
    document.body.appendChild(tempContainer);
    
    // Convert to canvas
    const canvas = await html2canvas(tempContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 800,
      height: tempContainer.scrollHeight
    });
    
    // Create PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    
    let position = 0;
    
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    // Clean up
    document.body.removeChild(tempContainer);
    
    // Download
    pdf.save(filename);
    
    return true;
  } catch (error) {
    console.error('PDF export error:', error);
    throw new Error('Failed to export PDF');
  }
};

/**
 * Export document as HTML file
 * @param {Array} blocks - Array of markdown blocks
 * @param {string} filename - Output filename
 * @returns {void}
 */
export const exportToHTML = (blocks, filename = 'document.html') => {
  try {
    const htmlContent = blocksToHTML(blocks);
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error('HTML export error:', error);
    throw new Error('Failed to export HTML');
  }
};

/**
 * Export document as Markdown file
 * @param {Array} blocks - Array of markdown blocks
 * @param {string} filename - Output filename
 * @returns {void}
 */
export const exportToMarkdown = (blocks, filename = 'document.md') => {
  try {
    const markdown = blocksToMarkdown(blocks);
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error('Markdown export error:', error);
    throw new Error('Failed to export Markdown');
  }
};
