import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, Environment } from '@react-three/drei';

const techStacks = [
  'Java', 'JavaScript', 'React', 'Next.js', 'Typescript', 'Tailwind CSS', 
  'Python', 'C++', 'Node.js', 'MERN Stack', 'HTML5', 'CSS 3', 
  'Bootstrap', 'PHP', 'MySQL', 'SQLite', 'Android', 'Git/Github'
];

function FloatingTech({ text, position }) {
  const mesh = useRef();
  
  // Custom rotation for each element
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.15;
      mesh.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5} position={position}>
      <Text
        ref={mesh}
        fontSize={0.8 + Math.random() * 0.4} // Varied font sizes
        color="#4f46e5" // Indigo primary looking
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.015}
        outlineColor="#ffffff"
        fillOpacity={0.8}
      >
        {text}
      </Text>
    </Float>
  );
}

function Scene() {
  // Generate random clustered positions for the tech text
  const positions = useMemo(() => {
    return techStacks.map(() => [
      (Math.random() - 0.5) * 25, // spread X
      (Math.random() - 0.5) * 15, // spread Y
      (Math.random() - 0.5) * 15 - 5 // spread Z
    ]);
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <Environment preset="city" />
      {techStacks.map((tech, index) => (
        <FloatingTech key={tech} text={tech} position={positions[index]} />
      ))}
    </>
  );
}

export default function TechStackBackground() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-none opacity-40 dark:opacity-20 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <Scene />
      </Canvas>
    </div>
  );
}
