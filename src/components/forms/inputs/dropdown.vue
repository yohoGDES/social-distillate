<template>
  <select name="" id="" v-model="proxyValue">
    <template v-if="!modelTypeIsObject">
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </template>
    <template v-else>
      <option
        v-for="option in options"
        :key="option.index"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </template>
  </select>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'dropdown',
  props: {
    modelValue: {
      type: [String, Array, Number, Object]
    },
    options: {
      type: Array as PropType<
        string[] | { label: string; value: string }[] | number[]
      >
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
    const modelTypeIsObject = computed(() => {
      const type = props.options?.[0]
      return typeof type === 'object' && !Array.isArray(type)
    })
    // const getValue = () => {}
    // const getLabel = () => {}
    return {
      proxyValue,
      modelTypeIsObject
    }
  }
})
</script>
<style lang="scss">
select {
  background-color: white;
  border: thin solid $charcoal;
  border-radius: 4px;
  width: 100%;
  display: inline-block;
  font: inherit;
  line-height: 1.5em;
  padding: 0.5em 3.5em 0.5em 1em;
  margin: 0;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;

  background-image: linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
  &:focus {
    background-image: linear-gradient(45deg, $auburn 50%, transparent 50%),
      linear-gradient(135deg, transparent 50%, $auburn 50%),
      linear-gradient(to right, #ccc, #ccc);
    background-position: calc(100% - 15px) 1em, calc(100% - 20px) 1em,
      calc(100% - 2.5em) 0.5em;
    background-size: 5px 5px, 5px 5px, 1px 1.5em;
    background-repeat: no-repeat;
    border-color: $auburn;
    outline: 0;
  }
  &:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 #000;
  }
}
</style>
