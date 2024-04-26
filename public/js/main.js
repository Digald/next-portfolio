import * as THREE from 'https://unpkg.com/three@0.148.0/build/three.module.js'
import { createStarfield, animateStarfield } from './starField.js'
import { createPlanet, animatePlanet } from './planet.js'

// Set up the scene, camera, renderer, etc.
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

camera.position.z = 5

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('canvas')
})

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

// Create the starfield and planet
createStarfield(scene)
createPlanet(scene)

function animate() {
  requestAnimationFrame(animate)

  // Animate the starfield and planet
  animateStarfield()
  animatePlanet()

  renderer.render(scene, camera)
}

animate()
