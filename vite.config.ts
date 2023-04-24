import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'istanbul' // or 'c8'
    },
    transformMode: {
      web: [/\.[jt]sx$/],
    },
    environment: 'jsdom'
  },
})
