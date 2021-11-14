<template>
  <button
    class="sc-button"
    :class="`sc-button--${rank} ${customWidth} ${buttonSize}`"
    :type="type"
    @click="$emit('clicked')"
  >
    <slot></slot>
  </button>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'sc-button',
  emits: ['clicked'],
  props: {
    type: {
      type: String,
      default: 'button',
      description: `Accepts HTML5 button types: ['button', 'submit', 'menu', 'reset']`
    },
    rank: {
      type: String,
      default: 'secondary',
      description:
        'Importance of the button, Accepts: [primary, secondary, tertiary]'
    },
    width: {
      type: String,
      description: `[full, half]`
    },
    size: {
      type: String,
      default: 'medium',
      description: `[small, medium, large]`
    }
  },
  setup(props) {
    const customWidth = computed(() => {
      const width = props.width
      if (!width) return ''
      return width === 'full' ? 'sc-button--full' : 'sc-button--half'
    })
    const buttonSize = computed(() => {
      const size = props.size
      if (!size) return ''
      return `sc-button--${size}`
    })
    return {
      customWidth,
      buttonSize
    }
  }
})
</script>
<style lang="scss" scope>
.sc-button,
a.sc-button {
  display: inline-block;
  background: none;
  border: 1px solid $charcoal;
  color: $charcoal;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  // Size
  &--small {
    font-size: 14px;
    padding: 5px 8px;
  }
  &:hover,
  &:active {
    color: white;
    background-color: $charcoal;
    border-color: $charcoal;
  }
  &--primary {
    color: $auburn;
    border-color: $auburn;
    &:hover,
    &:active {
      background-color: $auburn;
      border-color: $auburn;
    }
  }
  // Width
  &--full {
    width: 100%;
  }
  &--half {
    width: 48%;
  }
}
</style>
