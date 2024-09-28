"use client";
import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useLoader, extend } from '@react-three/fiber';
import { OrbitControls, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { catBlob } from './blobs/cat.js';

// Cellular Noise function
const cnoise = `
#define GLSLIFY 1

    //
// GLSL textureless classic 2D noise "cnoise",
// with an RSL-style periodic variant "pnoise".
// Author:  Stefan Gustavson (stefan.gustavson@liu.se)
// Version: 2011-08-22
//
// Many thanks to Ian McEwan of Ashima Arts for the
// ideas for permutation and gradient selection.
//
// Copyright (c) 2011 Stefan Gustavson. All rights reserved.
// Distributed under the MIT license. See LICENSE file.
// https://github.com/ashima/webgl-noise
//

vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec2 fade(vec2 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

// Classic Perlin noise
float cnoise(vec2 P)
{
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod289(Pi); // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;

  vec4 i = permute(permute(ix) + iy);

  vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;
  vec4 gy = abs(gx) - 0.5 ;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;

  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);

  vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;

  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));

  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}
`

const BlobMaterial = shaderMaterial(
  { uTexture: null, uTime: 0, uHover: 0, uMouse: [0, 0], uLoad: true }, // Added uMouse uniform
  cnoise + `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uHover;
  uniform bool uLoad;
  uniform vec2 uMouse; // Mouse position in shader

  void main() {
    vUv = uv;
    vec3 pos = position;

    if(uLoad){
      pos.xy += cnoise(position.xy * sin(uTime)) * 0.5;
    } else {
      // pos.xy += cnoise(position.xy * sin(uTime)) * 0.1; 
    }

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
  `,
  cnoise +`
    uniform sampler2D uTexture;
    uniform float uTime;
    varying vec2 vUv;
    uniform vec2 uMouse;
    uniform bool uLoad;
    
    void main () {
      float dist = distance(vUv, uMouse);
      vec2 uv = vUv;
      float hoverSize = 0.10;

      vec4 color = texture2D(uTexture, uv);
      
      color.a = 0.0;
      
      // if dark pixel
      if (color.r < 0.3 && color.g < 0.3 && color.b < 0.3) {
        color = vec4(252.0 / 255.0, 163.0 / 255.0, 17.0 / 255.0, 1.0);
      }

      if(uLoad){
        color = vec4(252.0 / 255.0, 163.0 / 255.0, 17.0 / 255.0, 1.0);
      }

      gl_FragColor = color;
    }
`
);

extend({ BlobMaterial });
export function LiveBlob({ base64Data, loading }) {
  const AIImage = () => {
    const imageProjectionRef = useRef();

    const texture = useLoader(THREE.TextureLoader, "data:image/png;base64," + (base64Data ? base64Data : catBlob));

    useFrame(({ clock }) => {
      if (imageProjectionRef.current) {
        imageProjectionRef.current.uniforms.uTime.value = clock.getElapsedTime();
        imageProjectionRef.current.uniforms.uLoad.value = loading;
      }
    });

    const geometry = new THREE.CircleGeometry(1, 500);

    return (
      <>
        <mesh 
          position={[0, 0, 0]} 
          geometry={geometry}
        >
          <blobMaterial ref={imageProjectionRef} uTexture={texture} transparent={true} />
        </mesh>
      </>
    )
  }

  return (
    <>
      <Canvas camera={{ position: [0, 0, 2], fov: 75 }}>
        <ambientLight intensity={3} />
        <OrbitControls />
        <AIImage />
      </Canvas>
    </>
  )
}
