import { type ComponentProps, useState } from 'react'
import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react'

const shaderGradientProps = {
  animate: 'on',
  axesHelper: 'off',
  bgColor1: '#111111',
  bgColor2: '#111111',
  brightness: 0.8,
  cAzimuthAngle: 270,
  cDistance: 0.5,
  cPolarAngle: 180,
  cameraZoom: 15.1,
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
  uSpeed: 0.2,
  uStrength: 0.3,
  uTime: 0,
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
      <div className="shader-gradient-vignette pointer-events-none absolute inset-0 z-10" />
    </div>
  )
}
