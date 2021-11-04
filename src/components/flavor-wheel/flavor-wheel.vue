<template>
  <flavor-wheel-chart :flavors="proxyValue" />
  <div class="flavor-scales">
    <div
      class="flavor-scale"
      v-for="(flavor, index) in proxyValue"
      :key="index"
    >
      <label for="">{{ flavor.name }} ({{ flavor.value }})</label>
      <div class="flavor-scale__input">
        <range v-model="flavor.value" :min="0" :max="5" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import range from '@/components/forms/inputs/range.vue'
import flavorWheelChart from '../flavor-wheel/flavor-wheel-chart.vue'
import { Flavor } from '@/types'
export default defineComponent({
  components: { flavorWheelChart, range },
  props: {
    modelValue: {
      type: Array as PropType<Array<Flavor>>,
      required: true
    }
  },
  emits: ['update:modelValue'],
  name: 'flavor-wheel',
  setup(props, { emit }) {
    const proxyValue = computed({
      get: () => {
        return props.modelValue
      },
      set: (value) => {
        emit('update:modelValue', value)
      }
    })
    return {
      proxyValue
    }
  }
})
</script>
<style lang="scss">
.flavor-scales {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .flavor-scale {
    width: 46%;
    padding: 0 2%;
    margin-bottom: 8px;
  }
}
.flavor-wheel-bars {
  width: 320px;
  height: 320px;
  background: pink;
  margin: 0 auto;
  border-radius: 100%;
  position: relative;
  display: flex;
  justify-content: center;
}
.flavor-wheel-bars__flavor {
  // background-color: aqua;
  position: absolute;
  // top: 47%;
  // left: 50%;
  // height: 20px;
  // width: 50%;
  transform-origin: left;
  clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
  background-color: blueviolet;
  height: 160px;
  width: 64px;
  border-radius: 13px;
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
}
.flavor-wheel-bars__fill {
  width: 100%;
  height: 100%;
  background-color: indigo;
}
</style>
