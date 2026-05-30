import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { Library } from './pages/Library';
import { AboutUs } from './pages/AboutUs';
import { ContactUs } from './pages/ContactUs';
import { BookOpen, Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function Navigation() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { path: '/', label: 'காப்பகம்' },
    { path: '/library', label: 'நூலகம்' },
    { path: '/about', label: 'நோக்கம்' },
    { path: '/contact', label: 'தொடர்பு' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto h-16 px-6 glass-morphism rounded-3xl overflow-hidden relative">
        {/* Animated Shine Effect */}
        <motion.div 
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full h-full skew-x-[-20deg]"
        />

        <Link to="/" className="flex items-center gap-3 group relative z-10">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-serif font-bold text-slate-900 leading-none">புருஷோத்தம அனந்நர்</h1>
            <p className="text-[9px] text-amber-600 font-bold uppercase tracking-[0.2em] mt-1 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> தெய்வீக காப்பகம்
            </p>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 relative z-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[10px] font-bold uppercase tracking-[0.15em] px-5 py-2 rounded-xl transition-all duration-300 relative ${
                location.pathname === link.path 
                  ? 'text-slate-900 bg-white/50 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-white/30'
              }`}
            >
              {link.label}
              {location.pathname === link.path && (
                <motion.div 
                  layoutId="nav-pill"
                  className="absolute inset-0 border border-slate-900/5 rounded-xl"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-slate-500 hover:text-slate-900 transition-colors relative z-10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="மொபைல் பட்டியை மாற்று"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="md:hidden mt-4 glass-morphism rounded-3xl p-4 flex flex-col gap-2 pointer-events-auto shadow-2xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-xs font-bold uppercase tracking-widest px-6 py-4 rounded-2xl transition-all ${
                  location.pathname === link.path 
                    ? 'bg-slate-900 text-white shadow-lg' 
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex-1 flex flex-col w-full h-full"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function Footer() {
  return (
    <footer className="bg-white/70 backdrop-blur-2xl border-t border-gray-200 mt-auto py-12 relative z-20 shadow-[0_-4px_30px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-10">
          <div className="space-y-4 max-w-xs">
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <BookOpen className="w-5 h-5 relative z-10" />
              </div>
              <div>
                <h2 className="text-lg font-serif font-bold tracking-tight text-slate-900">மெய்வழி புருஷோத்தம அனந்நர் ஆன்மீக நாட்குறிப்பு</h2>
                <p className="text-[10px] text-amber-600 font-semibold uppercase tracking-[0.2em] flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> தெய்வீக டிஜிட்டல் நூலகம்
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              வரலாற்று ஆன்மீக நூல்கள் மற்றும் தனிப்பட்ட நாட்குறிப்புகளைப் பாதுகாத்து அறிவுசார் ஆய்வு செய்வதற்கான சுயாதீன, இணைப்பில்லாத டிஜிட்டல் துறை.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-10 sm:gap-20">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">வழிசெலுத்தல்</h3>
              <nav className="flex flex-col gap-2 text-sm text-slate-500">
                <Link to="/" className="hover:text-slate-900 transition-colors">காப்பக முகப்பு</Link>
                <Link to="/library" className="hover:text-slate-900 transition-colors">டிஜிட்டல் நூலகம்</Link>
                <Link to="/about" className="hover:text-slate-900 transition-colors">எங்கள் நோக்கம்</Link>
                <Link to="/contact" className="hover:text-slate-900 transition-colors">தொடர்பு</Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">சட்டம்</h3>
              <nav className="flex flex-col gap-2 text-sm text-slate-500">
                <span className="cursor-help hover:text-slate-900 transition-colors" title="இது ஒரு தனிப்பட்ட கல்வி திட்டம்.">பொறுப்புத் துறப்பு</span>
                <span className="cursor-help hover:text-slate-900 transition-colors" title="அனைத்து உள்ளடக்கமும் தகவல் மற்றும் ஆய்வு நோக்கங்களுக்காக மட்டுமே வழங்கப்படுகிறது.">பயன்பாட்டு விதிமுறைகள்</span>
              </nav>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-slate-400 font-medium text-center md:text-left max-w-2xl leading-relaxed">
            <strong>சுயாதீன கல்வி காப்பகம்:</strong> இந்த களஞ்சியம் ஆய்வு நோக்கங்களுக்காக மட்டுமே. எந்த அமைப்புடனும் இணைப்பில்லை. அனைத்து பொருட்களும் அறிவுசார் ஆய்வுக்காக "உள்ளபடியே" வழங்கப்படுகின்றன. உள்ளடக்கத்திற்கு உருவாக்குனர்கள் பொறுப்பேற்க மாட்டார்கள். பதிப்புரிமை அல்லது புகார் விசாரணைகளுக்கு எங்களைத் தொடர்பு கொள்ளவும்.
          </p>
          <p className="text-xs text-slate-500 font-medium whitespace-nowrap">
            © {new Date().getFullYear()} மெய்வழி புருஷோத்தம அனந்நர் காப்பகம்.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50/50 font-sans text-slate-900 flex flex-col relative overflow-hidden selection:bg-slate-200 pt-32">
        {/* Atmospheric Glass Background Elements */}
        <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
          {/* Main gradient mesh */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#e2e8f0,transparent)] opacity-40" />
          
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, 45, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-[40%] bg-amber-100/50 blur-[100px]"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, 50, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-[30%] bg-orange-100/40 blur-[120px]"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.3, 0.1],
              y: [0, -50, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] left-[30%] w-[30%] h-[30%] rounded-full bg-saffron-100/30 blur-[80px]"
          />

          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:40px_40px] opacity-20" />
        </div>

        <Navigation />
        <AnimatedRoutes />
        <Footer />
      </div>
    </Router>
  );
}
