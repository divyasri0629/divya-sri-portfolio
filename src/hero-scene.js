import * as THREE from 'three';

export function initHeroScene() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  // Respect prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    canvas.style.display = 'none';
    return;
  }

  const container = canvas.parentElement;
  
  // Scene setup
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x070b14, 0.015);

  // Camera setup
  const camera = new THREE.PerspectiveCamera(
    60,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.z = 25;

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: window.devicePixelRatio < 2 // Only antialias on low-density screens for performance
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);

  const blueLight = new THREE.PointLight(0x00f2fe, 2, 50);
  blueLight.position.set(-10, 10, 10);
  scene.add(blueLight);

  const pinkLight = new THREE.PointLight(0xf355da, 2, 50);
  pinkLight.position.set(10, -10, 10);
  scene.add(pinkLight);

  // Floating Geometries (representing nodes of code and stack elements)
  const geometries = [];
  const materials = [
    new THREE.MeshPhongMaterial({
      color: 0x00f2fe,
      shininess: 100,
      specular: 0xffffff,
      flatShading: true
    }),
    new THREE.MeshPhongMaterial({
      color: 0xf355da,
      shininess: 100,
      specular: 0xffffff,
      flatShading: true
    }),
    new THREE.MeshPhongMaterial({
      color: 0x7000ff,
      shininess: 100,
      specular: 0xffffff,
      flatShading: true
    })
  ];

  // Spawn some floating geometric nodes
  const shapes = [
    new THREE.IcosahedronGeometry(1.2, 0),
    new THREE.TorusGeometry(0.8, 0.25, 8, 16),
    new THREE.OctahedronGeometry(1, 0),
    new THREE.BoxGeometry(0.8, 0.8, 0.8)
  ];

  const floatingCount = 18;
  for (let i = 0; i < floatingCount; i++) {
    const geom = shapes[Math.floor(Math.random() * shapes.length)];
    const mat = materials[Math.floor(Math.random() * materials.length)];
    const mesh = new THREE.Mesh(geom, mat);

    // Random positioning in a box volume
    mesh.position.set(
      (Math.random() - 0.5) * 35,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 15 - 5
    );

    // Random rotation and velocity properties
    mesh.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      0
    );

    mesh.userData = {
      spinX: (Math.random() - 0.5) * 0.015,
      spinY: (Math.random() - 0.5) * 0.015,
      floatSpeed: 0.1 + Math.random() * 0.4,
      floatRange: 0.5 + Math.random() * 1.5,
      initialY: mesh.position.y
    };

    scene.add(mesh);
    geometries.push(mesh);
  }

  // Particle System (glowing starfield backdrop)
  const particleCount = 250;
  const particleGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const cyanColor = new THREE.Color(0x00f2fe);
  const pinkColor = new THREE.Color(0xf355da);

  for (let i = 0; i < particleCount; i++) {
    // Spatial positioning
    positions[i * 3] = (Math.random() - 0.5) * 60;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 40 - 10;

    // Color mixing
    const mixRatio = Math.random();
    const mixedColor = new THREE.Color().lerpColors(cyanColor, pinkColor, mixRatio);
    colors[i * 3] = mixedColor.r;
    colors[i * 3 + 1] = mixedColor.g;
    colors[i * 3 + 2] = mixedColor.b;
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Canvas circle texture for particles
  const pCanvas = document.createElement('canvas');
  pCanvas.width = 16;
  pCanvas.height = 16;
  const pCtx = pCanvas.getContext('2d');
  const grad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  pCtx.fillStyle = grad;
  pCtx.fillRect(0, 0, 16, 16);
  const pTexture = new THREE.CanvasTexture(pCanvas);

  const particleMaterial = new THREE.PointsMaterial({
    size: 0.35,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    map: pTexture,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const starField = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(starField);

  // Parallax properties
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

  window.addEventListener('mousemove', (e) => {
    // Map mouse position to -1 to 1 range
    mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // Track orientation for mobile tilt
  let hasGyro = false;
  window.addEventListener('deviceorientation', (e) => {
    if (e.beta !== null && e.gamma !== null) {
      hasGyro = true;
      // Convert tilt angles to -1 to 1
      mouse.targetX = (e.gamma / 45); // Clamp gamma tilt
      mouse.targetY = (e.beta / 45);
      
      // Clamp to range
      mouse.targetX = Math.max(-1, Math.min(1, mouse.targetX));
      mouse.targetY = Math.max(-1, Math.min(1, mouse.targetY));
    }
  });

  // Handle Resize
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  // Animation Loop
  const clock = new THREE.Clock();
  
  function animate() {
    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    // Smoothly interpolate mouse positions for parallax lag
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    // Shift camera slightly based on mouse parallax
    camera.position.x = mouse.x * 4;
    camera.position.y = mouse.y * 3;
    camera.lookAt(0, 0, 0);

    // Rotate starfield
    starField.rotation.y = time * 0.015;
    starField.rotation.x = mouse.y * 0.1;

    // Animate individual meshes
    geometries.forEach((mesh) => {
      // Rotate
      mesh.rotation.x += mesh.userData.spinX;
      mesh.rotation.y += mesh.userData.spinY;

      // Float up and down
      mesh.position.y = mesh.userData.initialY + Math.sin(time * mesh.userData.floatSpeed) * mesh.userData.floatRange;
      
      // Parallax shift on meshes themselves
      mesh.position.x += (mouse.targetX * 0.02);
    });

    renderer.render(scene, camera);
  }

  animate();

  // Expose color toggles if light/dark mode triggers
  window.addEventListener('theme-changed', (e) => {
    const isDark = e.detail.theme === 'dark';
    scene.fog.color.setHex(isDark ? 0x070b14 : 0xf8fafc);
    blueLight.intensity = isDark ? 2 : 0.8;
    pinkLight.intensity = isDark ? 2 : 0.8;
  });
}
