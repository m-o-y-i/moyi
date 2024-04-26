import React, { useEffect, useRef } from "react";
import LayoutComponents from "@/components/layout";
import * as THREE from "three";

const Dashboard: React.FC<{}> = ({}) => {
  const mount: any = useRef(null);

  useEffect(() => {
    // 场景Scene、相机Camera、渲染器Renderer
    // 场景
    const scene = new THREE.Scene();
    // 相机  视场角度, Canvas画布宽高比, 近裁截面, 远裁截面
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // 渲染器
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth - 180, window.innerHeight);
    mount.current.appendChild(renderer.domElement);

    // 物体形状：几何体Geometry
    const geometry = new THREE.BoxGeometry(); // 长方体
    // 物体外观：材质Material
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // 物体： 网络模型 Mesh
    const mesh = new THREE.Mesh(geometry, material);

    // 模型位置
    // mesh.position.set(0,10,0);

    // 添加到场景
    scene.add(mesh);

    // 相机位置
    // camera.position.set(200, 200, 200);
    camera.position.z = 5;

    camera.lookAt(0, 0, 0);

    // const animate = () => {
    //   requestAnimationFrame(animate);

    //   mesh.rotation.x += 0.01;
    //   mesh.rotation.y += 0.01;

    // };
    renderer.render(scene, camera);

    // animate();

    return () => mount.current.removeChild(renderer.domElement);
  }, []);
  return (
    <LayoutComponents>
      <div ref={mount} />
    </LayoutComponents>
  );
};

export default Dashboard;
