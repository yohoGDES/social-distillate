<template>
  <div class="rating-form-row">
    <label v-if="label" for="">{{ label }}</label>
    <p v-if="description" class="rating-form-row__description">
      {{ description }}
    </p>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'rating-form-row',
  props: {
    label: String,
    description: String
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
.rating-form-row {
  display: block;
  margin-bottom: 20px;
}
.rating-form-row__description {
  font-size: 14px;
  color: rgb(110, 110, 110);
  margin: 2px 0 8px;
}
</style>
