import * as THREE from "three";

export function createD4Geometry(size = 1) {
  return new THREE.TetrahedronGeometry(size);
}

export function createD6Geometry(size = 1) {
  return new THREE.BoxGeometry(size, size, size);
}

export function createD8Geometry(size = 1) {
  return new THREE.OctahedronGeometry(size);
}

export function createD10Geometry(size = 1) {
  const h = size;
  const r = size * 0.9;

  // Vertices
  const vertices = [];
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    vertices.push([Math.cos(angle) * r, h, Math.sin(angle) * r]);
  }
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2 + Math.PI / 5;
    vertices.push([Math.cos(angle) * r, -h, Math.sin(angle) * r]);
  }

  // Faces as triples of indices
  const faces = [];
  for (let i = 0; i < 5; i++) {
    const a = i;
    const b = (i + 1) % 5;
    const c = i + 5;
    const d = ((i + 1) % 5) + 5;

    faces.push([a, b, c]);
    faces.push([b, d, c]);
  }

  // Flatten vertices for BufferGeometry
  const positions = [];
  faces.forEach(([a, b, c]) => {
    positions.push(...vertices[a], ...vertices[b], ...vertices[c]);
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );

  // Compute normals for lighting
  geometry.computeVertexNormals();

  return geometry;
}


export function createD20Geometry(size = 1) {
  return new THREE.IcosahedronGeometry(size, 0);
}


export const diceMap = {
  d4: createD4Geometry,
  d6: createD6Geometry,
  d8: createD8Geometry,
  d10: createD10Geometry,
  d20: createD20Geometry,
};
