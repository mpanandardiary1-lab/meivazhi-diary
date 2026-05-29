import { GoogleGenAI, Type } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export async function extractMetadataFromFilename(filename: string) {
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    throw new Error("API விசை இல்லை அல்லது இடம்வைப்பான் பயன்படுத்தப்படுகிறது.");
  }

  // Basic sanitization to prevent simple prompt injection
  const safeFilename = filename.replace(/"/g, '\\"');

  const prompt = `
    நீங்கள் ஒரு நிபுணர் டிஜிட்டல் நூலகர். பின்வரும் கோப்புப் பெயர் அல்லது PDF ஆவணத்தைக் குறிக்கும் உரைத் துணுக்கிலிருந்து மெட்டாடேட்டாவைப் பிரித்தெடுக்கவும்.
    தலைப்பு, ஆசிரியர், ஆண்டு (சாத்தியமானால்), வகை மற்றும் 2 வரி சுருக்கத்தை அனுமானிக்கவும்.
    2-3 தொடர்புடைய குறிச்சொற்களையும் பரிந்துரைக்கவும்.
    அனைத்து பதில்களும் தமிழில் இருக்க வேண்டும்.
    
    உள்ளீடு: "${safeFilename}"
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseJsonSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: 'பிரித்தெடுக்கப்பட்ட அல்லது அனுமானிக்கப்பட்ட தலைப்பு (தமிழில்)' },
          author: { type: Type.STRING, description: 'பிரித்தெடுக்கப்பட்ட அல்லது அனுமானிக்கப்பட்ட ஆசிரியர் பெயர் (தமிழில்)' },
          year: { type: Type.STRING, description: 'பிரசுர ஆண்டு அல்லது "தெரியவில்லை"' },
          category: { type: Type.STRING, description: 'பொருத்தமான வகை (எ.கா., தனிப்பட்ட நாட்குறிப்பு, ரிக் வேதம், விளக்க உரை)' },
          tags: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: '2-3 தொடர்புடைய குறிச்சொற்கள் (தமிழில்)'
          },
          summary: { type: Type.STRING, description: 'இந்த நூல்/ஆவணம் பற்றிய சுருக்கமான 2 வரி சுருக்கம் (தமிழில்).' },
          suggestedFilename: { type: Type.STRING, description: 'தரப்படுத்தப்பட்ட கோப்புப் பெயர் (எ.கா., author_title_year.pdf)' }
        },
        required: ['title', 'author', 'year', 'category', 'tags', 'summary', 'suggestedFilename']
      }
    }
  });

  try {
    const text = response.text || '{}';
    return JSON.parse(text);
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    throw new Error("மெட்டாடேட்டாவைப் பிரித்தெடுக்க முடியவில்லை.");
  }
}
