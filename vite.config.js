import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
// https://vitejs.dev/config/
export default defineConfig({
  // transpileDependencies:['@dcloudio/uni-ui'],
  server: {
    port: 3303
  },
  plugins: [
    uni(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@use "@/styles/variables.scss" as *;`,
        quietDeps: true // 忽略第三方库的警告
      }
    }
  },
})
