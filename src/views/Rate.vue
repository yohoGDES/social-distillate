<template>
  <h2>Review #1</h2>
  <div>Information about this tasting is hidden until the host reveals.</div>
  <form>
    <rating-form-row
      label="Color"
      description="Select the color that most closely matches the appearance of the liquid."
    >
      <colors :color="review.color" @update:color="review.color = $event" />
    </rating-form-row>

    <rating-form-row label="Nose">
      <notes v-model="review.nose" />
    </rating-form-row>

    <rating-form-row label="Palate">
      <notes v-model="review.palate" />
    </rating-form-row>

    <rating-form-row label="Finish">
      <notes v-model="review.finish" />
    </rating-form-row>

    <rating-form-row label="Value">
      <span>$</span>
      <input type="text" v-model="review.value" />
    </rating-form-row>

    <rating-form-row label="Rating">
      <select name="" id="" v-model="review.rating">
        <option v-for="i in 100" :key="i.index" :value="i">{{ i }}</option>
      </select>
    </rating-form-row>

    <rating-form-row label="Conclusion">
      <notes v-model="review.conclusion" :showSuggestions="false" />
    </rating-form-row>

    <rating-form-row label="Overall Flavor">
      <flavor-wheel />
    </rating-form-row>

    <rating-form-row>
      <button type="submit" @click.prevent="submitReview">Done</button>
    </rating-form-row>
  </form>
</template>
<script lang="ts">
import colors from '@/components/form/inputs/colors.vue'
import notes from '@/components/form/inputs/flavor-notes.vue'
import flavorWheel from '@/components/flavor-wheel/flavor-wheel.vue'
import ratingFormRow from '@/components/form/rating-form-row.vue'
import { defineComponent, reactive } from 'vue'
import { TastingNotes } from '@/types'

export default defineComponent({
  name: 'Rate',
  components: {
    ratingFormRow,
    notes,
    colors,
    flavorWheel
  },
  setup() {
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
      submitReview
    }
  }
})
</script>
