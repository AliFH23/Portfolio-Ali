import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 90;          // number of points
const LINK_DIST = 1.7;     // max distance to connect two points
const MOUSE_DIST = 2.4;    // radius where the mouse connects to points
const BOUNDS = { x: 7.5, y: 4.2, z: 1.5 };

// Mouse effects only on devices with a real mouse (not touch screens)
const hasMouse =
  typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

// Small soft circle used as the shape of each point
function makeDotTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.45, "rgba(255,255,255,0.9)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

function Network({ reduceMotion }) {
  const groupRef = useRef();
  const pointsRef = useRef();
  const linesRef = useRef();
  const { viewport } = useThree();

  const data = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() * 2 - 1) * BOUNDS.x;
      positions[i * 3 + 1] = (Math.random() * 2 - 1) * BOUNDS.y;
      positions[i * 3 + 2] = (Math.random() * 2 - 1) * BOUNDS.z;
      velocities[i * 3] = (Math.random() - 0.5) * 0.006;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.006;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }

    // Enough room for every possible link plus mouse links
    const maxSegments = (COUNT * (COUNT - 1)) / 2 + COUNT;
    return {
      positions,
      velocities,
      linePositions: new Float32Array(maxSegments * 6),
      lineColors: new Float32Array(maxSegments * 6),
    };
  }, []);

  const colorA = useMemo(() => new THREE.Color("#2DD4BF"), []);
  const colorB = useMemo(() => new THREE.Color("#818CF8"), []);
  const tmp = useMemo(() => new THREE.Color(), []);
  const mouse = useMemo(() => new THREE.Vector3(), []);
  const dotTexture = useMemo(() => makeDotTexture(), []);

  useFrame((state, delta) => {
    const { positions, velocities, linePositions, lineColors } = data;
    const step = reduceMotion ? 0 : Math.min(delta * 60, 2);

    // Mouse position in world units (far away on touch screens)
    if (hasMouse) {
      mouse.set(
        (state.pointer.x * viewport.width) / 2,
        (state.pointer.y * viewport.height) / 2,
        0
      );
    } else {
      mouse.set(999, 999, 0);
    }

    // Move points, bounce at the edges, pull gently toward the mouse
    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3;
      positions[ix] += velocities[ix] * step;
      positions[ix + 1] += velocities[ix + 1] * step;
      positions[ix + 2] += velocities[ix + 2] * step;

      if (Math.abs(positions[ix]) > BOUNDS.x) velocities[ix] *= -1;
      if (Math.abs(positions[ix + 1]) > BOUNDS.y) velocities[ix + 1] *= -1;
      if (Math.abs(positions[ix + 2]) > BOUNDS.z) velocities[ix + 2] *= -1;

      const dx = mouse.x - positions[ix];
      const dy = mouse.y - positions[ix + 1];
      const d = Math.hypot(dx, dy);
      if (d < MOUSE_DIST && d > 0.2) {
        positions[ix] += dx * 0.003 * step;
        positions[ix + 1] += dy * 0.003 * step;
      }
    }

    // Build the links between nearby points
    let v = 0;
    const pushLine = (ax, ay, az, bx, by, bz, strength, mix) => {
      tmp.copy(colorA).lerp(colorB, mix).multiplyScalar(strength);
      linePositions[v] = ax; linePositions[v + 1] = ay; linePositions[v + 2] = az;
      linePositions[v + 3] = bx; linePositions[v + 4] = by; linePositions[v + 5] = bz;
      lineColors[v] = tmp.r; lineColors[v + 1] = tmp.g; lineColors[v + 2] = tmp.b;
      lineColors[v + 3] = tmp.r; lineColors[v + 4] = tmp.g; lineColors[v + 5] = tmp.b;
      v += 6;
    };

    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3;
      for (let j = i + 1; j < COUNT; j++) {
        const jx = j * 3;
        const dist = Math.hypot(
          positions[ix] - positions[jx],
          positions[ix + 1] - positions[jx + 1],
          positions[ix + 2] - positions[jx + 2]
        );
        if (dist < LINK_DIST) {
          const strength = (1 - dist / LINK_DIST) * 0.55;
          const mix = (positions[ix] / BOUNDS.x + 1) / 2;
          pushLine(
            positions[ix], positions[ix + 1], positions[ix + 2],
            positions[jx], positions[jx + 1], positions[jx + 2],
            strength, mix
          );
        }
      }

      // Brighter links from the mouse to nearby points
      const md = Math.hypot(mouse.x - positions[ix], mouse.y - positions[ix + 1]);
      if (md < MOUSE_DIST) {
        pushLine(
          mouse.x, mouse.y, 0,
          positions[ix], positions[ix + 1], positions[ix + 2],
          (1 - md / MOUSE_DIST) * 0.9, 0
        );
      }
    }

    const lineGeo = linesRef.current.geometry;
    lineGeo.setDrawRange(0, v / 3);
    lineGeo.attributes.position.needsUpdate = true;
    lineGeo.attributes.color.needsUpdate = true;
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Slight tilt that follows the mouse
    const g = groupRef.current;
    const px = hasMouse ? state.pointer.x : 0;
    const py = hasMouse ? state.pointer.y : 0;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, px * 0.12, 0.04);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -py * 0.08, 0.04);
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={dotTexture}
          color="#2DD4BF"
          size={0.09}
          sizeAttenuation
          transparent
          alphaTest={0.01}
          depthWrite={false}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[data.linePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[data.lineColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

function NetworkBackground({ reduceMotion = false }) {
  return (
    <Canvas
      className="network-canvas"
      camera={{ position: [0, 0, 6], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      eventSource={document.getElementById("root")}
      eventPrefix="client"
    >
      <Network reduceMotion={reduceMotion} />
    </Canvas>
  );
}

export default NetworkBackground;