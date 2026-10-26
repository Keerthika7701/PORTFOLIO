import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { DroneModel, FinishTheme } from './DroneModel';
import { NeuralCoreModel } from './NeuralCoreModel';
import { createContactShadowTexture, createGroundGridTexture } from './proceduralAssets';

export type CameraPreset = 'hero' | 'avionics' | 'payload' | 'topdown' | 'wide';
export type ActiveModelMode = 'drone' | 'neural';

export interface HotspotItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  position: THREE.Vector3;
  cameraPos: THREE.Vector3;
  cameraLook: THREE.Vector3;
}

export class SceneManager {
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;
  private isSoftwareGl: boolean;
  private frameId: number = 0;
  private isDestroyed: boolean = false;

  // 3D procedural subjects
  public drone: DroneModel;
  public neuralCore: NeuralCoreModel;
  private activeMode: ActiveModelMode = 'drone';

  // State
  private flightSpeed: number = 1.0;
  private isFlightMode: boolean = true;
  private explodedFactor: number = 0;
  private targetExplodedFactor: number = 0;

  // Space particles
  private starfield!: THREE.Points;
  private horizonRing!: THREE.Group;

  // Interactive 3D Hotspot beacons
  private hotspotsGroup: THREE.Group = new THREE.Group();
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();
  public hotspotList: HotspotItem[] = [];
  public onHotspotClickCallback?: (hotspot: HotspotItem) => void;

  // Smooth camera transitions
  private targetCameraPos: THREE.Vector3 = new THREE.Vector3(3.2, 2.2, 4.0);
  private targetCameraLook: THREE.Vector3 = new THREE.Vector3(0, 0.65, 0);
  private currentCameraLook: THREE.Vector3 = new THREE.Vector3(0, 0.65, 0);
  private isTransitioningCamera: boolean = false;

  // Recruiter Guided Tour
  private isTourActive: boolean = false;
  private tourStepIndex: number = 0;
  private tourTimer: number = 0;
  public onTourStepChange?: (step: number, stepInfo: { title: string; desc: string }) => void;

  // Scratch vectors to prevent GC
  private clock = new THREE.Clock();

  constructor(container: HTMLElement) {
    this.container = container;

    // 1. Detect software WebGL from GPU info
    this.isSoftwareGl = (() => {
      try {
        const probeCanvas = document.createElement('canvas');
        const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    // 2. Setup Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: !this.isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false
    });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.setPixelRatio(
      this.isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2)
    );
    this.renderer.shadowMap.enabled = !this.isSoftwareGl;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    this.renderer.setSize(width, height);
    container.appendChild(this.renderer.domElement);

    // 3. Scene & Cosmic Horizon Fog
    this.scene = new THREE.Scene();
    const bgColor = new THREE.Color(0x060911);
    this.scene.background = bgColor;
    this.scene.fog = new THREE.FogExp2(0x060911, 0.035);

    // 4. Studio Environment Reflection via RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 5. Camera & Damped Controls
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 150);
    this.camera.position.copy(this.targetCameraPos);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = !this.isSoftwareGl;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.01;
    this.controls.minDistance = 1.0;
    this.controls.maxDistance = 18.0;
    this.controls.target.copy(this.targetCameraLook);
    this.controls.update();

    this.controls.addEventListener('start', () => {
      this.isTransitioningCamera = false;
      if (this.isTourActive) {
        this.stopTour();
      }
    });

    // 6. Balanced 3-Point Studio Lighting
    const keyLight = new THREE.DirectionalLight(0xfff6eb, 1.85);
    keyLight.position.set(6, 8, 6);
    if (!this.isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 2048;
      keyLight.shadow.mapSize.height = 2048;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 30;
      const d = 4.5;
      keyLight.shadow.camera.left = -d;
      keyLight.shadow.camera.right = d;
      keyLight.shadow.camera.top = d;
      keyLight.shadow.camera.bottom = -d;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    this.scene.add(keyLight);

    const hemiLight = new THREE.HemisphereLight(0xbddcff, 0x0c101d, 1.0);
    hemiLight.position.set(0, 10, 0);
    this.scene.add(hemiLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.3);
    rimLight.position.set(-6, 5, -5);
    this.scene.add(rimLight);

    // Deep cyan aerospace fill
    const accentFill = new THREE.PointLight(0x0284c7, 1.2, 15);
    accentFill.position.set(0, -1, 0);
    this.scene.add(accentFill);

    // 7. Ground Grid & Soft Radial Contact Shadow
    const gridTexture = createGroundGridTexture();
    gridTexture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
    const gridGeo = new THREE.PlaneGeometry(36, 36);
    const gridMat = new THREE.MeshStandardMaterial({
      color: 0x060911,
      roughness: 0.85,
      metalness: 0.2,
      map: gridTexture,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1
    });
    const groundMesh = new THREE.Mesh(gridGeo, gridMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.receiveShadow = true;
    this.scene.add(groundMesh);

    // Radial contact shadow directly beneath drone
    const shadowTexture = createContactShadowTexture();
    const shadowGeo = new THREE.PlaneGeometry(4.0, 4.0);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
      opacity: 0.65
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = 0.01;
    this.scene.add(shadowPlane);

    // 8. 3D Cosmic Space Elements (Starfield & Orbital Ring)
    this.buildSpaceEnvironment();

    // 9. Mount Procedural Drone & Neural Core
    this.drone = new DroneModel();
    this.scene.add(this.drone.group);

    this.neuralCore = new NeuralCoreModel();
    this.neuralCore.group.visible = false;
    this.scene.add(this.neuralCore.group);

    // 10. Interactive 3D Hotspot Beacons
    this.build3DHotspots();

    // 11. Pre-warm shaders
    if (!this.isSoftwareGl) {
      this.renderer.compile(this.scene, this.camera);
    }

    // 12. Animation Loop & Listeners
    this.startLoop();
    window.addEventListener('resize', this.onResize);
    this.renderer.domElement.addEventListener('pointerup', this.onPointerClick);
  }

  // Build Cosmic Space Starfield & Orbit Rings
  private buildSpaceEnvironment() {
    // 1500 procedural stars in deep space
    const starCount = 1400;
    const starGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    const colorPalette = [
      new THREE.Color(0xffffff),
      new THREE.Color(0x38bdf8), // cyan
      new THREE.Color(0x818cf8), // indigo
      new THREE.Color(0x34d399), // emerald
      new THREE.Color(0xfcd34d)  // amber
    ];

    for (let i = 0; i < starCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 25.0 + Math.random() * 45.0;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = Math.max(0.5, r * Math.sin(phi) * Math.sin(theta)); // Keep mainly above horizon
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true
    });

    this.starfield = new THREE.Points(starGeo, starMat);
    this.scene.add(this.starfield);

    // Horizon Telemetry Coordinates Ring
    this.horizonRing = new THREE.Group();
    const ringGeo = new THREE.RingGeometry(14, 14.1, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x1e293b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = 0.05;
    this.horizonRing.add(ringMesh);

    this.scene.add(this.horizonRing);
  }

  // Interactive 3D Space Hotspots
  private build3DHotspots() {
    this.hotspotList = [
      {
        id: 'hs-gps',
        title: 'SAEINDIA Autonomous Drone System',
        subtitle: 'GPS Waypoint Automation & Automated Payload Drop',
        category: 'Autonomous Systems',
        position: new THREE.Vector3(1.6, 1.2, 1.2),
        cameraPos: new THREE.Vector3(2.4, 1.5, 2.2),
        cameraLook: new THREE.Vector3(0, 0.7, 0)
      },
      {
        id: 'hs-cv',
        title: 'AI Optical Vision & Object Detection',
        subtitle: 'Real-time Camera Stream Classification & Bounding Boxes',
        category: 'Computer Vision',
        position: new THREE.Vector3(0.0, 0.9, 1.8),
        cameraPos: new THREE.Vector3(0.3, 1.2, 2.2),
        cameraLook: new THREE.Vector3(0, 0.7, 0.5)
      },
      {
        id: 'hs-payload',
        title: 'Underslung Delivery Payload Bay',
        subtitle: 'Automated Quick-Release Mechanism demonstrated in Coimbatore',
        category: 'Robotics Engineering',
        position: new THREE.Vector3(-1.4, 0.45, -0.6),
        cameraPos: new THREE.Vector3(-1.8, 0.6, -1.2),
        cameraLook: new THREE.Vector3(0, 0.4, 0)
      },
      {
        id: 'hs-genai',
        title: 'Data Mites & Code Alpha AI Suite',
        subtitle: 'NLP Translation, FAQ Chatbots & Deep Music Generation',
        category: 'AI & Data Science',
        position: new THREE.Vector3(0.0, 1.8, -1.4),
        cameraPos: new THREE.Vector3(1.5, 2.2, -2.4),
        cameraLook: new THREE.Vector3(0, 0.9, 0)
      }
    ];

    const beaconGeo = new THREE.OctahedronGeometry(0.1, 0);
    const beaconMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.9,
      roughness: 0.2,
      metalness: 0.8
    });

    const haloGeo = new THREE.TorusGeometry(0.18, 0.015, 8, 24);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.75
    });

    this.hotspotList.forEach((item) => {
      const nodeGroup = new THREE.Group();
      nodeGroup.position.copy(item.position);
      nodeGroup.userData = { hotspot: item };

      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.userData = { hotspot: item };
      nodeGroup.add(beacon);

      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.rotation.x = Math.PI / 2;
      halo.userData = { hotspot: item };
      nodeGroup.add(halo);

      this.hotspotsGroup.add(nodeGroup);
    });

    this.scene.add(this.hotspotsGroup);
  }

  // Pointer click handler for 3D hotspots
  private onPointerClick = (event: MouseEvent) => {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.hotspotsGroup.children, true);

    if (intersects.length > 0) {
      let curr: THREE.Object3D | null = intersects[0].object;
      while (curr && !curr.userData?.hotspot) {
        curr = curr.parent;
      }
      if (curr && curr.userData?.hotspot) {
        const hs = curr.userData.hotspot as HotspotItem;
        this.navigateToHotspot(hs);
        if (this.onHotspotClickCallback) {
          this.onHotspotClickCallback(hs);
        }
      }
    }
  };

  public navigateToHotspot(hs: HotspotItem) {
    this.targetCameraPos.copy(hs.cameraPos);
    this.targetCameraLook.copy(hs.cameraLook);
    this.isTransitioningCamera = true;
  }

  // Start Recruiter 60-Second Guided Tour
  public startRecruiterTour() {
    this.isTourActive = true;
    this.tourStepIndex = 0;
    this.tourTimer = 0;
    this.executeTourStep(0);
  }

  public stopTour() {
    this.isTourActive = false;
  }

  public isTouring(): boolean {
    return this.isTourActive;
  }

  public nextTourStep() {
    this.tourStepIndex = (this.tourStepIndex + 1) % 5;
    this.executeTourStep(this.tourStepIndex);
  }

  public prevTourStep() {
    this.tourStepIndex = (this.tourStepIndex - 1 + 5) % 5;
    this.executeTourStep(this.tourStepIndex);
  }

  private executeTourStep(step: number) {
    const tourData = [
      {
        title: 'Executive Profile Overview',
        desc: 'Sai Keerthika V • B.Tech AI & Data Science (CGPA: 7.52/10) • Seeking AI/ML Engineering & Data Analyst roles',
        camPos: new THREE.Vector3(3.4, 2.2, 4.2),
        lookAt: new THREE.Vector3(0, 0.65, 0),
        explode: 0,
        mode: 'drone' as ActiveModelMode
      },
      {
        title: 'Flagship: Autonomous GPS Drone',
        desc: 'Presented at SAEINDIA Challenge • 100% automated waypoint navigation and payload drop in Coimbatore',
        camPos: new THREE.Vector3(2.4, 1.4, 2.0),
        lookAt: new THREE.Vector3(0, 0.6, 0.2),
        explode: 0,
        mode: 'drone' as ActiveModelMode
      },
      {
        title: 'Computer Vision & Optical AI',
        desc: 'Real-time object detection and live stream inference developed during Code Alpha internship',
        camPos: new THREE.Vector3(0.2, 1.2, 2.0),
        lookAt: new THREE.Vector3(0, 0.7, 0.5),
        explode: 0.15,
        mode: 'drone' as ActiveModelMode
      },
      {
        title: 'Engineering Depth: Exploded Subsystems',
        desc: 'Modular carbon avionics, brushless motor pods, GPS antenna mast, and quick-release servo latch',
        camPos: new THREE.Vector3(3.2, 2.8, 3.5),
        lookAt: new THREE.Vector3(0, 0.65, 0),
        explode: 0.85,
        mode: 'drone' as ActiveModelMode
      },
      {
        title: 'AI Neural Core & 5 Internships',
        desc: 'Deep Learning, NLP, Generative AI, Cloud MLOps (Data Mites, Code Alpha, Code Binding, Next Logic, IOC)',
        camPos: new THREE.Vector3(2.6, 2.0, 3.0),
        lookAt: new THREE.Vector3(0, 1.6, 0),
        explode: 0.3,
        mode: 'neural' as ActiveModelMode
      }
    ];

    const current = tourData[step];
    this.setActiveModel(current.mode);
    this.setExplodedView(current.explode);
    this.targetCameraPos.copy(current.camPos);
    this.targetCameraLook.copy(current.lookAt);
    this.isTransitioningCamera = true;

    if (this.onTourStepChange) {
      this.onTourStepChange(step, { title: current.title, desc: current.desc });
    }
  }

  private onResize = () => {
    if (this.isDestroyed) return;
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  private startLoop() {
    const afterDraw = (cb: () => void) => {
      const gl = this.renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync?.(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush?.();
      const poll = () => {
        if (this.isDestroyed) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          this.frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          this.frameId = window.setTimeout(cb, 80);
        }
      };
      this.frameId = window.setTimeout(poll, 5);
    };

    const tick = () => {
      if (this.isDestroyed) return;

      const delta = Math.min(this.clock.getDelta(), 0.1);
      const elapsed = this.clock.getElapsedTime();

      // Slow cosmic rotation of starfield & horizon ring
      if (this.starfield) {
        this.starfield.rotation.y = elapsed * 0.015;
      }
      if (this.horizonRing) {
        this.horizonRing.rotation.z = -elapsed * 0.02;
      }

      // Hotspots gentle bobbing & rotation
      this.hotspotsGroup.children.forEach((child, idx) => {
        child.position.y += Math.sin(elapsed * 2.0 + idx) * 0.0015;
        child.rotation.y = elapsed * 0.8;
      });

      // Recruiter Tour automatic step timer (advance every 11 seconds)
      if (this.isTourActive) {
        this.tourTimer += delta;
        if (this.tourTimer > 11.0) {
          this.tourTimer = 0;
          this.nextTourStep();
        }
      }

      // Exponential damping on exploded factor
      if (Math.abs(this.explodedFactor - this.targetExplodedFactor) > 0.001) {
        this.explodedFactor += (this.targetExplodedFactor - this.explodedFactor) * (1 - Math.exp(-8.0 * delta));
        this.drone.setExplodedFactor(this.explodedFactor);
        this.neuralCore.setExplodedFactor(this.explodedFactor);
      }

      // Flight Hover & Propeller Animation
      if (this.activeMode === 'drone') {
        if (this.isFlightMode) {
          this.drone.updatePropellers(this.flightSpeed);
          const hoverOffset = Math.sin(elapsed * 2.5) * 0.035;
          this.drone.group.position.y = hoverOffset;
        } else {
          this.drone.group.position.y = 0;
        }
      } else {
        this.neuralCore.update(elapsed);
      }

      // Damped Camera Transition
      if (this.isTransitioningCamera) {
        const dampFactor = 1 - Math.exp(-6.0 * delta);
        this.camera.position.lerp(this.targetCameraPos, dampFactor);
        this.currentCameraLook.lerp(this.targetCameraLook, dampFactor);
        this.controls.target.copy(this.currentCameraLook);

        if (this.camera.position.distanceTo(this.targetCameraPos) < 0.03) {
          this.isTransitioningCamera = false;
        }
      }

      this.controls.update();
      this.renderer.render(this.scene, this.camera);

      if (this.isSoftwareGl) {
        afterDraw(tick);
      } else {
        this.frameId = requestAnimationFrame(tick);
      }
    };

    if (this.isSoftwareGl) {
      afterDraw(tick);
    } else {
      this.frameId = requestAnimationFrame(tick);
    }
  }

  // Camera Presets
  public setCameraPreset(preset: CameraPreset) {
    this.isTransitioningCamera = true;
    switch (preset) {
      case 'hero':
        this.targetCameraPos.set(3.2, 2.2, 4.0);
        this.targetCameraLook.set(0, 0.65, 0);
        break;
      case 'avionics':
        this.targetCameraPos.set(0.2, 1.4, 2.1);
        this.targetCameraLook.set(0, 0.75, 0.3);
        break;
      case 'payload':
        this.targetCameraPos.set(1.8, 0.4, 1.8);
        this.targetCameraLook.set(0, 0.4, 0);
        break;
      case 'topdown':
        this.targetCameraPos.set(0.01, 6.2, 0.01);
        this.targetCameraLook.set(0, 0.5, 0);
        break;
      case 'wide':
        this.targetCameraPos.set(5.5, 3.8, 6.0);
        this.targetCameraLook.set(0, 0.7, 0);
        break;
    }
  }

  public setExplodedView(factor: number) {
    this.targetExplodedFactor = THREE.MathUtils.clamp(factor, 0, 1);
  }

  public setFlightMode(active: boolean) {
    this.isFlightMode = active;
  }

  public setFinishTheme(theme: FinishTheme) {
    this.drone.applyTheme(theme);
  }

  public setActiveModel(mode: ActiveModelMode) {
    this.activeMode = mode;
    this.drone.group.visible = mode === 'drone';
    this.neuralCore.group.visible = mode === 'neural';
    this.hotspotsGroup.visible = mode === 'drone';
  }

  public dispose() {
    this.isDestroyed = true;
    window.removeEventListener('resize', this.onResize);
    this.renderer.domElement.removeEventListener('pointerup', this.onPointerClick);
    cancelAnimationFrame(this.frameId);
    clearTimeout(this.frameId);
    this.controls.dispose();
    this.renderer.dispose();
    if (this.renderer.domElement && this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
  }
}
