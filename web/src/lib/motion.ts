export const motionEase = {
  expressive: [0.16, 1, 0.3, 1],
  theme: [0.76, 0, 0.24, 1],
} as const

export const motionDuration = {
  instant: 0,
  entrance: 0.8,
  overlay: 0.7,
  panel: 0.45,
  theme: 0.9,
} as const

export const motionTransition = {
  entrance: {
    duration: motionDuration.entrance,
    ease: motionEase.expressive,
  },
  overlay: {
    duration: motionDuration.overlay,
    ease: motionEase.expressive,
  },
  panel: {
    duration: motionDuration.panel,
    ease: motionEase.expressive,
  },
  theme: {
    duration: motionDuration.theme,
    ease: motionEase.theme,
  },
} as const
