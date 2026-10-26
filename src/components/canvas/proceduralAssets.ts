import * as THREE from 'three';

// Procedural texture generator for Carbon Fiber weave
export function createCarbonFiberTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#161922';
    ctx.fillRect(0, 0, size, size);

    const step = 8;
    for (let x = 0; x < size; x += step) {
      for (let y = 0; y < size; y += step) {
        const isAlternate = ((x / step) % 2 === 0) !== ((y / step) % 2 === 0);
        ctx.fillStyle = isAlternate ? '#1f2430' : '#11131a';
        ctx.fillRect(x, y, step, step);

        // Fine thread lines
        ctx.strokeStyle = isAlternate ? '#293040' : '#141720';
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 0.5, y + 0.5, step - 1, step - 1);
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(6, 6);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Procedural texture for Avionics & Engineering Markings
export function createAvionicsDecalTexture(): THREE.CanvasTexture {
  const width = 512;
  const height = 256;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#1a1f2c';
    ctx.fillRect(0, 0, width, height);

    // Subtle grid lines
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // High-tech typography decals
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 22px monospace';
    ctx.fillText('SAEINDIA AUTONOMOUS NAV', 24, 46);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px monospace';
    ctx.fillText('MISSION: GPS WAYPOINT DELIVERY', 24, 76);
    ctx.fillText('AVIONICS: KEERTHIKA AI CORE v2.4', 24, 100);
    ctx.fillText('LAT: 11.0168° N | LON: 76.9558° E', 24, 124);

    // Hazard stripes for payload bay
    ctx.fillStyle = '#f59e0b';
    for (let i = 0; i < 8; i++) {
      ctx.beginPath();
      ctx.moveTo(24 + i * 28, 160);
      ctx.lineTo(38 + i * 28, 160);
      ctx.lineTo(24 + i * 28, 185);
      ctx.lineTo(10 + i * 28, 185);
      ctx.closePath();
      ctx.fill();
    }

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 13px monospace';
    ctx.fillText('PAYLOAD RELEASE PROTOCOL ACTIVE', 24, 215);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Radial Contact Shadow Texture
export function createContactShadowTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const center = size / 2;
    const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.75)');
    gradient.addColorStop(0.35, 'rgba(0, 0, 0, 0.45)');
    gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.15)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// Ground Nav Grid Texture
export function createGroundGridTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#080b12';
    ctx.fillRect(0, 0, size, size);

    // Large grid
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
    ctx.lineWidth = 1;
    const step = 32;
    for (let i = 0; i <= size; i += step) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, size);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(size, i);
      ctx.stroke();
    }

    // Radar concentric rings
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.18)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, 120, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(size / 2, size / 2, 220, 0, Math.PI * 2);
    ctx.stroke();

    // Crosshairs
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.beginPath();
    ctx.moveTo(size / 2 - 25, size / 2);
    ctx.lineTo(size / 2 + 25, size / 2);
    ctx.moveTo(size / 2, size / 2 - 25);
    ctx.lineTo(size / 2, size / 2 + 25);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
