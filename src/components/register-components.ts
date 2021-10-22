import { App } from 'vue'

// Form Basics
import scFormRow from '@/components/forms/sc-form-row.vue'
import scLabel from '@/components/forms/sc-form-label.vue'
import scDescription from '@/components/forms/sc-form-description.vue'

// Form Inputs
import scButton from '@/components/forms/inputs/button.vue'
import dropdown from '@/components/forms/inputs/dropdown.vue'
import currency from '@/components/forms/inputs/currency.vue'

const ns = 'sc'

export const registerComponents = (app: App): void => {
  app.component(`${ns}-dropdown`, dropdown)
  app.component(`${ns}-currency`, currency)
  app.component(`${ns}-form-row`, scFormRow)
  app.component(`${ns}-form-label`, scLabel)
  app.component(`${ns}-form-description`, scDescription)
  app.component(`${ns}-button`, scButton)
}