<template>
  <div>
    <router-link to="/beverages">Back to Beverages</router-link>
    <h2>
      {{ beverage.name }}
      <code-pill :value="beverage.objectId" />
    </h2>
    <span><router-link :to="`/beverage/edit/${beverage.objectId}`">edit</router-link></span>
    <div>
      <strong>category</strong> {{ beverage.category }}
      <strong>type</strong> {{ beverage.type }}
      <strong>subType</strong> {{ beverage.subType }}
      <strong>distillery</strong> {{ beverage.distillery }}
      <strong>brand</strong> {{ beverage.brand }}
      <strong>proof</strong> {{ beverage.proof }}
      <strong>numberOfBottles</strong> {{ beverage.numberOfBottles }}
      <strong>vintage</strong> {{ beverage.vintage }}
      <strong>bottled</strong> {{ beverage.bottled }}
      <strong>bottled</strong> {{ beverage.bottled }}
      <strong>caskNumber</strong> {{ beverage.caskNumber }}
      <strong>retailPrice</strong> {{ beverage.retailPrice }}
      <strong>retailPrice</strong> {{ beverage.retailPrice }}
      <strong>region</strong> {{ beverage.region }}
      <strong>cask</strong> {{ beverage.cask }}
      <strong>colored</strong> {{ beverage.colored }}
      <strong>chillFiltered</strong> {{ beverage.chillFiltered }}
      <strong>singleCask</strong> {{ beverage.singleCask }}
      <strong>caskStrength</strong> {{ beverage.caskStrength }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useBeverageStore } from '@/store/modules/beverage'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'beverage-edit',
  setup() {
    const beverageStore = useBeverageStore()
    const route = useRoute()
    const beverage = ref({})

    const getBeverage = async (id: string) => {
      if (!id) return
      const result = await beverageStore.getBeverage(id)
      beverage.value = result
    }

    onMounted(async () => {
      await getBeverage(route.params.id as string)
    })
    return {
      beverage
    }
  }
})
</script>
