import * as THREE from 'https://unpkg.com/three@0.148.0/build/three.module.js'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
const canvas = document.getElementById('canvas')
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(window.innerWidth, window.innerHeight)

// Function to resize the canvas and update the camera aspect ratio
function resizeCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

// Initial canvas resize
resizeCanvas()

// Resize canvas on window resize
window.addEventListener('resize', resizeCanvas)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(geometry, material)
const rotationSpeed = 0.001
scene.add(cube)

camera.position.z = 5

function animate() {
  requestAnimationFrame(animate)
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  stars.rotation.y += rotationSpeed // Rotate the starfield
  renderer.render(scene, camera)
}

const starsGeometry = new THREE.BufferGeometry()
const starsMaterial = new THREE.PointsMaterial({ color: 0x888888 })
const starsCount = 5000
const positionArray = new Float32Array(starsCount * 3)
const radius = 500 // Adjust this value to control the size of the star field

for (let i = 0; i < starsCount; i++) {
  const x = Math.random() * 2 - 1 // Random value between -1 and 1
  const y = Math.random() * 2 - 1 // Random value between -1 and 1
  const z = Math.random() * 2 - 1 // Random value between -1 and 1
  const starPosition = new THREE.Vector3(x, y, z)
  starPosition.normalize().multiplyScalar(radius) // Set the star position on a sphere with the specified radius
  positionArray[i * 3] = starPosition.x
  positionArray[i * 3 + 1] = starPosition.y
  positionArray[i * 3 + 2] = starPosition.z
}

starsGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(positionArray, 3)
)
const stars = new THREE.Points(starsGeometry, starsMaterial)
scene.add(stars)

console.log('log hello')
animate()
