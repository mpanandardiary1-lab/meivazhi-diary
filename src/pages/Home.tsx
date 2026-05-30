import React from 'react';
import { motion } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { BookOpen, Sparkles, Compass, ArrowRight, Bookmark, Library as LibraryIcon, ShieldCheck } from 'lucide-react';
import { INITIAL_LIBRARY } from '../data';

export function Home() {
  const navigate = useNavigate();

  const featuredBooks = INITIAL_LIBRARY.slice(0, 6).map((item) => ({
    id: item.id,
    title: item.title,
    description: item.summary,
    coverColor: item.coverColor,
    year: item.year,
  }));

  const stats = [
    { value: String(INITIAL_LIBRARY.length), label: 'காப்பக நூல்கள்', icon: BookOpen, color: 'text-slate-600 bg-slate-50' },
    { value: '2', label: 'வேத ஆய்வு', icon: Bookmark, color: 'text-indigo-600 bg-indigo-50' },
    { value: '100%', label: 'டிஜிட்டல் நூலகம்', icon: ShieldCheck, color: 'text-emerald-600 bg-emerald-50' },
    { value: 'AI', label: 'ஆய்வு உதவியாளர்', icon: Sparkles, color: 'text-slate-600 bg-slate-50' }
  ];

  return (
    <div className="flex-grow flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-20 border-b border-gray-100 bg-white">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              x: [0, 50, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-amber-100 blur-[120px]"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1],
              y: [0, 50, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-orange-100 blur-[120px]"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-8">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50/80 backdrop-blur-md border border-slate-200/50 rounded-2xl text-slate-800 text-xs font-bold uppercase tracking-wider shadow-sm"
            >
              <ShieldCheck className="w-4 h-4 text-slate-600" />
              சுயாதீன டிஜிட்டல் ஆய்வு காப்பகம்
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-5xl sm:text-7xl font-serif font-black text-slate-900 leading-[1.1] tracking-tight">
                ஆன்மீக <br />
                <span className="bg-gradient-to-r from-slate-600 via-slate-800 to-indigo-900 bg-clip-text text-transparent">
                  அறிவுத் தளம்
                </span>
              </h1>
              <p className="text-xl text-slate-500 max-w-xl leading-relaxed font-serif italic border-l-4 border-slate-300/30 pl-6">
                "வரலாற்று ஆன்மீக நாட்குறிப்புகள் மற்றும் குறுக்கு-பண்பாட்டு வேத ஆய்வுகளைப் பாதுகாத்து ஆய்வு செய்வதற்கான சுயாதீன களஞ்சியம்."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 max-w-lg leading-relaxed"
            >
              <strong>கல்வி காப்பகம்:</strong> இது சுயாதீன, அலுவலகமற்ற ஆய்வு களஞ்சியம். எந்த நிறுவனத்துடனும் இணைப்பில்லை. உள்ளடக்கம் கல்வி நோக்கங்களுக்காக மட்டுமே வழங்கப்படுகிறது.
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link
                to="/library"
                className="group flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-2xl shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
              >
                <LibraryIcon className="w-5 h-5 group-hover:rotate-6 transition-transform" />
                நூலகத்தை ஆராயுங்கள்
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#books"
                className="flex items-center gap-2 px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 shadow-sm"
              >
                <Compass className="w-5 h-5" />
                முக்கிய நூல்கள்
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.3, duration: 1, type: "spring" }}
            className="hidden lg:block relative perspective-1000"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-indigo-500/20 rounded-[3rem] blur-3xl animate-pulse"></div>
              <motion.div 
                animate={{ 
                  y: [0, -20, 0],
                  rotateZ: [0, 2, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-full h-full bg-white rounded-[3rem] border border-white/50 shadow-2xl overflow-hidden group p-8 flex flex-col justify-center items-center gap-8"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-orange-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <BookOpen className="w-16 h-16" />
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-serif font-bold text-slate-900">தெய்வீக ஞான காப்பகம்</div>
                  <div className="text-sm text-amber-600 font-medium">மெய்வழி புருஷோத்தம அனந்நர் பதிவுகள்</div>
                </div>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-2 h-2 rounded-full bg-slate-200"></div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-b border-gray-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.5 }}
                className="glass-morphism border-amber-100/50 p-8 rounded-[2rem] flex flex-col items-center text-center gap-4 hover:border-amber-500/30 hover:shadow-[0_20px_50px_rgba(217,119,6,0.05)] transition-all duration-500 group"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${stat.color} border border-amber-500/10 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-amber-500/10`}>
                  <stat.icon className="w-8 h-8" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold font-serif text-slate-900 leading-tight">{stat.value}</div>
                  <div className="text-[10px] text-amber-600 font-bold mt-1 uppercase tracking-[0.2em]">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section id="books" className="py-32 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-20 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 relative z-10">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-serif font-bold text-slate-900"
            >
              முக்கிய நூல்கள்
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-500 leading-relaxed font-serif"
            >
              மெய்வழி புருஷோத்தம அனந்நரின் ஆன்மீக நூல்களின் முக்கிய தொகுப்புகளை ஆராயுங்கள். ஒவ்வொரு நூலும் உயர்தர டிஜிட்டல் வடிவத்தில் பாதுகாக்கப்பட்டுள்ளது.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredBooks.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * (index % 3), duration: 0.6 }}
                className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 group flex flex-col h-full relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${book.coverColor} opacity-[0.03] rounded-bl-full group-hover:scale-150 transition-transform duration-700`}></div>
                
                <div className="relative z-10 flex-grow space-y-8">
                  <div className="flex items-start justify-between">
                    <div className={`w-16 h-16 ${book.coverColor} text-white rounded-2xl flex items-center justify-center shadow-lg shadow-black/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <BookOpen className="w-8 h-8" />
                    </div>
                    {book.year !== '—' && (
                    <span className="px-4 py-1.5 bg-slate-50 text-slate-600 border border-slate-100 text-[10px] font-bold font-mono rounded-full uppercase tracking-widest shadow-sm">
                      ஆண்டு {book.year}
                    </span>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-2xl font-serif font-bold text-slate-900 group-hover:text-amber-600 transition-colors duration-300">
                      {book.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed line-clamp-3 font-serif italic text-sm">
                      "{book.description}"
                    </p>
                  </div>
                </div>

                <div className="relative z-10 pt-10 flex flex-col gap-3 mt-auto">
                  <button
                    onClick={() => navigate(`/library?read=${book.id}`)}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    <BookOpen className="w-5 h-5" />
                    இப்போது படியுங்கள்
                  </button>
                  <button
                    onClick={() => navigate(`/library?search=${encodeURIComponent(book.title)}`)}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-semibold hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    பட்டியல் விவரங்கள்
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vedic Literature Highlight Section */}
      <section className="py-20 border-t border-b border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative overflow-hidden">
          <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center border border-indigo-100 mx-auto shadow-inner">
            <Bookmark className="w-10 h-10" />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
              வேத மற்றும் நியம உரைகள்
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              எங்கள் பட்டியலில் விகட விநாயகர், பைபிள், ஆண்டவர்களின் வாக்கியம் போன்ற முக்கிய ஆன்மீக நூல்கள் உள்ளன. விளக்க உரைகளைப் பார்க்க வகை வடிகட்டிகளைப் பயன்படுத்தவும்.
            </p>
          </div>
          <Link
            to="/library?category=விளக்க உரை"
            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all duration-300"
          >
            விளக்க உரைகளை ஆராயுங்கள்
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
