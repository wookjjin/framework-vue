### 📐 유지보수성과 확장성을 고려한 컴포넌트 설계

## Component란?
컴포넌트는 프로그래밍에서 **재사용이 가능**한 **독립된 모듈**을 뜻합니다. (=재사용이 가능한 코드 블록)

## 컴포넌트의 특징
1. 재사용성 (Reusability)
- 동일한 UI 조각을 여러 곳에서 반복해서 사용할 수 있습니다.
- 예: 버튼, 모달, 카드, 입력 필드 등.

2. 모듈화 (Modularity)
- 복잡한 애플리케이션을 작은 컴포넌트 단위로 나누어 관리하기 쉽습니다.
- 코드 유지보수가 편리하고 디버깅이 쉬워집니다.

3. 독립성 (Isolation)
각 컴포넌트는 자체 상태(state)와 스타일을 갖기 때문에 다른 컴포넌트와 충돌하지 않습니다.

## Component 설계하기
Component 설계 시 중요한 점은 결합도는 낮게, 응집도는 높게 설계하는 것입니다. 물론 서비스의 특성이나 상황에 따라 유연하게 적용해야 하지만, 유지보수 측면에서는 응집도는 높을수록, 결합도는 낮을수록 유리합니다.
이를 토대로 유지보수성과 확장성을 고려해 공통 UI Input 컴포넌트를 정의하려 합니다.

<details>
<summary>BasicInput.vue</summary>

```vue
<script setup lang="ts">
export interface IBasicInputProps {
  type: 'text'
  label?: string
  placeholder?: string
  width?: string
  required?: boolean
  disabled?: boolean
  clearable?: boolean
  minlength?: string
  maxlength?: string
  readonly?: boolean
}

const props = withDefaults(defineProps<IBasicInputProps>(), {
  type: 'text',
  label: '',
  placeholder: 'Enter the input',
  width: '100%',
  size: 'md',
  required: false,
  disabled: false,
  clearable: false,
  minlength: undefined,
  maxlength: undefined,
  readonly: false,
})

const model = defineModel()
const inputInstance = ref<HTMLInputElement>()
</script>

<template>
  <div>
    <label :class="{ 'is-required': required }">{{ label }}</label>
    <div :class="`size-${size}`">
      <input ref="inputInstance" v-model="model" :type="text" :placeholder="placeholder" :disabled="disabled" :minlength="minlength" :maxlength="maxlength" :readonly="readonly">
      <div v-if="clearable && model">
        <button>
          <icon name="clear__full--abb" width="24" height="24" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
```
</details>

- input element의 attribute를 토대로 props 설정
- 데이터 바인딩에 defineModel 사용

## 확장하기
위에서 기본적인 Input Element를 작성하였습니다. 위 Component를 토대로 password input으로 확장해보려고 합니다.

<details>
<summary>PasswordInput.vue</summary>

```vue
<script setup lang="ts">
export interface IPasswordInputProps extends IBasicInputProps {
  type: 'password'
  showPasswordOn?: boolean
}

const props = withDefaults(defineProps<IPasswordInputProps>(), {
  type: 'text',
  label: '',
  placeholder: 'Enter the input',
  width: '100%',
  size: 'md',
  required: false,
  disabled: false,
  clearable: false,
  minlength: undefined,
  maxlength: undefined,
  readonly: false,
  showPasswordOn: false
})

const model = defineModel()
const inputInstance = ref<HTMLInputElement>()
</script>

<template>
  <div>
    <label :class="{ 'is-required': required }">{{ label }}</label>
    <div :class="`size-${size}`">
      <input ref="inputInstance" v-model="model" :type="text" :placeholder="placeholder" :disabled="disabled" :minlength="minlength" :maxlength="maxlength" :readonly="readonly">
      <div v-if="clearable && model">
        <button>
          <icon name="clear__full--abb" width="24" height="24" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
```
</details>
