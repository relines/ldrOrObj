import React from "react";
import { useLoader } from "@react-three/fiber";
import { LDrawLoader } from "three/examples/jsm/loaders/LDrawLoader.js";

export default function Model() {
  // 加载 MTL 文件

  // 加载 OBJ 文件
  const obj = useLoader(LDrawLoader, "m3.ldr", (loader) => {
    // loader.setMaterials(materials); // 设置材质
  });

  return <primitive object={obj} scale={[0.5, 0.5, 0.5]} />;
}
