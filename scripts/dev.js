import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'))
const firstDependency = Object.keys(packageJson.dependencies || {})[0] // 첫 번째 패키지 확인
const modulePath = path.join('node_modules', firstDependency)

// node_modules가 없거나 필수 패키지가 없으면 pnpm install 실행
if (!fs.existsSync('node_modules') || !fs.existsSync(modulePath)) {
  console.log('🔧 Dependencies not found or incomplete. Installing...')
  execSync('pnpm install --no-frozen-lockfile', { stdio: 'inherit' })
}

// Vite 실행
execSync('vite', { stdio: 'inherit' })
