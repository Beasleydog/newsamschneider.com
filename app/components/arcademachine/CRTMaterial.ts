import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

const CRTMaterial = shaderMaterial(
  {
    map: null,
    time: 0,
    resolution: new THREE.Vector2(800, 800),
  },
  // Vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform sampler2D map;
    uniform float time;
    uniform vec2 resolution;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      
      vec2 curved_uv = uv * 2.0 - 1.0;
      vec2 offset = curved_uv.yx / 6.0;
      curved_uv += curved_uv * offset * offset;
      curved_uv = curved_uv * 0.5 + 0.5;
      
      vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
      
      if (curved_uv.x >= 0.0 && curved_uv.x <= 1.0 && curved_uv.y >= 0.0 && curved_uv.y <= 1.0) {
        float scanline = sin(curved_uv.y * resolution.y * 2.0) * 0.02;
        
        float r = texture2D(map, curved_uv + vec2(0.001, 0.0)).r;
        float g = texture2D(map, curved_uv).g;
        float b = texture2D(map, curved_uv - vec2(0.001, 0.0)).b;

        vec2 vigUV = curved_uv * (1.0 - curved_uv.yx);
        float vig = vigUV.x * vigUV.y * 15.0;
        vig = pow(vig, 0.25);

        float flicker = 0.95 + 0.05 * sin(time * 8.0);

        vec3 col = vec3(r, g, b);
        col *= (1.0 + scanline);
        col *= vig;
        col *= flicker;
        
        color = vec4(col, 1.0);
      }
      
      gl_FragColor = color;
    }
  `
);

// Register the material
extend({ CRTMaterial });

// Export the material type for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      crtMaterial: any;
    }
  }
}

export { CRTMaterial };
