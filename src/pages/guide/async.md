## 비동기 처리

### 1. try-catch
- 형태
```js
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data')
    const data = await response.json()
    console.log(data)
    return data
  }
  catch (error) {
    console.error('Error:', error)
  }
}
```

- 특징:
  - await과 함께 사용하여 비동기 코드를 동기적으로 작성할 수 있습니다.
  - 코드가 더 직관적이고 return 문을 사용할 때 가독성이 좋습니다.
  - try 블록에서 예외가 발생하면 바로 catch 블록으로 이동합니다.

- 장점:
  - 동기식 코드처럼 읽혀서 가독성이 좋음.
  - return 문을 사용할 때 흐름이 자연스러움.

- 단점:
  - try...catch 블록이 중첩되면 코드가 지저분해질 수 있음.
  - 블록의 길이가 길어지면 가독성이 떨어질 수 있음.

### 2. then...catch
- 형태
```js
function fetchData() {
  fetch('https://api.example.com/data')
    .then(response => response.json())
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}
```
- 특징:
  - Promise 객체의 메서드를 체이닝하여 사용합니다.
  - then은 비동기 작업이 완료된 후 실행되고, catch는 에러가 발생한 경우 실행됩니다.

- 장점:
  - 비동기 작업들을 체이닝하기 쉽고, 각각의 작업에 대해 개별적으로 에러 핸들링이 가능합니다.
  - 코드가 함수형 프로그래밍 스타일에 가깝습니다.

- 단점:
  - 체이닝이 길어지면 콜백 지옥처럼 가독성이 떨어질 수 있음.
  - return 문을 사용하는 경우 코드 흐름이 직관적이지 않을 수 있음.

### 3. then...catch + async...await을 사용하는 경우
예를 들어 아래와 같은 코드를 봤을 때:
```js
async function fetchData() {
  await fetch('https://api.example.com/data')
    .then(response => response.json())
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}
```
- 비효율적인 이유:
  - await을 사용하면 Promise가 resolve될 때까지 기다리므로, then을 굳이 체이닝할 필요가 없습니다.
  - await 다음의 then은 불필요하게 비동기를 중첩하는 형태가 됩니다.
  - 차라리 await과 try...catch를 같이 쓰는 게 더 직관적이고 효율적입니다.

- 개선된 코드:
```js
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data')
    const data = await response.json()
    console.log(data)
  }
  catch (error) {
    console.error('Error:', error)
  }
}
```
- 이유:
  - await 자체가 Promise가 resolve될 때까지 기다리므로 then이 필요 없습니다.
  - 예외 발생 시 try...catch 블록에서 바로 처리할 수 있습니다.
  - 코드가 더 직관적이고 가독성이 높습니다.

**결론**:
- await을 쓴 이상 then 체이닝은 불필요하고 오히려 코드의 복잡성만 높여 비효율적입니다.
- async...await과 try...catch 조합이 더 깔끔하고 유지보수하기 좋은 코드가 됩니다.
- then...catch는 단순한 비동기 체이닝이나 Promise.all() 같은 경우에 유용할 수 있지만, async...await을 이미 사용하고 있다면 혼용하지 않는 게 좋습니다.

### 4. 비교

1) then...catch 방식:
```js
function fetchData() {
  fetch('https://api.example.com/data')
    .then(response => response.json())
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}
```
2) async...await + try...catch 방식:
```js
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data')
    const data = await response.json()
    console.log(data)
  }
  catch (error) {
    console.error('Error:', error)
  }
}
```
차이점:
- then...catch는 비동기 흐름을 추적하기 어려워 디버깅이 불편할 수 있음.
- async...await은 마치 동기 코드처럼 읽혀 가독성과 유지보수성이 좋음.
- try...catch로 에러 핸들링이 직관적이고, return 흐름이 자연스러움.

async...await + try...catch 장점:
1. 가독성 향상:
- await은 동기 코드처럼 읽히므로 비동기 로직의 흐름이 더 명확해짐.
- 중첩된 then() 체인에 비해 코드가 깔끔해짐.

2. 디버깅 및 에러 트래킹:
- try...catch는 console.log로 에러 위치를 확인하기 쉽고, breakpoint 설정도 용이.
- then...catch는 호출 스택이 깊어지면 디버깅이 어려워질 수 있음.

3. 일관성 유지:
- 혼용하면 가독성과 유지보수성이 떨어짐.
- async...await으로 통일하면 코드 리뷰와 협업이 더 쉬워짐.

<details>
<summary>에러 발생 예제</summary>

```js
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then((data) => {
    console.log('Step 1:', data)
    return data.id
  })
  .then((id) => {
    console.log('Step 2:', id)
    return fetch(`https://api.example.com/detail/${id}`)
  })
  .then(detailResponse => detailResponse.json())
  .then((detailData) => {
    // 여기서 에러 발생
    console.log('Step 3:', detailData.nonExistentProperty.toUpperCase())
  })
  .catch((error) => {
    console.error('Error:', error)
  })
```
문제점:
- then 체인이 길어지면서 에러 발생 위치가 모호해짐.
- catch 블록에서는 단순히 에러 메시지만 출력되므로 어느 단계에서 에러가 발생했는지 확인하기 어려움.
특히 비동기 호출 스택 때문에 콜 스택 추적이 복잡해짐.

async...await + try...catch 사용 시 개선점:
```js
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data')
    const data = await response.json()
    console.log('Step 1:', data)

    const id = data.id
    console.log('Step 2:', id)

    const detailResponse = await fetch(`https://api.example.com/detail/${id}`)
    const detailData = await detailResponse.json()

    // 여기서 에러 발생 시 try...catch에서 바로 잡힘
    console.log('Step 3:', detailData.nonExistentProperty.toUpperCase())
  }
  catch (error) {
    console.error('Error:', error)
  }
}
```
개선점:
- 에러 발생 위치가 명확합니다. 에러가 발생하면 catch 블록에서 처리되지만 코드 흐름을 보면 어느 await에서 에러가 발생했는지 쉽게 파악할 수 있습니다.
- try 블록 안에서 console.log 위치를 보면 디버깅 포인트가 명확해집니다.
- await 자체가 Promise의 resolve를 기다리므로 비동기 호출 스택 문제 없이 동기 코드처럼 디버깅할 수 있습니다.
- return 흐름이 명확해지고 then 체인이 없어서 가독성이 크게 향상됩니다.

결론
- then...catch는 체인이 길어질수록 디버깅이 어려워지는 단점이 있음.
- async...await + try...catch는 비동기 호출 스택 문제 없이 디버깅이 직관적이고 유지보수가 쉬움.
- 디버깅 경험의 차이를 강조하며 가독성과 생산성 향상 관점에서 교육하면 설득력이 커집니다.
</details>
