import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    plugins: [vue()],
    server: {
      port: 5175
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    }
  })
}