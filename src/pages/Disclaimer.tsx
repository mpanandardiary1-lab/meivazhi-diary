import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { LegalPageLayout } from '../components/LegalPageLayout';
import { Link } from 'react-router-dom';
import {
  LEGAL_ARCHIVE_NAME,
  LEGAL_CONTACT_EMAIL,
  LEGAL_LAST_UPDATED,
  LEGAL_OPERATOR_NOTE,
} from '../constants/legal';

const contact = (
  <a href={`mailto:${LEGAL_CONTACT_EMAIL}`} className="text-indigo-600 font-semibold hover:underline">
    {LEGAL_CONTACT_EMAIL}
  </a>
);

export function Disclaimer() {
  return (
    <LegalPageLayout
      pageTitle="பொறுப்புத் துறப்பு"
      pageTitleEn="Disclaimer"
      metaDescription="mpanandardiary.com பொறுப்புத் துறப்பு — ஆன்மீக காப்பகம் as-is, AI/Gemini வரம்புகள், அலுவலக அங்கீகாரம் இல்லை."
      canonicalPath="/disclaimer"
      icon={<AlertTriangle className="w-7 h-7" />}
      intro={
        <>
          <p>
            <strong>{LEGAL_ARCHIVE_NAME}</strong> இல் உள்ளடக்கம் மற்றும் கருவிகள் குறித்து முக்கியமான வரம்புகள்.
            கடைசி புதுப்பிப்பு: {LEGAL_LAST_UPDATED}.
          </p>
          <p className="italic text-slate-400 text-xs mt-2">{LEGAL_OPERATOR_NOTE}</p>
        </>
      }
      sections={[
        {
          id: 'no-official',
          title: '1. அலுவலக அங்கீகாரம் இல்லை',
          titleEn: 'No official endorsement',
          body: (
            <>
              <p>
                இந்த தளம் எந்த அரசு, மத அமைப்பு, அல்லது பிற நிறுவனத்தின் அலுவலக வலைத்தளம் அல்ல. &quot;பொது
                ஆன்மீக காப்பகம்&quot; என்ற நடுநிலை மொழியில் மட்டுமே இயங்குகிறோம்; அலுவலக மதக் கருத்து,
                ஆட்சி, அல்லது சட்ட அங்கீகாரம் கோரவில்லை.
              </p>
              <p className="text-xs text-slate-500">
                English: Operated as an independent public spiritual archive—not claiming official trust or
                institutional status unless separately documented.
              </p>
            </>
          ),
        },
        {
          id: 'content-as-is',
          title: '2. உள்ளடக்கம் &quot;உள்ளபடியே&quot;',
          titleEn: 'Content as-is',
          body: (
            <ul className="list-disc list-inside space-y-2">
              <li>வரலாற்று/ஆன்மீக நூல்கள் ஸ்கேன், பிரதி, அல்லது மூன்றாம் தரப்பு மூலங்களிலிருந்து — துல்லியம், முழுமை, மொழிபெயர்ப்பு உத்தரவாதமில்லை.</li>
              <li>ஆன்மீக, தத்துவ, அல்லது வரலாற்று விளக்கங்கள் கல்வி/ஆய்வுக்கு மட்டும்; வழிபாட்டு/சட்ட/மருத்துவ முடிவுக்கு பயன்படுத்த வேண்டாம்.</li>
              <li>பிழை அல்லது தவறான உரிமைகோரல்: {contact}.</li>
            </ul>
          ),
        },
        {
          id: 'ai-gemini',
          title: '3. AI / Gemini பொறுப்புத் துறப்பு',
          titleEn: 'AI & Gemini disclaimer',
          body: (
            <>
              <p>
                நூலகத்தின் &quot;AI ஆய்வு உதவியாளர்&quot; Google Gemini (அல்லது உருவகப்படுத்தப்பட்ட fallback)
                பயன்படுத்தி <strong>அனுமானிக்கப்பட்ட</strong> தலைப்பு, ஆசிரியர், ஆண்டு, வகை, சுருக்கம்,
                குறிச்சொற்களை உருவாக்கலாம்.
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>AI வெளியீடு உண்மை, மூல ஆவணத்துடன் பொருந்துதல், அல்லது மத அடிப்படை ஆதாரம் அல்ல.</li>
                <li>பிரசுரம்/ஆய்வுக்கு முன் மனிதர் சரிபார்ப்பு அவசியம்.</li>
                <li>API விசை இல்லையெனில் உள்ளூர் உருவகப்படுத்தல் — அதுவும் அனுமானம் மட்டுமே.</li>
                <li>உள்ளீட்டில் தனிப்பட்ட தரவை (தொலைபேசி, Aadhaar போன்ற) சேர்க்க வேண்டாம்.</li>
                <li>Google செயலாக்கம் அவர்களின் விதிமுறைகளுக்கு உட்பட்டது — <Link to="/privacy" className="text-indigo-600 hover:underline">தனியுரிமைக் கொள்கை</Link>.</li>
              </ul>
              <p className="mt-3 text-xs font-semibold text-amber-800/90 bg-amber-500/10 rounded-xl p-4 border border-amber-500/20">
                ⚠️ AI விளைவுகளை நம்பி மத/சட்ட முடிவு எடுக்க வேண்டாம். காப்பகம் AI பிழைகளுக்கு பொறுப்பேற்காது.
              </p>
            </>
          ),
        },
        {
          id: 'external',
          title: '4. வெளி இணைப்புகள்',
          titleEn: 'External links',
          body: (
            <p>
              Google Drive, WhatsApp, அல்லது பிற வெளி தளங்களுக்கான இணைப்புகள் அவர்களின் கொள்கைக்கு உட்பட்டவை;
              நாங்கள் அவற்றின் உள்ளடக்கம்/பாதுகாப்புக்கு பொறுப்பல்ல.
            </p>
          ),
        },
        {
          id: 'limitation',
          title: '5. பொறுப்பு வரம்பு',
          titleEn: 'Limitation',
          body: (
            <p>
              இந்திய சட்டத்தால் அனுமதிக்கப்பட்ட வரம்பில், இயக்குநர், காப்பக ஆபரேட்டர், உContributors அனைவரும்
              இலவச பார்வை, AI பரிந்துரை, அல்லது மூன்றாம் தரப்பு சேவைகளால் ஏற்படும் நஷ்டத்திற்கு பொறுப்பல்லர்.
              விரிவாக <Link to="/terms" className="text-indigo-600 hover:underline">பயன்பாட்டு விதிமுறைகள்</Link>.
            </p>
          ),
        },
      ]}
    />
  );
}
