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
    <div
      class="suggestions__group"
      v-for="group in suggestions"
      :key="group.key"
      :label="group.key"
    >
      <strong>{{ group.key }}</strong>
      <div
        class="suggestions__sub-group"
        v-for="(subGroup, idx) in group.value"
        :key="subGroup.index"
      >
        <input
          type="checkbox"
          :id="`${uuid}-${group.key}-${idx}`"
          :name="`${uuid}-${group.key}-${idx}`"
          v-model="selections"
          :value="subGroup.key"
        />
        <label :for="`${uuid}-${group.key}-${idx}`">{{ subGroup.key }}</label>
        <div class="suggestions__items">
          <div
            class="suggestions__item"
            v-for="suggestion in subGroup.value"
            :key="suggestion.index"
          >
            <input
              class="suggestions__item-checkbox"
              type="checkbox"
              :id="`${uuid}-${suggestion}-${suggestion.index}`"
              :name="`${uuid}-${suggestion}-${suggestion.index}`"
              v-model="selections"
              :value="suggestion"
            />
            <label
              class="suggestions__item-label"
              :for="`${uuid}-${suggestion}-${suggestion.index}`"
            >
              {{ suggestion }}
            </label>
          </div>
        </div>
      </div>
    </div>
    <div>
      {{ selections }}
    </div>
    <button type="button" @click.prevent="closeSelections">Cancel</button>
    <button type="button" @click.prevent="insertSelections">
      Insert Selections
    </button>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { makeId } from '@/utilities'
import whiskeyFlavors from './whiskey-flavors.json'
export default defineComponent({
  name: 'suggest-notes',
  emits: ['insert-selections'],
  setup(props, context) {
    const uuid = computed(() => {
      return makeId()
    })
    const showSuggestions = ref(false)
    const toggleSelections = () =>
      (showSuggestions.value = !showSuggestions.value)
    const selections = ref([])
    const suggestions = whiskeyFlavors

    const insertSelections = () => {
      context.emit('insert-selections', selections.value)
      closeSelections()
    }
    const closeSelections = () => {
      selections.value = []
      toggleSelections()
    }
    return {
      suggestions,
      toggleSelections,
      showSuggestions,
      selections,
      insertSelections,
      closeSelections,
      uuid
    }
  }
})
</script>

<style lang="scss">
$dark: #2c3e50;
.suggest-notes {
}
.suggest-btn {
  border: none;
  color: #42b983;
  background: none;
  display: inline-block;
}
.suggest-notes__button {
}

.suggest-notes__list {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
  overflow-y: auto;
  padding: 12px 20px;
  transform: translateX(110%);
  transition: 320ms cubic-bezier(0.39, 0.575, 0.565, 1);
  background-color: #2c3e50;
  color: white;
  &--active {
    transform: translateX(0%);
  }
}

.suggestions__group {
}
.suggestions__sub-group {
}
.suggestions__items {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.suggestions__item {
  width: 46%;
  display: block;
  box-sizing: border-box;
  padding: 0px 0px;
  margin: 18px 6px 18px 0;
  text-align: center;
}

// The element you're actually clicking
.suggestions__item-label {
  display: block;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 200%;
    transform: translateY(-25%);
    border: 1px solid #131a22;
  }
}

.suggestions__item-checkbox {
  display: none;
  &:checked + .suggestions__item-label {
    color: #fff;
    &:after {
      border: 1px solid darken(#2c3e50, 8%);
      background: darken(#2c3e50, 3%);
      z-index: -1;
    }
  }
}


</style>
