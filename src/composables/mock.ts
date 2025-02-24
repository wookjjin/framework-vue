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
}

// Mock 초기화 (개발 환경에서만 활성화)
if (import.meta.env.MODE === 'development') {
  setupMockServer()
}
