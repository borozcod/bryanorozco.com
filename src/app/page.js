"use client"
import { useState } from 'react';
import { LiveBlob } from './components/Blob'
import InputField from './elements/InputField'
import 'tachyons/css/tachyons.min.css';
import "./globals.css";
import { getDALLEImage } from './../openaiService.js'
export default function Home() {
  const [base64Data, setBase64Data] = useState('');
  const [loading, setLoading] = useState(false);

  const generateImage = async (prompt) => {
    try {
      setLoading(true);
      const base64Image = await getDALLEImage(prompt);
      setBase64Data(base64Image);
      setLoading(false);
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <main>
          <div className="ph2-ns mw8">
            <div className="fl w-50-ns pa2">
              <div className="cf ph2-ns">
                  <div className="pv4">
                    <h1 className="gold">Hola</h1>
                    <p>I’m Bryan Orozco, a Software Developer based out of Los Angeles California. </p>
                  </div>
                  <InputField generateImage={generateImage} loading={loading}/>
              </div>
            </div>
            <div className="fl w-100 w-50-ns pa2">
            <div className='vw-100 vh-50'>
              <LiveBlob base64Data={base64Data} loading={loading}/>
              </div>
            </div>
          </div>
    </main>
  );
}
