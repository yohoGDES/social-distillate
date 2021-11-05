<template>
  <div>
    <h2>Beverage List</h2>
    <sc-button @clicked="newBeverage()" size="small">Add Beverage</sc-button>
    <br><br>
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
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'BeverageList',
  setup() {
    const beverageStore = useBeverageStore()
    const beverages = ref([])
    const router = useRouter()

    const getBeverages = async () => {
      beverages.value = await beverageStore.getBeverages()
    }

    const newBeverage = () => router.push('/beverage/edit/new')

    onMounted(async () => {
      await getBeverages()
    })
    return {
      getBeverages,
      newBeverage,
      beverages
    }
  }
})
</script>
