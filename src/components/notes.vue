<template>
  <label for="">{{ label }}</label>
  <br />
  <button
    class="suggest-btn"
    @click.prevent="showSuggestions = !showSuggestions"
  >
    Get Suggestions
  </button>
  <suggest-notes
    v-if="showSuggestions"
    @insert-selections="addSuggestions($event)"
  />
  <textarea
    class="s-notes"
    ref="notes"
    v-model="proxyValue"
    name=""
    id=""
    cols="30"
    rows="8"
  />
</template>
<script lang="ts">
import suggestNotes from '@/components/suggest-notes.vue'
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'notes',
  props: ['modelValue', 'label'],
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

    const showSuggestions = ref(false)

    const addSuggestions = (selections: string[]) => {
      proxyValue.value = `${props.modelValue} ${selections.join(', ')}`
    }

    return {
      showSuggestions,
      addSuggestions,
      proxyValue
    }
  }
})
</script>
<style lang="scss">
.s-notes {
  border: 1px solid gray;
  border-radius: 5px;
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
.suggest-btn {
  border: none;
  color: #42b983;
  background: none;
  display: inline-block;

}
</style>
