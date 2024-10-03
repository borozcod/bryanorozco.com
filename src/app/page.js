"use client"
import {  useRef } from 'react';
import { LiveBlob } from './components/Blob'
import InputField from './elements/InputField'
import 'tachyons/css/tachyons.min.css';
import "./globals.css";
import { getDALLEImage } from './../openaiService.js'
import { gsap } from 'gsap';
import * as THREE from 'three';

export default function Home() {
  
  const blobRef = useRef(null);
  const generateImage = async (prompt, cb) => {
    try {
      gsap.to(blobRef.current.uniforms.uIntensity, {
        duration: 2,
        value: 1.0,
        ease: 'expo.inOut',
        onComplete: async () => {
          const aiImage = await getDALLEImage(prompt);
          const texture = new THREE.TextureLoader().load("data:image/png;base64," + aiImage)
          texture.needsUpdate = true

          gsap.to(blobRef.current.uniforms.uIntensity, {
            duration: 2,
            value: 0.0,
            ease: 'expo.inOut',
            onStart: () => {
              blobRef.current.uniforms.uTexture.value =  texture;
            },
            onComplete: () => {
              if(cb){
                cb()
              }
            }
          });
        }
      });
      
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <main>
          <div className="ma3">
            <div className="relative z-1">
              <div>
                  <div className="mb2">
                    <h1 className="gold">Hola</h1>
                    <p>I’m Bryan Orozco, a Software Developer based out of Los Angeles California.</p>
                  </div>
              </div>
                  <i className="fa-solid fa-bolt"></i><InputField generateImage={generateImage} />
            </div>
            <div className="absolute-ns absolute--fill vh-75 h-100-ns w-100-ns z-0">
                <LiveBlob ref={blobRef} />
            </div>
          </div>
    </main>
  );
}
