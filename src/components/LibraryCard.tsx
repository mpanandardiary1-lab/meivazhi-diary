import React, { useState } from 'react';
import { LibraryItem } from '../types';
import { BookOpen, Tag, BookMarked, Share2, Check } from 'lucide-react';

interface LibraryCardProps {
  item: LibraryItem;
  onReadPdf?: (item: LibraryItem) => void;
}

function hasReadablePdf(item: LibraryItem): boolean {
  return !!(item.driveFileId || (item.pdfUrl && item.pdfUrl !== '#'));
}

function getShareUrl(item: LibraryItem): string {
  const base = `${window.location.origin}${window.location.pathname}`;
  return `${base}?read=${item.id}`;
}

export function LibraryCard({ item, onReadPdf }: LibraryCardProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const shareUrl = getShareUrl(item);
    const shareData = {
      title: item.title,
      text: `"${item.title}" - ${item.author} எழுதிய நூலைப் பாருங்கள்`,
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <div 
      className="group flex flex-col glass-morphism rounded-[2rem] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 overflow-hidden h-full relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-slate-100/50 group-hover:from-white/60 group-hover:to-slate-100/80 transition-colors duration-500 z-0 pointer-events-none"></div>
      
      <div className={`h-40 ${item.coverColor} p-8 flex items-end relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent z-0"></div>
        <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-40 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 z-0" aria-hidden="true">
          <BookOpen className="w-24 h-24 text-white" />
        </div>
        <div className="relative z-10 w-full">
          <div className="flex justify-between items-start w-full mb-4">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white border border-white/30 text-[9px] font-bold uppercase tracking-widest rounded-full shadow-sm">
              {item.category}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="inline-flex items-center justify-center w-8 h-8 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white border border-white/30 hover:border-white/50 rounded-xl shadow-sm transition-all duration-300 cursor-pointer"
                title="பகிர்"
                aria-label="பகிர்"
              >
                {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              </button>
              {hasReadablePdf(item) && (
                <button
                  type="button"
                  onClick={() => onReadPdf?.(item)}
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-white text-slate-900 font-bold text-[10px] uppercase tracking-wider rounded-xl shadow-xl hover:bg-slate-50 transition-all duration-300 cursor-pointer"
                  title="PDF படியுங்கள்"
                  aria-label="PDF படியுங்கள்"
                >
                  படியுங்கள் <BookMarked className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
          <h3 className="text-xl font-serif font-bold text-white leading-tight line-clamp-2 drop-shadow-lg group-hover:text-slate-100 transition-colors duration-300" title={item.title}>
            {item.title}
          </h3>
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow relative z-10">
        <div className="flex justify-between items-start mb-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.author}</p>
          <span className="text-[10px] text-slate-500 font-bold bg-slate-900/5 px-2.5 py-1 rounded-lg border border-slate-900/5">
            {item.year}
          </span>
        </div>
        
        <p className="text-sm text-slate-500 group-hover:text-slate-700 transition-colors duration-300 line-clamp-3 mb-6 flex-grow leading-relaxed font-medium">
          {item.summary}
        </p>
        
        <div className="mt-auto pt-6 border-t border-slate-900/5 group-hover:border-slate-900/10 transition-colors duration-300">
          <div className="flex flex-wrap gap-2">
            {item.tags.map(tag => (
              <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 glass-card border-none bg-slate-900/5 text-slate-600 text-[9px] font-bold uppercase tracking-widest rounded-lg transition-all duration-300 group-hover:bg-slate-900/10">
                <Tag className="w-2.5 h-2.5" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
