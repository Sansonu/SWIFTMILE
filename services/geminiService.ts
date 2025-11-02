
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { ResolvedAddress } from '../types';

// This is a placeholder. In a real app, the API key would be handled securely.
const API_KEY = process.env.API_KEY; 

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Using a placeholder. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "placeholder_api_key" });

const addressSchema = {
  type: Type.OBJECT,
  properties: {
    normalizedAddress: {
      type: Type.STRING,
      description: "The cleaned, standardized, and complete address string. e.g., 'E-506, Street Number 78, Uttam Vihar, Block D, New Delhi, Delhi 110059, India'",
    },
    latitude: {
      type: Type.NUMBER,
      description: "The precise latitude coordinate for the address.",
    },
    longitude: {
      type: Type.NUMBER,
      description: "The precise longitude coordinate for the address.",
    },
    confidenceScore: {
      type: Type.NUMBER,
      description: "A score from 0.0 to 1.0 indicating the model's confidence in the geocoding accuracy. 1.0 is highest confidence.",
    },
    parsingExplanation: {
      type: Type.STRING,
      description: "A brief, one-sentence explanation of how the unstructured address was interpreted, including any assumptions made about landmarks or localities."
    }
  },
  required: ['normalizedAddress', 'latitude', 'longitude', 'confidenceScore', 'parsingExplanation'],
};

export const resolveAddress = async (unstructuredAddress: string): Promise<ResolvedAddress> => {
  if (!API_KEY) {
     console.log(`Simulating Gemini API call for: ${unstructuredAddress}`);
    // Simulate a successful API response for development without an API key
    const mockLat = 28.6139 + (Math.random() - 0.5) * 0.1;
    const mockLng = 77.2090 + (Math.random() - 0.5) * 0.1;
    return new Promise(resolve => setTimeout(() => resolve({
      normalizedAddress: `(Simulated) ${unstructuredAddress}, New Delhi, 110001, India`,
      latitude: mockLat,
      longitude: mockLng,
      confidenceScore: Math.random() * (0.95 - 0.7) + 0.7,
      parsingExplanation: "Simulated response: Interpreted landmarks and nearby areas to generate coordinates."
    }), 1500));
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Parse and geocode the following unstructured Indian address: "${unstructuredAddress}"`,
      config: {
        systemInstruction: "You are an expert logistics AI for India. Your task is to take highly unstructured, informal Indian addresses and convert them into a precise, structured JSON format with accurate latitude/longitude coordinates. Handle common notations like 'near', 'opposite', 'gali no', and local landmarks.",
        responseMimeType: "application/json",
        responseSchema: addressSchema,
        temperature: 0.1,
      },
    });

    const jsonString = response.text.trim();
    const parsedJson = JSON.parse(jsonString);
    return parsedJson as ResolvedAddress;

  } catch (error) {
    console.error("Error resolving address with Gemini API:", error);
    throw new Error("Failed to resolve address. The AI model may be temporarily unavailable.");
  }
};
