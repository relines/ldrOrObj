import React, { useRef, Suspense, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei"; // 可选，用于添加控制器
import Model from "./components/Model.js";

import { Button } from "antd";

function App() {
  const canvasRef = useRef(null);
  const [cameraPosition, setCameraPosition] = useState([0, 0, 500]);

  function CameraSetup() {
    const { camera } = useThree();
    camera.position.set(...cameraPosition); // 设置相机位置，调整 Z 值以获得合适的视角
    camera.lookAt(0, 0, 0); // 确保相机朝向模型中心
    return null;
  }

  const handleScreen = (cameraPosition) => {
    console.log("截图");

    setCameraPosition(cameraPosition);

    const canvas = canvasRef.current;
    setTimeout(() => {
      const dataURL = canvas.toDataURL("image/png"); // 获取 Data URI

      // 创建一个链接元素以下载图片
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "screenshot.png"; // 指定下载文件名
      link.click();
    }, 400);
  };

  const exportViews = () => {
    // 定义五个视图的相机位置
    const views = [
      [0, 0, 500], // 正视图
      [0, 500, 0], // 俯视图
      [500, 0, 0], // 侧视图（右侧）
      [0, 0, -500], // 背视图
      [-500, 0, 0], // 侧视图（左侧）
    ];

    views.forEach((position, index) => {
      setTimeout(() => handleScreen(position), index * 400); // 每隔1秒导出一个视图
    });
  };

  return (
    <div>
      <Button onClick={exportViews}>截图</Button>
      <Canvas
        ref={canvasRef}
        width={1000}
        height={700}
        gl={{ preserveDrawingBuffer: true, alpha: true }}
        // onCreated={({ gl }) => {
        //   gl.setClearColor(0x000000, 0); // 设置背景为透明
        // }}

        style={{ height: "70vh", backgroundColor: "#111a21" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight color="white" position={[10, 10, 5]} intensity={1} />
        <CameraSetup />
        <Suspense fallback={null}>
          <Model position={[0, 0, 0]} />
        </Suspense>
        <OrbitControls
          minDistance={1}
          maxDistance={1000}
          target={[100, 0, 5]}
        />
      </Canvas>
    </div>
  );
}

export default App;
