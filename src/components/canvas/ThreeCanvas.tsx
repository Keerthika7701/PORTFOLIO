import React, { useEffect, useRef } from 'react';
import { SceneManager } from './SceneManager';

interface ThreeCanvasProps {
  onManagerReady?: (manager: SceneManager) => void;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ onManagerReady }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const managerRef = useRef<SceneManager | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Initialize SceneManager once
    const manager = new SceneManager(mountRef.current);
    managerRef.current = manager;

    if (onManagerReady) {
      onManagerReady(manager);
    }

    return () => {
      manager.dispose();
      managerRef.current = null;
    };
  }, [onManagerReady]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-auto"
      style={{ touchAction: 'none' }}
    />
  );
};
