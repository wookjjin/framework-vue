import type { UserModule } from '~/types'
import { createHeadCore } from '@unhead/vue'

// eslint-disable-next-line unused-imports/no-unused-vars
export const install: UserModule = ({ isClient, initialState, app }) => {
  app.use(createHeadCore)
}
