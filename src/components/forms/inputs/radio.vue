<template>
  <div v-for="option in options" :key="option.index">
    <input type="radio" name="" id="" :value="option" v-model="proxyValue" />
    <label>{{ option }}</label>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { makeId } from '@/utilities'
export default defineComponent({
  name: 'sc-radio',
  props: {
    options: {
      type: Array
    },
    modelValue: {
      type: [String, Object]
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const proxyValue = computed({
      get: () => {
        return props.modelValue
      },
      set: (value) => {
        emit('update:modelValue', value)
      }
    })
    return {
      proxyValue
    }
  },
})
</script>
