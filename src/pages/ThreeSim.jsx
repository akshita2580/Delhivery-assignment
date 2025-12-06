import React, { useEffect, useRef } from 'react';
import { useBots } from '../hooks/useBots';
import { Box, Bot } from 'lucide-react';
import * as THREE from "three";

/**
 * Three.js Bot Simulation Page
 * 3D visualization of bots moving on a grid floor
 */
export const ThreeSim = () => {
  const mountRef = useRef(null);
  const { bots } = useBots();
  const sceneRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    let scene, camera, renderer;
    const spheres = [];
    const sphereData = [];

    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f9ff);

    // Camera setup
    camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 15, 20);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    // Grid floor
    const gridHelper = new THREE.GridHelper(20, 20, 0x888888, 0xcccccc);
    scene.add(gridHelper);

    // Create floor plane
    const planeGeometry = new THREE.PlaneGeometry(20, 20);
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.8,
      metalness: 0.2,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = 0;
    scene.add(plane);

    // Create 10 bot spheres with random positions and movement
    const sphereGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    
    for (let i = 0; i < 10; i++) {
      const status = bots[i]?.status || 'idle';
      const color = getStatusColor(status);
      
      const sphereMaterial = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.5,
        metalness: 0.5,
      });
      
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      
      // Random starting position
      sphere.position.x = (Math.random() - 0.5) * 15;
      sphere.position.z = (Math.random() - 0.5) * 15;
      sphere.position.y = 0.3;
      
      // Random movement direction
      sphereData.push({
        vx: (Math.random() - 0.5) * 0.02,
        vz: (Math.random() - 0.5) * 0.02,
        status: status,
      });
      
      spheres.push(sphere);
      scene.add(sphere);
    }

    sceneRef.current = { scene, camera, renderer, spheres, sphereData };

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      if (spheres && sphereData) {
        spheres.forEach((sphere, index) => {
          const data = sphereData[index];
          
          // Update position
          sphere.position.x += data.vx;
          sphere.position.z += data.vz;

          // Bounce off boundaries
          if (Math.abs(sphere.position.x) > 9) {
            data.vx = -data.vx;
            sphere.position.x = Math.sign(sphere.position.x) * 9;
          }
          if (Math.abs(sphere.position.z) > 9) {
            data.vz = -data.vz;
            sphere.position.z = Math.sign(sphere.position.z) * 9;
          }

          // Update color based on bot status
          const currentStatus = bots[index]?.status || 'idle';
          if (currentStatus !== data.status) {
            data.status = currentStatus;
            sphere.material.color.setHex(getStatusColor(currentStatus));
          }

          // Subtle rotation
          sphere.rotation.y += 0.01;
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer && renderer.domElement) {
        if (mountRef.current.contains(renderer.domElement)) {
          mountRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
      }
    };
  }, [bots]);

  const getStatusColor = (status) => {
    const colors = {
      idle: 0x10b981,    // Green
      busy: 0x3b82f6,    // Blue
      charging: 0xf59e0b, // Yellow
      error: 0xef4444,   // Red
    };
    return colors[status] || 0x6b7280; // Gray default
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">3D Bot Simulation</h1>
        <p className="text-gray-600 mt-2">
          Real-time 3D visualization of bots moving on a grid floor
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="mb-4 flex items-center gap-2">
          <Box className="w-5 h-5 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-800">Interactive 3D View</h2>
        </div>

        <div
          ref={mountRef}
          className="w-full border-2 border-gray-300 rounded-lg bg-gray-50"
          style={{ height: '600px', position: 'relative' }}
        />

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Legend</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-sm">Idle</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <span className="text-sm">Busy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <span className="text-sm">Charging</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span className="text-sm">Error</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Bots move randomly on the grid. Colors update based on real-time bot status.
          </p>
        </div>
      </div>
    </div>
  );
};

