import React from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { LEGAL_BASE_URL, LEGAL_SITE_NAME } from '../constants/legal';

export interface LegalSection {
  id: string;
  title: string;
  titleEn?: string;
  body: React.ReactNode;
}

interface LegalPageLayoutProps {
  pageTitle: string;
  pageTitleEn?: string;
  metaDescription: string;
  canonicalPath: string;
  intro: React.ReactNode;
  sections: LegalSection[];
  icon: React.ReactNode;
}

export function LegalPageLayout({
  pageTitle,
  pageTitleEn,
  metaDescription,
  canonicalPath,
  intro,
  sections,
  icon,
}: LegalPageLayoutProps) {
  const canonical = `${LEGAL_BASE_URL}${canonicalPath}`;

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-10 relative z-10 pt-24 pb-16">
      <Helmet>
        <title>
          {pageTitle} - {LEGAL_SITE_NAME}
        </title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white mx-auto shadow-xl">
          {icon}
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight text-gradient">
          {pageTitle}
        </h1>
        {pageTitleEn && (
          <p className="text-sm text-slate-400 font-semibold uppercase tracking-[0.2em]">{pageTitleEn}</p>
        )}
        <div className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">{intro}</div>
      </motion.div>

      <nav
        aria-label="சட்டப் பிரிவுகள்"
        className="glass-morphism rounded-2xl p-6 text-xs text-slate-500 space-y-2"
      >
        <p className="font-bold text-slate-700 uppercase tracking-widest text-[10px]">பிரிவுகள்</p>
        <ol className="list-decimal list-inside space-y-1">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="hover:text-slate-900 transition-colors">
                {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="flex flex-col gap-8">
        {sections.map((section, i) => (
          <motion.section
            key={section.id}
            id={section.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="glass-morphism rounded-[2rem] p-8 md:p-10 scroll-mt-36"
          >
            <h2 className="text-xl font-serif font-bold text-slate-900 mb-1">{section.title}</h2>
            {section.titleEn && (
              <p className="text-[10px] font-bold text-amber-600/80 uppercase tracking-[0.2em] mb-4">
                {section.titleEn}
              </p>
            )}
            <div className="text-sm text-slate-600 leading-relaxed space-y-3 legal-prose">{section.body}</div>
          </motion.section>
        ))}
      </div>

      <p className="text-center text-[11px] text-slate-400">
        தொடர்புடைய பக்கங்கள்:{' '}
        <Link to="/terms" className="text-indigo-600 hover:underline">
          விதிமுறைகள்
        </Link>
        {' · '}
        <Link to="/privacy" className="text-indigo-600 hover:underline">
          தனியுரிமை
        </Link>
        {' · '}
        <Link to="/disclaimer" className="text-indigo-600 hover:underline">
          பொறுப்புத் துறப்பு
        </Link>
        {' · '}
        <Link to="/copyright" className="text-indigo-600 hover:underline">
          பதிப்புரிமை
        </Link>
      </p>
    </div>
  );
}
