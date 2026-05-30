import React from 'react';
import { Copyright as CopyrightIcon } from 'lucide-react';
import { LegalPageLayout } from '../components/LegalPageLayout';
import {
  LEGAL_ARCHIVE_NAME,
  LEGAL_BASE_URL,
  LEGAL_CONTACT_EMAIL,
  LEGAL_DOMAIN,
  LEGAL_LAST_UPDATED,
  LEGAL_OPERATOR_NOTE,
} from '../constants/legal';

const contact = (
  <a href={`mailto:${LEGAL_CONTACT_EMAIL}`} className="text-indigo-600 font-semibold hover:underline">
    {LEGAL_CONTACT_EMAIL}
  </a>
);

export function Copyright() {
  return (
    <LegalPageLayout
      pageTitle="பதிப்புரிமை அறிவிப்பு"
      pageTitleEn="Copyright Notice"
      metaDescription="Copyright notice for mpanandardiary.com — Indian Copyright Act 1957, fair dealing, takedown at mpanandar@gmail.com."
      canonicalPath="/copyright"
      icon={<CopyrightIcon className="w-7 h-7" />}
      intro={
        <>
          <p>
            <strong>{LEGAL_ARCHIVE_NAME}</strong> — பதிப்புரிமை, நியாயமான பயன்பாடு, மற்றும் அகற்றல் நடைமுறை.
            கடைசி புதுப்பிப்பு: {LEGAL_LAST_UPDATED}.
          </p>
          <p className="italic text-slate-400 text-xs mt-2">{LEGAL_OPERATOR_NOTE}</p>
        </>
      }
      sections={[
        {
          id: 'ownership',
          title: '1. உரிமை',
          titleEn: 'Ownership',
          body: (
            <>
              <p>
                © {new Date().getFullYear()} <strong>மெய்வழி புருஷோத்தம அனந்நர்</strong> / காப்பக இயக்குநர் —
                இந்த வலைத்தளத்தின் திரட்டல், வடிவமைப்பு, UI, மெட்டாடேட்டா கட்டமைப்பு, மற்றும் மூலக் குறியீடு
                ({LEGAL_BASE_URL}) பதிப்புரிமைச் சட்டம், 1957 (இந்தியா) மற்றும் பொருந்தும் சர்வதேச ஒப்பந்தங்களால்
                பாதுகாக்கப்படலாம்.
              </p>
              <p>
                காப்பக PDF/உரைப் பொருட்களின் அடிப்படை உரிமை மூல ஆசிரியர், வாரிசு, அல்லது வெளியீட்டாளருக்கு
                சொந்தமாக இருக்கலாம். நாங்கள் அனைத்து உரிமைகளையும் கோரவில்லை.
              </p>
            </>
          ),
        },
        {
          id: 'permitted',
          title: '2. அனுமதிக்கப்பட்ட பயன்பாடு (நியாயமான பயன்பாடு)',
          titleEn: 'Fair dealing / permitted use',
          body: (
            <>
              <p>இலவச நூலகம் — தனிப்பட்ட ஆன்மீக படிப்புக்கு மட்டும்:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>பிரிவு 52: ஆய்வு, தனிப்பட்ட பயன்பாடு, விமர்சனை, மேற்கோள் (ஆதாரம் குறிப்புடன்).</li>
                <li>வணிக பிரதி, பகிர்வு தளம், அல்லது முழு தொகுப்பு மறுபிரசுரம் — முன் எழுத்து அனுமதி தேவை.</li>
              </ul>
              <p className="text-xs text-slate-500 mt-2">
                English: Free access for personal spiritual study; commercial reproduction requires permission.
              </p>
            </>
          ),
        },
        {
          id: 'user-content',
          title: '3. பங்களிப்பு & DMCA-style notice',
          titleEn: 'Contributions & takedown',
          body: (
            <>
              <p>நீங்கள் பொருள் பங்களிக்கும்போது, அதற்கான உரிமை உங்களிடம் உள்ளது என உறுதிப்படுத்தவும்.</p>
              <p className="font-semibold text-slate-800 mt-2">பதிப்புரிமை மீறல் அறிவிப்பு (இந்தியா):</p>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>உங்கள் அடையாளம் & தொடர்பு</li>
                <li>மீறப்பட்ட படைப்பு விவரம் & {LEGAL_DOMAIN} URL</li>
                <li>நல்ல நம்பிக்கை அறிக்கை & துல்லியம் உறுதி</li>
                <li>அதிகாரம் உள்ளது என்ற உறுதி (உரிமையாளர்/பிரதிநிதி)</li>
              </ol>
              <p className="mt-2">
                அனுப்ப: {contact} — விஷயம்: <strong>Copyright / Takedown</strong>. நியாயமான காலத்தில்
                விசாரித்து, மீறல் நிரூபிக்கப்பட்டால் அணுகலைக் குறைக்க அல்லது நீக்க முயற்சிப்போம்.
              </p>
            </>
          ),
        },
        {
          id: 'attribution',
          title: '4. மேற்கோள் & ஆதாரம்',
          titleEn: 'Attribution',
          body: (
            <p>
              வெளியிடப்பட்ட ஆய்வு/கட்டுரையில் மூல காப்பக URL, ஆவணத் தலைப்பு, மற்றும் பக்கம்/பதிப்பு
              குறிப்பிடுங்கள். AI-உருவாக்கிய மெட்டாடேட்டாவை மூல ஆதாரமாகக் காட்ட வேண்டாம்.
            </p>
          ),
        },
        {
          id: 'contact',
          title: '5. பதிப்புரிமை தொடர்பு',
          titleEn: 'Copyright contact',
          body: (
            <p>
              அனைத்து பதிப்புரிமை, உரிமம், பங்களிப்பு விசாரணைகள்: {contact} ({LEGAL_DOMAIN}).
            </p>
          ),
        },
      ]}
    />
  );
}
