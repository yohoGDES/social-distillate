<template>
  <input class="sc-text" type="text" v-model="proxyValue" />
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'sc-text',
  props: {
    modelValue: {
      type: String
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const proxyValue = computed({
      get: () => {
        return props.modelValue || ''
      },
      set: (value) => {
        emit('update:modelValue', value)
      }
    })
    return {
      proxyValue
    }
  }
})
</script>
<style lang="scss" scoped>
input.sc-text {
  border: 1px solid #2c3e50;
  border-radius: 4px;
  width: 100%;
  display: block;
  font: inherit;
  line-height: 1.5em;
  padding: 0.5em 3.5em 0.5em 1em;
}
</style>