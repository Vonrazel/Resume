# Custom Robot Models

## How to Add Your Blender Robot

1. **Export your robot from Blender:**
   - File → Export → glTF 2.0 (.glb/.gltf)
   - Save as `robot.glb` in this folder

2. **Naming Convention (Important!):**
   - Head mesh: Name it "Head" for mouse tracking
   - Chest mesh: Name it "Chest" for breathing animation
   - Body mesh: Name it "Body"
   - Arms: "LeftArm", "RightArm"
   - Hands: "LeftHand", "RightHand"

3. **Material Setup:**
   - Use PBR materials (Principled BSDF)
   - Set proper metalness and roughness values
   - Add emission for glowing parts

4. **File Structure:**
   ```
   public/
   ├── robot.glb          # Your custom robot
   ├── robot-v2.glb       # Alternative version
   └── README.md          # This file
   ```

## Model Requirements

- **Format:** GLB (recommended) or GLTF
- **Size:** Keep under 5MB for web performance
- **Polygons:** Optimize for web (under 10k triangles)
- **Textures:** Use compressed formats (WebP, KTX2)

## Animation Support

The robot supports these animations:
- Head rotation (follows mouse)
- Gentle floating
- Chest breathing effect
- Glowing pulse effects

Make sure your model parts are properly named for these animations to work!
