import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { studioPlugin } from './plugins/studio.js'

const root = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, root, '')
  const studioKey = env.VITE_STUDIO_KEY || 'oddish-nish'

  return {
    plugins: [react(), studioPlugin(root, studioKey)],
    publicDir: 'public',
    build: {
      outDir: 'dist',
      assetsDir: 'assets'
    }
  }
})
