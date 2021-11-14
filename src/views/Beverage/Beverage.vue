<template>
  <div>
    <router-link to="/beverages">Back to Beverages</router-link>
    <h2>
      {{ beverage.name }}
      <code-pill :value="beverage.objectId" />
    </h2>
    <span
      ><router-link :to="`/beverage/edit/${beverage.objectId}`"
        >edit</router-link
      ></span
    >
    <div>
      <h3>Information</h3>
      <div v-if="beverage.category">
        <strong>category</strong> {{ beverage.category }}
      </div>
      <div v-if="beverage.type"><strong>type</strong> {{ beverage.type }}</div>
      <div v-if="beverage.subType">
        <strong>subType</strong> {{ beverage.subType }}
      </div>
      <div v-if="beverage.distillery">
        <strong>distillery</strong> {{ beverage.distillery }}
      </div>
      <div v-if="beverage.brand">
        <strong>brand</strong> {{ beverage.brand }}
      </div>
      <div v-if="beverage.proof">
        <strong>proof</strong> {{ beverage.proof }}
      </div>
      <div v-if="beverage.numberOfBottles">
        <strong>numberOfBottles</strong> {{ beverage.numberOfBottles }}
      </div>
      <div v-if="beverage.vintage">
        <strong>vintage</strong> {{ beverage.vintage }}
      </div>
      <div v-if="beverage.bottled">
        <strong>bottled</strong> {{ beverage.bottled }}
      </div>
      <div v-if="beverage.statedAge">
        <strong>statedAge</strong> {{ beverage.statedAge }}
      </div>
      <div v-if="beverage.caskNumber">
        <strong>caskNumber</strong> {{ beverage.caskNumber }}
      </div>
      <div v-if="beverage.retailPrice">
        <strong>retailPrice</strong> {{ beverage.retailPrice }}
      </div>
      <div v-if="beverage.region">
        <strong>region</strong> {{ beverage.region }}
      </div>
      <div v-if="beverage.cask"><strong>cask</strong> {{ beverage.cask }}</div>
      <div v-if="beverage.colored">
        <strong>colored</strong> {{ beverage.colored }}
      </div>
      <div v-if="beverage.chillFiltered">
        <strong>chillFiltered</strong> {{ beverage.chillFiltered }}
      </div>
      <div v-if="beverage.singleCask">
        <strong>singleCask</strong> {{ beverage.singleCask }}
      </div>
      <div v-if="beverage.caskStrength">
        <strong>caskStrength</strong> {{ beverage.caskStrength }}
      </div>
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
import flavorWheelChart from '@/components/flavor-wheel/flavor-wheel-chart.vue'

export default defineComponent({
  name: 'beverage',
  components: { flavorWheelChart },
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
