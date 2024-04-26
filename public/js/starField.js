import * as THREE from 'https://unpkg.com/three@0.148.0/build/three.module.js'

let stars
// Set the rotation axis for the starfield
const rotationAxis = new THREE.Vector3(-1, 1, 0).normalize()
const rotationSpeed = 0.0001

export function createStarfield(scene) {
  const starsGeometry = new THREE.BufferGeometry()
  const starsCount = 5000
  const positionArray = new Float32Array(starsCount * 3)
  const colorArray = new Float32Array(starsCount * 3)
  const sizeArray = new Float32Array(starsCount)
  const radius = 500 // Adjust this value to control the size of the star field

  for (let i = 0; i < starsCount; i++) {
    const x = Math.random() * 2 - 1 // Random value between -1 and 1
    const y = Math.random() * 2 - 1 // Random value between -1 and 1
    const z = Math.random() * 2 - 1 // Random value between -1 and 1
    const starPosition = new THREE.Vector3(x, y, z)
    // Set the star position on a sphere with the specified radius
    starPosition.normalize().multiplyScalar(radius)
    positionArray[i * 3] = starPosition.x
    positionArray[i * 3 + 1] = starPosition.y
    positionArray[i * 3 + 2] = starPosition.z

    // Set random brightness value for each star
    const brightness = Math.random()
    const color = new THREE.Color(0x888888)
    color.multiplyScalar(brightness)
    colorArray[i * 3] = color.r
    colorArray[i * 3 + 1] = color.g
    colorArray[i * 3 + 2] = color.b

    // Set random size value for each star
    const size = Math.random() * 5 + 1
    sizeArray[i] = size
  }

  starsGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positionArray, 3)
  )

  starsGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3))
  starsGeometry.setAttribute('size', new THREE.BufferAttribute(sizeArray, 1))

  const starsMaterial = new THREE.PointsMaterial({
    vertexColors: true,
    sizeAttenuation: true,
    size: 1
  })

  stars = new THREE.Points(starsGeometry, starsMaterial)
  scene.add(stars)
}

export function animateStarfield() {
  // Rotate the starfield around the specified axis
  stars.rotateOnAxis(rotationAxis, rotationSpeed)
}
