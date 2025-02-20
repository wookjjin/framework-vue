### 📜 Vue 3에서 TypeScript를 사용하여 안정적인 코드 작성

## 타입스크립트란?
타입스크립트는 자바스크립트의 슈퍼셋으로, 정적 타입 검사와 객체지향 프로그래밍 기능을 추가한 프로그래밍 언어입니다. 자바스크립트와 달리 브라우저에서 실행하기 위해 변환 과정인 컴파일을 거쳐야 합니다.

> 슈퍼셋
**computer science**
> A programming language that contains all the features of a given language and has been expanded or enhanced to include other features as well.
>> 주어진 언어의 모든 기능을 포함하고 다른 기능도 포함하도록 확장되거나 향상된 프로그래밍 언어입니다.

## 주요특징
1. **정적 타입 검사**
- 컴파일 단계에서 타입 오류를 확인할 수 있어 런타임 에러를 줄이고 코드 안정성을 높입니다.
```typescript
let age: number = 30
age = '서른' // error: 'string' 타입을 'number' 타입에 할당할 수 없음
```

2. **타입 추론**
- 명시적으로 타입을 정의하지 않아도 타입스크립트가 추론합니다.
```typescript
let name = 'John' // string 타입으로 추론
name = 123 // error: 'number' 타입을 'string' 타입에 할당할 수 없음
```

3. **인터페이스 및 타입 별칭**
- 인터페이스: 타입스크립트에서 인터페이스는 객체의 타입을 정의할 때 사용됩니다.
```typescript
interface User {
  name: string
  age: number
}

const user: User = {
  name: 'Alice',
  age: 25
}
```
- 타입 별칭: 모든 타입에 별칭을 부여하는 것입니다. 아래와 같이 유니언 타입에 대하여 타입 별칭을 부여할 수도 있습니다.
```typescript
type ID = number | string
```

> **타입 별칭과 인터페이스의 차이점**
타입 별칭과 인터페이스는 매우 유사하며, 대부분의 경우 둘 중 하나를 자유롭게 선택하여 사용할 수 있습니다. interface가 가지는 대부분의 기능은 type에서도 동일하게 사용 가능합니다. 이 둘의 가장 핵심적인 차이는, 타입은 새 프로퍼티를 추가하도록 개방될 수 없는 반면, 인터페이스의 경우 항상 확장될 수 있다는 점입니다.

```typescript
// interface: 확장하기
interface Animal {
  name: string
}

interface Bear extends Animal {
  honey: boolean
}

const bear = getBear()
bear.name
bear.honey

// type: 교집합을 통하여 타입 확장하기
type Animal = {
  name: string
}

type Bear = Animal & {
  honey: boolean
}

const bear = getBear()
bear.name
bear.honey
```
```typescript
// 기존의 인터페이스에 새 필드를 추가하기
interface Window {
  title: string
}

interface Window {
  ts: TypeScriptAPI
}

const src = 'const a = "Hello World"'
window.ts.transpileModule(src, {})

// 타입은 생성된 뒤에는 달라질 수 없다
type Window = {
  title: string
}

type Window = {
  ts: TypeScriptAPI
}

// Error: Duplicate identifier 'Window'.
 ```

> 🚦객체의 타입을 지정할 때는 interface 사용을, 원시 타입을 지정할 때 type 사용을 권장합니다.

4. **enum**
enum은 특정 값들의 집합을 의미하는 자료형입니다. 타입스크립트에서는 문자형 enum과 숫자형 enum을 지원합니다.

```typescript
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}
```
위와 같이 enum 선언 시 초기값을 주면 초기 값부터 차례로 증가합니다.

```
Up - 1
Down - 2
Left - 3
Right - 4
```
아래와 같이 초기값을 주지 않으면 0부터 차례로 증가합니다.
```typescript
enum Direction {
  Up, // 0
  Down, // 1
  Left, // 2
  Right // 3
}
```

문자형 enum은 숫자형 enum과 달리 초기값을 다 지정해 주어야 합니다.
```typescript
enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
  Guest = 'GUEST'
}
```

enum을 사용하면 숫자나, 문자열을 하드코딩하지 않아 수정 및 유지보수가 쉽다는 장점이 있습니다. 하지만, javascript로 컴파일되면 IIFE(즉시 실행 함수) 형태로 변환되어 번들 크기가 증가할 수 있고 Tree-shaking 비효율적입니다.
```js
// eslint-disable-next-line no-var
var UserRole;
(function (UserRole) {
  UserRole.Admin = 'ADMIN'
  UserRole.User = 'USER'
  UserRole.Guest = 'GUEST'
})(UserRole || (UserRole = {}))
```

4. enum의 대안 객체 리터럴(as const)
```typescript
const Color = {
  Red: 'RED',
  Green: 'GREEN',
  Blue: 'BLUE'
} as const

type ColorType = typeof Color[keyof typeof Color]

let color: ColorType
color = Color.Red // ✅ 올바른 사용
color = 'RED' // ✅ 올바른 사용
color = 'YELLOW' // ❌ 오류 발생
```
🔎 [tree-shaking](/guide/tree-shaking)

5. Vue3 환경에서 TS 사용하기
`setup()`훅은 컴포지션 API 사용을 위한 진입점 역할을 합니다. `<script>`블록에 언어 전처리기를 명시하여 Typescript를 사용할 수 있습니다.
```vue
<script lang="ts">
// TypeScript 사용
</script>
```

- 컴포넌트 Props 타입 지정하기
```ts
export interface Props {
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})
```

- Emits 타입 지정하기
```ts
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
```

- 유지보수를 위해 서비스(메뉴)별로 ts 파일을 각각 생성하여 타입을 지정합니다.
- interface로 지정한 타입은 `I`를 접두사로하여 타입 지정을 합니다. ex) intreface IButtonProps
- type으로 지정한 타입은 `T`를 접두사로하여 타입 지정을 합니다. ex) type TUserId
