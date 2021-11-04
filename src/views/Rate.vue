<template>
  <!-- TODO: Add controls and state of the tasting -->
  <!--
    TODO:
      Should the Rate view contain tasting info?
      Or should it be an embedded component? -->
  <h2>Review #1</h2>
  <!-- TODO: actually put some shit here. model out what should be on this page -->
  <div>Information about this tasting is hidden until the host reveals.</div>
  <hr />
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
      <a href="" @click.prevent="getRatings()">Get Ratings</a>
    </sc-form-row>
  </form>
</template>
<script lang="ts">
import colors from '@/components/forms/inputs/rate/colors.vue'
import notes from '@/components/forms/inputs/rate/notes.vue'
import flavorWheel from '@/components/flavor-wheel/flavor-wheel.vue'
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { TastingNotes } from '@/types'
import { api, setPointer, setRelation } from '@/utilities/api'

import { useRatingStore } from '@/store/modules/rate'
import { useUserStore } from '@/store/modules/user'
import { UserModel } from 'cloud/src/model/user'
import { useBeverageStore } from '@/store/modules/beverage'

export default defineComponent({
  name: 'Rate',
  components: {
    notes,
    colors,
    flavorWheel
  },
  setup() {
    const userStore = useUserStore()
    const ratingStore = useRatingStore()
    const beverageStore = useBeverageStore()
    const ratingScale = computed(() => [...Array(101).keys()].slice().reverse())

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
    const getRatings = async () => {
      await beverageStore.getBeverageRatings('LLUBGjqOxx')
    }
    const submitReview = async () => {
      console.log(review)
      /**
       * TODO:
       * Set the relationship between
       * Event (Tasting) - Class
       *  - Beverages - column (array, less than 100)
       *   - Beverage - Class - getRatings ('LLUBGjqOxx')
       *     - Rating - Class (pointer, beverage has many ratings)
       *      - User - Class (pointer, user has many ratings)
       */
      //   const Rating = new api.Object('Rating')
      const user = userStore.currentUser as UserModel
      //   Rating.set('createdBy', user)
      //  const relation = Rating.relation('beverage')
      //  const bev = new api.Object('Beverage')
      //  const bevQuery = new api.Query('Beverage')
      //  const result = await bevQuery.get('LLUBGjqOxx')
      //  relation.add(result)
      //  console.log(result)
      //  relation.add()
      // await Rating.save()

      const rating = {
        createdBy: setPointer(user.id as string, '_User'),
        beverage: setRelation('LLUBGjqOxx', 'Beverage'),
        ...review
      }
      // const beverage = beverageStore.getBeverage('LLUBGjqOxx')
      const result = await ratingStore.saveRating(rating)
      console.log('result', result)
    }
    return {
      review,
      ratingScale,
      submitReview,
      getRatings
    }
  }
})
</script>
