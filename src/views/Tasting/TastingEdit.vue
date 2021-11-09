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
  <h2>
    <template v-if="isNew">Create </template>
    <template v-else>Edit </template>
    Tasting
  </h2>
  <form>
    <sc-form-row>
      <sc-form-label>Name *</sc-form-label>
      <sc-form-description>What is the name of this event?</sc-form-description>
      <sc-text required v-model="tastingDetails.name" />
    </sc-form-row>
    
    <sc-form-row>
      <sc-form-label>Host *</sc-form-label>
      <sc-form-description>Who is the host?</sc-form-description>
      <div class="event-host" v-if="tastingDetails.host">
        <user-badge :user="tastingDetails.host" display="pill" />
        <button
          class="event-host__remove"
          @click.prevent="removeHost()"
          v-if="!isEmpty(tastingDetails.host)"
        >
          <Icon icon="ic:outline-close" />
        </button>
        <!-- <sc-button
          
          size="small"
          
          >Remove</sc-button
        > -->
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
      <sc-form-label>Description</sc-form-label>
      <sc-form-description>Provide some details about this event.</sc-form-description>
      <sc-textarea v-model="tastingDetails.description" />
    </sc-form-row>
    <sc-form-row>
      <sc-form-label>Group *</sc-form-label>
      <sc-form-description>Select a group.</sc-form-description>
      <!-- TODO: Grab RVA Whiskey group relation and make pointer -->
      <!-- TODO: Add type ahead search, use dropdown for now -->
      <sc-dropdown
        v-model="tastingDetails.group"
        :options="userGroups"
        required
      />
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
      <input type="datetime-local" v-model="tastingDetails.date" name="" id="" />
    </sc-form-row>
    <sc-form-row>
      <sc-form-label>Blind Tasting</sc-form-label>
      <sc-radio v-model="tastingDetails.blind" :options="[false, true]" />
    </sc-form-row>
    <sc-form-row v-if="tastingDetails.blind">
      <sc-form-label>Reveal Bottle Details Sequentially?</sc-form-label>
      <sc-form-description
        >Display the details of each beverage after each
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
        >Display the current position and total number of beverages tasting?
        (i.e. 1 of 3)</sc-form-description
      >
      <sc-radio
        v-model="tastingDetails.showProgressBar"
        :options="[false, true]"
      />
    </sc-form-row>
    <sc-form-row>
      <sc-form-label>Beverages</sc-form-label>
      <sc-form-description
        >Select the beverages that will be featured in this tasting and drag them into the order that they will be presented.</sc-form-description
      >
      <!-- TODO: BREAK THIS OUT INTO A COMPONENT -->
      <reference-list v-model="tastingDetails.beverages" />
      <div v-if="tastingDetails.beverages.length <= 0">
        You haven't selected any beverages.
      </div>
      <drawer-modal
        title="Select Beverages"
        :active="showBeverages"
        @update:drawer-cancel="toggleBeverages()"
        @update:drawer-confirm="toggleBeverages()"
      >
        <div v-for="beverage in beverages" :key="beverage.index">
          <input
            type="checkbox"
            :value="beverage"
            v-model="tastingDetails.beverages"
            name=""
            :id="beverage.objectId"
          />
          <label :for="beverage.objectId"> {{ beverage.name }}</label>
        </div>
      </drawer-modal>

      <sc-button size="small" @click.prevent="toggleBeverages()">
        Choose Beverages
      </sc-button>
      <a
        class="sc-button sc-button--small"
        href="/beverage/edit/new"
        target="_blank"
        >Add New Beverage</a
      >
    </sc-form-row>
    <sc-form-row>
      <sc-form-label>Invite Guests</sc-form-label>
      <sc-form-description
        >Who do you want to invite to this tasting? Group members can also sign
        up later.</sc-form-description
      >
      <div v-for="member in groupMembers" :key="member.index">
        <input
          type="checkbox"
          :value="member.id"
          name=""
          :id="member.id"
          v-model="tastingDetails.guests"
        />
        <label :for="member.id"> {{ member.name }}</label>
      </div>
    </sc-form-row>
    <sc-form-row>
      <sc-button display="full" rank="primary" @click.prevent="saveTasting">
        <template v-if="isNew">Create Tasting</template>
        <template v-else>Save </template>
      </sc-button>
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
import { useBeverageStore } from '@/store/modules/beverage'
import { useEventStore } from '@/store/modules/events'
import { setRelation, setRelations, UserDetails } from '@/utilities/api'
import { isEmpty, cloneDeep } from 'lodash'
import { Beverage, TastingDetails } from '@/types'
import userBadge from '@/components/user/user-badge.vue'
import { useRoute } from 'vue-router'

import drawerModal from '@/components/modals/drawer-modal.vue'
import { Icon } from '@iconify/vue'
import outlineClose from '@iconify-icons/ic/outline-close'
import referenceList from '@/components/reference-list/reference-list.vue'
import ScFormDescription from '@/components/forms/sc-form-description.vue'

export default defineComponent({
  components: { userBadge, drawerModal, Icon, referenceList, ScFormDescription },
  name: 'tasting-edit',
  setup() {
    const userStore = useUserStore()
    const groupStore = useGroupStore()
    const beverageStore = useBeverageStore()
    const eventStore = useEventStore()
    const route = useRoute()

    const icons = {
      outlineClose
    }

    const isNew = computed(() => route.params.id === 'new')

    const tastingDetails = ref({
      name: '',
      host: {},
      coHost: [],
      type: 'tasting',
      group: '',
      location: '',
      date: undefined,
      description: '',
      blind: false,
      revealSequentially: false,
      showProgressBar: false,
      beverages: [],
      guests: []
    })

    const mapEvent = (payload: any) => {
      return {
        name: payload.name,
        host: setRelation((payload.host as UserDetails).id, '_User'),
        group: setRelation(payload.group, 'Group'),
        location: payload.location,
        date: payload.date,
        type: payload.type,
        description: payload.description,
        blind: payload.blind,
        revealSequentially: payload.revealSequentially,
        showProgressBar: payload.showProgressBar,
        beverages: setRelations(
          payload.beverages.map((beverage: Beverage) => beverage.objectId),
          'Beverage'
        ),
        guests: setRelations(payload.guests, '_User')
      }
    }
    const saveTasting = async () => {
      const event = mapEvent(tastingDetails.value)
      const result = await eventStore.saveEvent(event)
      console.log(result)
      
    }
    const getTasting = async () => {
      // hi
    }

    const beverages = ref([])
    const showBeverages = ref(false)
    const toggleBeverages = () => (showBeverages.value = !showBeverages.value)

    const currentUser = computed(() => userStore.currentUser)

    const useSavedLocation = ref(true)
    const tastingLocation = computed(() => 'Location!')


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
      const { results } = await beverageStore.getBeverages()
      beverages.value = results
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
      isNew,
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
      beverages,
      toggleBeverages,
      showBeverages,
      icons,
      saveTasting,
      getTasting
    }
  }
})
</script>
<style lang="scss">
.event-host {
  display: flex;
  align-items: center;
}
.event-host__remove {
  border: none;
  background: none;
  padding: 0;
  width: 20px;
  height: 20px;
  color: $charcoal;
  margin-left: 4px;
  cursor: pointer;
  &:hover {
    color: $mahogany;
  }
  svg {
    width: 100%;
    height: auto;
  }
}
</style>