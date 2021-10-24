<template>
  <teleport to="body">
    <div class="alerts" v-if="alerts.length > 0">
      <alert v-for="alert in alerts" :key="alert" :alert="alert" />
    </div>
  </teleport>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useAlertStore } from '@/store/modules/alerts'
import alert from '@/components/alerts/alert.vue'
export default defineComponent({
  name: 'alerts',
  components: {
    alert
  },
  setup() {
    const alertStore = useAlertStore()

    const alerts = computed(() => alertStore.alerts)
    return {
      alerts
    }
  }
})
</script>
<style lang="scss">
.alerts {
  position: fixed;
  width: 100%;
  z-index: 9999;
  top: 10px;
  left: auto;
  right: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
}
</style>
