"use client";
import React, { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree, useLoader, extend } from '@react-three/fiber'
import { OrbitControls, shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useControls } from 'leva'
import { MeshDistortMaterial } from '@react-three/drei'
// import img from './cat.png'
// Custom material to detect dark pixels and store information
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
      color = vec4(252.0 / 255.0, 163.0 / 255.0, 17.0 / 255.0, 1.0); // Set to #FCA311
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

    // Calculate distance from mouse to fragment
    float dist = distance(vUv, uMouse);

    // Check if the color is black
    if (color.r < 0.3 && color.g < 0.3 && color.b < 0.3) {
      color = vec4(252.0 / 255.0, 163.0 / 255.0, 17.0 / 255.0, 1.0); // Set to #FCA311
    } else {
      color.a = 0.0; // Make non-black pixels fully transparent
    }

    gl_FragColor = color;
  }
  `
);

extend({ ImagePixelMaterial, BlobMaterial });

export function LiveBlob(props) {

  const Image = ({darkTexture, darkRenderTarget}) =>  {
    const imageProjectionRef = useRef();
    const blobRef = useRef();
    const imageRef = useRef();
    const { viewport } = useThree();

    const texture = useLoader(THREE.TextureLoader, "/turtle.png");
    const { gl } = useThree();
    const materialRef = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 }
      }
    });

    useFrame(({ clock }) => {
      
      if (imageProjectionRef.current) {
        imageProjectionRef.current.uniforms.uTime.value = clock.getElapsedTime();  
      }
      materialRef.uniforms.u_time.value = clock.getElapsedTime();

    });

    const geometry = new THREE.CircleGeometry( 1, 100 ); 
    const blobGeometry = new THREE.CircleGeometry( 1, 100 ); 

    return (
      <>
        {/* <mesh position={[0,0,0.5]} ref={blobRef} geometry={blobGeometry} material={materialRef}>
            <MeshDistortMaterial transparent={true} opacity={0.5} color={0xFCA311} distort={0.6} speed={0.5} />
        </mesh> */}
        <mesh position={[0,0,0.3]}>
          <planeGeometry attach="geometry" args={[3, 3]} />
          <imagePixelMaterial ref={imageRef} uTexture={texture} transparent={true} opacity={0.5} />
        </mesh>
        <mesh position={[0,0,0]} geometry={geometry} >
            <blobMaterial ref={imageProjectionRef} />
        </mesh>
      </>
    )
  }

  const size = 1024

  // Create a texture to store dark pixel information
  const darkTexture = useMemo(() => {
    const data = new Uint8Array(size * size * 4); // RGBA format
    return new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  }, [size]);

  // Create a render target for off-screen rendering
  const darkRenderTarget = useMemo(() => {
    return new THREE.WebGLRenderTarget(size, size, {
      format: THREE.RGBAFormat,
      type: THREE.UnsignedByteType,
    });
  }, [size]);
  
  return (
    <>
      <Canvas camera={{ position: [0, 0, 2], fov: 75 }}>
        <ambientLight intensity={3} />
        <OrbitControls />
        <Image darkTexture={darkTexture} darkRenderTarget={darkRenderTarget} />
        {/* <Blob darkTexture={darkRenderTarget.texture} /> */}
      </Canvas>
    </>
  )
}