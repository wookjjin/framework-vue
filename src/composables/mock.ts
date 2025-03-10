import MockAdapter from 'axios-mock-adapter'
import axios from './request' // axios 인스턴스 import

const mock = new MockAdapter(axios, { delayResponse: 500 })

// Mock 설정 함수
export function setupMockServer() {
  // example: GET 요청 모킹
  mock.onGet('/example').reply(200, {
    message: 'Mocked GET response',
  })

  // example: POST 요청 모킹
  mock.onPost('/example').reply(201, {
    message: 'Mocked POST response',
  })

  // example: PUT 요청 모킹
  mock.onPut('/example').reply(200, {
    message: 'Mocked PUT response',
  })

  // example: DELETE 요청 모킹
  mock.onDelete('/example').reply(204)

  // example: 동적 파라미터 처리
  mock.onGet(/\/example\/\d+/).reply((config) => {
    const id = config.url?.split('/').pop()
    return [200, { message: `Mocked response for ID: ${id}` }]
  })

  mock.onGet('/user-detail').reply(200, {
    result: {
      userName: 'John',
      age: '24',
      address: 'address',
    },
  })
  mock.onPost('/user').reply((config) => {
    const requestData = JSON.parse(config.data); // 요청 데이터 파싱

    return [200, {
      result: {
        message: 'Success',
        receivedData: requestData // 받은 데이터 확인용
      }
    }];
  });
}

// Mock 초기화 (개발 환경에서만 활성화)
if (import.meta.env.MODE === 'development') {
  setupMockServer()
}
