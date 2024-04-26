import * as THREE from 'https://unpkg.com/three@0.148.0/build/three.module.js'

let planet
let pole
const planetPosition = new THREE.Vector3(0, 0, 0) // Adjust the x, y, z coordinates to position the planet
const planetRotationAxis = new THREE.Vector3(-1, 0.8, 1).normalize() // Adjust the rotation axis to tilt the planet
const planetRotationSpeed = -0.001 // Adjust the rotation speed

export function createPlanet(scene) {
  const planetGeometry = new THREE.SphereGeometry(1, 32, 32)
  const planetMaterial = new THREE.MeshBasicMaterial({ vertexColors: true }) // Change the color or add texture later

  // Create a color attribute to store vertex colors
  const colors = []
  for (let i = 0; i < planetGeometry.attributes.position.count; i++) {
    const color = new THREE.Color()
    color.setHSL(i / planetGeometry.attributes.position.count, 1.0, 0.5)
    colors.push(color.r, color.g, color.b)
  }
  planetGeometry.setAttribute(
    'color',
    new THREE.Float32BufferAttribute(colors, 3)
  )

  planet = new THREE.Mesh(planetGeometry, planetMaterial)
  planet.position.copy(planetPosition)

  // Create the pole geometry
  const poleGeometry = new THREE.CylinderGeometry(0.02, 0.02, 3, 8)
  const poleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })

  pole = new THREE.Mesh(poleGeometry, poleMaterial)

  // Rotate the pole to align with the planet's rotation axis
  pole.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    planetRotationAxis
  )

  // Position the pole to intersect the planet
  pole.position.copy(planetPosition)

  scene.add(planet)
  scene.add(pole)
}

export function animatePlanet() {
  planet.rotateOnAxis(planetRotationAxis, planetRotationSpeed)
}
