<template>
  <label for=""><slot></slot></label>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'sc-form-label',
  props: {
    label: String
  },
  setup() {
    return {}
  }
})
</script>
<style lang="scss" scoped>
label {
  font-weight: bold;
  display: block;
}
</style>
