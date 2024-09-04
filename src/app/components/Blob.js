"use client";
import React, { useRef } from 'react'
import { Canvas, useFrame, useLoader, extend } from '@react-three/fiber'
import { OrbitControls, shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { MeshDistortMaterial } from '@react-three/drei'

const ImagePixelMaterial = shaderMaterial(
  {  uTexture: null },
  `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
  `,
  `
  uniform sampler2D uTexture;
  varying vec2 vUv;

  void main() {
    vec4 color = texture2D(uTexture, vUv);

    if (color.r < 0.1 && color.g < 0.1 && color.b < 0.1) {
      color = vec4(252.0 / 255.0, 163.0 / 255.0, 17.0 / 255.0, 1.0);
      color.a = 0.0; // hide image
    } else {
      color.a = 0.0; // Make non-black pixels fully transparent
    }

    gl_FragColor = color;
  }
  `
);

const BlobMaterial = shaderMaterial(
  { uTime: 200},
  `
  varying vec2 vUv;
  uniform float uTime;

  void main() {
    vUv = uv;
    vec3 pos = position;
    pos.z += sin(pos.x * 10.0 + uTime) * 0.1; // Adjust amplitude and frequency as needed
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
  `,
  `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;

  varying vec2 vUv;

  void main() {
    vec4 color = texture2D(uTexture, vUv);

    if (color.r < 0.3 && color.g < 0.3 && color.b < 0.3) {
      color = vec4(252.0 / 255.0, 163.0 / 255.0, 17.0 / 255.0, 1.0); // Set to #FCA311
    } else {
     vec4(122.0 / 255.0, 113.0 / 255.0, 17.0 / 255.0, 1.0);
      color.a = 0.0; // Make non-black pixels fully transparent
    }

    gl_FragColor = color;
  }
  `
);

extend({ ImagePixelMaterial, BlobMaterial });

export function LiveBlob(props) {
  const Image = () =>  {
    const imageProjectionRef = useRef();
    const blobRef = useRef();
    const imageRef = useRef();

    const texture = useLoader(THREE.TextureLoader, "/coffee.png");

    const blobMaterial = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 }
      }
    });

    useFrame(({ clock }) => {
      
      if (imageProjectionRef.current) {
        imageProjectionRef.current.uniforms.uTime.value = clock.getElapsedTime();  
      }
      blobMaterial.uniforms.u_time.value = clock.getElapsedTime();
    });

    const handleClick = () => {
      if (blobRef.current) {
        gsap.to(blobRef.current.material, {
            opacity: 0,
            duration: 0.5,
            ease: "power1.out"
        });
    }
    }

    const geometry = new THREE.CircleGeometry( 1, 100 ); 
    const blobGeometry = new THREE.CircleGeometry( 1, 100 ); 

    return (
      <>
        <mesh onClick={handleClick} position={[0,0,0.5]} ref={blobRef} geometry={blobGeometry} material={blobMaterial}>
            <MeshDistortMaterial transparent={true} opacity={1.0} color={0xFCA311} distort={0.6} speed={0.5} />
        </mesh>
        <mesh position={[0,0,0.3]}>
          <planeGeometry attach="geometry" args={[3, 3]} />
          <imagePixelMaterial ref={imageRef} uTexture={texture} transparent={true}  />
        </mesh>
        <mesh position={[0,0,0]} geometry={geometry} >
            <blobMaterial ref={imageProjectionRef} transparent={true} />
        </mesh>
      </>
    )
  }

  return (
    <>
      <Canvas camera={{ position: [0, 0, 2], fov: 75 }}>
        <ambientLight intensity={3} />
        <OrbitControls />
        <Image />
      </Canvas>
    </>
  )
}