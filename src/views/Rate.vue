<template>
  <h2>Review #1</h2>
  <div>Information about this tasting is hidden until the host reveals.</div>
  <form>
    <label>Color</label>
    <colors :color="review.color" @update:color="review.color = $event" />
    <div>
      <notes v-model="review.palate" label="Palate" />
    </div>
    <div>
      <notes v-model="review.finish" label="Finish" />
    </div>
    <div>
      <label for="">Value</label>
      <span>$</span>
      <input
        type="range"
        min="1.00"
        step="1.00"
        max="2500"
        v-model="review.value"
      />
    </div>
    <div>
      <label for="">Rating</label>
      <input
        type="radio"
        id="rating-1"
        name="rating"
        value="1"
        v-model="review.rating"
      />
      <label for="rating-1">1</label>

      <input
        type="radio"
        id="rating-2"
        name="rating"
        value="2"
        v-model="review.rating"
      />
      <label for="rating-2">2</label>

      <input
        type="radio"
        id="rating-3"
        name="rating"
        value="3"
        v-model="review.rating"
      />
      <label for="rating-3">3</label>

      <input
        type="radio"
        id="rating-4"
        name="rating"
        value="4"
        v-model="review.rating"
      />
      <label for="rating-4">4</label>

      <input
        type="radio"
        id="rating-5"
        name="rating"
        value="5"
        v-model="review.rating"
      />
      <label for="rating-5">5</label>

      <input
        type="radio"
        id="rating-6"
        name="rating"
        value="6"
        v-model="review.rating"
      />
      <label for="rating-6">6</label>

      <input
        type="radio"
        id="rating-7"
        name="rating"
        value="7"
        v-model="review.rating"
      />
      <label for="rating-7">7</label>

      <input
        type="radio"
        id="rating-8"
        name="rating"
        value="8"
        v-model.lazy="review.rating"
      />
      <label for="rating-8">8</label>

      <input
        type="radio"
        id="rating-9"
        name="rating"
        value="9"
        v-model="review.rating"
      />
      <label for="rating-9">9</label>

      <input
        type="radio"
        id="rating-10"
        name="rating"
        value="10"
        v-model="review.rating"
      />
      <label for="rating-10">10</label>
    </div>
    <div>
      <notes v-model="review.conclusion" label="Conclusion" />
    </div>
    <div>
      Overall Flavor
      <flavor-wheel />
      <notes v-model="review.nose" label="Nose" />
    </div>
    <div>
      <button type="submit" @click.prevent="submitReview">Done</button>
    </div>
  </form>
</template>
<script lang="ts">
import colors from '@/components/colors.vue'
import notes from '@/components/notes.vue'
import flavorWheel from '@/components/flavor-wheel.vue'
import { defineComponent, reactive } from 'vue'
import { TastingNotes } from '@/types'

export default defineComponent({
  name: 'Rate',
  components: {
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
