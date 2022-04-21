<template>
  <div>
    <router-link to="/beverages">Back to Beverages</router-link>
    <h2>
      {{ beverage.name }}
      <code-pill :value="beverage.objectId" />
    </h2>
    <span
      ><router-link :to="`/beverage/${beverage.objectId}/edit`"
        >edit</router-link
      ></span
    > | 
    <span>
      <router-link :to="`/beverage/${beverage.objectId}/rate`"
        >rate</router-link
      >
    </span>
    <div>
      <h3>Information</h3>
      <beverage-info
        :beverage="beverage"
        :hideName="true"
        :showInfoToggle="true"
      />
    </div>
    <div>
      <h3>Ratings ({{ ratingsCount }})</h3>
      <div v-if="averageRating">
        <strong>Average Rating</strong> {{ averageRating }}
      </div>
      <ul>
        <li v-for="rating in ratings" :key="rating.index">
          <code-pill :value="rating.objectId" />
          Rating: {{ rating.rating }}
          <flavor-wheel-chart :flavors="rating.flavorProfile" />
          <!-- <pre>{{ rating }}</pre> -->
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useBeverageStore } from '@/store/modules/beverage'
import { useRoute } from 'vue-router'
import { Rating } from '@/types'
import beverageInfo from '@/components/beverage-info/beverage-info.vue'
import flavorWheelChart from '@/components/flavor-wheel/flavor-wheel-chart.vue'

export default defineComponent({
  name: 'beverage',
  components: { beverageInfo, flavorWheelChart },
  setup() {
    const beverageStore = useBeverageStore()
    const route = useRoute()
    const beverage = ref({})

    const getBeverage = async (id: string) => {
      if (!id) return
      const result = await beverageStore.getBeverage(id)
      beverage.value = result
    }

    const ratings = ref([] as Rating[])
    const setRatings = async () => {
      ratings.value = await beverageStore.getBeverageRatings(
        route.params.id as string
      )
    }
    const ratingsCount = computed(() => ratings.value.length)
    const averageRating = computed(() => {
      const rates = ratings.value
        ?.filter((r: Rating) => r.rating)
        .map((r) =>
          typeof r.rating === 'string' ? parseInt(r.rating) : r.rating
        )
      const average = (arr: number[]) =>
        arr?.reduce((a, b) => a + b, 0) / arr.length

      return average(rates as number[])
    })

    onMounted(async () => {
      await getBeverage(route.params.id as string)
      await setRatings()
    })
    return {
      beverage,
      ratings,
      ratingsCount,
      averageRating
    }
  }
})
</script>
