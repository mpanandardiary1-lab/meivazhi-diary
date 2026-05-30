import React from 'react';
import { Scale } from 'lucide-react';
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

export function TermsOfUse() {
  return (
    <LegalPageLayout
      pageTitle="பயன்பாட்டு விதிமுறைகள்"
      pageTitleEn="Terms of Use"
      metaDescription="mpanandardiary.com பயன்பாட்டு விதிமுறைகள் — இலவச பொது ஆன்மீக காப்பகம், தனிப்பட்ட படிப்பு மற்றும் ஆய்வு நோக்கம், இந்திய சட்ட வரம்புகள்."
      canonicalPath="/terms"
      icon={<Scale className="w-7 h-7" />}
      intro={
        <>
          <p>
            <strong>{LEGAL_ARCHIVE_NAME}</strong> ({LEGAL_BASE_URL}) இல் நீங்கள் அணுகுவதன் மூலம் இந்த விதிமுறைகளை
            ஏற்றுக்கொள்வதாகக் கருதப்படும். கடைசி புதுப்பிப்பு: {LEGAL_LAST_UPDATED}.
          </p>
          <p className="italic text-slate-400 text-xs mt-2">{LEGAL_OPERATOR_NOTE}</p>
        </>
      }
      sections={[
        {
          id: 'acceptance',
          title: '1. ஏற்பு மற்றும் தளத்தின் தன்மை',
          titleEn: 'Acceptance & nature of service',
          body: (
            <>
              <p>
                இந்த வலைத்தளம் வரலாற்று/ஆன்மீக நூல்களை டிஜிட்டல் வடிவில் <strong>இலவசமாக</strong> பார்வையிட
                உதவும் பொது காப்பகமாக இயங்குகிறது. வணிக விற்பனை, சந்தா, அல்லது அலுவலக மத அங்கீகாரம் இல்லை
                என்பதை நாங்கள் தெளிவுபடுத்துகிறோம்.
              </p>
              <p>
                English: By using {LEGAL_DOMAIN}, you agree to these Terms. The site is operated as an independent
                public spiritual archive for personal study and research—not as an official religious or government
                body.
              </p>
            </>
          ),
        },
        {
          id: 'permitted-use',
          title: '2. அனுமதிக்கப்பட்ட பயன்பாடு',
          titleEn: 'Permitted use',
          body: (
            <>
              <ul className="list-disc list-inside space-y-2">
                <li>தனிப்பட்ட, வணிகமற்ற ஆன்மீக படிப்பு, கல்வி மற்றும் அறிவுசார் ஆய்வு.</li>
                <li>உங்கள் சாதனத்தில் தற்காலிக பார்வை; முறையான மேற்கோள்/ஆதாரம் குறிப்புடன் குறுகிய எடுத்துக்காட்டுகள்.</li>
                <li>காப்பக விசாரணைகள் அல்லது பதிப்புரிமை/துல்லியம் தொடர்பான நல்ல நம்பிக்கையுடன் மின்னஞ்சல்.</li>
              </ul>
              <p className="mt-2 text-slate-500 text-xs">
                இந்திய பதிப்புரிமைச் சட்டம், 1957 இன் பிரிவு 52 (நியாயமான பயன்பாடு) போன்ற வரம்புகளுக்குள் மட்டுமே
                மேற்கண்டது பொருந்தும்; விரிவாக பதிப்புரிமைப் பக்கத்தைப் பார்க்கவும்.
              </p>
            </>
          ),
        },
        {
          id: 'prohibited',
          title: '3. தடைசெய்யப்பட்ட பயன்பாடு',
          titleEn: 'Prohibited conduct',
          body: (
            <ul className="list-disc list-inside space-y-2">
              <li>முழு நூல்களை அனுமதியின்றி வணிகமாக பிரதியெடுத்தல், விற்பனை அல்லது பகிர்வு.</li>
              <li>தளத்தை மோசடி, spam, தீங்கிழைக்கும் உள்ளடக்கம், அல்லது சட்டவிரோத நோக்கில் பயன்படுத்துதல்.</li>
              <li>தள உள்கட்டமைப்பை உடைத்தல், அதிகச் சுமை, அல்லது தானியங்கி scraping (அனுமதி இல்லாவிட்டால்).</li>
              <li>அலுவலக அங்கீகாரம், அரசு அல்லது மத அமைப்புடன் இணைப்பு உள்ளது என்று தவறாகக் காட்டுதல்.</li>
            </ul>
          ),
        },
        {
          id: 'content',
          title: '4. உள்ளடக்கம் மற்றும் மூன்றாம் தரப்பு இணைப்புகள்',
          titleEn: 'Content & third parties',
          body: (
            <>
              <p>
                காப்பகப் பொருட்கள் &quot;உள்ளபடியே&quot; (as-is) வழங்கப்படுகின்றன. வெளி PDF/கிளவுட் இணைப்புகள்
                மூன்றாம் தரப்பு சேவைகளுக்கு உட்பட்டவை; அவற்றின் கிடைப்பு/துல்லியத்திற்கு நாங்கள் உத்தரவாதம்
                அளிக்க மாட்டோம்.
              </p>
              <p>
                AI உதவியாளர் (Gemini) வழியான மெட்டாடேட்டா/சுருக்கங்கள் <strong>அனுமானம்</strong>; மூல
                ஆவணத்தைச் சரிபார்க்காமல் நம்ப வேண்டாம் — பொறுப்புத் துறப்புப் பக்கம் பார்க்கவும்.
              </p>
            </>
          ),
        },
        {
          id: 'liability',
          title: '5. பொறுப்பு வரம்பு',
          titleEn: 'Limitation of liability',
          body: (
            <>
              <p>
                இந்திய சட்டத்தால் அனுமதிக்கப்பட்ட அதிகபட்ச வரம்பில், காப்பக இயக்குநர்/ஆபரேட்டர் நேரடி, மறைமுக,
                அல்லது விளைவு சேதங்களுக்கு (தரவு இழப்பு, ஆன்மீக/சமூக விளைவுகள் உட்பட) பொறுப்பேற்க மாட்டார்.
                உள்ளடக்கம் ஆன்மீக வழிகாட்டுதல், மருத்துவம், அல்லது சட்ட ஆலோசனை அல்ல.
              </p>
              <p className="text-xs text-slate-500">
                English: To the extent permitted under Indian law, liability is limited for use of free archival
                materials and optional AI tools.
              </p>
            </>
          ),
        },
        {
          id: 'governing-law',
          title: '6. பொருந்தும் சட்டம் மற்றும் நீதிமன்றம்',
          titleEn: 'Governing law & jurisdiction',
          body: (
            <p>
              இந்த விதிமுறைகள் இந்தியாவின் சட்டங்களுக்கு உட்பட்டவை. தகராறுகளில் தமிழ்நாடு, இந்தியாவின்
              தகுதியுள்ள நீதிமன்றங்கள் (பொதுவாக சென்னை, தமிழ்நாடு) சட்ட விதிகளின்படி பொருந்தும்.
            </p>
          ),
        },
        {
          id: 'grievance',
          title: '7. புகார் மற்றும் தொடர்பு',
          titleEn: 'Grievance & contact (IT Rules aligned)',
          body: (
            <>
              <p>
                தகவல் தொழில்நுட்பச் சட்டம், 2000 மற்றும் இணைய ஊடக விதிகள், 2021 இன் ஆவணப்படி, தளம்/உள்ளடக்கம்
                தொடர்பான புகார்களை {contact} க்கு அனுப்பவும். பெயர், தொடர்பு விவரம், புகார் விவரம், URL
                சேர்க்கவும். நியாயமான முயற்ச்சியுடன் <strong>30 நாட்களுக்குள்</strong> (அல்லது சட்டத்தில்
                குறிப்பிடப்பட்ட காலத்திற்குள்) பதிலளிக்க முயற்சிப்போம்.
              </p>
              <p>
                பதிப்புரிமை அகற்றல்/திருத்தம்: {contact} — &quot;Copyright / Takedown&quot; என்று விஷயத்தில்
                குறிப்பிடவும்.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
