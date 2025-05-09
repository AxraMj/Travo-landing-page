import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, useMatcapTexture } from '@react-three/drei';

function AnimatedText() {
  const textRef = useRef();
  const [matcapTexture] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(time / 2) * 0.2;
      textRef.current.rotation.x = Math.cos(time / 3) * 0.1;
    }
  });

  return (
    <Center>
      <mesh ref={textRef}>
        <Text3D
          font="/fonts/helvetiker_bold.typeface.json"
          size={1.5}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          TRAVO
          <meshMatcapMaterial matcap={matcapTexture} />
        </Text3D>
      </mesh>
    </Center>
  );
}

export default function Text3DWrapper() {
  return (
    <div className="w-full h-[200px] md:h-[300px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{
          background: 'transparent',
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <AnimatedText />
        </Suspense>
      </Canvas>
    </div>
  );
}