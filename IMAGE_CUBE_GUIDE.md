# 🎨 Complete Guide: Adding Images to 3D Cubes with Three.js

## Overview
This guide shows you **6 different methods** to add images and textures to 3D cubes using Three.js. Your current implementation already uses some of these techniques!

## 🖼️ Method 1: Image Files (Your Current Method)

**What it is:** Load actual PNG/JPG files from your public folder

**Code:**
```javascript
const textureLoader = new THREE.TextureLoader()

// Load your actual images
const frontTexture = textureLoader.load('/front.png')
const backTexture = textureLoader.load('/back.png')

// Apply to cube materials
const materials = [
  new THREE.MeshPhongMaterial({ map: frontTexture }), // Front
  new THREE.MeshPhongMaterial({ map: backTexture }),  // Back
  // ... other sides
]
```

**Best for:** Real photos, logos, ID cards, product images

---

## 🌈 Method 2: Gradient Textures

**What it is:** Create beautiful gradients programmatically

**Code:**
```javascript
const createGradientTexture = (color1, color2, direction = 'horizontal') => {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')
  
  let gradient
  if (direction === 'horizontal') {
    gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
  } else if (direction === 'vertical') {
    gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
  } else {
    gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
  }
  
  gradient.addColorStop(0, color1)
  gradient.addColorStop(1, color2)
  
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  const texture = new THREE.CanvasTexture(canvas)
  return texture
}

// Usage
const gradientTexture = createGradientTexture('#22d3ee', '#1e40af', 'diagonal')
```

**Best for:** Backgrounds, decorative elements, modern UI designs

---

## 🔲 Method 3: Pattern Textures

**What it is:** Generate checkerboards, circles, and custom patterns

**Code:**
```javascript
const createPatternTexture = (patternType = 'checkerboard') => {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  
  if (patternType === 'checkerboard') {
    const size = 32
    for (let x = 0; x < canvas.width; x += size) {
      for (let y = 0; y < canvas.height; y += size) {
        ctx.fillStyle = (x + y) % (size * 2) === 0 ? '#22d3ee' : '#1e40af'
        ctx.fillRect(x, y, size, size)
      }
    }
  } else if (patternType === 'circles') {
    ctx.fillStyle = '#1e40af'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    ctx.fillStyle = '#22d3ee'
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const radius = Math.random() * 20 + 10
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
    }
  }
  
  const texture = new THREE.CanvasTexture(canvas)
  return texture
}
```

**Best for:** Testing, decorative patterns, game textures

---

## 🎬 Method 4: Animated Textures

**What it is:** Create textures that animate in real-time

**Code:**
```javascript
const createAnimatedTexture = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  
  const texture = new THREE.CanvasTexture(canvas)
  
  // Animation function
  const animateTexture = (time) => {
    ctx.fillStyle = '#0a0a12'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Draw animated waves
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `hsl(${200 + Math.sin(time * 0.001 + i) * 30}, 70%, 60%)`
      ctx.lineWidth = 2
      ctx.beginPath()
      for (let x = 0; x < canvas.width; x += 5) {
        const y = canvas.height / 2 + Math.sin(x * 0.02 + time * 0.001 + i) * 50
        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()
    }
    
    texture.needsUpdate = true
  }
  
  // Store animation function for later use
  texture.animate = animateTexture
  return texture
}

// In animation loop:
if (animatedTexture.animate) {
  animatedTexture.animate(Date.now())
}
```

**Best for:** Dynamic backgrounds, loading screens, special effects

---

## 🎥 Method 5: Video Textures (Advanced)

**What it is:** Use video files as textures

**Code:**
```javascript
// Create video element
const video = document.createElement('video')
video.src = '/your-video.mp4'
video.loop = true
video.muted = true
video.autoplay = true

// Create video texture
const videoTexture = new THREE.VideoTexture(video)
videoTexture.minFilter = THREE.LinearFilter
videoTexture.magFilter = THREE.LinearFilter

// Apply to material
const material = new THREE.MeshPhongMaterial({ map: videoTexture })
```

**Best for:** Video backgrounds, dynamic content, live feeds

---

## 🎨 Method 6: Canvas Textures

**What it is:** Draw anything you want with HTML5 Canvas

**Code:**
```javascript
const createCustomCanvasTexture = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')
  
  // Draw anything you want!
  ctx.fillStyle = '#1e40af'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  // Draw text
  ctx.fillStyle = '#ffffff'
  ctx.font = '48px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('Hello 3D!', canvas.width/2, canvas.height/2)
  
  // Draw shapes
  ctx.strokeStyle = '#22d3ee'
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.arc(canvas.width/2, canvas.height/2, 100, 0, Math.PI * 2)
  ctx.stroke()
  
  const texture = new THREE.CanvasTexture(canvas)
  return texture
}
```

**Best for:** Custom designs, text, logos, complex graphics

---

## 🚀 How to Apply Textures to Your Cube

### Basic Setup:
```javascript
// 1. Create cube geometry
const cubeGeometry = new THREE.BoxGeometry(2, 2, 2)

// 2. Create materials with textures
const materials = [
  new THREE.MeshPhongMaterial({ map: frontTexture }),  // Front
  new THREE.MeshPhongMaterial({ map: backTexture }),   // Back
  new THREE.MeshPhongMaterial({ map: topTexture }),    // Top
  new THREE.MeshPhongMaterial({ map: bottomTexture }), // Bottom
  new THREE.MeshPhongMaterial({ map: rightTexture }),  // Right
  new THREE.MeshPhongMaterial({ map: leftTexture }),   // Left
]

// 3. Create mesh
const cube = new THREE.Mesh(cubeGeometry, materials)
scene.add(cube)
```

### Material Properties:
```javascript
new THREE.MeshPhongMaterial({ 
  map: texture,           // The texture
  shininess: 60,         // How shiny (0-100)
  specular: 0x222222,    // Specular highlight color
  transparent: true,     // Enable transparency
  opacity: 0.8,          // Opacity (0-1)
  side: THREE.DoubleSide // Render both sides
})
```

---

## 🎯 Your Current Implementation

Your ID card already uses **Method 1 (Image Files)** perfectly:

```javascript
// Your current code
const frontTexture = textureLoader.load('/front.png')
const backTexture = textureLoader.load('/back.png')

const materials = [
  new THREE.MeshPhongMaterial({ map: frontTexture }), // Front
  new THREE.MeshPhongMaterial({ map: backTexture }),  // Back
  // ... other sides with solid colors
]
```

## 💡 Pro Tips

1. **Texture Optimization:**
   - Use power-of-2 dimensions (256, 512, 1024)
   - Compress images for web
   - Use appropriate texture formats

2. **Performance:**
   - Reuse textures when possible
   - Dispose of unused textures
   - Use texture atlases for multiple small textures

3. **Quality:**
   - Enable anisotropic filtering for better quality
   - Use appropriate min/mag filters
   - Consider mipmaps for distant objects

4. **Creative Ideas:**
   - Mix different texture types on the same cube
   - Use animated textures for special effects
   - Create procedural textures for unique looks

## 🎮 Interactive Demo

Check out the interactive demo cube in your app that shows all these methods in action! You can rotate it to see different texture types on each face.

---

**Your implementation is already excellent!** You're using professional-grade Three.js techniques with proper lighting, materials, and interactions. The combination of your ID card images with the 3D cube creates a truly impressive portfolio piece! 🚀
