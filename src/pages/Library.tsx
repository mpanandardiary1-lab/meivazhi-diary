import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { INITIAL_LIBRARY, TAXONOMY } from '../data';
import { LibraryItem } from '../types';
import { LibraryCard } from '../components/LibraryCard';
import { LibraryTable } from '../components/LibraryTable';
import { PdfViewerModal } from '../components/PdfViewerModal';
import { extractMetadataFromFilename } from '../services/gemini';
import { 
  Search, 
  LayoutGrid, 
  List, 
  Filter, 
  BookMarked, 
  Sparkles, 
  Plus, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle2, 
  FileText,
  KeyRound,
  FileCheck,
  Library as LibraryIcon,
  Bookmark,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';

// High-quality mock metadata generator for offline/simulated runs
function simulateMetadata(filename: string) {
  const clean = filename.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");
  const isVeda = /veda/i.test(filename);
  const isDiary = /diary/i.test(filename);
  
  let title = isDiary
    ? `வரலாற்று நாட்குறிப்பு: ${clean}`
    : isVeda
      ? `வேத ஆவணம்: ${clean}`
      : `காப்பக ஆவணம்: ${clean}`;
  let author = isDiary ? "சுயாதீன ஆய்வாளர்" : "வேத ரிஷிகள் மற்றும் அறிஞர்கள்";
  let year = isDiary ? "1980கள்" : "பண்டைய காலம்";
  let category = isDiary ? "விளக்க உரை" : (isVeda ? "ரிக் வேதம்" : "விளக்க உரை");
  let tags = isDiary ? ["ஆன்மீகம்", "வரலாற்று", "தமிழ்"] : ["தத்துவம்", "சமஸ்கிருதம்", "மந்திரங்கள்"];
  let summary = `"${filename}" என்ற கோப்புப் பெயரிலிருந்து செயலாக்கப்பட்ட ஆன்மீக காப்பக ஆவணம். புனித வழிகாட்டுதல்கள், பாடல்கள் மற்றும் ஆழமான உபதேசங்களை ஆராய்கிறது.`;
  
  return {
    title,
    author,
    year,
    category,
    tags,
    summary,
    suggestedFilename: filename.toLowerCase().replace(/\s+/g, '_')
  };
}

export function Library() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [library, setLibrary] = useState<LibraryItem[]>(INITIAL_LIBRARY);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  
  // Library Tabs: 'explore' or 'ai-assistant'
  const [activeTab, setActiveTab] = useState<'explore' | 'ai-assistant'>('explore');

  // PDF Viewer state
  const [pdfViewerState, setPdfViewerState] = useState<{ isOpen: boolean; url: string; title: string }>({
    isOpen: false,
    url: '',
    title: ''
  });

  // AI Assistant form states
  const [rawFilename, setRawFilename] = useState('');
  const [pdfUrlInput, setPdfUrlInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any | null>(null);
  const [isUsingSimulatedAi, setIsUsingSimulatedAi] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Auto-hide notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Check search query parameters on mount to pre-select states or trigger reading
  useEffect(() => {
    const readId = searchParams.get('read');
    const searchVal = searchParams.get('search');
    const categoryVal = searchParams.get('category');

    if (!readId && !searchVal && !categoryVal) return;

    const newParams = new URLSearchParams(searchParams);
    let hasChanges = false;

    if (readId) {
      const foundItem = library.find(item => item.id === readId);
      if (foundItem && foundItem.pdfUrl) {
        setPdfViewerState({
          isOpen: true,
          url: foundItem.pdfUrl,
          title: foundItem.title
        });
      }
      newParams.delete('read');
      hasChanges = true;
    }

    if (searchVal) {
      setSearchQuery(decodeURIComponent(searchVal));
      setActiveTab('explore');
      newParams.delete('search');
      hasChanges = true;
    }

    if (categoryVal) {
      setSelectedCategory(decodeURIComponent(categoryVal));
      setActiveTab('explore');
      newParams.delete('category');
      hasChanges = true;
    }

    if (hasChanges) {
      setSearchParams(newParams, { replace: true });
    }
  }, [searchParams, library, setSearchParams]);

  const handleReadPdf = (url: string, title: string) => {
    setPdfViewerState({ isOpen: true, url, title });
  };

  const filteredLibrary = useMemo(() => {
    return library.filter(item => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory ? item.category === selectedCategory : true;

      return matchesSearch && matchesCategory;
    });
  }, [library, searchQuery, selectedCategory]);

  // AI Assistant trigger
  const handleAnalyzeFilename = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawFilename.trim()) return;

    setIsAiLoading(true);
    setAiError(null);
    setAiResult(null);
    setIsUsingSimulatedAi(false);

    // Detect if API key is a placeholder or undefined
    const apiKey = process.env.GEMINI_API_KEY;
    const isApiKeyPlaceholder = 
      !apiKey || 
      apiKey === 'MY_GEMINI_API_KEY' || 
      (typeof apiKey === 'string' && apiKey.trim() === '');

    if (isApiKeyPlaceholder) {
      // Simulate API call with a short elegant delay
      setTimeout(() => {
        const metadata = simulateMetadata(rawFilename);
        setAiResult(metadata);
        setIsUsingSimulatedAi(true);
        setIsAiLoading(false);
      }, 1500);
      return;
    }

    try {
      const extracted = await extractMetadataFromFilename(rawFilename);
      setAiResult(extracted);
    } catch (err: any) {
      console.warn("Failed to call live Gemini API, falling back to simulated extraction:", err);
      // Failover to simulation gracefully
      const metadata = simulateMetadata(rawFilename);
      setAiResult(metadata);
      setIsUsingSimulatedAi(true);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Add the newly generated / edited item into the Library Catalog
  const handleAddGeneratedToLibrary = (editedItem: any) => {
    const coverColors = ['bg-indigo-800', 'bg-amber-800', 'bg-rose-800', 'bg-emerald-800', 'bg-teal-800', 'bg-purple-800', 'bg-orange-850'];
    const randomColor = coverColors[Math.floor(Math.random() * coverColors.length)];

    const newItem: LibraryItem = {
      id: (library.length + 1).toString(),
      title: editedItem.title,
      author: editedItem.author,
      year: editedItem.year,
      category: editedItem.category,
      tags: editedItem.tags,
      summary: editedItem.summary,
      filename: editedItem.suggestedFilename || 'document.pdf',
      coverColor: randomColor,
      pdfUrl: pdfUrlInput.trim() || 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf'
    };

    setLibrary(prev => [newItem, ...prev]);
    setNotification({ message: `"${newItem.title}" காப்பகத்தில் வெற்றிகரமாக சேர்க்கப்பட்டது.`, type: 'success' });
    // Reset assistant form
    setRawFilename('');
    setPdfUrlInput('');
    setAiResult(null);
    setIsUsingSimulatedAi(false);
    // Switch to explore catalog
    setActiveTab('explore');
  };

  return (
    <div className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8 relative pt-24">
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className={`fixed top-24 left-1/2 -translate-x-1/2 z-[60] px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-xl border border-white/20 ${
              notification.type === 'success' ? 'bg-emerald-500/90 text-white' : 'bg-rose-500/90 text-white'
            }`}
          >
            {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <p className="font-semibold text-sm">{notification.message}</p>
            <button 
              onClick={() => setNotification(null)} 
              className="ml-2 hover:bg-white/20 p-1 rounded-lg transition-colors"
              aria-label="அறிவிப்பை மூடு"
              title="அறிவிப்பை மூடு"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Helmet>
        <title>டிஜிட்டல் நூலகம் - மெய்வழி புருஷோத்தம அனந்நர் ஆன்மீக நாட்குறிப்பு</title>
        <meta name="description" content="ஆன்மீக பதிவுகள் மற்றும் வேத ஆய்வுகளின் விரிவான சுயாதீன காப்பகத்தை ஆராயுங்கள்; அறிவுசார் மற்றும் தனிப்பட்ட ஆய்வுக்காகப் பாதுகாக்கப்பட்டுள்ளது." />
        <link rel="canonical" href="https://mpanandardiary.com/library" />
      </Helmet>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-amber-100/50 pb-8">
        <div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-amber-500/20">
              <BookMarked className="w-7 h-7" />
            </div>
            தெய்வீக ஆய்வு பட்டியல்
          </h1>
          <p className="text-sm sm:text-lg text-amber-700 mt-2 italic font-serif">
            "மெய்வழி புருஷோத்தம அனந்நரின் புனித உணர்வுகளைப் பாதுகாத்தல்."
          </p>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex bg-slate-100/80 p-1.5 rounded-2xl border border-gray-200 shadow-sm shrink-0 self-start md:self-center">
          <button
            onClick={() => setActiveTab('explore')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
              activeTab === 'explore' 
                ? 'bg-white text-slate-900 shadow-sm border border-gray-200' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <LibraryIcon className="w-4 h-4" />
            பட்டியல் ஆராய்வாளர்
          </button>
          <button
            onClick={() => setActiveTab('ai-assistant')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
              activeTab === 'ai-assistant' 
                ? 'bg-white text-slate-900 shadow-sm border border-gray-200' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
            AI உதவியாளர்
          </button>
        </div>
      </div>

      {activeTab === 'explore' ? (
        /* ================= CATALOG EXPLORER VIEW ================= */
        <div className="flex flex-col lg:flex-row gap-8 items-start relative z-10">
          {/* Enhanced Glass Sidebar */}
          <aside className="w-full lg:w-72 flex flex-col gap-6 sticky top-32">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-morphism rounded-[2.5rem] p-8 overflow-hidden relative"
            >
              <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <Filter className="w-3.5 h-3.5" />
                தொகுப்புகள்
              </h2>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-5 py-3.5 rounded-2xl text-[11px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-between group ${
                    selectedCategory === null 
                      ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/10' 
                      : 'text-slate-500 hover:bg-white/50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <LayoutGrid className="w-3.5 h-3.5" />
                    அனைத்து காப்பகங்கள்
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${selectedCategory === null ? 'bg-white/20' : 'bg-slate-100 group-hover:bg-white'}`}>
                    {library.length}
                  </span>
                </button>
                {TAXONOMY.categories.map(category => {
                  const count = library.filter(i => i.category === category).length;
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-5 py-3.5 rounded-2xl text-[11px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-between group ${
                        selectedCategory === category 
                          ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/10' 
                          : 'text-slate-500 hover:bg-white/50'
                      }`}
                    >
                      <span className="truncate">{category}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 ml-2 ${selectedCategory === category ? 'bg-white/20' : 'bg-slate-100 group-hover:bg-white'}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-morphism rounded-[2.5rem] p-8"
            >
              <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <Bookmark className="w-3.5 h-3.5" />
                பிரபல குறிச்சொற்கள்
              </h2>
              <div className="flex flex-wrap gap-2">
                {TAXONOMY.tags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="px-3 py-1.5 glass-card text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>
          </aside>

          {/* Main Catalog Explorer Listing */}
          <main className="flex-1 flex flex-col gap-8 min-w-0">
            {/* Controls panel */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center"
            >
              <div className="relative w-full sm:max-w-md group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                <input
                  type="text"
                  placeholder="காப்பகங்கள், ஆய்வு, குறிச்சொற்கள் தேடுங்கள்..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="நூலகத்தைத் தேடுங்கள்"
                  className="w-full pl-14 pr-6 py-5 glass-morphism rounded-[2rem] text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-900/5 transition-all shadow-sm"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center glass-morphism rounded-2xl p-1.5 shadow-sm shrink-0">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-xl transition-all duration-300 cursor-pointer ${
                      viewMode === 'grid' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:text-slate-700'
                    }`}
                    title="கட்டம் காட்சி"
                    aria-label="கட்டம் காட்சி"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-3 rounded-xl transition-all duration-300 cursor-pointer ${
                      viewMode === 'table' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:text-slate-700'
                    }`}
                    title="அட்டவணை காட்சி"
                    aria-label="அட்டவணை காட்சி"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Results Grid / Table */}
            <div className="flex-1">
              {viewMode === 'grid' ? (
                <motion.div 
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredLibrary.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -15 }}
                        transition={{ duration: 0.3, delay: index * 0.03 }}
                        layout
                      >
                        <LibraryCard item={item} onReadPdf={handleReadPdf} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {filteredLibrary.length === 0 && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="col-span-full text-center py-16 bg-white border border-gray-200 rounded-3xl"
                    >
                      <p className="text-slate-500 font-medium">உங்கள் தேடலுக்கு பொருந்தும் ஆன்மீக ஆவணங்கள் இல்லை.</p>
                      <button 
                        onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}
                        className="mt-3 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold cursor-pointer hover:bg-slate-800"
                      >
                        தேடல் வடிகட்டிகளை மீட்டமை
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <LibraryTable items={filteredLibrary} onReadPdf={handleReadPdf} />
                </motion.div>
              )}
            </div>
          </main>
        </div>
      ) : (
        /* ================= AI RESEARCH ASSISTANT VIEW ================= */
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto w-full glass-morphism p-10 rounded-[3rem] shadow-2xl flex flex-col gap-10 relative overflow-hidden"
        >
          {/* Subtle Shimmer Background for AI Workspace */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-amber-500/5 pointer-events-none z-0"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="relative z-10 flex flex-col gap-8">
            {/* Header intro */}
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-slate-900 text-white rounded-[1.5rem] flex items-center justify-center shadow-2xl group relative overflow-hidden">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-transparent to-indigo-500/20 opacity-50"
                />
                <Sparkles className="w-8 h-8 relative z-10" />
              </div>
              <div>
                <h2 className="text-3xl font-serif font-bold text-slate-950">AI ஆய்வு உதவியாளர்</h2>
                <p className="text-slate-500 text-sm mt-2 max-w-xl leading-relaxed">
                  வரலாற்று பதிவுகளைத் தானாகப் பகுப்பாய்வு செய்ய, ஆழமான கட்டமைப்பு மெட்டாடேட்டாவைப் பிரித்தெடுக்க மற்றும் அறிவுசார் சுருக்கங்களை உடனடியாக உருவாக்க Gemini நுண்ணறிவைப் பயன்படுத்துங்கள்.
                </p>
              </div>
            </div>

            {/* API Key Status Notice */}
            <div className="glass-card rounded-[2rem] p-6 flex items-start gap-4 text-slate-600 text-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                <KeyRound className="w-5 h-5 text-amber-600" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-slate-800">காப்பக நுண்ணறிவு மையம்</p>
                <p className="text-[11px] text-slate-500 leading-relaxed uppercase tracking-wider font-semibold">
                  Google GenAI SDK வழியாக நேரடி இணைப்பு. விசை கண்டறியப்படவில்லை என்றால், உயர்தர உருவகப்படுத்தல் முறை செயல்படும்.
                </p>
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleAnalyzeFilename} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label htmlFor="rawFilename" className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-2">
                    பதிவு தலைப்பு / கோப்புப் பெயர்
                  </label>
                  <input
                    type="text"
                    id="rawFilename"
                    required
                    value={rawFilename}
                    onChange={(e) => setRawFilename(e.target.value)}
                    placeholder="எ.கா., varalaaru_naatkurippu_1984.pdf"
                    className="w-full px-6 py-4 glass-morphism rounded-2xl text-slate-950 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-900/5 shadow-inner"
                  />
                </div>
                <div className="space-y-3">
                  <label htmlFor="pdfUrlInput" className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-2">
                    மூல URL / கிளவுட் இணைப்பு
                  </label>
                  <input
                    type="url"
                    id="pdfUrlInput"
                    value={pdfUrlInput}
                    onChange={(e) => setPdfUrlInput(e.target.value)}
                    placeholder="https://drive.google.com/..."
                    className="w-full px-6 py-4 glass-morphism rounded-2xl text-slate-950 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-900/5 shadow-inner"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isAiLoading || !rawFilename.trim()}
                  className="w-full sm:w-auto px-12 py-5 bg-slate-900 text-white font-bold rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 active:translate-y-0 active:scale-95"
                >
                  {isAiLoading ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      நரம்பு மையம் செயல்படுகிறது...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      AI பிரித்தெடுத்தலைத் தொடங்கு
                    </>
                  )}
                </button>
              </div>

              {/* Suggestions Chips */}
              <div className="space-y-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] text-center">பரிந்துரைக்கப்பட்ட வார்ப்புருக்கள்</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {[
                    'historical_diary_vol3_1987.pdf',
                    'intro_to_rigveda_commentary.pdf',
                    'sama_veda_chants_philosophical.pdf'
                  ].map(fn => (
                    <button
                      key={fn}
                      type="button"
                      onClick={() => setRawFilename(fn)}
                      className={`px-4 py-2 glass-card rounded-xl text-[10px] font-bold transition-all ${rawFilename === fn ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'text-slate-500 hover:bg-white/50'}`}
                    >
                      {fn}
                    </button>
                  ))}
                </div>
              </div>
            </form>

            {/* AI Result Card */}
            <AnimatePresence>
              {aiResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="mt-4 flex flex-col gap-8 p-8 glass-morphism rounded-[2.5rem] border-indigo-500/20 relative"
                >
                  <div className="absolute top-0 right-0 p-6">
                    {isUsingSimulatedAi ? (
                      <span className="flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 text-amber-600 text-[10px] font-bold uppercase tracking-widest rounded-full border border-amber-500/20">
                        <RefreshCw className="w-3 h-3 animate-spin" />
                        உருவகப்படுத்தல்
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 text-emerald-600 text-[10px] font-bold uppercase tracking-widest rounded-full border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" />
                        சரிபார்க்கப்பட்ட AI
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">அனுமானித தலைப்பு</label>
                        <p className="text-xl font-serif font-bold text-slate-900">{aiResult.title}</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">காப்பக ஆசிரியர்</label>
                        <p className="text-sm font-semibold text-slate-700">{aiResult.author}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">காலவரிசை</label>
                          <p className="text-sm font-mono text-slate-600">{aiResult.year}</p>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">வகைப்பாடு</label>
                          <p className="text-sm font-semibold text-indigo-600">{aiResult.category}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ஆய்வு சுருக்கம்</label>
                        <p className="text-xs text-slate-500 leading-relaxed italic">"{aiResult.summary}"</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">பொருள் குறிச்சொற்கள்</label>
                        <div className="flex flex-wrap gap-1.5">
                          {aiResult.tags.map((t: string) => (
                            <span key={t} className="px-2.5 py-1 bg-slate-900/5 text-slate-600 text-[10px] font-bold uppercase rounded-lg border border-slate-900/5">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-slate-900/5 flex justify-end gap-3">
                    <button
                      onClick={() => setAiResult(null)}
                      className="px-8 py-3 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 transition-all"
                    >
                      கட்டுப்பாட்டை மீட்டமை
                    </button>
                    <button
                      onClick={() => handleAddGeneratedToLibrary(aiResult)}
                      className="px-10 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-xl shadow-slate-900/10 flex items-center gap-2 hover:bg-slate-800 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      டிஜிட்டல் காப்பகத்தில் சேர்
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* PDF Reading Portal Modal */}
      <PdfViewerModal
        isOpen={pdfViewerState.isOpen}
        onClose={() => setPdfViewerState(prev => ({ ...prev, isOpen: false }))}
        pdfUrl={pdfViewerState.url}
        title={pdfViewerState.title}
      />
    </div>
  );
}
