'use client';

import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { AlertCircle } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

/**
 * Renders lesson section content with support for:
 * - LaTeX: $...$ inline, $$...$$ block
 * - **bold**, `inline code`
 * - Markdown lists (-, *)
 * - Callouts: > [!NOTE], > [!IMPORTANT], > [!WARNING]
 */
export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const paragraphs = content.split('\n\n');

  return (
    <div className="text-muted-foreground leading-relaxed flex flex-col gap-3">
      {paragraphs.map((block, blockIdx) => {
        const trimmed = block.trim();

        // Callouts
        if (trimmed.startsWith('> [!')) {
          const type = trimmed.includes('IMPORTANT') ? 'IMPORTANT' : trimmed.includes('WARNING') ? 'WARNING' : 'NOTE';
          const text = trimmed.replace(/>\s*\[!(IMPORTANT|WARNING|NOTE)\]\s*\n?/g, '').replace(/>\s*/g, '');
          let alertClass = 'bg-primary/5 border-primary/20 text-foreground';
          if (type === 'IMPORTANT') alertClass = 'bg-accent/5 border-accent/20 text-accent';
          if (type === 'WARNING') alertClass = 'bg-rose-500/5 border-rose-500/15 text-rose-400';

          return (
            <div key={blockIdx} className={`p-4 rounded-lg border flex gap-3 text-left my-2 ${alertClass}`}>
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider leading-none mb-1">{type}</span>
                <div className="text-xs leading-relaxed font-semibold">
                  {renderInline(text)}
                </div>
              </div>
            </div>
          );
        }

        // Block math $$...$$
        if (trimmed.startsWith('$$') && trimmed.endsWith('$$')) {
          const latex = trimmed.slice(2, -2).trim();
          try {
            const html = katex.renderToString(latex, { displayMode: true, throwOnError: false });
            return (
              <div
                key={blockIdx}
                className="my-3 overflow-x-auto text-center"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          } catch {
            return <p key={blockIdx} className="text-rose-400 text-xs">Math rendering error: {latex}</p>;
          }
        }

        // Markdown list
        if (/^[-*]\s/.test(trimmed)) {
          const items = trimmed.split('\n').filter(line => /^[-*]\s/.test(line));
          return (
            <ul key={blockIdx} className="list-disc list-inside text-xs font-medium space-y-1 pl-2">
              {items.map((item, i) => (
                <li key={i}>{renderInline(item.replace(/^[-*]\s/, ''))}</li>
              ))}
            </ul>
          );
        }

        // Regular paragraph with inline rendering
        return (
          <p key={blockIdx} className="font-medium text-xs/relaxed whitespace-pre-line">
            {renderInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

/**
 * Renders inline content with $...$ math, **bold**, and `code`.
 */
function renderInline(text: string): React.ReactNode {
  const tokens: React.ReactNode[] = [];
  let cursor = 0;
  let key = 0;

  // Regex for inline $...$, **...**, `...`
  const pattern = /(\$[^$\n]+?\$)|(\*\*[^*\n]+?\*\*)|(`[^`\n]+?`)/g;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    // Plain text before match
    if (match.index > cursor) {
      tokens.push(text.slice(cursor, match.index));
    }

    const full = match[0];
    if (full.startsWith('$') && full.endsWith('$')) {
      // Inline math
      const latex = full.slice(1, -1);
      try {
        const html = katex.renderToString(latex, { displayMode: false, throwOnError: false });
        tokens.push(<span key={key++} dangerouslySetInnerHTML={{ __html: html }} />);
      } catch {
        tokens.push(<span key={key++} className="text-rose-400">{full}</span>);
      }
    } else if (full.startsWith('**') && full.endsWith('**')) {
      // Bold
      const inner = full.slice(2, -2);
      tokens.push(<strong key={key++} className="font-bold text-foreground">{renderInline(inner)}</strong>);
    } else if (full.startsWith('`') && full.endsWith('`')) {
      // Inline code
      const code = full.slice(1, -1);
      tokens.push(
        <code key={key++} className="px-1.5 py-0.5 rounded bg-surface text-foreground font-mono text-[11px]">
          {code}
        </code>
      );
    }

    cursor = match.index + full.length;
  }

  // Remaining plain text
  if (cursor < text.length) {
    tokens.push(text.slice(cursor));
  }

  return tokens.length > 0 ? <>{tokens}</> : text;
}
