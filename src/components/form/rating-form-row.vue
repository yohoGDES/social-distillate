<template>
  <div class="rating-form-row">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'rating-form-row',
  setup() {
    return {}
  }
})
</script>
<style lang="scss" scoped>
.rating-form-row {
  display: block;
  margin-bottom: 30px;
}
</style>
