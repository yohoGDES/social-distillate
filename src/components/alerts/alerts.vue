<template>
  <teleport to="body">
    <div class="alerts">
      <transition-group name="alerts">
        <alert v-for="alert in alerts" :key="alert" :alert="alert" />
      </transition-group>
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
.alerts-enter-active,
.alerts-leave-active {
  transition: all 350ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.alerts-enter-from,
.alerts-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
</style>
