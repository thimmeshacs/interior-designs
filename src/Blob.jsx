// src/components/Blob.jsx
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createNoise3D } from "simplex-noise"; // Correct named import

export default function InteriorBlob({ position = [0, 0, 0], scale = 1 }) {
  const mesh = useRef();
  const time = useRef(0);
  const noise3D = useRef(createNoise3D()); // Initialize simplex noise generator

  useFrame(({ clock }) => {
    time.current = clock.getElapsedTime();

    // Access the geometry and its attributes
    const geometry = mesh.current.geometry;
    const positionAttribute = geometry.attributes.position;

    // Update vertex positions using noise and time-based animation
    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);
      const z = positionAttribute.getZ(i);

      const noiseValue =
        noise3D.current(
          x * 0.5 + time.current * 0.1,
          y * 0.5 + time.current * 0.2,
          z * 0.5
        ) * 0.2;

      // Apply noise to vertex positions
      positionAttribute.setXYZ(
        i,
        x + noiseValue,
        y + noiseValue,
        z + noiseValue
      );
    }

    // Mark the position attribute as needing an update
    positionAttribute.needsUpdate = true;

    // Update the uniform for the shader
    mesh.current.material.uniforms.uTime.value = time.current;
  });

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      {/* Geometry */}
      <sphereGeometry args={[1, 64, 64]} />

      {/* Material with Shader */}
      <shaderMaterial
        vertexShader={`
          uniform float uTime;
          varying vec2 vUv;

          void main() {
            vUv = uv;
            vec3 pos = position;

            // Smooth breathing effect
            float pulse = sin(uTime * 0.5) * 0.1 + 0.9;

            pos *= pulse;

            gl_Position = projectionMatrix 
                        * modelViewMatrix 
                        * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          varying vec2 vUv;

          // Random generator for dithering
          float rand(vec2 co){
            return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
          }

          void main() {
            // Soft gradient with pastel tones
            vec3 colorA = vec3(0.92, 0.89, 0.85); // Soft beige
            vec3 colorB = vec3(0.82, 0.86, 0.89); // Pale blue
            vec3 colorC = vec3(0.96, 0.94, 0.92); // Off-white

            float gradient = smoothstep(0.3, 0.7, vUv.y);
            vec3 color = mix(colorA, colorB, gradient);
            color = mix(color, colorC, 0.2);

            // Subtle dithering
            color += (rand(vUv + fract(uTime)) - 0.5) * 0.03;

            gl_FragColor = vec4(color, 0.8);
          }
        `}
        uniforms={{
          uTime: { value: 0 }, // Time uniform for animations
        }}
        transparent
        depthTest={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
