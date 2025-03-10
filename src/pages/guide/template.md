## 🔹 Vue 3의 slot과 provide/inject 개념
Vue 3에서는 slot과 provide/inject를 사용하여 컴포넌트 간 데이터 전달 및 구조화된 UI를 구성할 수 있습니다.
하지만 두 개념은 서로 다른 목적을 가집니다.

### 📌 1. slot : 부모 → 자식으로 UI(마크업) 전달
slot은 부모 컴포넌트에서 자식 컴포넌트의 특정 부분을 동적으로 채울 수 있도록 해줍니다.
즉, UI(HTML 마크업)를 부모가 직접 정의하면서도 자식 컴포넌트를 재사용할 수 있게 합니다.

**단일 Slot**:
```vue
<!-- 부모 컴포넌트 -->
<template>
  <BaseCard>
    <p>이 내용이 BaseCard의 slot에 들어갑니다!</p>
  </BaseCard>
</template>

<!-- BaseCard.vue (자식) -->
<template>
  <div class="card">
    <slot></slot> <!-- 부모가 여기에 내용을 넣을 수 있음 -->
  </div>
</template>
```

**Named Slot**:
```vue
<!-- 부모 컴포넌트 -->
<template>
  <Modal>
    <template #header>
      제목입니다
    </template>
    <template #default>
      본문 내용입니다
    </template>
    <template #footer>
      닫기 버튼
    </template>
  </Modal>
</template>

<!-- Modal.vue (자식) -->
<template>
  <div class="modal">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main> <!-- 기본 슬롯 -->
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
```

### 📌 2. provide/inject : 조상 → 후손으로 데이터 전달
provide/inject는 컴포넌트 계층이 깊을 때 유용합니다. props를 중간 컴포넌트마다 계속 전달할 필요 없이, 최상위 조상이 데이터를 제공하고 하위 컴포넌트가 바로 접근할 수 있습니다.

```vue
<!-- 조상 컴포넌트 -->
<script setup>
import { provide } from 'vue'

provide(/* 키 */ 'theme', /* 값 */ 'dark') // key: 'theme', value: 'dark'
</script>

<template>
  <ChildComponent />
</template>
```

```vue
<!-- 자손 컴포넌트 (ChildComponent.vue) -->
<script setup>
import { inject } from 'vue'

const theme = inject('theme') // 'dark' 값을 가져옴
</script>

<template>
  <p>현재 테마: {{ theme }}</p>
</template>
```

### Symbol Key 사용하기
문자열을 키를 사용하면 우연히 같은 키를 다른 컴포넌트에서 사용하게 될 위험이 있습니다.
다른 개발자가 이 키를 사용하여 값을 변경할 경우 의도치 않게 충돌이 발생하게 됩니다.
잠재적 충돌을 피하기 위하여 Symbol을 사용하는 것이 좋습니다.

```ts
// keys.ts (공통 파일)
export const themeKey = Symbol('theme')
```

```vue
<!-- 부모 컴포넌트 -->
<script setup>
import { provide } from 'vue'
import { themeKey } from './keys'

provide(themeKey, 'dark') // Symbol 키로 제공
</script>
```

```vue
<!-- 자식 컴포넌트 -->
<script setup>
import { inject } from 'vue'
import { themeKey } from './keys'

const theme = inject(themeKey) // Symbol을 사용해 안전하게 가져옴
</script>
```

**🎯 정리** :
Symbol은 생성할 때마다 매번 새로운 Symbol이 생성됩니다. 따라서, 고유한 키를 보장하여 충돌 방지,다른 코드에서 의도치 않게 덮어쓰는 문제를 해결할 수 있습니다.
