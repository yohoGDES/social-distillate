<template>
  <div class="notes">
    <suggest-notes
      v-if="!hideSuggestions"
      @insert-selections="addSuggestions($event)"
    >
      <template v-slot:label>
        <sc-form-label>{{ label }}</sc-form-label>
      </template>
    </suggest-notes>

    <sc-form-description>
      {{ description }}
    </sc-form-description>

    <sc-textarea ref="notes" v-model="proxyValue" />
  </div>
</template>
<script lang="ts">
import suggestNotes from '@/components/suggestions/suggest-notes.vue'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'notes',
  props: {
    modelValue: String,
    label: String,
    description: String,
    hideSuggestions: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  components: {
    suggestNotes
  },
  setup(props, context) {
    const proxyValue = computed({
      get: () => props.modelValue,
      set: (val) => {
        context.emit('update:modelValue', val)
      }
    })

    const addSuggestions = (selections: string[]) => {
      proxyValue.value = `${props.modelValue} ${selections.join(', ')}`
    }

    return {
      addSuggestions,
      proxyValue
    }
  }
})
</script>
<style lang="scss">
.notes {
  position: relative;
}
</style>
