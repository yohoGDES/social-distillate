<template>
  <span class="code-pill" v-if="value">{{ value }}</span>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'code-pill',
  props: {
    value: {
      type: String
    }
  },
  setup() {
    return {}
  },
})
</script>
<style lang="scss">
.code-pill {
  background: lighten($charcoal, 65%);
  border-radius: 6px;
  border-color: $charcoal;
  color: lighten($charcoal, 5%);
  font-family: monospace;
  padding: 2px 6px;
  font-size: 14px;
  font-weight: normal;
}
</style>
