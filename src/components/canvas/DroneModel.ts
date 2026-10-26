import * as THREE from 'three';
import { createCarbonFiberTexture, createAvionicsDecalTexture } from './proceduralAssets';

export type FinishTheme = 'carbon' | 'titanium' | 'cyberpunk' | 'arctic';

export interface DroneParts {
  rootGroup: THREE.Group;
  chassis: THREE.Mesh;
  topAvionicsCover: THREE.Mesh;
  heatsinkPlate: THREE.Group;
  arms: THREE.Group;
  motorPods: THREE.Group;
  propellers: THREE.Mesh[];
  gpsMast: THREE.Group;
  cameraGimbal: THREE.Group;
  payloadPod: THREE.Group;
  landingSkids: THREE.Group;
  navLights: THREE.Mesh[];
}

export class DroneModel {
  public group: THREE.Group;
  public parts: DroneParts;
  public propellerMeshes: THREE.Mesh[] = [];
  private carbonTexture: THREE.CanvasTexture;
  private decalTexture: THREE.CanvasTexture;
  private currentTheme: FinishTheme = 'carbon';

  // Base positions for exploded view interpolation
  private initialPartPositions = {
    topCoverY: 0.32,
    gpsMastY: 0.35,
    payloadY: -0.28,
    gimbalZ: 0.85,
    landingSkidY: -0.65,
    armOffsetScale: 1.0,
    propellerLiftY: 0.18
  };

  constructor() {
    this.group = new THREE.Group();
    this.carbonTexture = createCarbonFiberTexture();
    this.decalTexture = createAvionicsDecalTexture();

    this.parts = this.buildDrone();
    this.applyTheme('carbon');
  }

  private buildDrone(): DroneParts {
    const root = new THREE.Group();

    // 1. Central Aerodynamic Chassis (Hexagonal fuselage with bevel)
    const chassisShape = new THREE.Shape();
    const hexRadius = 0.65;
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3 + Math.PI / 6;
      const x = Math.cos(angle) * hexRadius;
      const y = Math.sin(angle) * hexRadius * 1.25; // slightly elongated for forward direction
      if (i === 0) chassisShape.moveTo(x, y);
      else chassisShape.lineTo(x, y);
    }
    chassisShape.closePath();

    const extrudeSettings = {
      depth: 0.3,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.06,
      bevelThickness: 0.06
    };

    const chassisGeo = new THREE.ExtrudeGeometry(chassisShape, extrudeSettings);
    chassisGeo.center();
    // Rotate to lie horizontally
    chassisGeo.rotateX(Math.PI / 2);

    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x1a1e28,
      roughness: 0.4,
      metalness: 0.7,
      bumpMap: this.carbonTexture,
      bumpScale: 0.02
    });
    const chassis = new THREE.Mesh(chassisGeo, chassisMat);
    chassis.position.y = 0.1;
    chassis.castShadow = true;
    chassis.receiveShadow = true;
    root.add(chassis);

    // 2. Top Avionics Cover & Decal Plaque
    const topCoverGeo = new THREE.CylinderGeometry(0.42, 0.48, 0.08, 6);
    const topCoverMat = new THREE.MeshStandardMaterial({
      color: 0x222838,
      roughness: 0.25,
      metalness: 0.85,
      map: this.decalTexture
    });
    const topAvionicsCover = new THREE.Mesh(topCoverGeo, topCoverMat);
    topAvionicsCover.position.y = this.initialPartPositions.topCoverY;
    topAvionicsCover.castShadow = true;
    root.add(topAvionicsCover);

    // Heatsink fins & AI Core module
    const heatsinkPlate = new THREE.Group();
    const finGeo = new THREE.BoxGeometry(0.35, 0.05, 0.02);
    const finMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.95,
      roughness: 0.15
    });
    for (let i = -3; i <= 3; i++) {
      const fin = new THREE.Mesh(finGeo, finMat);
      fin.position.set(0, 0.04, i * 0.05);
      heatsinkPlate.add(fin);
    }
    topAvionicsCover.add(heatsinkPlate);

    // 3. 4 Tubular Carbon Arms
    const arms = new THREE.Group();
    const armRadius = 0.045;
    const armLength = 1.6;
    const armGeo = new THREE.CylinderGeometry(armRadius, armRadius, armLength, 16);
    armGeo.rotateZ(Math.PI / 2);

    const armMat = new THREE.MeshStandardMaterial({
      color: 0x14161f,
      roughness: 0.6,
      metalness: 0.4,
      bumpMap: this.carbonTexture,
      bumpScale: 0.04
    });

    // Cross layout at 45 and 135 degrees
    const arm1 = new THREE.Mesh(armGeo, armMat);
    arm1.rotation.y = Math.PI / 4;
    arm1.position.y = 0.1;
    arm1.castShadow = true;
    arms.add(arm1);

    const arm2 = new THREE.Mesh(armGeo, armMat);
    arm2.rotation.y = -Math.PI / 4;
    arm2.position.y = 0.1;
    arm2.castShadow = true;
    arms.add(arm2);

    root.add(arms);

    // 4. 4 Precision Brushless Motor Mount Pods
    const motorPods = new THREE.Group();
    const armEnds = [
      new THREE.Vector3(Math.cos(Math.PI / 4) * (armLength / 2), 0.1, Math.sin(Math.PI / 4) * (armLength / 2)),
      new THREE.Vector3(Math.cos((3 * Math.PI) / 4) * (armLength / 2), 0.1, Math.sin((3 * Math.PI) / 4) * (armLength / 2)),
      new THREE.Vector3(Math.cos((5 * Math.PI) / 4) * (armLength / 2), 0.1, Math.sin((5 * Math.PI) / 4) * (armLength / 2)),
      new THREE.Vector3(Math.cos((7 * Math.PI) / 4) * (armLength / 2), 0.1, Math.sin((7 * Math.PI) / 4) * (armLength / 2))
    ];

    const motorGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.16, 20);
    const motorCapGeo = new THREE.CylinderGeometry(0.09, 0.12, 0.06, 20);
    const motorMat = new THREE.MeshStandardMaterial({
      color: 0x2d3446,
      metalness: 0.9,
      roughness: 0.2
    });
    const motorAccentMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.8,
      roughness: 0.3
    });

    const propellers: THREE.Mesh[] = [];
    const navLights: THREE.Mesh[] = [];

    // Propeller aerofoil blade geometry
    const propBladeShape = new THREE.Shape();
    propBladeShape.moveTo(-0.04, -0.6);
    propBladeShape.quadraticCurveTo(-0.06, -0.3, -0.05, 0);
    propBladeShape.quadraticCurveTo(-0.07, 0.3, -0.04, 0.6);
    propBladeShape.quadraticCurveTo(0, 0.68, 0.04, 0.6);
    propBladeShape.quadraticCurveTo(0.06, 0.3, 0.05, 0);
    propBladeShape.quadraticCurveTo(0.06, -0.3, 0.04, -0.6);
    propBladeShape.quadraticCurveTo(0, -0.68, -0.04, -0.6);

    const propGeo = new THREE.ExtrudeGeometry(propBladeShape, {
      depth: 0.015,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.005,
      bevelThickness: 0.005
    });
    propGeo.center();
    propGeo.rotateX(Math.PI / 2);

    // Center spinner cap
    const propHubGeo = new THREE.ConeGeometry(0.045, 0.07, 16);
    propHubGeo.rotateX(-Math.PI / 2);

    const propMat = new THREE.MeshStandardMaterial({
      color: 0x182030,
      roughness: 0.2,
      metalness: 0.6
    });

    armEnds.forEach((pos, idx) => {
      const podGroup = new THREE.Group();
      podGroup.position.copy(pos);

      // Motor body
      const motorBody = new THREE.Mesh(motorGeo, motorMat);
      motorBody.castShadow = true;
      podGroup.add(motorBody);

      const motorCap = new THREE.Mesh(motorCapGeo, motorAccentMat);
      motorCap.position.y = 0.1;
      podGroup.add(motorCap);

      // Propeller
      const propGroup = new THREE.Mesh(propGeo, propMat);
      propGroup.position.y = 0.18;
      propGroup.castShadow = true;

      const hub = new THREE.Mesh(propHubGeo, motorAccentMat);
      hub.position.y = 0.02;
      propGroup.add(hub);

      podGroup.add(propGroup);
      propellers.push(propGroup);

      // Nav Light LED at arm tip
      const isFront = pos.z < 0;
      const isRight = pos.x > 0;
      let ledColor = 0xffffff;
      if (isFront && !isRight) ledColor = 0xef4444; // Port: Red
      else if (isFront && isRight) ledColor = 0x10b981; // Starboard: Green
      else ledColor = 0x38bdf8; // Aft: Cyan beacon

      const ledGeo = new THREE.SphereGeometry(0.04, 12, 12);
      const ledMat = new THREE.MeshStandardMaterial({
        color: ledColor,
        emissive: ledColor,
        emissiveIntensity: 0.9,
        roughness: 0.1
      });
      const led = new THREE.Mesh(ledGeo, ledMat);
      led.position.set(0, -0.08, 0);
      podGroup.add(led);
      navLights.push(led);

      motorPods.add(podGroup);
    });

    root.add(motorPods);
    this.propellerMeshes = propellers;

    // 5. GPS Navigation Mast & Satellite Antenna (Crucial for SAEINDIA autonomous Lat/Lon navigation!)
    const gpsMast = new THREE.Group();
    const mastRodGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.45, 12);
    const mastRodMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.9,
      roughness: 0.2
    });
    const mastRod = new THREE.Mesh(mastRodGeo, mastRodMat);
    mastRod.position.y = 0.22;
    gpsMast.add(mastRod);

    // GNSS puck dome
    const gpsDomeGeo = new THREE.CylinderGeometry(0.12, 0.13, 0.04, 24);
    const gpsDomeMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.3,
      metalness: 0.7
    });
    const gpsDome = new THREE.Mesh(gpsDomeGeo, gpsDomeMat);
    gpsDome.position.y = 0.45;
    gpsMast.add(gpsDome);

    // Top GNSS indicator
    const gpsLedGeo = new THREE.SphereGeometry(0.02, 10, 10);
    const gpsLedMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      emissive: 0x22c55e,
      emissiveIntensity: 0.8
    });
    const gpsLed = new THREE.Mesh(gpsLedGeo, gpsLedMat);
    gpsLed.position.y = 0.48;
    gpsMast.add(gpsLed);

    gpsMast.position.set(0, this.initialPartPositions.gpsMastY, -0.2);
    root.add(gpsMast);

    // 6. Front AI Gimbal Camera & Optical Vision System
    const cameraGimbal = new THREE.Group();
    const gimbalArmGeo = new THREE.TorusGeometry(0.12, 0.018, 12, 24, Math.PI);
    const gimbalMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.85,
      roughness: 0.25
    });
    const gimbalArm = new THREE.Mesh(gimbalArmGeo, gimbalMat);
    gimbalArm.rotation.x = Math.PI / 2;
    cameraGimbal.add(gimbalArm);

    // Camera body pod
    const camPodGeo = new THREE.SphereGeometry(0.1, 20, 20);
    const camPodMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.9,
      roughness: 0.2
    });
    const camPod = new THREE.Mesh(camPodGeo, camPodMat);
    cameraGimbal.add(camPod);

    // Glass optic aperture
    const lensGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.04, 24);
    lensGeo.rotateX(Math.PI / 2);
    const lensMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.9,
      ior: 1.5,
      thickness: 0.1
    });
    const lens = new THREE.Mesh(lensGeo, lensMat);
    lens.position.z = 0.09;
    cameraGimbal.add(lens);

    cameraGimbal.position.set(0, 0.02, this.initialPartPositions.gimbalZ);
    root.add(cameraGimbal);

    // 7. Underslung Autonomous Payload Delivery Pod (SAEINDIA delivery box!)
    const payloadPod = new THREE.Group();
    const boxGeo = new THREE.BoxGeometry(0.55, 0.35, 0.65);
    const boxMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.5,
      roughness: 0.35,
      map: this.decalTexture
    });
    const payloadBox = new THREE.Mesh(boxGeo, boxMat);
    payloadBox.castShadow = true;
    payloadBox.receiveShadow = true;
    payloadPod.add(payloadBox);

    // Quick release servo brackets
    const bracketGeo = new THREE.BoxGeometry(0.1, 0.08, 0.7);
    const bracketMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.8,
      roughness: 0.3
    });
    const bracketLeft = new THREE.Mesh(bracketGeo, bracketMat);
    bracketLeft.position.set(-0.25, 0.18, 0);
    payloadPod.add(bracketLeft);

    const bracketRight = new THREE.Mesh(bracketGeo, bracketMat);
    bracketRight.position.set(0.25, 0.18, 0);
    payloadPod.add(bracketRight);

    payloadPod.position.set(0, this.initialPartPositions.payloadY, 0);
    root.add(payloadPod);

    // 8. Twin Aerodynamic Landing Skids (Flush ground pivot!)
    const landingSkids = new THREE.Group();
    const skidCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.15, -0.9),
      new THREE.Vector3(0, 0.0, -0.7),
      new THREE.Vector3(0, 0.0, 0.7),
      new THREE.Vector3(0, 0.15, 0.9)
    ]);
    const skidGeo = new THREE.TubeGeometry(skidCurve, 32, 0.03, 12, false);
    const skidMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.4,
      metalness: 0.7
    });

    const skidLeft = new THREE.Mesh(skidGeo, skidMat);
    skidLeft.position.x = -0.55;
    skidLeft.castShadow = true;
    landingSkids.add(skidLeft);

    const skidRight = new THREE.Mesh(skidGeo, skidMat);
    skidRight.position.x = 0.55;
    skidRight.castShadow = true;
    landingSkids.add(skidRight);

    // 4 Shock absorbing vertical struts
    const strutGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.55, 12);
    const strutMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.8,
      roughness: 0.3
    });

    const strut1 = new THREE.Mesh(strutGeo, strutMat);
    strut1.position.set(-0.55, 0.28, -0.4);
    strut1.rotation.z = -0.2;
    landingSkids.add(strut1);

    const strut2 = new THREE.Mesh(strutGeo, strutMat);
    strut2.position.set(-0.55, 0.28, 0.4);
    strut2.rotation.z = -0.2;
    landingSkids.add(strut2);

    const strut3 = new THREE.Mesh(strutGeo, strutMat);
    strut3.position.set(0.55, 0.28, -0.4);
    strut3.rotation.z = 0.2;
    landingSkids.add(strut3);

    const strut4 = new THREE.Mesh(strutGeo, strutMat);
    strut4.position.set(0.55, 0.28, 0.4);
    strut4.rotation.z = 0.2;
    landingSkids.add(strut4);

    landingSkids.position.y = this.initialPartPositions.landingSkidY;
    root.add(landingSkids);

    // Elevate root so bottom of landing skids sits exactly at Y = 0 (grounded)
    root.position.y = 0.65;
    this.group.add(root);

    return {
      rootGroup: root,
      chassis,
      topAvionicsCover,
      heatsinkPlate,
      arms,
      motorPods,
      propellers,
      gpsMast,
      cameraGimbal,
      payloadPod,
      landingSkids,
      navLights
    };
  }

  // Exploded View Slider Handler (Smooth disassembly of parts)
  public setExplodedFactor(factor: number) {
    const f = THREE.MathUtils.clamp(factor, 0, 1);

    // Propellers lift high
    this.propellerMeshes.forEach((prop) => {
      prop.position.y = 0.18 + f * 0.9;
    });

    // Top avionics hatch opens upward
    this.parts.topAvionicsCover.position.y = this.initialPartPositions.topCoverY + f * 0.75;

    // GPS mast elevates
    this.parts.gpsMast.position.y = this.initialPartPositions.gpsMastY + f * 0.85;

    // Front AI vision camera slides forward
    this.parts.cameraGimbal.position.z = this.initialPartPositions.gimbalZ + f * 0.6;

    // Underslung delivery payload lowers down
    this.parts.payloadPod.position.y = this.initialPartPositions.payloadY - f * 0.7;

    // Landing skids extend downward
    this.parts.landingSkids.position.y = this.initialPartPositions.landingSkidY - f * 0.4;

    // Arms and motor pods expand slightly outward
    this.parts.arms.scale.set(1 + f * 0.25, 1, 1 + f * 0.25);
    this.parts.motorPods.scale.set(1 + f * 0.25, 1, 1 + f * 0.25);
  }

  // Rotate propellers during flight loop
  public updatePropellers(speedMultiplier: number = 1.0) {
    const delta = 0.4 * speedMultiplier;
    this.propellerMeshes.forEach((prop, idx) => {
      // Counter-rotate alternate pairs
      const dir = idx % 2 === 0 ? 1 : -1;
      prop.rotation.y += delta * dir;
    });
  }

  // Theme presets
  public applyTheme(theme: FinishTheme) {
    this.currentTheme = theme;

    let bodyColor = 0x1a1e28;
    let accentColor = 0x38bdf8;
    let metalness = 0.7;
    let roughness = 0.4;

    if (theme === 'carbon') {
      bodyColor = 0x111622;
      accentColor = 0x38bdf8; // Cyber Cyan
      metalness = 0.75;
      roughness = 0.35;
    } else if (theme === 'titanium') {
      bodyColor = 0x8a929e;
      accentColor = 0xf59e0b; // Aviation Gold/Amber
      metalness = 0.95;
      roughness = 0.2;
    } else if (theme === 'cyberpunk') {
      bodyColor = 0x170b24;
      accentColor = 0xf43f5e; // Neon Rose
      metalness = 0.85;
      roughness = 0.25;
    } else if (theme === 'arctic') {
      bodyColor = 0xe2e8f0;
      accentColor = 0x0284c7; // Electric Blue
      metalness = 0.5;
      roughness = 0.2;
    }

    if (this.parts.chassis.material instanceof THREE.MeshStandardMaterial) {
      this.parts.chassis.material.color.setHex(bodyColor);
      this.parts.chassis.material.metalness = metalness;
      this.parts.chassis.material.roughness = roughness;
    }

    this.parts.heatsinkPlate.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.material.color.setHex(accentColor);
      }
    });
  }
}
