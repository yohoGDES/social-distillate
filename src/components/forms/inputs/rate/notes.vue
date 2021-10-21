<template>
  <div class="notes">
    <suggest-notes
      v-if="!hideSuggestions"
      @insert-selections="addSuggestions($event)"
    >
      <template v-slot:label>
        <sc-form-label :label="label" />
      </template>
    </suggest-notes>

    <sc-form-description>
      {{ description }}
    </sc-form-description>

    <textarea
      class="s-notes"
      ref="notes"
      v-model="proxyValue"
      name=""
      id=""
      cols="30"
      rows="8"
    />
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
.s-notes {
  border: 1px solid gray;
  border-radius: 3px;
  padding: 8px 12px;
  display: block;
  min-height: 120px;
  margin: 0 0 20px;
  text-align: left;
  width: 100%;
  font-size: 16px;
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
