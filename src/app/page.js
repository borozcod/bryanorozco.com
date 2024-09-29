"use client"
import { useState, useRef, useEffect } from 'react';
import { LiveBlob } from './components/Blob'
import InputField from './elements/InputField'
import { useLoader } from '@react-three/fiber';
import 'tachyons/css/tachyons.min.css';
import "./globals.css";
import { getDALLEImage } from './../openaiService.js'
import { gsap } from 'gsap';
import { catBlob } from './components/blobs/cat.js';


export default function Home() {

  const [base64Data, setBase64Data] = useState('');

  const blobRef = useRef(null);
  // useEffect(() => {
  //   if(blobRef.current){
  //     blobRef.current.uniforms.uTexture.value =  "data:image/png;base64," + catBlob;
  //   }
  // }, [blobRef.current]);

  const generateImage = async (prompt) => {
    try {

      blobRef['texture'] = catBlob;
      //const blob = await getDALLEImage(prompt);
      //setBase64Data(blob)
      
      gsap.to(blobRef.current.uniforms.uIntensity, {
        duration: 2,
        value: 1.0,
        ease: 'expo.inOut',
        onStart: () => {
          //blobRef.current.uniforms.uTexture.value = catBlob;
        },
        onUpdate: () => {
          console.log(blobRef.current.uniforms.uIntensity.value);
        },
      });

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
                    <p>{base64Data}</p>
                    <p>I’m Bryan Orozco, a Software Developer based out of Los Angeles California. </p>
                  </div>
                  <InputField generateImage={generateImage} />
              </div>
            </div>
            <div className="fl w-100 w-50-ns pa2">
              <div className='vw-100 vh-50'>
                <LiveBlob ref={blobRef} />
              </div>
            </div>
          </div>
    </main>
  );
}
