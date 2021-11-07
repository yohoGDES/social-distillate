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
<!-- <button @click.prevent="getGroupMembers(tastingDetails.host)">get</button> -->
  <form>
    <sc-form-row>
      <sc-form-label>Host</sc-form-label>
      <div v-if="tastingDetails.host">
        <user-badge :user="tastingDetails.host" display="pill" />
        <sc-button
          v-if="!isEmpty(tastingDetails.host)"
          size="small"
          @click.prevent="removeHost()"
          >Remove</sc-button
        >
      </div>
      <sc-button
        v-if="isEmpty(tastingDetails.host)"
        size="small"
        @click.prevent="assignHost(currentUser)"
        >Add Myself as Host</sc-button
      >
    </sc-form-row>
    <sc-form-row>
      <sc-form-label>Co-Hosts</sc-form-label>
      <!-- Need multiselect component -->
      <sc-form-description>Post MVP</sc-form-description>
    </sc-form-row>
    <sc-form-row>
      <sc-form-label>Group</sc-form-label>
      <!-- TODO: Grab RVA Whiskey group relation and make pointer -->
      <!-- TODO: Add type ahead search, use dropdown for now -->
      <sc-dropdown v-model="tastingDetails.group" :options="userGroups" />
    </sc-form-row>
    <sc-form-row>
      <sc-form-label>Use My Hosting Location</sc-form-label>
      <sc-radio v-model="useSavedLocation" :options="[true, false]" />
      <div v-if="useSavedLocation">
        {{ tastingDetails.location }}
      </div>
      <div v-else>
        Other location input
        <sc-text v-model="tastingDetails.location" />
      </div>
    </sc-form-row>
    <sc-form-row>
      <sc-form-label>Date</sc-form-label>
      <sc-form-description
        >When will the tasting be hosted?</sc-form-description
      >
      <input type="date" v-model="tastingDetails.date" name="" id="">
    </sc-form-row>
    <sc-form-row>
      <sc-form-label>Blind Tasting</sc-form-label>
      <sc-radio v-model="tastingDetails.blind" :options="[false, true]" />
    </sc-form-row>
    <sc-form-row v-if="tastingDetails.blind">
      <sc-form-label>Reveal Bottle Details Sequentially?</sc-form-label>
      <sc-form-description
        >Do you want to show the details of each beverage after each
        round?</sc-form-description
      >
      <sc-radio
        v-model="tastingDetails.revealSequentially"
        :options="[false, true]"
      />
    </sc-form-row>
    <!-- <sc-form-row>
      TODO: This will be much later.
      <sc-form-label>Tasting Style</sc-form-label>
      <sc-form-description>
        Do you want the tasting to be guided or freeflow? Guided is a beginner-level experience that provides suggestions for a guest to browse when selecting flavors or descriptions. Advanced is a free-form note taking experience that offers suggestions if they're needed.
      </sc-form-description>
      <sc-radio :options="['Guided', 'Freeflow']" />
    </sc-form-row> -->
    <sc-form-row>
      <sc-form-label>Show Progress Bar?</sc-form-label>
      <sc-form-description
        >Do you want to show the current position and total number of beverages
        in the tasting? (i.e. 1 of 3)</sc-form-description
      >
      <sc-radio
        v-model="tastingDetails.showProgressBar"
        :options="[false, true]"
      />
    </sc-form-row>
    <sc-form-row>
      <sc-form-label>Beverages</sc-form-label>
      <sc-form-description
        >Select the beverages that will be featured in this
        tasting.</sc-form-description
      >
      Need a beverage browse / select component. Make it a modal that allows you to search / select multiples and insert them.
      Then need a list view of the selected beverages that can be removed or sorted. 
    </sc-form-row>
    <sc-form-row>
      <sc-form-label>Invite Guests</sc-form-label>
      <sc-form-description
        >Who do you want to invite to this tasting? Group members can also sign
        up later.</sc-form-description
      >
      <div v-for="member in groupMembers" :key="member.index">
        <input type="checkbox" :value="member.id" name="" :id="member.id" />
        <label :for="member.id"> {{ member.name }}</label>
      </div>
    </sc-form-row>
  </form>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  watch,
  watchEffect
} from 'vue'
import { useUserStore } from '@/store/modules/user'
import { useGroupStore } from '@/store/modules/group'
import { setPointer, UserDetails } from '@/utilities/api'
import { isEmpty, cloneDeep } from 'lodash'
import { TastingDetails } from '@/types'
import userBadge from '@/components/user/user-badge.vue'

export default defineComponent({
  components: { userBadge },
  name: 'tasting-edit',
  setup() {
    const userStore = useUserStore()
    const groupStore = useGroupStore()

    const tastingDetails = ref({
      host: {},
      coHost: [],
      group: '',
      location: '',
      date: '',
      blind: false,
      revealSequentially: false,
      showProgressBar: false,
      beverages: [],
      guests: []
    })

    const currentUser = computed(() => userStore.currentUser)

    const useSavedLocation = ref(true)
    const tastingLocation = computed(() => 'Location!')


    // const saveTasting = async () => {}
    // const getTasting = async () => {}

    const assignHost = (user: UserDetails) => {
      tastingDetails.value.host = user
      tastingDetails.value.location = user.attributes.hostingLocation
      tastingDetails.value.group = (
        userGroups.value[0] as { label: string; value: string }
      )?.value
      // console.log()
    }

    const removeHost = () => {
      tastingDetails.value.host = {}
      tastingDetails.value.group = ''
      tastingDetails.value.location = ''
      groupMembers.value = []
    }
    // Set host to current user on mount
    watchEffect(() => {
      tastingDetails.value.host = currentUser.value || {}
    })

    const userGroups = ref([])
    const getUserGroups = async () => {
      if (!currentUser.value) return
      const result = await groupStore.getUserGroups(
        currentUser.value.id as string
      )

      const groups = result.map((g: any) => {
        return {
          label: g.name,
          value: g.objectId
        }
      })

      userGroups.value = groups
      if (isEmpty(tastingDetails.value.group)) {
        tastingDetails.value.group = groups[0].value
      }
    }

    // Watch tastingDetails.group and fetch group members as it changes
    watch(
      () => cloneDeep(tastingDetails.value),
      async (val, oldVal) => {
        if (val.group !== oldVal.group && val.group !== '') {
          await getGroupMembers()
        }
      }
    )

    onMounted(async () => {
      await getUserGroups()
    })

    const groupMembers = ref([])
    const getGroupMembers = async () => {
      const members = await groupStore.getGroupMembers(
        tastingDetails.value.group as string
      )
      groupMembers.value = members.map((member: any) => {
        return {
          name: member.username,
          id: member.objectId
        }
      })
    }


    return {
      isEmpty,
      assignHost,
      removeHost,
      currentUser,
      getUserGroups,
      userGroups,
      tastingDetails,
      useSavedLocation,
      tastingLocation,
      getGroupMembers,
      groupMembers,
    }
  }
})
</script>
