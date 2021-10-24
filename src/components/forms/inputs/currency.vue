<template>
  <input
    class="currency-input"
    ref="inputRef"
    type="text"
    :value="formattedValue"
  />
</template>

<script>
import { defineComponent } from 'vue'
import { useCurrencyInput } from 'vue-currency-input'
// Plugin config options: https://dm4t2.github.io/vue-currency-input/config.html

export default defineComponent({
  name: 'CurrencyInput',
  props: {
    modelValue: Number,
    options: Object
  },
  setup(props) {
    const { formattedValue, inputRef } = useCurrencyInput(props.options)

    return { inputRef, formattedValue }
  }
})
</script>
<style lang="scss">
.currency-input {
  padding: 12px 8px;
  font-size: 16px;
  border: 1px solid $charcoal;
  width: 100%;
  border-radius: 3px;
}
</style>
