<template>
  <flavor-wheel-chart :flavors="flavors" />
  <div class="flavor-scales">
    <div v-for="(flavor, index) in flavors" :key="index">
      <label for="">{{ flavor.name }} ({{ flavor.value }})</label>
      <div class="flavor-scale__input">
        <input
          type="range"
          name=""
          v-model="flavor.value"
          id=""
          min="0"
          max="5"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import flavorWheelChart from '../flavor-wheel/flavor-wheel-chart.vue'
import { Flavor } from '@/types'
export default defineComponent({
  components: { flavorWheelChart },
  name: 'flavor-wheel',
  setup() {
    const flavors: Flavor[] = reactive([
      {
        key: 'smoky',
        name: 'Smoky',
        value: 0
      },
      {
        key: 'peaty',
        name: 'Peaty',
        value: 0
      },
      {
        key: 'herbal',
        name: 'Herbal',
        value: 0
      },
      {
        key: 'oily',
        name: 'Oily',
        value: 0
      },
      // {
      //   key: 'full',
      //   name: 'Full',
      //   value: 0
      // },
      // {
      //   key: 'rich',
      //   name: 'Rich',
      //   value: 0
      // },
      {
        key: 'sweet',
        name: 'Sweet',
        value: 0
      },
      {
        key: 'briny',
        name: 'Briny',
        value: 0
      },
      {
        key: 'salty',
        name: 'Salty',
        value: 0
      },
      {
        key: 'vanilla',
        name: 'Vanilla',
        value: 0
      },
      {
        key: 'tart',
        name: 'Tart',
        value: 0
      },
      {
        key: 'fruity',
        name: 'Fruity',
        value: 0
      },
      {
        key: 'floral',
        name: 'Floral',
        value: 0
      },
      {
        key: 'sherried',
        name: 'Sherried',
        value: 0
      },
      {
        key: 'chocolate',
        name: 'Chocolate',
        value: 0
      },
      {
        key: 'cereal',
        name: 'Cereal',
        value: 0
      }
    ])
    return {
      flavors
    }
  }
})
</script>
<style lang="scss">
.flavor-scales {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  div {
    width: 46%;
    padding: 0 2%;
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
