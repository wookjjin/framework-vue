### ⚡ 빠르고 최적화된 Vite 기반 Vue 프로젝트 세팅
**Vite**는 프론트엔드 개발을 위한 빌드 툴이다. 빠르고 간결한 모던 웹 프로젝트 개발 경험에 초점을 맞춰 탄생한 빌드 도구이며, 두 가지 컨셉을 중심으로 하고 있습니다.
- 개발 시 네이티브 ESM을 넘어 [더욱 다양한 기능](https://ko.vitejs.dev/guide/features.html)을 제공합니다. Hot Module Replacement (HMR) 등
- 번들링 시, Rollup 기반의 다양한 빌드 커맨드를 사용할 수 있습니다. 최적화된 정적 리소스들 및 미리 정의된 설정을 제공합니다.

## 1️⃣ 프로젝트 만들기
> Vite는 버전 18+ 또는 20+ 의 **Node.js**를 요구합니다.
> 패키지 매니저는 pnpm을 사용하나, 자신이 사용하는 패키지 매니저를 사용하여 진행하시기 바랍니다.
```bash
pnpm create vite my-vue-app --template vue

...
cd my-vue-app
code .
```
---
## 2️⃣ 플러그인 사용하기
플러그인은 기능을 확장하거나 변경할 수 있도록 해주는 도구입니다. 플러그인을 사용하려면 프로젝트의 **devDependencies** 에 플러그인을 추가하고, 설정 파일의 **plugins** 배열에 해당 플러그인을 포함시켜야 합니다. **auto-import** 를 설정하기 위해 **unplugin-auto-import** 사용하고자 합니다.

1. 플러그인 추가하기
```bash
pnpm add -D unplugin-auto-import
```

```typescript
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  AutoImport({
    imports: ['vue']
})

```

## 3️⃣ 더 많은 플러그인 찾기
Vite의 공식 플러그인에 대한 정보는 [플러그인 섹션](https://ko.vitejs.dev/plugins/)을 참고해 주세요. 커뮤니티 플러그인 [awesome-vite](https://github.com/vitejs/awesome-vite#plugins)에서 확인할 수 있습니다.

참고:
[Vite 플러그인](https://ko.vitejs.dev/guide/using-plugins.html)
