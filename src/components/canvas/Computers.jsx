import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./porsche/scene.glb");
  return (
    <mesh>
      <hemisphereLight intensity={10.15} groundColor="#fff" />
      <pointLight intensity={100} />
      <spotLight
        position={[-50, 50, 10]}
        angle={1.92}
        penumbra={1.45}
        intensity={20}
        castShadow
        shadow-mapSize={1024}
      />

      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 1.99}
        position={isMobile ? [0, -3, -2.2] : [0.9, -2.9, -1.1]}
        rotation={[-0.01, -0.2, 0.0]}
      />
    </mesh>
  );
};

const ComputerCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("max-width:500px");

    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);

      mediaQuery.addEventListener("change", handleMediaQueryChange);

      return () => {
        mediaQuery.removeEventListener("change", handleMediaQueryChange);
      };
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 7], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputerCanvas;
