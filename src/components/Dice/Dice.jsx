"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { diceMap } from "../../utilities/dice";

export default function Dice3D({ sides = 6, rolling = false }) {
  const mountRef = useRef(null);
  const dieRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#111");

    // Camera
    const camera = new THREE.PerspectiveCamera(
      50,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.z = 3;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Geometry
    const typeKey = `d${sides}`;
    const geometryFactory = diceMap[typeKey] || diceMap.d20;
    const geometry = geometryFactory(1);

    // Material
    const material = new THREE.MeshStandardMaterial({
      color: "#ffffff",
      roughness: 0.4,
      metalness: 0.2,
      flatShading: true,
    });

    // Mesh
    const die = new THREE.Mesh(geometry, material);
    dieRef.current = die;
    scene.add(die);

    // Lights
    const light = new THREE.DirectionalLight(0xffffff, 1.2);
    light.position.set(3, 3, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x444444));

    // Animation loop
    const animate = () => {
      if (dieRef.current && rolling) {
        dieRef.current.rotation.x += 0.25;
        dieRef.current.rotation.y += 0.3;
      }
      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameRef.current);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [sides, rolling]);

  // Stop rotation if rolling stops
  useEffect(() => {
    const die = dieRef.current;
    if (!die) return;
    if (!rolling) {
      die.rotation.x = 0;
      die.rotation.y = 0;
    }
  }, [rolling]);

  return (
    <div
      ref={mountRef}
      style={{
        width: "80px",
        height: "80px",
      }}
    />
  );
}
