<template>
  <div
    class="alert"
    :class="`alert--${alert.messageType} alert--${alert.type}`"
  >
    {{ alert.message }}
    <span v-if="alert.type === AlertType.TOAST">| <a href="" @click.prevent="close(alert)">Close</a></span
    >
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Alert, AlertType, useAlertStore } from '@/store/modules/alerts'
export default defineComponent({
  name: 'alert',
  props: {
    alert: {
      type: Object as PropType<Alert>
    }
  },
  setup() {
    const alertStore = useAlertStore()
    const close = (alert: Alert) => alertStore.removeAlert(alert)
    return {
      AlertType,
      close
    }
  }
})
</script>
<style lang="scss">
.alert {
  position: relative;
  transition: all 275ms;
  padding: 8px 10px;
  margin-bottom: 5px;
  border-radius: 3px;
  &--error {
    background-color: $old-oak;
    color: white;
  }
  &--success {
    background-color: green;
    color: white;
  }
  &--warning {
    background-color: $corn;
    color: $charcoal;
  }
  &--info {
    color: white;
    background-color: lighten($charcoal, 15%);
  }
}
</style>
