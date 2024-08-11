"use client";
import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from "three";
import { useControls } from 'leva'
import { MeshDistortMaterial } from '@react-three/drei'

export function Blob(props) {

  const { distort, speed, sphereRadius, sphereSegments } = useControls({ 
      distort: {
        value: 1,
        min: 0,
        max: 100,
        step: 0.1,
    },
      speed: {
        value: 1,
        min: 1,
        max: 100,
        step: 1,
    },
      sphereRadius: {
        value: 1,
        min: 1,
        max: 100,
        step: 1,
    },
      sphereSegments: {
        value: 40,
        min: 0,
        max: 100,
        step: 1,
    }
  })

const Blob = () => {
  const meshRef = useRef();

  const geometry = new THREE.SphereGeometry( sphereRadius, sphereSegments, sphereSegments ); 
  const materialRef = new THREE.ShaderMaterial({
    uniforms: {
      u_time: { value: 0 }
    },
    wireframe: false // For debugging, can be removed
  });

  
  useFrame(({clock}) => {
      materialRef.uniforms.u_time.value = clock.getElapsedTime();
  });
  
  return (
    <mesh ref={meshRef} geometry={geometry} material={materialRef}>
        <MeshDistortMaterial color={0xffb700} distort={distort} speed={speed} />
    </mesh>
  );
};

  return (
    <div className="h6" style={{height: "600px"}}>
      <Canvas>
        <ambientLight intensity={3} />
        <OrbitControls /> 
        <Blob/>
      </Canvas>
    </div>
  )
}