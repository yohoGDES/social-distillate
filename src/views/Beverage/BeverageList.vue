<template>
  <div>
    Beverage List
    <a href="" @click.prevent="getBeverages()">Get em</a>
    <div class="beverage-list">
      <div
        class="beverage-list__row"
        v-for="beverage in beverages.results"
        :key="beverage.objectId"
      >
        <div class="beverage-list__col">
          <router-link :to="`/beverage/edit/${beverage.objectId}`">
            {{ beverage.name }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useBeverageStore } from '@/store/modules/beverage'
export default defineComponent({
  name: 'BeverageList',
  setup() {
    const beverageStore = useBeverageStore()
    const beverages = ref([])

    const getBeverages = async () => {
      beverages.value = await beverageStore.getBeverages()
    }

    onMounted(async () => {
      await getBeverages()
    })
    return {
      getBeverages,
      beverages
    }
  }
})
</script>
