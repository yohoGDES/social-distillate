<template>
  <div class="suggest-notes__header">
    <slot name="label"></slot>
    <button class="suggest-notes__button" @click.prevent="toggleSelections()">
      Get Suggestions
    </button>
  </div>
  <drawer-modal
    title="Suggestions"
    :active="showSuggestions"
    @update:drawer-cancel="closeSelections()"
    @update:drawer-confirm="insertSelections()"
  >
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
  </drawer-modal>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { makeId } from '@/utilities'
import drawerModal from '@/components/modals/drawer-modal.vue'
import suggestNotesSubgroup from '@/components/suggestions/suggest-notes-subgroup.vue'
import whiskeyFlavors from './whiskey-flavors.json'
export default defineComponent({
  name: 'suggest-notes',
  emits: ['insert-selections'],
  components: {
    drawerModal,
    suggestNotesSubgroup
  },
  props: {
    hideSuggestions: {
      type: Boolean
    }
  },
  setup(props, context) {
    const uuid = computed(() => {
      return makeId()
    })

    const showSuggestions = ref(false)
    const toggleSelections = () => {
      showSuggestions.value = !showSuggestions.value
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
$dark: $charcoal;

.suggest-notes__header {
  display: flex;
  justify-content: space-between;
}
.suggest-notes__button {
  border: none;
  color: $auburn;
  background: none;
  display: inline-block;
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
</style>
