<template>
  <p v-if="slotHasValue" class="sc-form-description">
    <slot></slot>
  </p>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'sc-form-description',
  setup(_, { slots }) {
    const slotHasValue = computed(() => !!slots.default)
    return {
      slotHasValue
    }
  }
})
</script>
<style lang="scss" scoped>
.sc-form-description {
  font-size: 14px;
  color: rgb(110, 110, 110);
  margin: 2px 0 8px;
}
</style>