import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    plugins: [vue()],
    server: {
      port: 5175,
      proxy: {
        '/fsm': {
          target: 'http://localhost:3030/',
          rewrite: (path) => path.replace(/^\/fsm/, ''),
          changeOrigin: false
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    }
  })
}