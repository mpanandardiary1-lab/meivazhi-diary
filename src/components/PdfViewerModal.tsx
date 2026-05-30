import React, { useState, useRef } from 'react';
import { Worker, Viewer, Plugin } from '@react-pdf-viewer/core';
import { highlightPlugin, MessageIcon, RenderHighlightTargetProps, RenderHighlightContentProps } from '@react-pdf-viewer/highlight';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import { fullScreenPlugin } from '@react-pdf-viewer/full-screen';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import { X, ChevronLeft, ChevronRight, MousePointer, Pencil, Type, Trash2, Maximize, ZoomIn, ZoomOut } from 'lucide-react';
import { motion } from 'motion/react';
import { getGoogleDrivePreviewUrlFromId } from '../utils/drive';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/highlight/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import '@react-pdf-viewer/full-screen/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  driveFileId?: string;
  pdfUrl?: string;
  title: string;
}

interface Note {
  id: number;
  content: string;
  highlightAreas: any[];
  quote: string;
}

interface Point { x: number; y: number }
interface DrawAnn { type: 'draw'; id: string; pageIndex: number; path: Point[]; color: string; strokeWidth: number }
interface TextAnn { type: 'text'; id: string; pageIndex: number; x: number; y: number; text: string; color: string; fontSize: number }
type Annotation = DrawAnn | TextAnn;

const AnnotationLayer = ({ pageIndex, scale, tool, annotations, setAnnotations }: any) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState<Point[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeTextInput, setActiveTextInput] = useState<{x: number, y: number} | null>(null);
  const [textValue, setTextValue] = useState('');

  const getCoords = (e: React.MouseEvent | React.TouchEvent) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    return {
      x: (clientX - rect.left) / scale,
      y: (clientY - rect.top) / scale
    };
  };

  const handlePointerDown = (e: any) => {
    if (tool === 'select') return;
    const coords = getCoords(e);
    if (tool === 'draw') {
      setIsDrawing(true);
      setCurrentPath([coords]);
    } else if (tool === 'text') {
      if (activeTextInput) {
        saveText();
      } else {
        setActiveTextInput(coords);
        setTextValue('');
      }
    }
  };

  const handlePointerMove = (e: any) => {
    if (!isDrawing || tool !== 'draw') return;
    setCurrentPath(prev => [...prev, getCoords(e)]);
  };

  const handlePointerUp = () => {
    if (isDrawing && tool === 'draw' && currentPath.length > 0) {
      const newAnn: DrawAnn = {
        type: 'draw', id: Date.now().toString(), pageIndex, path: currentPath, color: '#f59e0b', strokeWidth: 2
      };
      setAnnotations((prev: any) => [...prev, newAnn]);
      setCurrentPath([]);
      setIsDrawing(false);
    }
  };

  const saveText = () => {
     if (textValue.trim() && activeTextInput) {
        const newAnn: TextAnn = {
           type: 'text', id: Date.now().toString(), pageIndex, x: activeTextInput.x, y: activeTextInput.y, text: textValue, color: '#f59e0b', fontSize: 16
        };
        setAnnotations((prev: any) => [...prev, newAnn]);
     }
     setActiveTextInput(null);
     setTextValue('');
  };

  const renderPath = (path: Point[], scale: number) => {
    if (path.length === 0) return '';
    return path.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x * scale} ${p.y * scale}`).join(' ');
  };

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: tool === 'select' ? 0 : 10, pointerEvents: tool === 'select' ? 'none' : 'auto' }}>
      <svg
        ref={svgRef}
        style={{ width: '100%', height: '100%', touchAction: 'none' }}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
      >
        {annotations.map((ann: Annotation) => {
          if (ann.type === 'draw') {
            return <path key={ann.id} d={renderPath(ann.path, scale)} stroke={ann.color} strokeWidth={ann.strokeWidth * scale} fill="none" strokeLinecap="round" strokeLinejoin="round" />;
          } else if (ann.type === 'text') {
            return <text key={ann.id} x={ann.x * scale} y={ann.y * scale} fill={ann.color} fontSize={ann.fontSize * scale} fontFamily="sans-serif">{ann.text}</text>;
          }
          return null;
        })}
        {currentPath.length > 0 && (
          <path d={renderPath(currentPath, scale)} stroke="#f59e0b" strokeWidth={2 * scale} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
      {activeTextInput && (
        <input
          autoFocus
          type="text"
          value={textValue}
          onChange={e => setTextValue(e.target.value)}
          onBlur={saveText}
          onKeyDown={e => e.key === 'Enter' && saveText()}
          style={{
            position: 'absolute',
            left: activeTextInput.x * scale,
            top: (activeTextInput.y * scale) - (16 * scale),
            color: '#f59e0b',
            fontSize: `${16 * scale}px`,
            background: 'transparent',
            border: '1px dashed #f59e0b',
            outline: 'none',
            fontFamily: 'sans-serif',
            padding: 0,
            margin: 0,
            zIndex: 20
          }}
        />
      )}
    </div>
  );
};

function HighlightNoteContent({
  onSaveNote,
  ...props
}: RenderHighlightContentProps & { onSaveNote: (note: Note) => void }) {
  const [message, setMessage] = useState('');

  const addNote = () => {
    if (message !== '') {
      onSaveNote({
        id: Date.now(),
        content: message,
        highlightAreas: props.highlightAreas,
        quote: props.selectedText,
      });
      props.cancel();
    }
  };

  return (
    <div
      className="p-4 rounded-xl shadow-2xl bg-indigo-950 border border-white/10 flex flex-col gap-3 w-64"
      style={{
        position: 'absolute',
        left: `${props.selectionRegion.left}%`,
        top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
        zIndex: 1,
      }}
    >
      <div className="text-xs text-white/50 italic border-l-2 border-amber-500 pl-2 line-clamp-3">
        {props.selectedText}
      </div>
      <textarea
        className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-amber-500"
        rows={3}
        placeholder="குறிப்பு சேர்க்கவும்..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <div className="flex justify-end gap-2">
        <button
          className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white text-xs font-medium rounded-md"
          onClick={props.cancel}
        >
          ரத்து செய்
        </button>
        <button
          className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-medium rounded-md"
          onClick={addNote}
        >
          சேமி
        </button>
      </div>
    </div>
  );
}

export function PdfViewerModal({ isOpen, onClose, driveFileId, pdfUrl, title }: PdfViewerModalProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [tool, setTool] = useState<'select' | 'draw' | 'text'>('select');
  const [readingProgress, setReadingProgress] = useState(0);
  
  const drivePreviewUrl = React.useMemo(
    () => (driveFileId ? getGoogleDrivePreviewUrlFromId(driveFileId) : null),
    [driveFileId],
  );
  const isDrivePdf = drivePreviewUrl !== null;

  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { CurrentPageInput, GoToNextPage, GoToPreviousPage, NumberOfPages } = pageNavigationPluginInstance;

  const fullScreenPluginInstance = fullScreenPlugin();
  const zoomPluginInstance = zoomPlugin();
  const { ZoomIn: ZoomInButton, ZoomOut: ZoomOutButton, ZoomPopover } = zoomPluginInstance;
  
  const renderHighlightTarget = React.useCallback((props: RenderHighlightTargetProps) => (
    <div
      style={{
        background: '#eee',
        display: 'flex',
        position: 'absolute',
        left: `${props.selectionRegion.left}%`,
        top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
        transform: 'translate(0, 8px)',
        zIndex: 1,
      }}
      className="p-2 rounded-lg shadow-lg bg-indigo-950 border border-white/10"
    >
      <button
        className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md transition-colors"
        onClick={() => {
          props.toggle();
        }}
      >
        <MessageIcon /> சிறப்புக்குறி சேர்
      </button>
    </div>
  ), []);

  const renderHighlightContent = React.useCallback(
    (props: RenderHighlightContentProps) => (
      <HighlightNoteContent {...props} onSaveNote={(note) => setNotes((prev) => [...prev, note])} />
    ),
    [],
  );

  const highlightPluginInstance = highlightPlugin({
    renderHighlightTarget,
    renderHighlightContent,
  });

  const annotationPluginInstance: Plugin = React.useMemo(() => ({
    renderPageLayer: (props: any) => (
      <AnnotationLayer
        {...props}
        tool={tool}
        annotations={annotations.filter(a => a.pageIndex === props.pageIndex)}
        setAnnotations={setAnnotations}
      />
    ),
  }), [tool, annotations]);

  const plugins = React.useMemo(() => [
    highlightPluginInstance, 
    pageNavigationPluginInstance, 
    annotationPluginInstance,
    fullScreenPluginInstance,
    zoomPluginInstance
  ], [highlightPluginInstance, pageNavigationPluginInstance, annotationPluginInstance, fullScreenPluginInstance, zoomPluginInstance]);

  const handlePageChange = (e: any) => {
    const total = e.doc.numPages;
    const current = e.currentPage + 1;
    setReadingProgress((current / total) * 100);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    if (isDrivePdf) e.preventDefault();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#0a0514]/90 backdrop-blur-xl flex flex-col z-[100]" onContextMenu={handleContextMenu}>
      <style>{`
        .custom-page-input input {
          width: 100%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          border-radius: 0.375rem;
          padding: 0.25rem 0.5rem;
          text-align: center;
          font-size: 0.875rem;
        }
        .custom-page-input input:focus {
          outline: none;
          border-color: #f59e0b;
          background: rgba(255, 255, 255, 0.15);
        }
      `}</style>

      {/* Reading Progress Bar */}
      {!isDrivePdf && (
      <div className="absolute top-0 left-0 h-1 bg-amber-500/20 w-full z-[110]">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${readingProgress}%` }}
          className="h-full bg-gradient-to-r from-amber-500 to-orange-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
        />
      </div>
      )}
      
      <div className="flex items-center justify-between px-6 py-4 bg-indigo-950/40 border-b border-white/10 shrink-0">
        <h2 className="text-lg font-serif font-bold text-white drop-shadow-md flex items-center gap-3 flex-1">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          <span className="truncate">{title}</span>
        </h2>
        
        {!isDrivePdf && (
        <div className="flex items-center gap-2 bg-black/40 px-2 py-1.5 rounded-xl border border-white/10 mx-2">
          <button onClick={() => setTool('select')} className={`p-1.5 rounded-lg transition-all ${tool === 'select' ? 'bg-indigo-500 text-white shadow-md' : 'text-white/70 hover:bg-white/20 hover:text-white'}`} title="தேர்ந்தெடு & சிறப்புக்குறி" aria-label="தேர்ந்தெடு & சிறப்புக்குறி">
            <MousePointer className="w-4 h-4" />
          </button>
          <button onClick={() => setTool('draw')} className={`p-1.5 rounded-lg transition-all ${tool === 'draw' ? 'bg-indigo-500 text-white shadow-md' : 'text-white/70 hover:bg-white/20 hover:text-white'}`} title="வரை" aria-label="வரை">
            <Pencil className="w-4 h-4" />
          </button>
          <button onClick={() => setTool('text')} className={`p-1.5 rounded-lg transition-all ${tool === 'text' ? 'bg-indigo-500 text-white shadow-md' : 'text-white/70 hover:bg-white/20 hover:text-white'}`} title="உரை சேர்" aria-label="உரை சேர்">
            <Type className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-white/20 mx-1"></div>
          <button onClick={() => setAnnotations([])} className="p-1.5 rounded-lg transition-all text-white/70 hover:bg-red-500/80 hover:text-white" title="குறிப்புகளை அழி" aria-label="குறிப்புகளை அழி">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        )}

        {!isDrivePdf && (
        <div className="flex items-center gap-2 bg-black/40 px-2 py-1.5 rounded-xl border border-white/10 mx-2">
          <ZoomOutButton>
            {(props) => (
              <button 
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/20 transition-all" 
                onClick={props.onClick}
                title="சிறிதாக்கு"
                aria-label="சிறிதாக்கு"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
            )}
          </ZoomOutButton>
          <ZoomPopover />
          <ZoomInButton>
            {(props) => (
              <button 
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/20 transition-all" 
                onClick={props.onClick}
                title="பெரிதாக்கு"
                aria-label="பெரிதாக்கு"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            )}
          </ZoomInButton>
        </div>
        )}

        {!isDrivePdf && (
        <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 mx-2">
          <GoToPreviousPage>
            {(props) => (
              <button
                className={`p-1.5 rounded-lg transition-all ${props.isDisabled ? 'text-white/20 cursor-not-allowed' : 'text-white/70 hover:text-white hover:bg-white/20'}`}
                disabled={props.isDisabled}
                onClick={props.onClick}
                title="முந்தைய பக்கம்"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
          </GoToPreviousPage>
          
          <div className="flex items-center gap-2 text-sm text-white/70 font-mono">
            <div className="w-12 custom-page-input">
              <CurrentPageInput />
            </div>
            <span>/</span>
            <NumberOfPages />
          </div>

          <GoToNextPage>
            {(props) => (
              <button
                className={`p-1.5 rounded-lg transition-all ${props.isDisabled ? 'text-white/20 cursor-not-allowed' : 'text-white/70 hover:text-white hover:bg-white/20'}`}
                disabled={props.isDisabled}
                onClick={props.onClick}
                title="அடுத்த பக்கம்"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </GoToNextPage>
        </div>
        )}

        <div className="flex-1 flex justify-end items-center gap-3">
          {!isDrivePdf && fullScreenPluginInstance.EnterFullScreen && (
            <fullScreenPluginInstance.EnterFullScreen>
              {(props) => (
                <button 
                  onClick={props.onClick}
                  className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                  title="முழுத்திரை"
                >
                  <Maximize className="w-5 h-5" />
                </button>
              )}
            </fullScreenPluginInstance.EnterFullScreen>
          )}
          <button 
            onClick={onClose} 
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            aria-label="PDF பார்வையாளரை மூடு"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 w-full h-full overflow-hidden bg-black/20 relative" onContextMenu={handleContextMenu}>
        {isDrivePdf && drivePreviewUrl ? (
          <iframe
            src={drivePreviewUrl}
            title={title}
            className="w-full h-full border-0 bg-white"
            allow="autoplay"
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
        ) : pdfUrl ? (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer
            fileUrl={pdfUrl}
            plugins={plugins}
            theme="dark"
            onPageChange={handlePageChange}
          />
        </Worker>
        ) : null}
      </div>
    </div>
  );
}
