### 🛠 Vue 3의 주요 개념과 Composition API의 활용법
Vue 3의 핵심 개념은 크게 반응성 시스템, 컴포지션 API, 라우팅, 상태 관리, 템플릿 및 렌더링 등으로 나눌 수 있습니다. Vue 3는 이전 버전보다 더 유연하고 강력한 기능을 제공하는데, 다음은 그 주요 개념들입니다.

## 1️⃣ 반응성 시스템 (Reactivity System)
기존 Vue 2는 브라우저 지원 제한으로 인해 getter / setter만 사용했습니다. Vue 3에서 가장 큰 변화 중 하나는 반응성 시스템이 Proxy 기반으로 완전히 새로워졌다는 점입니다. 반응형(reactive) 객체에 Proxy를 사용하고, ref에 getter / setter를 사용합니다.

🔎 [Proxy](/guide/proxy) 란?

```javascript
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key)
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      trigger(target, key)
    }
  })
}

function ref(value) {
  const refObject = {
    get value() {
      track(refObject, 'value')
      return value
    },
    set value(newValue) {
      value = newValue
      trigger(refObject, 'value')
    }
  }
  return refObject
}
```
- reactive: 객체의 반응형 Proxy를 return.
- ref: 반응형 ref 객체를 return.

|특징|ref|reactive
|------|---|---|
|데이터 타입|기본 타입(primitive)과 객체(object) 모두 가능|객체(object)만 가능
|구조|`.value` 프로퍼티를 통해 접근|원본 객체처럼 직접 접근 가능
|깊은 반응성|기본적으로 깊은 반응성 제공 (`.value`가 객체일 경우 내부까지 반응형)|자동으로 깊은 반응성 제공
|구조적 변경|원시값을 새로운 값으로 대체 가능|직접 속성을 변경하는 방식
|TypeScript 지원|`Ref<T>` 타입 제공|`reactive<T>()` 사용

> 🚦**래핑, 언래핑의 개념이 혼란스러울 경우**
어떤 값이 ref에 할당되어 있다고 가정합시다. 이 때, .value를 통해 할당된 값에 접근해야 한다면 `래핑`된 것이고, .value 없이 접근된다면 `언래핑`된 것이라고 이해할 수 있습니다.

- Computed: getter 함수를 사용하며, getter로부터 반환된 값을 읽기 전용 반응형 ref 객체로 return.
- Watch: 하나 이상의 반응형 데이터 소스를 감시하고, 소스가 변경되면 콜백 함수를 호출합니다.(특정 반응형 데이터를 감시하여 변화가 있을 때 동작을 수행)

[Slot과 provide/inject](/guide/template)

## 2️⃣ 컴포지션 API (Composition API)
Vue 3에서 새로 도입된 컴포지션 API는 상태 관리와 로직을 더 유연하고 명확하게 처리할 수 있습니다.

setup(): 컴포넌트의 모든 로직을 정의하는 곳. 여기서 reactive(), ref(), computed(), watch() 등을 사용할 수 있습니다.

<details>
<summary>문법 비교</summary>

Options API:
```vue
<script>
export default {
  data() {
    return {
      name: '',
      age: 0,
      aboveAge: false
    }
  },
  computed: {
    displayProfile() {
      return `My name is ${this.name} and i am ${this.age}`
    }
  },
  mounted() {
    console.log('Application mounted')
  },
  methods: {
    verifyUser() {
      if (this.age < 18) {
        this.aboveAge = false
      }
      else {
        this.aboveAge = true
      }
    },
  },
}
</script>
```

 Composition API:
```vue
<script setup>
import { onMounted, reactive, ref } from 'vue'

const profile = reactive({ name: '', age: '' })
const aboveAge = ref(false)

const verifyUser = () => age.value < 18 ? aboveAge.value = false : aboveAge.value = true

const displayProfile = computed(() => {
  return `My name is ${this.name} and i am ${this.age}`
})

onMounted (() => console.log('Application mounted'))
</script>

특징:
Options API는 OOP 언어 배경을 가진 사용자를 위한 클래스 기반 모델과 더 잘 맞는 "컴포넌트 인스턴스"(예제에서 볼 수 있는 this)의 개념을 중심으로 합니다.

컴포지션(Composition) API는 옵션을 선언하는 대신 import한 함수를 사용하여 Vue 컴포넌트를 작성할 수 있는 API 세트입니다. 컴포넌트 로직을 유연하게 구성할 수 있도록하여 재사용성과 가독성을 높여줍니다.
```
</details>

Life Cycle Hooks: onMounted(), onUpdated(), onUnmounted() 등과 같은 라이프사이클 훅을 사용해 컴포넌트의 생명 주기를 관리할 수 있습니다.

🔎 [LifeCycle hooks](/guide/life-cycle) 란?

Provide/Inject: 상위 컴포넌트에서 하위 컴포넌트로 데이터를 전달할 때 사용합니다.

### 🤩 defineModel(Vue 3.4 >)
`defineModel`은 `v-model`과 동일한 양방향 데이터 바인딩 패턴으로, Composition API에서 데이터 흐름 관리를 더욱 효과적으로 도와주는 함수입니다. `defineProps`와 `defineEmits`를 자동으로 설정하여 코드 작성이 간결해지며, Vue 3.3 이상에서 사용할 수 있습니다.

<details>
<summary>종속 버전</summary>

- Volar / vue-tsc@^1.8.27 (필수)
- @vitejs/plugin-vue@^5.0.0 (Vite를 사용하는 경우)
- nuxt@^3.9.0 (Nuxt를 사용하는 경우)
- vue-loader@^17.4.0 (webpack 또는 vue-cli를 사용하는 경우)
</details>

#### defineModel 이전의 데이터 흐름 방식
부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달할 때 `props`를 사용하고, 자식 컴포넌트 `emit`을 통해 이벤트를 발생시켜 부모 컴포넌트로 데이터를 전달합니다. 이 방식은 직관적이지만, 데이터 흐름이 복잡해지거나 컴포넌트가 중첩된 경우 유지보수가 힘들다는 단점이 있습니다.

#### defineModel 사용하기

<details>
<summary>코드 비교</summary>

props & emit
```vue
<!-- Input.vue -->
<script setup lang="ts">
const props = defineProps<{ modelValue: string }>()

// # case 1
// const modelValue = computed({
//   get: () => props.modelValue,
//   set: (value) => emit('update:modelValue', value),
// })

// # case 2
const emit = defineEmits(['update:value'])

function onInput(e) {
  emit('update:value', e.target.value)
}
</script>

<template>
  <div class="input-primary">
    <input type="text" placeholder="입력하세요." :value="modelValue" @input="onInput">
  </div>
</template>
```

defineModel
```vue
<script setup lang="ts">
export interface Props {
  type: 'text' | 'password'
}
withDefaults(defineProps<Props>(), {
})

const model = defineModel()
</script>

<template>
  <div class="input-primary">
    <input
      type="text"
      placeholder="입력하세요."
      :value="model"
    >
  </div>
</template>
```
</details>

#### defineModel arguments
```js
// v-model을 필수로 만들기
const model1 = defineModel({ required: true })

// 기본값 제공
const model2 = defineModel({ default: 0 })
```
```ts
// 첫 번째 인자로 전달하는 name은 props의 이름으로 사용됩니다.
const title = defineModel<string>('title')

// 내부 동작
defineProps<{ title: string }>()
defineEmits<{ (event: 'update:title', value: string): void }>()
```

<details>
<summary>예시</summary>

```vue
<!-- Child Component -->
<script setup lang="ts">
const title = defineModel<string>('title')
</script>

<template>
  <input v-model="title">
</template>

<!-- Parent Component -->
<ChildComponent v-model:title="parentTitle" />
```
</details>

🔎 [v-model-modifiers](https://ko.vuejs.org/guide/components/v-model#handling-v-model-modifiers)

## 3️⃣ 템플릿과 렌더링 (Template and Rendering)
Vue 3에서의 템플릿은 매우 직관적입니다.

템플릿 구문: HTML처럼 보이지만, Vue의 디렉티브(v-if, v-for, v-bind, v-model 등)와 결합됩니다.
슬롯: 자식 컴포넌트에서 부모 컴포넌트로 동적으로 내용을 전달할 수 있는 기능.
v-bind 및 v-model: 동적으로 속성을 바인딩하거나, 양방향 바인딩을 할 수 있습니다.
Teleport: 컴포넌트의 위치를 변경하여 다른 DOM 요소에 렌더링할 수 있습니다.

## 4️⃣ 라우팅 (Routing)
Vue 3에서 Vue Router를 사용하면 URL에 따라 컴포넌트를 동적으로 로드할 수 있습니다.

Dynamic Routes: 동적 라우트를 설정하고, URL 파라미터를 통해 컴포넌트에 데이터를 전달할 수 있습니다.
Lazy Loading: 라우터의 컴포넌트를 필요한 시점에만 로드할 수 있도록 설정할 수 있습니다.

## 5️⃣ 상태 관리 (State Management)
Vue 3에서는 Pinia가 기본적인 상태 관리 솔루션으로 사용됩니다. Vuex 대신 더 간단하고 직관적인 API를 제공해.

Pinia: Vue 3의 Composition API와 잘 통합되어 있으며, 중앙 집중식 상태 관리에 이상적입니다.

## 6️⃣  TypeScript 지원 (TypeScript Support)
Vue 3는 TypeScript를 기본적으로 지원해서 타입 안전성을 제공합니다.

타입 추론: Vue의 템플릿 및 컴포넌트가 TypeScript와 잘 통합됩니다.
컴포지션 API와 TypeScript: ref(), reactive(), computed() 등을 타입 안정성을 갖고 사용할 수 있습니다.
