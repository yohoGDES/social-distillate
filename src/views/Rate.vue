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
      <sc-form-label label="Color" />
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
      <sc-form-label label="Value" />
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
      <sc-form-label label="Rating" />
      <sc-form-description>
        From 0 to 100 how would you rate this bottle?
      </sc-form-description>
      <sc-dropdown v-model="review.rating" :options="ratingScale" />
    </sc-form-row>

    <sc-form-row>
      <sc-form-label label="Flavor Profile" />
      <flavor-wheel />
    </sc-form-row>

    <sc-form-row>
      <sc-form-label label="Conclusion" />
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

export default defineComponent({
  name: 'Rate',
  components: {
    notes,
    colors,
    flavorWheel
  },
  setup() {
    const ratingScale = computed(() => [...Array(101).keys()].slice().reverse())
    const review: TastingNotes = reactive({
      color: 'Amber',
      nose: '',
      palate: '',
      finish: '',
      rating: 0,
      value: 0,
      conclusion: ''
    })

    const submitReview = () => {
      console.log(review)
    }
    return {
      review,
      ratingScale,
      submitReview
    }
  }
})
</script>
