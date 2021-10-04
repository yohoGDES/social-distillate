<template>
  <label for="">Suggestions</label>
  <div v-for="group in suggestions" :key="group.key" :label="group.key">
    <legend>{{ group.key }}</legend>
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
  <button @click.prevent="insertSelections">Insert Selections</button>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'suggest-notes',
  emits: ['insert-selections'],
  setup(props, context) {
    const uuid = computed(() => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8
          return v.toString(16)
        }
      )
    })
    const selections = ref([])
    const suggestions = ref([
      {
        key: 'Fruity',
        values: ['Sweet', 'Tart', 'Kiwi']
      },
      {
        key: 'Smokey',
        values: ['Charcoal', 'Peat', 'Campfire', 'Embers', 'Burnt Rubber']
      }
    ])

    const insertSelections = () => {
      context.emit('insert-selections', selections.value)
      selections.value = []
    }
    return {
      suggestions,
      selections,
      insertSelections,
      uuid
    }
  }
})
</script>
