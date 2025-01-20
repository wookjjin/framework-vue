# Routing Guide

## createRouter

Vue Router 공식 문서에서 권장하는 명시적 라우트 정의 방식이다.

특징:
- 명시적 라우트 선언: `routes` 배열을 직접 정의하여 라우트를 관리
- 유연성과 가독성: 설정이 명확하여 커스텀 라우트 정의에 적합
- <b>중첩 라우트</b>나 <b>동적 라우트</b>를 직접 설정하기 쉬움
- 라우트 경로와 컴포넌트를 명시적으로 연결

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
    component: UserView,
  }
]

export default routes
```
- type `RouteRecordRaw` import
- `Components` import
- `routes` 작성

## Convention

1. route는 메뉴별로 작성
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

2. 하위 메뉴는 Nested Routes 정의
```typescript
const routes: Array<RouteRecordRaw> = [
  {
    path: '/mgmt',
    children: [
      { path: '', name: 'Mgmt', component: MgmtView },
      { path: 'menu', name: 'MenuMgmt', component: MenuMgmt },
      { path: 'auth', name: 'AuthMgmt', component: AuthMgmt },
    ]
  },

]
```

result:
- /mgmt
- /mgmt/menu
- /mgmt/auth
