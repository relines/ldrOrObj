// import "./styles.css";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { DDSLoader } from "three-stdlib";
import { useState, useRef, Suspense } from "react";
import { Button } from "antd";

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

const Scene = () => {
  const materials = useLoader(MTLLoader, "Poimandres.mtl");
  const obj = useLoader(OBJLoader, "Poimandres.obj", (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  console.log(obj);
  return <primitive object={obj} scale={0.4} />;
};

export default function Normal() {
  const canvasRef = useRef(null);
  const [cameraPosition, setCameraPosition] = useState([0, 0, 5]);
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
      [0, 0, 5], // 正视图
      [0, 5, 0], // 俯视图
      [5, 0, 0], // 侧视图（右侧）
      [0, 0, -5], // 背视图
      [-5, 0, 0], // 侧视图（左侧）
    ];

    views.forEach((position, index) => {
      setTimeout(() => handleScreen(position), index * 400); // 每隔1秒导出一个视图
    });
  };

  return (
    <div
      className="App"
      style={{
        border: "1px solid #f00",
        width: "500px",
        height: "700px",
      }}
    >
      <Button onClick={exportViews}>截图</Button>

      <Canvas
        ref={canvasRef}
        width={1000}
        height={700}
        gl={{ preserveDrawingBuffer: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene />
          <CameraSetup />
          <OrbitControls />
          <Environment preset="sunset" background />
        </Suspense>
      </Canvas>
    </div>
  );
}
