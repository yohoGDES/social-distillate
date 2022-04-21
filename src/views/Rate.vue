<template>
  <!-- TODO: Add controls and state of the tasting -->
  <!--
    TODO:
      Should the Rate view contain tasting info?
      Or should it be an embedded component? -->
  <h2>Rate</h2>
  <beverage-info
    style="margin-bottom: 20px"
    :beverage="beverage"
    :showInfoToggle="true"
    v-if="beverage"
  />
  <div v-else>
    Information about this tasting is hidden until the host reveals.
    <hr />
  </div>
  <rating-form :beverageId="beverageId" @rating-complete="logRating($event)" />
</template>
<script lang="ts">
import ratingForm from '@/components/forms/rating/rating-form.vue'
import beverageInfo from '@/components/beverage-info/beverage-info.vue'
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { TastingNotes } from '@/types'
import { setPointer, setRelation } from '@/utilities/api'

import { useRatingStore } from '@/store/modules/rate'
import { useUserStore } from '@/store/modules/user'
import { UserModel } from 'cloud/src/model/user'
import { useBeverageStore } from '@/store/modules/beverage'
import { useRoute, useRouter } from 'vue-router'
import { useAlertStore } from '@/store/modules/alerts'

export default defineComponent({
  name: 'Rate',
  components: {
    beverageInfo,
    ratingForm
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const userStore = useUserStore()
    const ratingStore = useRatingStore()
    const alertStore = useAlertStore()
    const beverageStore = useBeverageStore()
    const ratingScale = computed(() => [...Array(101).keys()].slice().reverse())

    const beverageId = computed(() => route.params.id)

    const beverage = ref({})

    const logRating = () => {
      alertStore.alertSuccess('Rating saved!')
      router.push(`/beverage/${beverageId.value}`)
    }

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
    // const getRatings = async () => {
    //   await beverageStore.getBeverageRatings('LLUBGjqOxx')
    // }
    
    // NOTE: I don't think this is needed anymore. The save happens in rating-form.vue
    // const submitReview = async () => {
    //   console.log(review)
    //   /**
    //    * TODO:
    //    * Set the relationship between
    //    * Event (Tasting) - Class
    //    *  - Beverages - column (array, less than 100)
    //    *   - Beverage - Class - getRatings ('LLUBGjqOxx')
    //    *     - Rating - Class (pointer, beverage has many ratings)
    //    *      - User - Class (pointer, user has many ratings)
    //    */
    //   //   const Rating = new api.Object('Rating')
    //   const user = userStore.currentUser as UserModel
      
    //   // TODO: Get the beverage from a meta value
    //   const rating = {
    //     createdBy: setPointer(user.id as string, '_User'),
    //     beverage: setRelation(beverageId.value as string, 'Beverage'),
    //     ...review
    //   }
    //   const result = await ratingStore.saveRating(rating)
    //   console.log('result', result)
    // }

    onMounted( async () => {
      const bev = await beverageStore.getBeverage(
        beverageId.value as unknown as string
      )
      beverage.value = bev
    })
    return {
      review,
      ratingScale,
      logRating,
      beverageId,
      beverage
    }
  }
})
</script>
