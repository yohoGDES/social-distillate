<template>
  <!-- 
  Users can create events
Users can assign themselves as hosts and add co-hosts
Users can create two event types: Tasting or Special Event
Hosts can select their saved location or enter a different hosting location
Hosts can choose for the tasting to be blind.
If a tasting is blind, the host can choose whether to reveal after each dram or at the end.
Hosts can choose from pre-entered bottles or enter a new one on the fly.
Only the host and admin will be able to see blind tastings.
The host controls the flow in the app. Once next dram is selected, users will receive the next scoring sheet.
-->
  <!-- Host (user)
  Co-Hosts (user)
  Group (relation: group)
  Location (saved user location or entered address)
  Date (date)
  Blind (boolean)
    Reveal after each dram or at end (string: dram/end)
  Tasting Style: Guided / Freeflow (string)
  Bottles (Spirits) (relation: beverage)
  Show progress bar / number of bottles? (boolean)
  Attendees (pointers - user)
  ----

  Needs to load / Create:
  - Rating component (separate this into a new component)
  - Tasting Progress Bar (1 of 3 bottles)


host
  coHost
  group
  location
  date
  blind -->
  <div v-if="!isEmpty(tasting)">
    Lets do this
    <div v-if="userIsHost">
      Hosting controls:
      <sc-button>Begin Tasting</sc-button>
      <sc-button>Next Beverage</sc-button>
      <sc-button v-if="tasting.blind && completionPercentage === 100"
        >Reveal Beverages</sc-button
      >
    </div>

    <div
      class="tasting-beverage"
      v-for="(beverage, index) in tasting.beverages"
      :key="beverage.index"
    >
      <rating-form
        :beverageId="beverage.objectId"
        @rating-complete="logRating($event)"
        v-if="
          !ratingIsCompleted(beverage.objectId) &&
          index === completedRatings.length
        "
      />
    </div>
    <div class="progress-bar">
      <div
        class="progress-bar__percentage"
        :style="`background-color: purple; width: ${completionPercentage}%`"
      />
      {{ ratingProgress }}
    </div>
    <div v-if="completionPercentage === 100">Done! Summary</div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import ratingForm from '@/components/forms/rating/rating-form.vue'
import { useEventStore } from '@/store/modules/events'
import { useRoute } from 'vue-router'
import { isEmpty } from 'lodash'
import { useUserStore } from '@/store/modules/user'

export default defineComponent({
  name: 'tasting',
  components: { ratingForm },
  setup() {
    const eventStore = useEventStore()
    const route = useRoute()
    const tasting = ref()
    const userStore = useUserStore()

    const currentUser = computed(() => userStore.currentUser)
    const userIsHost = computed(() => {
      return tasting.value.host[0].objectId === currentUser.value?.id
    })

    const getEvent = async () => {
      const event = await eventStore.getEvent(route.params.id as string)
      tasting.value = event
    }

    const completedRatings = ref([] as string[])
    const logRating = (beverage: string) => {
      completedRatings.value.push(beverage)
    }
    const ratingIsCompleted = (id: string) =>
      completedRatings.value.includes(id)
    const ratingProgress = computed(() => {
      return `${completedRatings.value.length} of ${tasting.value.beverages.length}`
    })
    const completionPercentage = computed(() => {
      return (
        (100 * completedRatings.value.length) / tasting.value.beverages.length
      )
    })

    onMounted(async () => {
      await getEvent()
    })

    return {
      isEmpty,
      userIsHost,
      tasting,
      logRating,
      ratingIsCompleted,
      ratingProgress,
      completedRatings,
      completionPercentage
    }
  }
})
</script>
<style lang="scss">
.progress-bar {
  width: 100%;
  display: block;
}
.progress-bar__percentage {
  height: 3px;
  display: block;
  width: 0%;
}
</style>
