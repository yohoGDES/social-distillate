<template>
  <div class="home">
    <p style="text-align:center;">
      Welcome to The Social Cask! This is the first trial run of this app to use
      in tasting events and other applications. It is in alpha and ugly as shit
      - I built it in less than a month so bare with me. Please sign up then
      enter the tasting while we wait for John to kick things off. All feedback
      welcome!
    </p>
    <p style="font-size:22px; text-align: center;">🚨 <br> Please do not visit any other pages than the tastings below. It would spoil tonight's tasting. This will change later <br> 🚨</p>

    <h3 style="text-align:center;">Available Tastings</h3>
    <div class="event-row" v-for="tasting in events" :key="tasting.index">
      <div class="event-row__logo">
        <img :src="tasting.group[0].logo.url" />
      </div>
      <!-- {{tasting}} -->
      <div>
        <strong>{{ tasting.name }}</strong> <br>
        {{ new Date(tasting.date).toDateString() }} <br>
        <router-link :to="`/events/tastings/${tasting.id}`">View Event</router-link>
      </div>
    </div>
    
  </div>
  <!-- <h4>Things to make</h4>
  <ul>
    <li>
      General UI
      <ul></ul>
    </li>
    <li>
      Users
      <ul>
        <li>Route Guard</li>
        <li>User info / Edit</li>
      </ul>
    </li>
    <li>
      Groups
      <ul>
        <li>Create group</li>
        <li>Register for group</li>
        <li>Update group</li>
      </ul>
    </li>
    <li>
      Tasting
      <ul>
        <li>Tasting View (uses the /Rate view)</li>
      </ul>
    </li>
    <li>
      Beverage
      <ul>
        <li>Attach rating to Beverage</li>
      </ul>
    </li>
  </ul> -->
</template>

<script lang="ts">
import { useEventStore } from '@/store/modules/events'
import { defineComponent, onMounted, ref } from 'vue'
import { getRelation } from '@/utilities/api'


export default defineComponent({
  name: 'Home',
  components: {},
  setup() {
    const eventStore = useEventStore()

    const events = ref()
    const getEvents = async () => {
      const payload = await eventStore.getEvents()
      events.value = await Promise.all(payload.results.map(async(result:any) => {
        return {
          host: '',
          id: result.objectId,
          name: result.name,
          date: result.date,
          group: await getRelation(result.objectId, 'group', 'Group', 'Event')
        }
      }))
    }

    const getDate = (value: string) => {
      const date = new Date(value);
      const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()]
      return `${day}/${month}/${year}`
    }
    onMounted(async() => {
      await getEvents()
    })
    return {events, getDate}
  }
})
</script>
<style lang="scss">
.event-row {
  display: block;
  // justify-content:middle;
  text-align: center;
  align-content: center;
}
.event-row__logo {
  width: 45%;
  margin: 0 auto;
  // display:block;
  img {
    width: 100%;
    height: auto;
  }
}
</style>
