import React from 'react';
import { Shield } from 'lucide-react';
import { LegalPageLayout } from '../components/LegalPageLayout';
import {
  LEGAL_ARCHIVE_NAME,
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

export function PrivacyPolicy() {
  return (
    <LegalPageLayout
      pageTitle="தனியுரிமைக் கொள்கை"
      pageTitleEn="Privacy Policy"
      metaDescription="mpanandardiary.com தனியுரிமை — DPDP Act 2023 & IT Act aligned notice for free spiritual archive, contact data, and optional Gemini AI."
      canonicalPath="/privacy"
      icon={<Shield className="w-7 h-7" />}
      intro={
        <>
          <p>
            <strong>{LEGAL_ARCHIVE_NAME}</strong> ({LEGAL_DOMAIN}) உங்கள் தனிப்பட்ட தரவை எவ்வாறு சேகரித்து
            பயன்படுத்துகிறது என்பதை விளக்குகிறது. கடைசி புதுப்பிப்பு: {LEGAL_LAST_UPDATED}.
          </p>
          <p className="italic text-slate-400 text-xs mt-2">{LEGAL_OPERATOR_NOTE}</p>
        </>
      }
      sections={[
        {
          id: 'controller',
          title: '1. தரவு நிர்வாகி',
          titleEn: 'Data fiduciary / operator',
          body: (
            <>
              <p>
                இந்த தளத்தின் தரவு நிர்வாகி/இயக்குநர்: <strong>{LEGAL_ARCHIVE_NAME}</strong> (தனிப்பட்ட பொது
                காப்பக இயக்கம்). தொடர்பு: {contact}.
              </p>
              <p className="text-xs text-slate-500">
                English: We process minimal personal data to operate a free library at {LEGAL_DOMAIN}. This notice
                aligns with the Digital Personal Data Protection Act, 2023 (DPDP) and Information Technology Act,
                2000 where applicable.
              </p>
            </>
          ),
        },
        {
          id: 'what-we-collect',
          title: '2. எவ்வ தரவைச் சேகரிக்கிறோம்',
          titleEn: 'What we collect',
          body: (
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>தொடர்பு படிவம்:</strong> நீங்கள் வழங்கும் பெயர், மின்னஞ்சல், செய்தி — WhatsApp அல்லது
                மின்னஞ்சல் வழியாக அனுப்பும்போது நீங்களே தேர்வு செய்கிறீர்கள்.
              </li>
              <li>
                <strong>தொழில்நுட்ப பதிவுகள்:</strong> IP, உலாவி வகை, பக்க பார்வைகள் — hosting/CDN வழங்குநர்
                பதிவுகளில் (பொதுவாக குறுகிய காலம்).
              </li>
              <li>
                <strong>AI உதவியாளர்:</strong> நூலகப் பகுதியில் Gemini API பயன்படுத்தும்போது, நீங்கள் உள்ளிடும்
                கோப்புப் பெயர்/URL உரை Google-க்கு அனுப்பப்படலாம் — விவரம் கீழே.
              </li>
              <li>நாங்கள் வணிக விற்பனைக்கான சுயவிவரம், பணம், அல்லது உணர்திறன் Aadhaar/PAN சேகரிக்க மாட்டோம்.</li>
            </ul>
          ),
        },
        {
          id: 'purpose',
          title: '3. நோக்கம் மற்றும் சட்ட அடிப்படை',
          titleEn: 'Purpose & lawful basis',
          body: (
            <ul className="list-disc list-inside space-y-2">
              <li>காப்பக சேவை வழங்குதல், புகார்/பதிப்புரிமை பதில், பாதுகாப்பு.</li>
              <li>DPDP: ஒப்புதல் (தொடர்பு படிவம்), சட்டப்பூர்வ கடமை, அல்லது நியாயமான நோக்கம் (தள இயக்கம்).</li>
              <li>AI: கோப்புப் பெயரிலிருந்து மெட்டாடேட்டா உதவி — தனிப்பட்ட ஆய்வு; மூல PDF உள்ளடக்கம் அனுப்பப்படுவதில்லை (உரை உள்ளீடு மட்டும்).</li>
            </ul>
          ),
        },
        {
          id: 'sharing',
          title: '4. பகிர்வு மற்றும் சர்வதேச பரிமாற்றம்',
          titleEn: 'Sharing & transfers',
          body: (
            <>
              <p>தரவு பகிர்வு:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Hosting, analytics (உள்ளதானால்), மின்னஞ்சல்/WhatsApp — சேவை வழங்குநர்கள்.</li>
                <li>
                  <strong>Google Gemini / GenAI</strong> — API விசை உள்ளமைக்கப்பட்டால் மட்டும்; Google இன்
                  தனியுரிமைக் கொள்கையும் பொருந்தும்.
                </li>
              </ul>
              <p className="mt-2 text-xs text-slate-500">
                சர்வதேச பரிமாற்றம் (எ.கா. அமெரிக்கா) DPDP விதிகளின்படி தேவையான பாதுகாப்புகளுடன் அல்லது ஒப்புதலுடன்
                நடக்கலாம்.
              </p>
            </>
          ),
        },
        {
          id: 'retention',
          title: '5. தக்கவைப்பு',
          titleEn: 'Retention',
          body: (
            <p>
              தொடர்பு செய்திகள் புகார் தீர்வு/சட்ட காலவரம்பு வரை; சேவை பதிவுகள் hosting வழங்குநர் கொள்கையின்படி.
              AI உள்ளீடு Google-ன் தக்கவைப்பு கொள்கைக்கு உட்பட்டது — API இல்லையெனில் உள்ளூர் உருவகப்படுத்தல் மட்டும்.
            </p>
          ),
        },
        {
          id: 'rights',
          title: '6. உங்கள் உரிமைகள் (DPDP)',
          titleEn: 'Your rights',
          body: (
            <>
              <p>இந்திய DPDP Act இன் கீழ், பொருந்தும் வரம்பில்:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>தரவு அணுகல், திருத்தம், நீக்கம் கோரிக்கை.</li>
                <li>ஒப்புதல் திரும்பப் பெறுதல் (எதிர்கால செயலாக்கத்திற்கு).</li>
                <li>புகார்: {contact} — &quot;Privacy / DPDP&quot; விஷயம்.</li>
              </ul>
              <p className="mt-2">
                தரவு பாதுகாப்பு வாரியம் (India) உட்பட்ட புகார் உரிமை DPDP விதிகளின்படி பாதுகாக்கப்படும்.
              </p>
            </>
          ),
        },
        {
          id: 'children',
          title: '7. குழந்தைகள்',
          titleEn: 'Children',
          body: (
            <p>
              18 வயதுக்குட்பட்டோரிடம் திட்டமிட்ட சேகரிப்பு இல்லை. பெற்றோர்/பாதுகாவலர் கவலைக்கு {contact}.
            </p>
          ),
        },
        {
          id: 'grievance-officer',
          title: '8. புகார் நிவாரண அலுவலர்',
          titleEn: 'Grievance redressal (IT Rules 2021)',
          body: (
            <>
              <p>
                IT Rules, 2021 பிரிவு 3(2) ஆவணப்படி புகார் நிவாரண தொடர்பு: <strong>{LEGAL_CONTACT_EMAIL}</strong>{' '}
                (இயக்குநர்/காப்பக தொடர்பு). புகார் அனுப்ப: {contact}. 30 நாட்களுக்குள் பதிலளிக்க முயற்சி.
              </p>
              <p>பதிப்புரிமை/உள்ளடக்கம் புகார்: அதே மின்னஞ்சல், &quot;Copyright&quot; குறிப்புடன்.</p>
            </>
          ),
        },
        {
          id: 'changes',
          title: '9. மாற்றங்கள்',
          titleEn: 'Updates',
          body: (
            <p>
              இக்கொள்கை புதுப்பிக்கப்படலாம்; முக்கிய மாற்றங்கள் இந்தப் பக்கத்தில் தேதியுடன் காட்டப்படும்.
              தொடர்ந்து பயன்பாடு புதுப்பித்த கொள்கையை ஏற்பதாகக் கருதப்படலாம்.
            </p>
          ),
        },
      ]}
    />
  );
}
