import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  resolve: {
    alias: {
      '@pet/shared': fileURLToPath(
        new URL('./packages/shared/src/index.ts', import.meta.url)
      )
    }
  },
  test: {
    include: [
      'packages/**/*.test.ts',
      'apps/desktop/src/**/*.test.ts',
      'apps/desktop/electron/**/*.test.mjs'
    ],
    exclude: ['**/node_modules/**', '**/dist/**'],
    environment: 'node',
    // 默认 5s 对这批用例太紧：vault 的装配用例每个都走一次 scrypt KDF，
    // 单机空跑 0.8–4s，CI 上 153 个 worker 一起抢 CPU 就会踩线超时。
    // 超时值放宽，断言本身没有放松。
    testTimeout: 20000,
    hookTimeout: 20000
  }
})
