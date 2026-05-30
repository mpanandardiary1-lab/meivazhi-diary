import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Sparkles, ShieldCheck } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export function AboutUs() {
  return (
    <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-16 relative z-10 pt-24">
      <Helmet>
        <title>எங்கள் காப்பகம் பற்றி - மெய்வழி புருஷோத்தம அனந்நர் ஆன்மீக நாட்குறிப்பு</title>
        <meta name="description" content="About the Meivazhi Purushothama Ananar spiritual diary archive — வரலாற்று ஆன்மீக நூல்கள் மற்றும் நாட்குறிப்புகளை ஆய்வு மற்றும் கல்வி நோக்கங்களுக்காகப் பாதுகாக்கும் சுயாதீன நோக்கம்." />
        <link rel="canonical" href="https://mpanandardiary.com/about" />
      </Helmet>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 drop-shadow-sm tracking-tight text-gradient">தெய்வீக காப்பக நோக்கம்</h1>
        <p className="text-xl text-amber-800/80 max-w-3xl mx-auto font-serif italic">
          "மெய்வழி புருஷோத்தம அனந்நரின் புனித உணர்வுகளையும் வரலாற்று பதிவுகளையும் பாதுகாப்பதற்கு அர்ப்பணிக்கப்பட்டது."
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-morphism rounded-[2.5rem] p-10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 group"
        >
          <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-xl">
            <BookOpen className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-slate-900 mb-4 group-hover:text-amber-700 transition-colors">எங்கள் காப்பக நோக்கம்</h2>
          <p className="text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors text-sm font-medium">
            மெய்வழி புருஷோத்தம அனந்நர் ஆன்மீக நாட்குறிப்பு காப்பகம் வரலாற்று ஆன்மீக நாட்குறிப்புகள் மற்றும் குறுக்கு-பண்பாட்டு வேத ஆய்வுகளுக்கான டிஜிட்டல் களஞ்சியமாக சுயாதீன திட்டமாக நிறுவப்பட்டது. இந்த புனித பதிவுகள் உயர்தர டிஜிட்டல் வடிவத்தில் பாதுகாக்கப்படுவதே எங்கள் நோக்கம்.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-morphism rounded-[2.5rem] p-10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 group"
        >
          <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500 shadow-xl">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-slate-900 mb-4 group-hover:text-slate-700 transition-colors">நடுநிலை நிலைப்பாடு</h2>
          <p className="text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors text-sm font-medium">
            இந்த தளம் சுயாதீனமாக இயங்குகிறது; எந்த மத அல்லது நிறுவன அமைப்புடனும் அலுவலக இணைப்பு இல்லை. எந்த அலுவலக மதக் கருத்தையும் நாங்கள் பிரதிநிதித்துவப்படுத்தவில்லை; இந்த பொருட்கள் வரலாற்று மற்றும் பண்பாட்டு கலைப்பொருட்களாக வணிகமற்ற ஆய்வு நோக்கங்களுக்காக மட்டுமே வழங்கப்படுகின்றன.
          </p>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-morphism p-10 md:p-16 rounded-[3rem] text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/5 to-transparent pointer-events-none"></div>
        <div className="relative z-10 space-y-10">
          <div className="space-y-4">
            <h2 className="text-3xl font-serif font-bold text-slate-900">ஆய்வு கொள்கை</h2>
            <p className="text-slate-500 max-w-3xl mx-auto leading-relaxed italic text-sm font-medium">
              இந்த களஞ்சியம் வரலாற்று பதிவுகளின் வணிகமற்ற ஆய்வுக்காக பராமரிக்கப்படுகிறது. அனைத்து காப்பக நடவடிக்கைகளும் தனிப்பட்ட ஆய்வுக்கான நியாயமான பயன்பாட்டுக் கொள்கையின் கீழ் செய்யப்படுகின்றன.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 pt-6">
            <div className="flex flex-col items-center gap-4 group">
              <div className="w-16 h-16 glass-card border-none bg-slate-900/5 rounded-full flex items-center justify-center text-slate-600 transition-all duration-300 group-hover:scale-110">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">ஆய்வு கவனம்</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">ஆழமான அறிவுசார் ஆய்வு.</p>
            </div>
            <div className="flex flex-col items-center gap-4 group">
              <div className="w-16 h-16 glass-card border-none bg-slate-900/5 rounded-full flex items-center justify-center text-slate-600 transition-all duration-300 group-hover:scale-110">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">பாதுகாப்பு</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">உயர்தர டிஜிட்டல்.</p>
            </div>
            <div className="flex flex-col items-center gap-4 group">
              <div className="w-16 h-16 glass-card border-none bg-slate-900/5 rounded-full flex items-center justify-center text-slate-600 transition-all duration-300 group-hover:scale-110">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">சுய நிதி</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">முற்றிலும் சுயாதீன திட்டம்.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
