import { type ComponentProps, useState } from 'react'
import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react'

const shaderGradientProps = {
  animate: 'on',
  axesHelper: 'on',
  bgColor1: '#000000',
  bgColor2: '#000000',
  brightness: 1.1,
  cAzimuthAngle: 180,
  cDistance: 3.9,
  cPolarAngle: 115,
  cameraZoom: 1,
  color1: '#4c0102',
  color2: '#a0bcda',
  color3: '#34211b',
  destination: 'onCanvas',
  embedMode: 'off',
  envPreset: 'lobby',
  format: 'gif',
  fov: 45,
  frameRate: 10,
  gizmoHelper: 'hide',
  grain: 'off',
  lightType: '3d',
  pixelDensity: 1,
  positionX: -0.5,
  positionY: 0.1,
  positionZ: 0,
  range: 'disabled',
  rangeEnd: 40,
  rangeStart: 0,
  reflection: 0.1,
  rotationX: 0,
  rotationY: 0,
  rotationZ: 235,
  shader: 'defaults',
  type: 'waterPlane',
  uAmplitude: 0,
  uDensity: 1.1,
  uFrequency: 5.5,
  uSpeed: 0.1,
  uStrength: 1.3,
  uTime: 0.2,
  wireframe: false,
} as const

let hasLoggedWebGLFallback = false

function browserSupportsWebGL() {
  const canvas = document.createElement('canvas')

  try {
    const context = canvas.getContext('webgl') ?? canvas.getContext('experimental-webgl')

    return context !== null
  } catch (error) {
    console.error('Unable to detect WebGL support for the hero background.', error)
    return false
  }
}

function logWebGLFallback() {
  if (hasLoggedWebGLFallback) {
    return
  }

  hasLoggedWebGLFallback = true
  console.error('WebGL is unavailable. Rendering the static hero background fallback.')
}

function StaticHeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden bg-ink-fixed"
    >
      <div className="shader-gradient-vignette pointer-events-none absolute inset-0 z-10" />
    </div>
  )
}

export function ShaderGradientBackground() {
  const [canRenderShader] = useState(browserSupportsWebGL)

  if (!canRenderShader) {
    logWebGLFallback()
    return <StaticHeroBackground />
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
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
      <div className="shader-gradient-vignette pointer-events-none absolute inset-0 z-10" />
    </div>
  )
}
