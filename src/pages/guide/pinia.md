### 🍍 Pinia를 활용한 상태 관리 및 Vuex 대체

🍍 Pinia가 뭔가요?
Pinia는 Vue 3 공식 상태 관리 라이브러리로, Vuex를 대체제로 만들어졌습니다.  간결한 API와 직관적인 사용법을 제공하며, TypeScript와도 완벽하게 호환됩니다.

## 왜 Pinia를 사용해야 하나요?
개발을 하다 보면 컴포넌트 또는 페이지 간 state를 공유해야 하는 상황이 자주 발생합니다. 예를 들어, 로그인 상태를 여러 페이지에서 유지해야 하거나, 장바구니 데이터를 상품 목록과 결제 페이지에서 동시에 사용해야 하는 경우가 있습니다.

이런 경우 부모-자식 컴포넌트 간의 props 전달만으로는 한계가 있으며,
이벤트 버스를 사용하거나 emit으로 데이터를 주고받는 방식도 관리가 어렵고 복잡해질 수 있습니다.

Pinia를 사용하면 전역적으로 상태를 관리할 수 있어, 어디서든 쉽게 데이터를 접근하고 변경할 수 있으며, Vue의 반응형 시스템과 자연스럽게 통합되어 최적화된 성능과 간결한 코드를 유지할 수 있습니다. 🚀

## 시작하기

### 설치
선호하는 패키지 관리자로 `pinia`를 설치합니다.
```bash
pnpm add pinia
```

인스턴스 생성 및 플러그인으로 앱에 전달합니다.
```javascript
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
```

### Store 정의하기
`defineStore()`로 정의하며 첫 번째 인수로 고유한 이름이 필요합니다.
```javascript
import { defineStore } from 'pinia'

// `defineStore()`의 반환값에 원하는 대로 이름을 지을 수 있지만,
// `use`로 시작해 `Store`로 끝나는 Store의 이름을 사용하는 것이 좋습니다.
// (예: `useUserStore`, `useCartStore`, `useProductStore`)
// 첫 번째 인수는 애플리케이션 내 Store의 고유 ID입니다.
export const useUserStore = defineStore('userStore', {
  // ...
})
```

**Option Store**
Vue의 Options API와 유사하게, `state`, `getters`, `actions` 프로퍼티를 가진 Options를 전달합니다.
```javascript
export const useUserStore = defineStore('userStore', {
  state: () => ({ age: 0, name: 'Minsu' }),
  getters: {
    hello: state => `hello ${this.name}`,
  },
  actions: {
    increment() {
      this.age++
    },
  },
})
```

**Setup Store**
Store를 정의하는 문법으로, Vue의 Composition API의 setup 함수와 유사한 문법입니다. 반응형 프로퍼티와 메서드를 정의하는 함수를 작성하고, return 하는 방식으로 작성됩니다.
```javascript
export const useUserStore = defineStore('userStore', () => {
  const age = ref(0)

  const hello = computed(() => `hello ${name.value}`)

  const increment = () => {
    age.value++
  }

  return {
    count,
    hello,
    increment
  }
})
```
Setup Store 내에서:
- ref()는 state 프로퍼티가 됨.
- computed()는 getters 프로퍼티가 됨.
- function()은 actions 프로퍼티가 됨.

Pinia가 state를 올바르게 인식하도록 하기 위해, Setup Store에서는 모든 state 프로퍼티를 반환해야 합니다. [비공개 state 프로퍼티](https://masteringpinia.com/blog/how-to-create-private-state-in-stores)를 가질 수 없습니다.

## Store 사용하기
Store는 `setup()`함수 내에서 호출되기 전까지 생성되지 않습니다.
```vue
<script setup>
import { useUserStore } from '~/store/user'

// 컴포넌트 내 어디서든 `store` 변수를 접근할 수 있습니다 ✨
const store = useUserStore()
</script>
```
`store`는 **reactive()** 로 래핑된 객체이기 때문에 `.value`가 필요하지 않습니다.

```vue
<script setup>
import { useUserStore } from '~/store/user'
const store = useUserStore()
// ❌ 이렇게 하면 반응성이 깨져서 작동하지 않습니다
// `props`를 디스트럭처링(구조분해) 하는 것과 같습니다
const { name, hello } = store
name // 항상 "Minsu" 입니다
hello // 항상 "hello Minsu" 입니다

setTimeout(() => {
  store.increment()
}, 1000)

// ✅ 이렇게 하면 반응형이 됩니다
// 💡 또는 `store.hello`를 직접 사용하는 것도 가능합니다
const helloValue = computed(() => store.hello)
</script>
```

## Store에서 디스트럭처링
Store에서 프로퍼티를 추출하면서 반응성을 유지하기 위해서 [sotreToRefs](https://pinia.vuejs.kr/api/pinia/functions/storeToRefs.html#Function-storeToRefs-)를 사용합니다.

```vue
<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/store/user'

const store = useUserStore()
// `name`과 `hello`는 반응형 ref입니다.
// 플러그인에 의해 추가된 프로퍼티도 ref로 추출됩니다.
// 모든 action 또는 비반응형(ref/reactive가 아닌) 프로퍼티는 건너뜁니다.
const { name, hello } = storeToRefs(store)
// action의 increment는 직접 디스트럭처링 할 수 있습니다.
const { increment } = store
</script>
```
`storeToRefs()`를 사용하면 반응형 프로퍼티에 대해 ref를 생성하고, 비반응형 프로퍼티는 건너뜁니다.
