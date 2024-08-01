"use client";
import React from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from "three";

export function Box(props) {

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;
  float plot(vec2 st) {    
    return smoothstep(0.02, 0.0, abs(st.y - st.x));
  }
  

  void main() {
    vec2 st = vUv.xy;
    float y = st.x;

    vec3 color = vec3(y);

    // Plot a line
    float pct = plot(st);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color,1.0);
    
  }
`;
const Box = () => {
  
  // Create the Box geometry
  const geometry = new THREE.BoxGeometry( 5, 5, 1 ); 

  // Create the shader material
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
  });

  return (
    <mesh geometry={geometry} material={material}>
    </mesh>
  );
};

  return (
    <div className="h5">
      <Canvas>
        <Box/>
      </Canvas>
    </div>
  )
}