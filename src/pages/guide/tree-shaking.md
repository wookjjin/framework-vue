## Tree-shaking이란?
Tree-shaking은 사용되지 않는 코드를 번들에서 제거하여 최종 번들 크기를 줄이는 최적화 기법입니다.
ES 모듈(ESM)의 정적 분석을 기반으로 Side Effect가 없는 코드만 제거됩니다.

## enum의 Tree-shaking 문제
### 1. 컴파일 결과의 차이
TypeScript에서 enum은 런타임 객체로 변환됩니다. 예를 들어:
```ts
// TypeScript
enum Colors {
  Red = 'RED',
  Green = 'GREEN',
  Blue = 'BLUE'
}

console.log(Colors.Red)
```
컴파일 결과 (tsc 사용 시):
```js
// JavaScript
'use strict'
// eslint-disable-next-line no-var
var Colors;
(function (Colors) {
  Colors.Red = 'RED'
  Colors.Green = 'GREEN'
  Colors.Blue = 'BLUE'
})(Colors || (Colors = {}))
console.log(Colors.Red)
```
enum은 **즉시 실행 함수(IIFE)**로 감싸져서 런타임에 객체를 생성합니다.

이 객체는 Side Effect가 있는 것으로 간주되어 Tree-shaking되지 않습니다.
### 2. Side Effect로 인식
enum은 변수 선언이 아닌 함수 호출 형태로 생성됩니다.
번들러(Webpack, Vite 등)는 이 코드를 Side Effect가 있는 것으로 판단하고 제거하지 않습니다.
enum 내부 속성 중 일부만 사용해도 전체 객체가 포함됩니다.
일반 객체의 Tree-shaking
일반 객체는 ES 모듈 시스템을 사용하면 Tree-shaking이 효과적으로 적용됩니다.
```ts
// TypeScript
export const Colors = {
  Red: 'RED',
  Green: 'GREEN',
  Blue: 'BLUE'
} as const
```
컴파일 결과 (tsc 사용 시):
```js
// JavaScript (ESM)
export const Colors = {
  Red: 'RED',
  Green: 'GREEN',
  Blue: 'BLUE'
}
```
ES 모듈의 특징: 정적 분석이 가능하고, import 시 사용된 속성만 번들에 포함됩니다. Side Effect가 없다고 판단하여 사용되지 않는 속성은 제거됩니다.
```ts
// utils/colors.ts
export const Colors = {
  Red: 'RED',
  Green: 'GREEN',
  Blue: 'BLUE'
} as const
```
```ts
// main.ts
import { Colors } from './utils/colors'

console.log(Colors.Red)
```
번들 결과 (console.log(Colors.Red) 만 사용된 경우):
```js
const Colors = {
  Red: 'RED'
}
console.log(Colors.Red)
```
사용된 Red만 번들에 포함되고, Green과 Blue는 제거됩니다.
### 정리
enum의 단점:
- IIFE로 인한 Side Effect로 판단되어 Tree-shaking 비효율적
- 일부만 사용해도 전체 객체가 포함됨

일반 객체의 장점:
- ESM의 정적 분석으로 사용된 속성만 번들에 포함
- Tree-shaking 효율적이며 번들 크기 감소
