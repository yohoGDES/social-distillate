<template>
  <div class="suggest-notes__button">
    <button class="suggest-notes__button" @click.prevent="toggleSelections()">
      Get Suggestions
    </button>
  </div>
  <div
    class="suggest-notes__modal"
    :class="{ 'suggest-notes__modal--active': showSuggestions }"
  >
    <h3>Suggestions</h3>
    <div
      class="suggestions__group"
      v-for="group in suggestions"
      :key="group.key"
      :label="group.key"
    >
      <strong class="suggestions__group-label">{{ group.key }}</strong>
      <suggest-notes-subgroup
        v-for="subGroup in group.value"
        v-model="selections"
        :key="subGroup.key"
        :subGroup="subGroup"
        :uuid="uuid"
      />
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
import { makeId, toggleBodyClass } from '@/utilities'
import suggestNotesSubgroup from '@/components/suggestions/suggest-notes-subgroup.vue'
import whiskeyFlavors from './whiskey-flavors.json'
export default defineComponent({
  name: 'suggest-notes',
  emits: ['insert-selections'],
  components: {
    suggestNotesSubgroup
  },
  setup(props, context) {
    const uuid = computed(() => {
      return makeId()
    })
    const showSuggestions = ref(false)
    const toggleSelections = () => {
      showSuggestions.value = !showSuggestions.value
      toggleBodyClass(showSuggestions.value, 'modal-open')
    }
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
.suggest-notes__button {
  border: none;
  color: #42b983;
  background: none;
  display: inline-block;
}

.suggest-notes__modal {
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
.suggestions__group-label {
  display: block;
  width: 100%;
  padding: 12px;
  text-align: left;
  border: none;
  color: white;
  font-size: 16px;
  text-transform: uppercase;
}
.suggestions__sub-group {
  border: 1px solid #131a22;
  margin-bottom: 12px;
}
.suggestions__sub-group-header {
  width: 100%;
  padding: 12px;
  text-align: left;
  background: #222a32;
  border: none;
  color: white;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
}
.suggestions__sub-group-arrow {
  display: block;
  width: 12px;
  height: 12px;
  border-style: solid;
  border-color: white;
  border-width: 0px 2px 2px 0px;
  transform: rotate(45deg) translateY(-1px);
}

.suggestions__items {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 3%;
  &--active {
  }
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
    transition: all 175ms;
    transform: translateY(-25%);
    border: 1px solid #131a22;
  }
}

.suggestions__item-checkbox {
  display: none;
  &:checked + .suggestions__item-label {
    color: #fff;
    &:after {
      background: #e06429;
      border: 1px solid darken(#e06429, 15%);
      z-index: -1;
    }
  }
}
</style>
