'use server'
import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export const getDALLEImage = async (prompt) => {
    const image = await openai.images.generate({ 
        model: 'dall-e-3',
        prompt: "In minimalist line, art style give me a" + prompt,
        n: 1,   
        size: '1024x1024',
        response_format: "b64_json"
    });
  return image.data[0].b64_json;
};
