<template>
  <h2>Review #1</h2>
  <div>Information about this tasting is hidden until the host reveals.</div>
  <form>
    <rating-form-row>
      <rating-form-label label="Color" />
      <rating-form-description>
        Select the color that most closely matches the appearance of the liquid.
      </rating-form-description>
      <colors :color="review.color" @update:color="review.color = $event" />
    </rating-form-row>

    <rating-form-row>
      <notes
        v-model="review.nose"
        label="Nose"
        description="Why we nose goes here."
      />
    </rating-form-row>

    <rating-form-row>
      <notes
        v-model="review.palate"
        label="Palate"
        description="What do we mean by palate here."
      />
    </rating-form-row>

    <rating-form-row>
      <notes
        v-model="review.finish"
        label="Finish"
        description="What is in a finish?"
      />
    </rating-form-row>

    <rating-form-row>
      <rating-form-label label="Value" />
      <rating-form-description>
        How much would you pay for this bottle?
      </rating-form-description>
      <span>$</span>
      <input type="text" v-model="review.value" />
    </rating-form-row>

    <rating-form-row>
      <rating-form-label label="Rating" />
      <rating-form-description>
        From 0 to 100 how would you rate this bottle?
      </rating-form-description>
      <select name="" id="" v-model="review.rating">
        <option v-for="i in ratingScale" :key="i" :value="i">{{ i }}</option>
      </select>
    </rating-form-row>

    <rating-form-row>
      <rating-form-label label="Overall Flavor" />
      <flavor-wheel />
    </rating-form-row>

    <rating-form-row>
      <rating-form-label label="Conclusion" />
      <rating-form-description>
        What did you think about this bottle overall?
      </rating-form-description>
      <notes v-model="review.conclusion" :hideSuggestions="true" />
    </rating-form-row>


    <rating-form-row>
      <button type="submit" @click.prevent="submitReview">Done</button>
    </rating-form-row>
  </form>
</template>
<script lang="ts">
import colors from '@/components/form/inputs/colors.vue'
import notes from '@/components/form/inputs/notes.vue'
import flavorWheel from '@/components/flavor-wheel/flavor-wheel.vue'
import ratingFormRow from '@/components/form/rating-form-row.vue'
import ratingFormLabel from '@/components/form/rating-form-label.vue'
import ratingFormDescription from '@/components/form/rating-form-description.vue'
import { computed, defineComponent, reactive } from 'vue'
import { TastingNotes } from '@/types'

export default defineComponent({
  name: 'Rate',
  components: {
    ratingFormRow,
    ratingFormDescription,
    ratingFormLabel,
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
