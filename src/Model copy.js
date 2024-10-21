import React from "react";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { LDrawLoader } from "three/examples/jsm/loaders/LDrawLoader";

export default function Model(props) {
  const obj = useLoader(OBJLoader, "/bom.obj");
  //   const obj = useLoader(LDrawLoader, "/m3.ldr");

  return <primitive object={obj} {...props} />;
}
