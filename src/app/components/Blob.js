"use client";
import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from "three";
import { useControls } from 'leva'
import { MeshDistortMaterial } from '@react-three/drei'

export function Blob(props) {

const Blob = () => {
  const meshRef = useRef();

  const geometry = new THREE.CircleGeometry( 1, 100 ); 
  const materialRef = new THREE.ShaderMaterial({
    uniforms: {
      u_time: { value: 0 }
    }
  });
  
  useFrame(({clock}) => {
      materialRef.uniforms.u_time.value = clock.getElapsedTime();
  });
  
  return (
      <mesh position={[0,0,0]} ref={meshRef} geometry={geometry} material={materialRef}>
          <MeshDistortMaterial transparent={true} opacity={0.5}  color={0xFCA311} distort={0.6} speed={0.5} />
      </mesh>
    );
  };

  return (
    <>
      <Canvas camera={{ position: [0, 0, 2], fov: 75 }}  >
        <ambientLight intensity={3} />
        <Blob />
      </Canvas>
    </>
  )
}