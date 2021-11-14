<template>
  <div v-for="(option, idx) in options" :key="option.index">
    <input
      type="radio"
      :id="getOptionId(option, idx)"
      :value="option"
      v-model="proxyValue"
    />
    <label :for="getOptionId(option, idx)">{{ option }}</label>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { kebabCase } from 'lodash'
import { makeId } from '@/utilities'
export default defineComponent({
  name: 'sc-radio',
  props: {
    options: {
      type: Array
    },
    modelValue: {
      type: [String, Object, Boolean]
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
    const uuid = computed(() => makeId())
    const getOptionId = (option: string, index: number) =>
      `${index}-${uuid.value}-${kebabCase(option)}`
    return {
      proxyValue,
      getOptionId
    }
  },
})
</script>
