import type { ComponentProps } from 'react'
import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react'

const shaderGradientProps = {
  animate: 'on',
  axesHelper: 'off',
  bgColor1: '#000000',
  bgColor2: '#000000',
  brightness: 0.8,
  cAzimuthAngle: 270,
  cDistance: 0.5,
  cPolarAngle: 180,
  cameraZoom: 35.1,
  color1: '#73bfc4',
  color2: '#ff810a',
  color3: '#8da0ce',
  destination: 'onCanvas',
  embedMode: 'off',
  envPreset: 'city',
  format: 'gif',
  fov: 45,
  frameRate: 10,
  gizmoHelper: 'hide',
  grain: 'on',
  lightType: 'env',
  pixelDensity: 1,
  positionX: -0.1,
  positionY: 0,
  positionZ: 0,
  range: 'disabled',
  rangeEnd: 40,
  rangeStart: 0,
  reflection: 0.4,
  rotationX: 0,
  rotationY: 130,
  rotationZ: 70,
  shader: 'defaults',
  type: 'sphere',
  uAmplitude: 3.2,
  uDensity: 0.8,
  uFrequency: 5.5,
  uSpeed: 0.1,
  uStrength: 0.3,
  uTime: 0,
  wireframe: false,
} as const

export function ShaderGradientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <ShaderGradientCanvas
        className="relative z-0 h-full w-full"
        fov={45}
        lazyLoad={false}
        pixelDensity={1}
        pointerEvents="none"
      >
        <ShaderGradient
          {...(shaderGradientProps as unknown as ComponentProps<typeof ShaderGradient>)}
        />
      </ShaderGradientCanvas>
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_top,rgba(17,17,17,0.1),rgba(17,17,17,0.68)_58%,rgba(17,17,17,0.88))]" />
      <div className="shader-gradient-load-cover absolute inset-0 z-20 bg-[#050505]" />
    </div>
  )
}
