<template>
  <div class="sc-form-row">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'sc-form-row',
  setup() {
    return {}
  }
})
</script>
<style lang="scss" scoped>
.sc-form-row {
  display: block;
  margin-bottom: 30px;
}
</style>
