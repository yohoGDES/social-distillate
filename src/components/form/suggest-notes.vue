<template>
  <div class="suggest-notes__button">
    <button class="suggest-btn" @click.prevent="toggleSelections()">
      Get Suggestions
    </button>
  </div>
  <!-- v-show="showSuggestions" -->
  <div
    class="suggest-notes__list"
    :class="{ 'suggest-notes__list--active': showSuggestions }"
  >
    <h3>Suggestions</h3>
    <div v-for="group in suggestions" :key="group.key" :label="group.key">
      <strong>{{ group.key }}</strong>
      <div v-for="(suggestion, idx) in group.values" :key="suggestion.index">
        <input
          type="checkbox"
          :id="`${uuid}-${group.key}-${idx}`"
          :name="`${uuid}-${group.key}-${idx}`"
          v-model="selections"
          :value="suggestion"
        />
        <label :for="`${uuid}-${group.key}-${idx}`">{{ suggestion }}</label>
      </div>
    </div>
    <div>
      {{ selections }}
    </div>
    <button type="button" @click.prevent="toggleSelections">Cancel</button>
    <button type="button" @click.prevent="insertSelections">
      Insert Selections
    </button>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { makeId } from '@/utilities'
export default defineComponent({
  name: 'suggest-notes',
  emits: ['insert-selections'],
  setup(props, context) {
    const uuid = computed(() => {
      return makeId()
    })
    const showSuggestions = ref(false)
    const toggleSelections = () => (showSuggestions.value = !showSuggestions.value)
    const selections = ref([])
    const suggestions = ref([
      {
        key: 'Fruity',
        values: ['Sweet', 'Tart', 'Kiwi']
      },
      {
        key: 'Smoky',
        values: ['Charcoal', 'Peat', 'Campfire', 'Embers', 'Burnt Rubber']
      }
    ])

    const insertSelections = () => {
      context.emit('insert-selections', selections.value)
      selections.value = []
      toggleSelections()
    }
    return {
      suggestions,
      toggleSelections,
      showSuggestions,
      selections,
      insertSelections,
      uuid
    }
  }
})
</script>

<style lang="scss">
.suggest-notes {
}
.suggest-btn {
  border: none;
  color: #42b983;
  background: none;
  display: inline-block;
}
.suggest-notes__button {}

.suggest-notes__list {
  position: fixed;
  top: 0;
  right: 0;
  width: 40%;
  height: 100vh;
  z-index: 9999;
  padding: 12px 20px;
  transform: translateX(110%);
  transition: 320ms cubic-bezier(0.39, 0.575, 0.565, 1);
  background-color: #2c3e50;
  color: white;
  &--active {
    transform: translateX(0%);
  }
}
</style>
