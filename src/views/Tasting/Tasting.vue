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
    <div v-if="userIsHost">
      <h3>Hosting controls</h3>
      <!-- <sc-button @clicked="getBeverageRating()">Get Rating</sc-button> -->
      <!-- Begin -->
      <sc-button
        v-if="tasting.activeBeverageId === '' || !tasting.activeBeverageId"
        @clicked="beginTasting()"
        size="small"
        >Begin Tasting</sc-button
      >
      <sc-button @clicked="resetBeverage()" size="small">Reset</sc-button>
      <!-- Next -->
      <sc-button
        v-if="
          getBeverageIndex(tasting.activeBeverageId) + 1 <=
            tasting.beverages.length - 1 &&
          getBeverageIndex(tasting.activeBeverageId) !== -1
        "
        @clicked="nextBeverage()"
        size="small"
        >Next Beverage</sc-button
      >
      <!-- Previous -->
      <sc-button
        v-if="getBeverageIndex(tasting.activeBeverageId) > 0 && tasting.eventStage !== 'tasting' && tasting.eventStage !== 'show-all'"
        @clicked="previousBeverage()"
        size="small"
        >Previous Beverage</sc-button
      >
      <!-- Reveal -->
      <sc-button
        v-if="
          tasting.blind &&
          getBeverageIndex(tasting.activeBeverageId) + 1 ===
            tasting.beverages.length &&
          tasting.eventStage == 'tasting'
        "
        @clicked="revealBeverages()"
        size="small"
        >Reveal Beverages</sc-button
      >
      
      <sc-button
        v-if="
          tasting.blind &&
          getBeverageIndex(tasting.activeBeverageId) + 1 ===
            tasting.beverages.length &&
          tasting.eventStage == 'reveal'
        "
        @clicked="showAllBeverages()"
        size="small"
        >Show All Beverages</sc-button
      >
      <br><br><hr>
    </div>

    <div style="text-align:center;" v-if="tasting.eventStage === 'welcome'">
      <h2 v-if="tasting.name">{{tasting.name}}</h2>
      <div v-if="tasting.group.length > 0">{{ tasting.group[0].name}}</div>
      <div><em v-if="tasting.date">{{ new Date(tasting.date).toDateString() }}</em></div>
      <div v-if="tasting.location">{{ tasting.location }}
        <br>
        <br>
        <strong>Hosted By</strong>
      </div>
      <user-badge v-if="tasting.host.length > 0" style="margin:8px auto 8px;" :user="tasting.host[0]" />
      <p v-if="tasting.description" v-html="tasting.description"></p>

      <p style="font-size: 22px; color: #3c3c3c;">Please wait for the host to start the event.</p>
    </div>
    

    <template v-if="tasting.eventStage === 'tasting'">
      <div
        class="tasting-beverage"
        v-for="(beverage, index) in tasting.beverages"
        :key="index"
      >
        <!-- v-if="
            !ratingIsCompleted(beverage.objectId) &&
            index === completedRatings.length
          " -->
        <template v-if="beverage.objectId === tasting.activeBeverageId">
          <h2>
            <em>No.{{ index + 1 }}</em>
          </h2>
          <rating-form
            :beverageId="beverage.objectId"
            :tastingId="tasting.objectId"
            @rating-complete="logRating($event)"
            v-if="!completedRatings.includes(beverage.objectId)"
          />
          <div style="font-size:22px; text-align:center;" v-else>
            Nice! 🥃 <br> Now let's wait for these other assholes to finish. <h1>👉👌 👀</h1></div>
        </template>
      </div>
      <!-- <div
        class="progress-bar"
        v-if="getBeverageIndex(tasting.activeBeverageId) > -1"
      >
        <div
          class="progress-bar__percentage"
          :style="`background-color: purple; width: ${completionPercentage}%`"
        />
        {{ ratingProgress }}
      </div>
      <div v-if="completionPercentage === 100">Done! Summary</div> -->
    </template>

    <template v-if="tasting.eventStage === 'reveal'">
      <div v-for="beverage in tasting.beverages" :key="beverage.index">
        <beverage-info
          v-if="beverage.objectId === tasting.activeBeverageId"
          :beverage="beverage"
        />
      </div>
    </template>
    
    <template v-if="tasting.eventStage === 'show-all'">
      <div v-for="beverage in tasting.beverages" :key="beverage.index">
        <beverage-info
          :beverage="beverage"
        />
        <br>
        <hr>
      </div>
    </template>

  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import ratingForm from '@/components/forms/rating/rating-form.vue'
import beverageInfo from '@/components/beverage-info/beverage-info.vue'
import { useEventStore } from '@/store/modules/events'
import { useRoute } from 'vue-router'
import { isEmpty } from 'lodash'
import { useUserStore } from '@/store/modules/user'
import { api, client } from '@/utilities/api'
import { useAlertStore } from '@/store/modules/alerts'
import UserBadge from '@/components/user/user-badge.vue'

/**
 * How to advace the tasting:
 * 1. Admin selects Next Beverage which sets the activeBeverageId on the Event class
 *  a. App listens to subscribed event and displays active beverage
 */

export default defineComponent({
  name: 'tasting',
  components: { ratingForm, beverageInfo, UserBadge },
  setup() {
    const eventStore = useEventStore()
    const userStore = useUserStore()
    const alertStore = useAlertStore()
    const route = useRoute()
    const tasting = ref()

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
        (100 * (getBeverageIndex(tasting.value.activeBeverageId + 1) || 0)) / tasting.value.beverages.length
      )
    })

    // TODO: Abstract this later
    /**
     * Pub/Sub Tasting Setup
     */
    const setupSubscription = () => {
      const _tasting = api.Object.extend('Event')
      const _tastingQuery = new api.Query(_tasting)
      return client.subscribe(_tastingQuery)
    }

    const subscription = setupSubscription()
    subscription.on('update', (object: any, original: any, response: any) => {
      // console.log('object', object)
      if (object.attributes.activeBeverageId !== tasting.value.activeBeverageId) {
        console.log('active beverage', object.attributes.activeBeverageId)
        tasting.value.activeBeverageId = object.attributes.activeBeverageId
      }
      if (object.attributes.eventStage !== tasting.value.eventStage) {
        tasting.value.eventStage = object.attributes.eventStage
      }
    })

    const joinTasting = async () => {
      console.log('poop')
    }

    const getBeverageIndex = (id: string) => {
      return tasting.value.beverages.findIndex((b: any) => b.objectId === id)
    }
    const beginTasting = async () => {
      await eventStore.saveEvent({
        objectId: route.params.id,
        activeBeverageId: tasting.value.beverages[0].objectId,
        eventStage: 'tasting'
      })
    }

    const resetBeverage = async () => {
      await eventStore.saveEvent({
        objectId: route.params.id,
        activeBeverageId: '',
        eventStage: 'welcome'
      })
    }

    // TODO: Refactor next/prev beverage into one function
    const nextBeverage = async () => {
      const beverages = tasting.value.beverages
      const current = tasting.value.activeBeverageId
      const currentIndex = getBeverageIndex(current)
      const newBev =
        currentIndex > -1
          ? beverages[currentIndex + 1].objectId
          : beverages[0].objectId

      console.log(`current ${current}, new ${newBev}`)
      tasting.value.activeBeverageId = newBev
      await eventStore.saveEvent({
        objectId: route.params.id,
        activeBeverageId: newBev
      })
    }
    const previousBeverage = async () => {
      const beverages = tasting.value.beverages
      const current = tasting.value.activeBeverageId
      const currentIndex = getBeverageIndex(current)
      let newBev
      if (currentIndex === 0) {
        console.log('already first bev')
        return
      }
      newBev =
        currentIndex > -1
          ? beverages[currentIndex - 1]?.objectId
          : beverages[0]?.objectId
      tasting.value.activeBeverageId = newBev

      console.log(`current ${current}, new ${newBev}`)
      await eventStore.saveEvent({
        objectId: route.params.id,
        activeBeverageId: newBev
      })
    }

    const getBeverageRating = async () => {
      await eventStore.getEventBeverageRatings(tasting.value.activeBeverageId, tasting.value.objectId)
    }

    const revealBeverages = async () => {
      await eventStore.saveEvent({
        objectId: route.params.id,
        activeBeverageId: tasting.value.beverages[0].objectId,
        eventStage: 'reveal'
      })
    }
    
    const showAllBeverages = async () => {
      await eventStore.saveEvent({
        objectId: route.params.id,
        eventStage: 'show-all'
      })
    }

    onMounted(async () => {
      await getEvent()
      client.open()
    })

    return {
      isEmpty,
      userIsHost,
      tasting,
      logRating,
      ratingIsCompleted,
      ratingProgress,
      completedRatings,
      completionPercentage,
      beginTasting,
      nextBeverage,
      previousBeverage,
      getBeverageIndex,
      resetBeverage,
      getBeverageRating,
      revealBeverages,
      showAllBeverages
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
