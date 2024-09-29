"use client"
import { useState, useRef, useEffect } from 'react';
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
            onComplete: () => {cb()}
          });
        }
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
