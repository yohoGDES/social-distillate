<template>
  <textarea
    class="sc-textarea"
    ref="notes"
    v-model="proxyValue"
    name=""
    id=""
    cols="30"
    rows="8"
  />
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'sc-textarea',
  props: {
    modelValue: {
      type: String
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const proxyValue = computed({
      get: () => {
        return props.modelValue
      },
      set: (val) => {
        emit('update:modelValue', val)
      }
    })
    return {
      proxyValue
    }
  }
})
</script>
<style lang="scss" scoped>
.sc-textarea {
  border: 1px solid gray;
  border-radius: 3px;
  padding: 8px 12px;
  display: block;
  min-height: 120px;
  margin: 0 0 20px;
  text-align: left;
  width: 100%;
  font-size: 16px;
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
