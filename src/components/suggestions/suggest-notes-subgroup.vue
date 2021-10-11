<template>
  <div class="suggestions__sub-group">
    <button
      @click.prevent="toggleSubGroup(subGroup)"
      class="suggestions__sub-group-header"
    >
      {{ subGroup.key }}
      <div class="suggestions__sub-group-actions">
        <span class="suggestions__sub-group-arrow"></span>
      </div>
    </button>
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
          v-model="model"
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
  <!-- 
    I don't think we're going to allow the sub-group to be selected.
    Keeping here for now just in case. 
    <span class="suggestions__sub-group-header-checkbox">
    <input
      type="checkbox"
      class="suggestions__sub-group-checkbox"
      :id="`${uuid}-${group.key}-${idx}`"
      :name="`${uuid}-${group.key}-${idx}`"
      v-model="selections"
      :value="subGroup.key"
    />
    <label
      class="suggestions__sub-group-checkbox-label"
      :for="`${uuid}-${group.key}-${idx}`"
      :name="subGroup.key"
    />
  </span> -->
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'suggest-notes-subgroup',
  props: {
    subGroup: {
      type: Object
    },
    modelValue: {
      type: Array
    },
    uuid: {
      type: String
    }
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    const model = computed({
      get: () => {
        return props.modelValue
      },
      set: (value) => {
        context.emit('update:modelValue', value)
      }
    })
    const active = ref(false)
    const toggleSubGroup = () => {
      active.value = !active.value
    }
    return {
      active,
      toggleSubGroup,
      model
    }
  }
})
</script>
