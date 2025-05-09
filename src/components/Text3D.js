import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Text3D, Center, useMatcapTexture } from '@react-three/drei';

function StaticText() {
  const [matcapTexture] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256);

  return (
    <Center>
      <mesh>
        <Text3D
          font="/fonts/helvetiker_bold.typeface.json"
          size={1.2}
          height={0.15}
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
    <div className="w-full h-[150px] xs:h-[180px] sm:h-[200px] md:h-[250px] lg:h-[300px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{
          background: 'transparent',
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.2} />
          <pointLight position={[10, 10, 10]} intensity={1.2} />
          <pointLight position={[-10, -10, -10]} intensity={0.6} />
          <StaticText />
        </Suspense>
      </Canvas>
    </div>
  );
}