import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MessageCircle, MapPin } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export function ContactUs() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = encodeURIComponent(formData.name);
    const message = encodeURIComponent(formData.message);
    const text = `வணக்கம், என் பெயர் ${name}.%0A%0A${message}`;
    window.open(`https://wa.me/919551466434?text=${text}`, '_blank', 'noopener,noreferrer');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-16 relative z-10 pt-24">
      <Helmet>
        <title>எங்களைத் தொடர்பு கொள்ளுங்கள் - மெய்வழி புருஷோத்தம அனந்நர் ஆன்மீக நாட்குறிப்பு</title>
        <meta name="description" content="காப்பகப் பொருட்கள் பற்றிய கேள்விகளுக்கு அல்லது வரலாற்று ஆன்மீக பதிவுகளைப் பங்களிப்பதற்கு எங்களைத் தொடர்பு கொள்ளுங்கள்." />
        <link rel="canonical" href="https://mpanandardiary.com/contact" />
      </Helmet>
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 space-y-12"
      >
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 drop-shadow-sm mb-4 tracking-tight text-gradient">காப்பக விசாரணைகள்</h1>
          <p className="text-lg text-slate-500 font-medium">
            வரலாற்று பொருட்கள் பற்றி கேள்விகள் உள்ளதா? டிஜிட்டல் பாதுகாப்பு தொடர்பான அறிவுசார் தொடர்புகளை வரவேற்கிறோம்.
          </p>
        </div>

        <div className="space-y-6">
          <motion.div whileHover={{ x: 10 }} className="flex items-start gap-6 p-8 glass-morphism rounded-[2rem] hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-300 group border-none">
            <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-xl">
              <Mail className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-slate-700 transition-colors">டிஜிட்டல் பாதுகாப்பு</h3>
              <p className="text-slate-500 mt-1 text-sm font-medium">காப்பக விசாரணைகள் மற்றும் டிஜிட்டல் பங்களிப்புகளுக்கு.</p>
              <a href="mailto:mpanandar@gmail.com" className="text-indigo-600 hover:text-indigo-700 font-bold mt-3 inline-block transition-colors text-sm uppercase tracking-widest">
                mpanandar@gmail.com
              </a>
            </div>
          </motion.div>

          <motion.div whileHover={{ x: 10 }} className="flex items-start gap-6 p-8 glass-morphism rounded-[2rem] hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-300 group border-none">
            <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-xl shadow-emerald-500/20">
              <MessageCircle className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-slate-700 transition-colors">நேரடி விசாரணை</h3>
              <p className="text-slate-500 mt-1 text-sm font-medium">அவசர காப்பக கேள்விகளுக்கு.</p>
              <a href="https://wa.me/919551466434" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 font-bold mt-3 inline-block transition-colors text-sm uppercase tracking-widest">
                +91 95514 66434
              </a>
            </div>
          </motion.div>

          <motion.div whileHover={{ x: 10 }} className="flex items-start gap-6 p-8 glass-morphism rounded-[2rem] hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-300 group border-none">
            <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-xl">
              <MapPin className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-slate-700 transition-colors">ஆய்வு இடம்</h3>
              <p className="text-slate-500 mt-1 text-sm font-medium">சென்னை, தமிழ்நாடு, இந்தியா</p>
              <p className="text-slate-400 mt-3 text-[10px] font-bold uppercase tracking-widest italic">சுயாதீன காப்பக திட்டம்</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="flex-1"
      >
        <form onSubmit={handleSubmit} className="glass-morphism p-10 rounded-[3rem] shadow-2xl flex flex-col gap-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,#10b98110,transparent)] pointer-events-none"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-emerald-500" />
              </div>
              செய்தி அனுப்புங்கள்
            </h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-2">உங்கள் பெயர்</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-6 py-4 glass-morphism border-none rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all shadow-inner"
                  placeholder="உங்கள் பெயரை உள்ளிடவும்"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-2">உங்கள் மின்னஞ்சல்</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-6 py-4 glass-morphism border-none rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all shadow-inner"
                  placeholder="email@எடுத்துக்காட்டு.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-2">செய்தி</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-6 py-4 glass-morphism border-none rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all shadow-inner leading-relaxed"
                  placeholder="உங்கள் காப்பக ஆய்வுக்கு எப்படி உதவலாம்?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-5 bg-slate-900 text-white font-bold rounded-2xl shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp வழியாக அனுப்புங்கள்
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
