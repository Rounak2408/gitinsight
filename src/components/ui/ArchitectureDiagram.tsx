import React, { useState } from 'react';
import { ArchitectureNode } from '../../types';
import { Layers, ArrowRight, ZoomIn, ZoomOut, RotateCcw, Server, Database, Code, ShieldCheck } from 'lucide-react';
import { Card, Badge, Button } from './Primitives';

export const ArchitectureDiagram: React.FC<{
  nodes: ArchitectureNode[];
  onSelectNode?: (node: ArchitectureNode) => void;
}> = ({ nodes, onSelectNode }) => {
  const [zoom, setZoom] = useState<number>(1);
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode | null>(nodes[0] || null);

  const handleNodeClick = (node: ArchitectureNode) => {
    setSelectedNode(node);
    if (onSelectNode) onSelectNode(node);
  };

  const getNodeIcon = (type: ArchitectureNode['type']) => {
    switch (type) {
      case 'frontend':
        return <Code className="w-5 h-5 text-indigo-500" />;
      case 'api':
        return <Server className="w-5 h-5 text-emerald-500" />;
      case 'business':
        return <Layers className="w-5 h-5 text-amber-500" />;
      case 'data':
        return <Database className="w-5 h-5 text-sky-500" />;
      case 'database':
        return <Database className="w-5 h-5 text-rose-500" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-purple-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Zoom controls */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-500" />
          <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">Interactive Architecture Flow Engine</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setZoom((z) => Math.min(1.4, z + 0.1))}>
            <ZoomIn className="w-3.5 h-3.5" />
          </Button>
          <span className="text-xs text-slate-500 font-mono">{Math.round(zoom * 100)}%</span>
          <Button variant="outline" size="sm" onClick={() => setZoom((z) => Math.max(0.7, z - 0.1))}>
            <ZoomOut className="w-3.5 h-3.5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setZoom(1)}>
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Main Diagram Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 overflow-auto bg-slate-950/60 dark:bg-slate-950 p-8 rounded-xl border border-slate-800 min-h-[380px] flex items-center justify-center bg-grid-pattern">
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-6 w-full max-w-2xl transition-transform duration-300"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
          >
            {nodes.map((node, index) => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <React.Fragment key={node.id}>
                  <div
                    onClick={() => handleNodeClick(node)}
                    className={`flex flex-col items-center p-4 rounded-xl border cursor-pointer transition-all w-44 text-center group ${
                      isSelected
                        ? 'bg-indigo-950/80 border-indigo-500 shadow-lg shadow-indigo-500/20 ring-2 ring-indigo-500/30'
                        : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="p-3 rounded-lg bg-slate-800/80 group-hover:scale-110 transition-transform mb-2">
                      {getNodeIcon(node.type)}
                    </div>
                    <h4 className="text-xs font-bold text-slate-100">{node.label}</h4>
                    <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{node.technologies[0]}</p>
                    <Badge variant="purple" className="mt-2 text-[9px] uppercase">
                      {node.type}
                    </Badge>
                  </div>

                  {index < nodes.length - 1 && (
                    <div className="hidden md:flex items-center text-slate-600 dark:text-slate-500">
                      <ArrowRight className="w-5 h-5 animate-pulse text-indigo-400" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Selected Node Details Panel */}
        <div>
          {selectedNode ? (
            <Card className="h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                    {getNodeIcon(selectedNode.type)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{selectedNode.label}</h3>
                    <Badge variant="purple">{selectedNode.type}</Badge>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {selectedNode.description}
                </p>

                <h4 className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-2">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {selectedNode.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                Connected downstream to:{' '}
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {selectedNode.connectedTo.length > 0 ? selectedNode.connectedTo.join(', ') : 'Terminal Database Node'}
                </span>
              </div>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center text-slate-400 text-xs">
              Click any architecture node to inspect structural details.
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
