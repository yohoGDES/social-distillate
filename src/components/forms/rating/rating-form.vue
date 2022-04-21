<template>
  <form>
    <sc-form-row>
      <sc-form-label>Color</sc-form-label>
      <sc-form-description>
        Select the color that most closely matches the appearance of the liquid.
      </sc-form-description>
      <colors :color="review.color" @update:color="review.color = $event" />
    </sc-form-row>

    <sc-form-row>
      <notes
        v-model="review.nose"
        label="Nose"
        description="Why we nose goes here."
      />
    </sc-form-row>

    <sc-form-row>
      <notes
        v-model="review.palate"
        label="Palate"
        description="What do we mean by palate here."
      />
    </sc-form-row>

    <sc-form-row>
      <notes
        v-model="review.finish"
        label="Finish"
        description="What is in a finish?"
      />
    </sc-form-row>

    <sc-form-row>
      <sc-form-label>Value</sc-form-label>
      <sc-form-description>
        How much would you pay for this bottle?
      </sc-form-description>
      <sc-currency
        v-model="review.value"
        :options="{
          currency: 'USD',
          useGrouping: true
        }"
      />
    </sc-form-row>

    <sc-form-row>
      <sc-form-label>Rating</sc-form-label>
      <sc-form-description>
        From 0 to 100 how would you rate this bottle?
      </sc-form-description>
      <sc-dropdown v-model="review.rating" :options="ratingScale" />
    </sc-form-row>

    <sc-form-row>
      <sc-form-label>Flavor Profile</sc-form-label>
      <flavor-wheel v-model="review.flavorProfile" />
    </sc-form-row>

    <sc-form-row>
      <sc-form-label>Conclusion</sc-form-label>
      <sc-form-description>
        What did you think about this bottle overall?
      </sc-form-description>
      <notes v-model="review.conclusion" :hideSuggestions="true" />
    </sc-form-row>

    <sc-form-row>
      <sc-button
        rank="primary"
        width="full"
        type="button"
        @clicked="submitReview"
      >
        Done
      </sc-button>
    </sc-form-row>
  </form>
</template>
<script lang="ts">
import colors from '@/components/forms/inputs/rate/colors.vue'
import notes from '@/components/forms/inputs/rate/notes.vue'
import flavorWheel from '@/components/flavor-wheel/flavor-wheel.vue'
import { computed, defineComponent, reactive } from 'vue'
import { TastingNotes } from '@/types'
import { setPointer, setRelation } from '@/utilities/api'

import { useRatingStore } from '@/store/modules/rate'
import { useUserStore } from '@/store/modules/user'
import { UserModel } from 'cloud/src/model/user'
import { useBeverageStore } from '@/store/modules/beverage'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'Rate',
  components: {
    notes,
    colors,
    flavorWheel
  },
  props: {
    beverageId: {
      type: String
    },
    tastingId: {
      type: String
    }
  },
  emits: ['rating-complete'],
  setup(props, { emit }) {
    const userStore = useUserStore()
    const ratingStore = useRatingStore()
    const beverageStore = useBeverageStore()
    const ratingScale = computed(() => [...Array(101).keys()].slice().reverse())
    const route = useRoute()

    // TODO: Make setting up flavorProfiles dynamic based on a variable. We will want to load different sets of profiles for wine vs whiskey vs gin etc
    const review: TastingNotes = reactive({
      color: 'Amber',
      nose: '',
      palate: '',
      finish: '',
      rating: 0,
      value: 0,
      conclusion: '',
      flavorProfile: [
        {
          key: 'smoky',
          name: 'Smoky',
          value: 0
        },
        {
          key: 'peaty',
          name: 'Peaty',
          value: 0
        },
        {
          key: 'herbal',
          name: 'Herbal',
          value: 0
        },
        {
          key: 'oily',
          name: 'Oily',
          value: 0
        },
        {
          key: 'sweet',
          name: 'Sweet',
          value: 0
        },
        {
          key: 'briny',
          name: 'Briny',
          value: 0
        },
        {
          key: 'salty',
          name: 'Salty',
          value: 0
        },
        {
          key: 'vanilla',
          name: 'Vanilla',
          value: 0
        },
        {
          key: 'tart',
          name: 'Tart',
          value: 0
        },
        {
          key: 'fruity',
          name: 'Fruity',
          value: 0
        },
        {
          key: 'floral',
          name: 'Floral',
          value: 0
        },
        {
          key: 'sherried',
          name: 'Sherried',
          value: 0
        },
        {
          key: 'chocolate',
          name: 'Chocolate',
          value: 0
        },
        {
          key: 'cereal',
          name: 'Cereal',
          value: 0
        }
      ]
    })

    const beverageRelationId = computed(() => {
      return props.beverageId ? props.beverageId : (route.params.id as string)
    })
    const testIt = () => emit('rating-complete', props.beverageId)
    // const getBeverage = async () => {}
    const submitReview = async () => {
      const user = userStore.currentUser as UserModel
      console.log('beverage ID', props.beverageId)
      
      // TODO: Get the beverage from a meta value
      const rating = {
        createdBy: setPointer(user.id as string, '_User'),
        beverage: setRelation(beverageRelationId.value, 'Beverage'),
        ...review
      }
      if (props.tastingId) {
        Object.assign(rating, {
          tastingId: setPointer(props.tastingId, 'Event')
        })
      }
      const result = await ratingStore.saveRating(rating)
      console.log('result', result)
      emit('rating-complete', props.beverageId)
    }
    return {
      review,
      ratingScale,
      submitReview,
      testIt
    }
  }
})
</script>
