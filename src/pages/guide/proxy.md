### 🔍 Proxy란?
Proxy는 특정 객체를 감싸 프로퍼티 읽기, 쓰기와 같은 객체에 가해지는 작업을 중간에서 가로채는 객체로, 가로채진 작업은 Proxy 자체에서 처리되기도 하고, 원래 객체가 처리하도록 그대로 전달되기도 합니다. Vue 3에서는 reactive()를 구현할 때 Proxy를 활용하여 반응성을 관리합니다.

---

## 📌 1. Proxy의 기본 구조
`Proxy` 는 두 개의 주요 요소로 구성됩니다.
1. **타겟(target)** → 감싸고 싶은 원본 객체
2. **핸들러(handler)** → 객체의 동작을 가로채는 메서드(트랩, trap)

```typescript
const target = { name: 'Vue', version: 3 }

const handler = {
  get(obj, property) {
    console.log(`${property} 속성을 읽었습니다.`)
    return obj[property]
  },
  set(obj, property, value) {
    console.log(`${property} 속성이 ${value}로 변경되었습니다.`)
    obj[property] = value
    return true // 반드시 true를 반환해야 정상 동작
  }
}

const proxy = new Proxy(target, handler)

console.log(proxy.name) // "name 속성을 읽었습니다." → "Vue"
proxy.version = 4 // "version 속성이 4로 변경되었습니다."
```
- `get` : 속성을 읽을 때 실행됨
- `set` : 속성을 변경할 때 실행됨

---

## 📌 2. Vue 3의 reactive()와 Proxy
Vue 3의 `reactive()`는 `proxy`를 사용하여 반응형 상태를 관리합니다.
```vue
<script setup lang="ts">
import { reactive } from 'vue'

const state = reactive({ count: 0 })

console.log(state.count) // 'get' 트랩이 실행됨
state.count++ // 'set' 트랩이 실행됨
</script>
```
Vue 내부에서 `reactive()`를 사용할 때 `Proxy`는 다음을 수행합니다.
1. 객체 속성 추적 (get 트랩)
2. 속성 변경 감지 및 반응성 트리거 (set 트랩)
3. 속성 추가/삭제 감지
4. 중첩된 객체도 자동으로 반응형 처리

---
## 📌 3. Proxy 핸들러의 주요 트랩
### ① get(target, property, receiver)
- 속성을 읽을 때 실행됨
- Vue에서는 반응성 추적을 위해 사용됨
```js
const handler = {
  get(target, property) {
    console.log(`읽기: ${propterty}`)
    return target[property]
  }
}

const proxyObject = new Proxy({ name: 'Vue' }, handler)

console.log(proxyObject.name) // "읽기: name" → "Vue"
```
---
### ② set(target, property, value, receiver)
- 속성을 변경할 때 실행됨
- Vue에서는 변경 사항을 감지하고 UI 업데이트를 트리거함
```js
const handler = {
  set(target, property, value) {
    console.log(`변경: ${property} = ${value}`)
    target[property] = value
    return true
  }
}
const proxyObject = new Proxy({ count: 0 }, handler)

proxyObject.count = 10 // "변경: count = 10"
```
---
### ③ deleteProperty(target, property)
- 속성을 삭제할 때 실행됨
- Vue에서는 속성 삭제도 반응형으로 처리할 수 있음
```js
const handler = {
  deleteProperty(target, property) {
    console.log(`삭제: ${property}`)
    delete target[property]
    return true
  }
}
const proxyObject = new Proxy({ name: 'Vue' }, handler)

delete proxyObject.name // "삭제: name"
```
---
### ④ has(target, property)
- `in` 연산자로 속성을 확인할 때 실행됨
- Vue 내부에서도 일부 최적화를 위해 사용
```js
const hanlder = {
  has(target, property) {
    console.log(`확인: ${property}`)
    return property in target
  }
}
const proxyObject = new Proxy({ version: 3 }, handler)

console.log('version' in obj) // "확인: version" → true
```
---

## 📌 4. Proxy vs Object.defineProperty()
Vue 2에서는 Object.defineProperty()를 사용하여 반응성을 구현했지만, Proxy가 도입되면서 개선된 점이 많습니다.
|특징|Proxy|Object.defineProperty
|------|---|---|
|객체 속성 추가/삭제 감지|O (자동 감지)|X (추가된 속성은 반응형 X)
|배열 변경 감지|O (push/pop 등 감지)|X (수동으로 처리 필요)
|중첩된 객체 처리|O (자동 처리)|X (재귀적으로 감싸야 함)
|성능|빠름|느림

✔ 결론: Proxy 덕분에 Vue 3의 반응성이 더 강력하고 직관적으로 개선됨.
___
## 📌 5. Proxy의 활용 예제
✅ 1) 데이터 검증 기능 추가
```js
const handler = {
  set(target, property, value) {
    if (property === 'age' && value < 0) {
      console.error('나이는 0 이상이어야 합니다!')
      return false
    }
    target[property] = value
    return true
  }
}

const user = new Proxy({ name: 'Alice', age: 25 }, handler)

user.age = -5 // "나이는 0 이상이어야 합니다!"
```
___
✅ 2) 함수 실행 감지
```js
const handler = {
  apply(target, thisArg, args) {
    console.log(`함수 실행: ${target.name}(${args.join(', ')})`)
    return target(...args)
  }
}

function greet(name) {
  return `Hello, ${name}!`
}

const proxyGreet = new Proxy(greet, handler)

console.log(proxyGreet('Vue'))
// "함수 실행: greet(Vue)"
// "Hello, Vue!"
```
---
✅ 3) 읽기 전용 객체
```js
const readonlyHandler = {
  set() {
    console.log('이 객체는 읽기 전용입니다!')
    return false
  }
}

const readonlyObj = new Proxy({ message: 'Hello' }, readonlyHandler)

readonlyObj.message = 'Hi' // "이 객체는 읽기 전용입니다!"
```
---
## 📌 6. Vue 3에서 Proxy 활용 최적화
Vue 3는 Proxy를 활용하여 반응형 객체를 최적화합니다.

- reactive() 내부적으로 Proxy를 생성하여 데이터 변경을 추적
- shallowReactive()를 사용하면 깊은 감지가 필요 없는 경우 성능 최적화 가능
- readonly()를 사용하면 객체가 변경되지 않도록 보호 가능

```js
import { reactive, readonly } from 'vue'

const state = reactive({ count: 0 }) // Proxy 적용됨
const readOnlyState = readonly(state) // 읽기 전용 Proxy

readOnlyState.count = 5 // 경고 발생 (변경 불가)
```
---
🎯 결론
1. Proxy는 Vue 3의 reactive()에서 반응성을 구현하는 핵심 기술
2. get, set, deleteProperty 등을 활용하여 속성을 추적하고 변경 감지
3. Vue 2의 Object.defineProperty()보다 성능이 뛰어나고, 배열 및 객체 추가/삭제 감지 가능
4. 직접 Proxy를 활용하면 데이터 검증, 보안, 로깅 등 다양한 기능을 추가 가능

> Vue 3의 반응형 시스템을 이해하려면 Proxy의 동작 방식을 숙지하는 것이 필수! 🚀

참고:
[모던 JavaScript](https://ko.javascript.info/proxy)
