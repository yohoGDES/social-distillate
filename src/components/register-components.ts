import { App } from 'vue'

// UI Elements
import alerts from '@/components/alerts/alerts.vue'
import codePill from '@/components/code-pill/code-pill.vue'

// Form Basics
import scFormRow from '@/components/forms/sc-form-row.vue'
import scLabel from '@/components/forms/sc-form-label.vue'
import scDescription from '@/components/forms/sc-form-description.vue'

// Form Inputs
import scText from '@/components/forms/inputs/text.vue'
import scTextarea from '@/components/forms/inputs/textarea.vue'
import scButton from '@/components/forms/inputs/button.vue'
import scRadio from '@/components/forms/inputs/radio.vue'
import dropdown from '@/components/forms/inputs/dropdown.vue'
import currency from '@/components/forms/inputs/currency.vue'

const ns = 'sc'

export const registerComponents = (app: App): void => {
  app.component(`alerts`, alerts)
  app.component(`code-pill`, codePill)
  app.component(`${ns}-dropdown`, dropdown)
  app.component(`${ns}-text`, scText)
  app.component(`${ns}-textarea`, scTextarea)
  app.component(`${ns}-radio`, scRadio)
  app.component(`${ns}-currency`, currency)
  app.component(`${ns}-form-row`, scFormRow)
  app.component(`${ns}-form-label`, scLabel)
  app.component(`${ns}-form-description`, scDescription)
  app.component(`${ns}-button`, scButton)
}
