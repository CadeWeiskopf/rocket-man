import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function Scene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [keysPressed, setKeysPressed] = useState<{
    [ArrowUp: string]: boolean;
    ArrowDown: boolean;
    ArrowLeft: boolean;
    ArrowRight: boolean;
    KeyW: boolean;
    KeyA: boolean;
    KeyS: boolean;
    KeyD: boolean;
  }>({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    KeyW: false,
    KeyA: false,
    KeyS: false,
    KeyD: false,
  });
  useEffect(() => {
    // create a new scene
    const scene = new THREE.Scene();

    // create a new camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.y = 0;
    camera.position.z = 5;

    // create a new renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);

    // create a directional light and add it to the scene
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 1, 1).normalize();
    scene.add(light);

    const mtlLoader = new MTLLoader();
    mtlLoader.load("rocket.mtl", (materials) => {
      materials.preload();
      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load("rocket.obj", (rocketObject) => {
        rocketObject.scale.x = 5;
        rocketObject.scale.y = 5;
        rocketObject.scale.z = 5;

        rocketObject.position.y = -2;

        rocketObject.name = "rocket";

        scene.add(rocketObject);
      });
    });

    // load the EXR environment map
    const gltfLoader = new GLTFLoader();
    gltfLoader.load("ge.glb", (gltf) => {
      scene.add(gltf.scene);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      const rocket = scene.getObjectByName("rocket");
      if (rocket) {
        if (keysPressed.ArrowUp) {
          rocket.rotateX(-0.01);
        }
        if (keysPressed.ArrowDown) {
          rocket.rotateX(0.01);
        }
        if (keysPressed.ArrowLeft) {
          rocket.rotateZ(0.01);
        }
        if (keysPressed.ArrowRight) {
          rocket.rotateZ(-0.01);
        }

        if (keysPressed.KeyW) {
          rocket.translateY(0.1);
        }
        if (keysPressed.KeyS) {
          rocket.translateY(-0.1);
        }
        if (keysPressed.KeyA) {
          //rocket.translateX(-0.1);
        }
        if (keysPressed.KeyD) {
          //rocket.translateX(0.1);
        }
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleKeyDown = (event: KeyboardEvent) => {
      console.log(event.code);
      keysPressed[event.code] = true;
      setKeysPressed(keysPressed);
    };
    window.addEventListener("keydown", handleKeyDown);

    const handleKeyUp = (event: KeyboardEvent) => {
      keysPressed[event.code] = false;
      setKeysPressed(keysPressed);
    };
    window.addEventListener("keyup", handleKeyUp);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <div ref={mountRef} />;
}
