import type { UserModule } from '~/types'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

// eslint-disable-next-line unused-imports/no-unused-vars
export const install: UserModule = ({ isClient, initialState, app }) => {
  app.component('VueDatePicker', VueDatePicker)
}
