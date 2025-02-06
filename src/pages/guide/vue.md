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
