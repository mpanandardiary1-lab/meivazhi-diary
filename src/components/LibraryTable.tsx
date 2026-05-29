import React, { useState } from 'react';
import { LibraryItem } from '../types';
import { FileText, ExternalLink, Share2, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface LibraryTableProps {
  items: LibraryItem[];
  onReadPdf?: (url: string, title: string) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemAnim = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

export function LibraryTable({ items, onReadPdf }: LibraryTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleShare = async (e: React.MouseEvent, item: LibraryItem) => {
    e.preventDefault();
    e.stopPropagation();
    
    const shareUrl = item.pdfUrl && item.pdfUrl !== '#' ? item.pdfUrl : window.location.href;
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
        setCopiedId(item.id);
        setTimeout(() => setCopiedId(null), 2000);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  if (items.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-24 glass-morphism rounded-[2.5rem] text-slate-400 font-bold uppercase tracking-widest text-xs"
      >
        உங்கள் வடிகட்டிக்கு பொருந்தும் உருப்படிகள் இல்லை.
      </motion.div>
    );
  }

  return (
    <div className="overflow-hidden glass-morphism rounded-[2.5rem]">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] border-b border-slate-900/5">தலைப்பு & ஆசிரியர்</th>
              <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] border-b border-slate-900/5">தொகுப்பு</th>
              <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] border-b border-slate-900/5">ஆண்டு</th>
              <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] border-b border-slate-900/5 text-right">செயல்கள்</th>
            </tr>
          </thead>
          <motion.tbody 
            variants={container}
            initial="hidden"
            animate="show"
          >
            {items.map((item) => (
              <motion.tr 
                variants={itemAnim}
                key={item.id} 
                className="hover:bg-white/50 transition-colors group"
              >
                <td className="px-8 py-6 border-b border-slate-900/5">
                  <div className="flex items-center gap-5">
                    <div className={`w-12 h-12 rounded-2xl ${item.coverColor} text-white flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-serif font-bold text-slate-900 text-lg group-hover:text-slate-700 transition-colors leading-none">{item.title}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{item.author}</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 border-b border-slate-900/5">
                  <span className="inline-flex px-3 py-1 bg-slate-900/5 text-slate-600 text-[10px] font-bold uppercase tracking-widest rounded-lg">
                    {item.category}
                  </span>
                </td>
                <td className="px-8 py-6 border-b border-slate-900/5 text-xs font-bold text-slate-500 font-mono">
                  {item.year}
                </td>
                <td className="px-8 py-6 border-b border-slate-900/5">
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={(e) => handleShare(e, item)}
                      className="w-10 h-10 glass-card border-none bg-slate-900/5 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-900 hover:text-white transition-all cursor-pointer"
                      title="பகிர்"
                      aria-label="பகிர்"
                    >
                      {copiedId === item.id ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                    </button>
                    {item.pdfUrl && item.pdfUrl !== '#' ? (
                      <a 
                        href={item.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.preventDefault();
                          if (onReadPdf) onReadPdf(item.pdfUrl!, item.title);
                        }}
                        className="h-10 px-6 glass-card border-none bg-slate-900 text-white flex items-center justify-center rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 shadow-xl transition-all cursor-pointer"
                        aria-label="PDF படியுங்கள்"
                      >
                        படியுங்கள்
                      </a>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-300 uppercase">ஆஃப்லைன்</span>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>
    </div>
  );
}
