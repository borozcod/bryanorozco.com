"use client";
import React, { useRef, forwardRef, useEffect } from 'react';
import { Canvas, useFrame, useLoader, extend } from '@react-three/fiber';
import { OrbitControls, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { noise } from './shaders/noise.js';

const BlobMaterial = shaderMaterial(
  { uTexture: null, uTime: 0, uHover: 0, uMouse: [0, 0], uLoad: true, uIntensity: 0.3 },
  noise + `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uHover;
  uniform bool uLoad;
  uniform vec2 uMouse; // Mouse position in shader
  varying float vDisplacement;
  uniform float uIntensity;

  void main() {
    vUv = uv;
    vec3 newPosition = position;
    //if(uLoad) {
      vDisplacement = cnoise(position + vec3(2.0 * uTime));
      newPosition = position + normal * (uIntensity * vDisplacement);
    //}
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
  `,
  noise +`
    uniform sampler2D uTexture;
    uniform float uTime;
    varying vec2 vUv;
    uniform vec2 uMouse;
    uniform bool uLoad;
    uniform float uIntensity;
    
    void main () {
      float dist = distance(vUv, uMouse);
      vec2 uv = vUv;
      float hoverSize = 0.10;

      vec4 color = texture2D(uTexture, uv);
      
      color.a = 0.0;
      
      // if dark pixel
      if (color.r < 0.3 && color.g < 0.3 && color.b < 0.3) {
        color = vec4(252.0 / 255.0, 163.0 / 255.0, 17.0 / 255.0, 1.0);
      } else {
       color = vec4(252.0 / 255.0, 163.0 / 255.0, 17.0 / 255.0, uIntensity);
      }

      gl_FragColor = color;
    }
`
);

extend({ BlobMaterial });
export const LiveBlob = forwardRef((props, ref) => {
  const AIImage = () => {

    const geometry = new THREE.CircleGeometry(1, 500);
 
    useFrame(({ clock }) => {
      if (ref.current) {
        ref.current.uniforms.uTime.value = clock.getElapsedTime();
      }
    });

    return (
      <>
        <mesh position={[0, 0, 0]} geometry={geometry} >
          <blobMaterial ref={ref} transparent />
        </mesh>
      </>
    );
  };

  return (
    <>
      <Canvas camera={{ position: [0, 0, 2], fov: 75 }}>
        <ambientLight intensity={3} />
        <AIImage />
        <OrbitControls />
      </Canvas>
    </>
  );
});