"use client"
import { useState } from 'react';
import { LiveBlob } from './components/Blob'
import InputField from './elements/InputField'
import 'tachyons/css/tachyons.min.css';
import "./globals.css";
import {getDALLEImage} from './../openaiService.js'
import { catBlob } from './components/blobs/cat'
export default function Home() {
  const [base64Data, setBase64Data] = useState('');

  const generateImage = async (prompt) => {
    try {
      // Call getDALLEImage to fetch the base64 image
      const base64Image = await getDALLEImage(prompt);
      // console.log(base64Image)
      setBase64Data(base64Image); // Set the base64 data to be passed to LiveBlob
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <main>
        <div className="mw9 center ph3-ns relative z-1">
          <div className="cf ph2-ns">
            <div className="w-100 w-20-ns pa2">
              <div className="pv4">
                <h1 className="gold">Hola</h1>
                <p>I’m Bryan Orozco, a Software Developer based out of Los Angeles California. </p>
              </div>
            </div>
          </div>
          <InputField generateImage={generateImage} />
        </div>
        <div className="aspect-ratio--object z-0">
            <LiveBlob base64Data={base64Data}/>
        </div>
    </main>
  );
}
