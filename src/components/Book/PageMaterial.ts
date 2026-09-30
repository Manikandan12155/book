import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

export const PageMaterial = shaderMaterial(
  {
    uColor: new THREE.Color('white'),
    uProgress: 0.0,
  },
  // Vertex Shader
  `
    uniform float uProgress;
    varying vec2 vUv;
    varying vec3 vNormal;

    #define PI 3.14159265359

    void main() {
      vUv = uv;
      vec3 pos = position;

      // pos.x goes from -1.5 to 1.5 (for a width of 3)
      // shift it so x is from 0 to 3
      float x = pos.x + 1.5;
      float width = 3.0;

      // When uProgress = 0, page is flat on right (x from 0 to 3)
      // When uProgress = 1, page is flat on left (x from 0 to -3)
      
      // curl radius
      float radius = 0.5 + (1.0 - abs(uProgress - 0.5) * 2.0) * 0.5; // dynamically changes
      
      // Angle of rotation around the spine
      float angle = uProgress * PI;
      
      // The amount of bend/curl based on progress
      // We want max curl at progress = 0.5
      float curlAmount = sin(uProgress * PI);
      
      // Calculate rotation and curl
      // If we simply rotate around Z axis:
      // x' = x * cos(angle)
      // z' = x * sin(angle) (assuming Y is up, and we are rotating around Y)
      // Wait, in ThreeJS plane is on X-Y by default, but we will rotate the mesh -PI/2 in BookPage 
      // so it lies on X-Z. Let's assume the plane is on X-Y in local space.
      
      // Let's bend it along X axis.
      // A curled cylinder:
      // theta = x / radius;
      // pos.x = radius * sin(theta)
      // pos.z = radius * (1.0 - cos(theta)) 
      // This curls it up into a cylinder.
      
      // Blend between flat and curled
      float theta = x * curlAmount * 2.0;
      
      vec3 finalPos = pos;
      
      if (uProgress > 0.001 && uProgress < 0.999) {
          // A simple procedural page flip effect
          // Rotate around spine (x=0)
          float s = sin(angle);
          float c = cos(angle);
          
          // Bend
          float bend = sin(x / width * PI) * curlAmount * 0.5;
          
          float newX = x * c - bend * s;
          float newZ = x * s + bend * c; // using Z since plane is X-Y originally? No, if we rotate the mesh -PI/2 on X, local Z becomes world -Y.
          // Let's assume local space is X-Y plane (z=0).
          // To lift the page, we modify Z.
          newZ = x * s + bend;
          
          finalPos.x = newX;
          finalPos.z = newZ; // local Z
          
          // Shift back to center
          finalPos.x -= 1.5;
      } else if (uProgress >= 0.999) {
          // Flipped to left
          finalPos.x = -x + 1.5; // -3 to 0 -> centered at -1.5
      }

      vNormal = normalMatrix * normal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPos, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform vec3 uColor;
    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
      // Basic shading
      vec3 light = normalize(vec3(0.5, 1.0, 0.5));
      float dProd = max(0.0, dot(vNormal, light));
      // Front and back sides might need double sided normals
      float intensity = 0.8 + 0.2 * dProd;
      
      // Paper texture / edge shadow
      float edgeShadow = 1.0 - pow(abs(vUv.x - 0.5) * 2.0, 10.0) * 0.1;
      
      gl_FragColor = vec4(uColor * intensity * edgeShadow, 1.0);
    }
  `
)
