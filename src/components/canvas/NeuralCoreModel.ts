import * as THREE from 'three';

export class NeuralCoreModel {
  public group: THREE.Group;
  private innerCore: THREE.Mesh;
  private wireframeCore: THREE.Mesh;
  private ringX: THREE.Group;
  private ringY: THREE.Group;
  private ringZ: THREE.Group;
  private nodesGroup: THREE.Group;
  private particleNodes: THREE.Mesh[] = [];

  constructor() {
    this.group = new THREE.Group();

    // 1. Central Geodesic AI Core
    const coreGeo = new THREE.IcosahedronGeometry(0.7, 2);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      roughness: 0.1,
      metalness: 0.9,
      transmission: 0.4,
      ior: 1.6,
      thickness: 0.5
    });
    this.innerCore = new THREE.Mesh(coreGeo, coreMat);
    this.group.add(this.innerCore);

    // Wireframe overlay
    const wireGeo = new THREE.IcosahedronGeometry(0.75, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    this.wireframeCore = new THREE.Mesh(wireGeo, wireMat);
    this.group.add(this.wireframeCore);

    // 2. Lathed Gimbal Data Rings (Primary Silhouette accents)
    const createRing = (radius: number, tubeRadius: number, color: number) => {
      const ringGroup = new THREE.Group();
      const ringGeo = new THREE.TorusGeometry(radius, tubeRadius, 16, 64);
      const ringMat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.25,
        metalness: 0.9
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.castShadow = true;
      ringGroup.add(ringMesh);

      // Add accent ticks around ring
      const tickGeo = new THREE.BoxGeometry(0.04, 0.08, 0.02);
      const tickMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI * 2) / 12;
        const tick = new THREE.Mesh(tickGeo, tickMat);
        tick.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
        tick.rotation.z = angle;
        ringGroup.add(tick);
      }

      return ringGroup;
    };

    this.ringX = createRing(1.15, 0.025, 0x1e293b);
    this.ringY = createRing(1.4, 0.028, 0x334155);
    this.ringZ = createRing(1.65, 0.03, 0x0f172a);

    this.ringY.rotation.x = Math.PI / 3;
    this.ringZ.rotation.y = Math.PI / 4;

    this.group.add(this.ringX);
    this.group.add(this.ringY);
    this.group.add(this.ringZ);

    // 3. Floating Neural Synapse Nodes
    this.nodesGroup = new THREE.Group();
    const nodeGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const nodeColors = [0x38bdf8, 0x818cf8, 0x34d399, 0xf43f5e];

    for (let i = 0; i < 24; i++) {
      const col = nodeColors[i % nodeColors.length];
      const nodeMat = new THREE.MeshStandardMaterial({
        color: col,
        emissive: col,
        emissiveIntensity: 0.7,
        roughness: 0.3
      });
      const node = new THREE.Mesh(nodeGeo, nodeMat);

      const phi = Math.acos(-1 + (2 * i) / 24);
      const theta = Math.sqrt(24 * Math.PI) * phi;
      const r = 1.9 + (i % 3) * 0.2;

      node.position.set(
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi)
      );

      this.nodesGroup.add(node);
      this.particleNodes.push(node);
    }

    this.group.add(this.nodesGroup);

    // Ground pivot positioning
    this.group.position.y = 1.6;
  }

  public update(time: number) {
    this.innerCore.rotation.y = time * 0.4;
    this.wireframeCore.rotation.x = -time * 0.3;
    this.wireframeCore.rotation.z = time * 0.2;

    this.ringX.rotation.z = time * 0.5;
    this.ringY.rotation.x = time * 0.35;
    this.ringZ.rotation.y = time * 0.25;

    this.nodesGroup.rotation.y = time * 0.15;
  }

  public setExplodedFactor(factor: number) {
    const f = THREE.MathUtils.clamp(factor, 0, 1);
    this.ringX.scale.set(1 + f * 0.35, 1 + f * 0.35, 1 + f * 0.35);
    this.ringY.scale.set(1 + f * 0.55, 1 + f * 0.55, 1 + f * 0.55);
    this.ringZ.scale.set(1 + f * 0.75, 1 + f * 0.75, 1 + f * 0.75);
    this.nodesGroup.scale.set(1 + f * 0.6, 1 + f * 0.6, 1 + f * 0.6);
  }
}
