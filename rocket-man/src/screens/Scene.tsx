import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useFrame } from "react-three-fiber";

const ROTATE_SPEED = 0.02;
const NEG_ROTATE_SPEED = -0.02;
const MOVE_SPEED = 0.2;
const NEG_MOVE_SPEED = -0.2;

export default function Scene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const particleSystemRef =
    useRef<THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>>();
  const particleGeometryRef = useRef<THREE.BufferGeometry>();
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

  const animateJets = () => {
    const particleCount = 1000;
    const particlePositions = new Float32Array(particleCount * 3);
    const pyramidHeight = 2.0;
    const pyramidBaseSize = 2.0;
    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const x =
        pyramidBaseSize * (1 - Math.sqrt(u)) * Math.cos(2 * Math.PI * v);
      const y = pyramidHeight * (1 - u);
      const z =
        pyramidBaseSize * (1 - Math.sqrt(u)) * Math.sin(2 * Math.PI * v);
      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;
    }
    particleGeometryRef.current?.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
  };

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
    const objLoader = new OBJLoader();

    mtlLoader.load("rocket.mtl", (rocketMat) => {
      rocketMat.preload();
      objLoader.setMaterials(rocketMat);
      objLoader.load("rocket.obj", (rocketObject) => {
        rocketObject.scale.x = 5;
        rocketObject.scale.y = 5;
        rocketObject.scale.z = 5;

        rocketObject.rotateX(-45);

        rocketObject.position.y = -2;

        const rocketParent = new THREE.Object3D();
        rocketParent.name = "rocket";
        rocketParent.add(camera);
        rocketParent.add(rocketObject);

        const particleGeometry = new THREE.BufferGeometry();
        particleGeometryRef.current = particleGeometry;
        const particleMaterial = new THREE.PointsMaterial({
          color: "white",
          size: 0.1,
          transparent: true,
          opacity: 0.5,
        });
        const particleSystem = new THREE.Points(
          particleGeometry,
          particleMaterial
        );
        rocketParent.add(particleSystem);
        particleSystem.rotateX(46);
        particleSystem.translateY(1.3);
        particleSystem.translateZ(1);
        particleSystemRef.current = particleSystem;

        scene.add(rocketParent);
        /*mtlLoader.load("donut.mtl", (donutMat) => {
          donutMat.preload();
          objLoader.setMaterials(donutMat);
          objLoader.load("donut.obj", (donutObj) => {
            scene.add(donutObj);
          });
        });*/
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
          rocket.rotateX(NEG_ROTATE_SPEED);
        }
        if (keysPressed.ArrowDown) {
          rocket.rotateX(ROTATE_SPEED);
        }
        if (keysPressed.ArrowLeft) {
          rocket.rotateZ(ROTATE_SPEED);
        }
        if (keysPressed.ArrowRight) {
          rocket.rotateZ(NEG_ROTATE_SPEED);
        }

        if (keysPressed.KeyW) {
          rocket.translateZ(NEG_MOVE_SPEED);
          animateJets();
        } else {
          particleGeometryRef.current?.setAttribute(
            "position",
            new THREE.BufferAttribute(new Float32Array(0), 3)
          );
        }
        if (keysPressed.KeyS) {
          rocket.translateZ(MOVE_SPEED);
          //animateJets();
        }
        /*if (keysPressed.KeyA) {
          //rocket.translateX(-0.1);
        }
        if (keysPressed.KeyD) {
          //rocket.translateX(0.1);
        }*/
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
