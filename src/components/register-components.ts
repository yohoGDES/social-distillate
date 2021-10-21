import { App } from 'vue'

// Form Basics
import scFormRow from '@/components/form/sc-form-row.vue'
import scLabel from '@/components/form/sc-form-label.vue'
import scDescription from '@/components/form/sc-form-description.vue'

// Form Inputs
import formButton from '@/components/form/inputs/button.vue'
import dropdown from '@/components/form/inputs/dropdown.vue'
import currency from '@/components/form/inputs/currency.vue'

const ns = 'sc'

export const registerComponents = (app: App): void => {
  app.component(`${ns}-dropdown`, dropdown)
  app.component(`${ns}-currency`, currency)
  app.component(`${ns}-form-row`, scFormRow)
  app.component(`${ns}-form-label`, scLabel)
  app.component(`${ns}-form-description`, scDescription)
  app.component(`${ns}-button`, formButton)
}