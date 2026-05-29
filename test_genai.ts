import { GoogleGenAI } from '@google/genai';

try {
  console.log("Attempting to instantiate GoogleGenAI with undefined key...");
  const ai = new GoogleGenAI({ apiKey: undefined });
  console.log("Success! No exception thrown during instantiation.");
} catch (e) {
  console.error("Failed to instantiate GoogleGenAI with undefined key:", e);
}

try {
  console.log("Attempting to instantiate GoogleGenAI with empty string...");
  const ai2 = new GoogleGenAI({ apiKey: "" });
  console.log("Success! No exception thrown for empty string.");
} catch (e) {
  console.error("Failed to instantiate GoogleGenAI with empty string:", e);
}
