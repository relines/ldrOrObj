import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { LDrawLoader } from "three/examples/jsm/loaders/LDrawLoader";

function LDrawModel() {
  const groupRef = useRef();

  useEffect(() => {
    const loader = new LDrawLoader();
    // 设置零件库路径（根据您的文件结构进行调整）
    loader.setPartsLibraryPath("/parts/");

    // 加载 .ldr 文件
    loader.load(
      "m3.ldr",
      (group) => {
        groupRef.current.add(group);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.error("An error happened", error);
      }
    );
  }, []);

  return <group ref={groupRef} />;
}

export default function App() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.5} />
      <LDrawModel />
    </Canvas>
  );
}
