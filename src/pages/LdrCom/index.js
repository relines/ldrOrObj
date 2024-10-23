import React, { Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei"; // 可选，用于添加控制器
import Model from "./components/Model.js";

function CameraSetup() {
  const { camera } = useThree();
  camera.position.set(0, 0, 1000); // 设置相机位置，调整 Z 值以获得合适的视角
  camera.lookAt(0, 0, 0); // 确保相机朝向模型中心
  return null;
}

function App() {
  return (
    <Canvas
      gl={{ alpha: true }}
      // onCreated={({ gl }) => {
      //   gl.setClearColor(0x000000, 0); // 设置背景为透明
      // }}

      style={{ height: "100vh", backgroundColor: "#111a21" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <CameraSetup />
      <Suspense fallback={null}>
        <Model position={[0, 0, 0]} />
      </Suspense>
      <OrbitControls minDistance={1} maxDistance={1000} target={[100, 0, 5]} />
    </Canvas>
  );
}

export default App;
