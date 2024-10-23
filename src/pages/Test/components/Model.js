import React from "react";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";

export default function Model() {
  // 加载 MTL 文件
  const materials = useLoader(MTLLoader, "bom.mtl"); // 替换为实际的 MTL 文件路径
  materials.preload(); // 预加载材质

  // 加载 OBJ 文件
  const obj = useLoader(OBJLoader, "bom.obj", (loader) => {
    loader.setMaterials(materials); // 设置材质
  });

  return <primitive object={obj} scale={[0.5, 0.5, 0.5]} />;
}
