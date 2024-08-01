"use client";
import React from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from "three";

export function Blob(props) {

const vertexShader = `
    uniform float u_time;
    uniform float u_off;
    varying vec2 vUv;
    varying float vDisplacement;

    void main() {
      vUv = uv;
      vec3 pos = position;
      float noise = sin(pos.x * 10.0 + u_time) * 0.5 + 0.5;
      pos.z += noise * 2.0;
      vDisplacement = noise;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
`;

const fragmentShader = `
  uniform float u_time;
    varying vec2 vUv;
    varying float vDisplacement;

    void main() {
      vec3 color = vec3(0.0, 0.0, 1.0);
      color = mix(color, vec3(1.0, 0.0, 0.0), vDisplacement);
      gl_FragColor = vec4(color, 1.0);
    }
`;
const Blob = () => {
  
  // Create the Box geometry
  const geometry = new THREE.SphereGeometry(1, 64, 64);
  // Create the shader material
//   const material = new THREE.ShaderMaterial({
//     vertexShader,
//     fragmentShader,
//   });

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      u_time: { value: 0.5 }
    },
    wireframe: true // For debugging, can be removed
  });

  return (
    <mesh geometry={geometry} material={material}>
    </mesh>
  );
};

  return (
    <div className="h5">
      <Canvas>
        <Blob/>
      </Canvas>
    </div>
  )
}