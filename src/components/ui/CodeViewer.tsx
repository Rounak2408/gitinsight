import React, { useState } from 'react';
import { Copy, Check, FileCode, Sparkles, AlertCircle } from 'lucide-react';
import { Button, Badge } from './Primitives';

export const CodeViewer: React.FC<{
  filename: string;
  code: string;
  language?: string;
  aiScore?: number;
  onExplainClick?: () => void;
}> = ({ filename, code, language = 'csharp', aiScore, onExplainClick }) => {
  const [copied, setCopied] = useState(false);

  const lines = code.split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs shadow-2xl overflow-hidden text-slate-200">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-slate-400">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-indigo-400" />
          <span className="font-semibold text-slate-200">{filename}</span>
          <Badge variant="outline" className="text-[10px] text-slate-400 border-slate-700">
            {language}
          </Badge>
          {aiScore !== undefined && (
            <Badge variant={aiScore > 50 ? 'warning' : 'success'} className="text-[10px]">
              AI Indicator: {aiScore}%
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          {onExplainClick && (
            <Button
              variant="outline"
              size="sm"
              onClick={onExplainClick}
              className="h-7 text-xs border-indigo-500/40 text-indigo-300 hover:bg-indigo-950/50"
              icon={<Sparkles className="w-3 h-3 text-indigo-400" />}
            >
              Explain File
            </Button>
          )}
          <button
            onClick={handleCopy}
            className="p-1.5 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            title="Copy Code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Code body with line numbers */}
      <div className="overflow-x-auto p-4 max-h-[500px] scrollbar-thin">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-slate-900/60 transition-colors group">
                <td className="w-10 select-none text-right pr-4 text-slate-600 group-hover:text-slate-400 font-mono text-[11px]">
                  {idx + 1}
                </td>
                <td className="whitespace-pre font-mono text-[12px] leading-relaxed text-slate-200">
                  {line || ' '}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
