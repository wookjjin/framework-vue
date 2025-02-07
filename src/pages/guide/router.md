### 🔀 Vue Router를 사용하여 동적 네비게이션 구현
Vue Router는 Vue.js의 공식 라우터로 싱글 페이지 애플리케이션을 쉽게 구축할 수 있게 합니다.

특징:
- 명시적 라우트 선언: `routes` 배열을 직접 정의하여 라우트를 관리합니다.
- 유연성과 가독성: 설정이 명확하여 커스텀 라우트 정의에 적합합니다.
- **중첩 라우트**나 **동적 라우트**를 직접 설정하기 쉽습니다.
- 라우트 경로와 컴포넌트를 명시적으로 연결합니다.

## 설치하기
```bash
pnpm add vue-router@4
```

## 라우터 인스턴스 생성하기
`createRouter()`는 라우터 인스터스를 생성하기 위한 함수입니다.

## Getting Started
1. routes.ts 파일 생성
```typescript
import type { RouteRecordRaw } from 'vue-router'

import HomeView from '~/pages/index.vue'
import UserDetail from '~/pages/user/detail.vue'
import UserView from '~/pages/user/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('~/pages/user/index.vue'),
  }
]

export default routes
```
- type `RouteRecordRaw` import
- `Components` import
- `routes` 작성

## 파라미터를 사용한 동적 라우트 매칭
패턴에 따라 컴포넌트를 라우트로 매팽해야 할 경우가 있습니다. User의 상세 정보가 렌더링되어야 하는데 각 유저별로 ID가 다른 경우가 그에 해당됩니다.

```typescript
import User from './User.vue'

const routes = [
  // 동적 세그먼트는 콜론으로 시작합니다.
  { path: '/users/:id', component: User },
]
```

## 컴포넌트를 청크로 그룹화
### webpack 사용 시
때때로 동일한 라우트 아래에 중첩된 모든 컴포넌트를 동일한 비동기 청크로 그룹화하고 싶을 때가 있습니다. 이를 위해 네임드 청크를 사용하여, 특별한 주석 구문을 통해 청크 이름을 제공하면 됩니다. (webpack 2.4 >=)

```typescript
const UserDetails = () => import(/* webpackChunkName: "group-user" */ './UserDetails.vue')
const UserDashboard = () => import(/* webpackChunkName: "group-user" */ './UserDashboard.vue')
const UserProfileEdit = () => import(/* webpackChunkName: "group-user" */ './UserProfileEdit.vue')
```

### Vite 사용 시
Vite에서는 [rollupOptions](https://vite.dev/config/#build-rollupoptions) 내에서 청크를 정의할 수 있습니다.

## Convention Guide
1. **route는 메뉴(서비스)별로 작성**
```typescript
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/mgmt',
    name: 'Mgmt',
    component: MgmtView,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  }
]
```

2. **하위 메뉴는 Nested Routes 정의**
메뉴의 컴포넌트를 직관적으로 관리하기 위해서, `component: () => import('path')`로 하여 작성합니다.
> ⚠️주의할 점은 서비스 메뉴의 base component는 children에 path를 `''`로 지정해야 합니다.

```typescript
const routes: Array<RouteRecordRaw> = [
  {
    path: '/mgmt',
    children: [
      { path: '', name: 'Mgmt', component: () => import('~/pages/mgmt/index.vue') },
      { path: 'menu', name: 'MenuMgmt', component: () => import('~/pages/mgmt/menu.vue') },
      { path: 'auth', name: 'AuthMgmt', component: () => import('~/pages/mgmt/auth.vue') },
    ]
  },

]
```
result:
- /mgmt
- /mgmt/menu
- /mgmt/auth
