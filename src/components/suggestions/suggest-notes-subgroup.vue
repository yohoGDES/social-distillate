<template>
  <div class="suggestions__sub-group">
    <button
      @click.prevent="toggleSubGroup(subGroup)"
      class="suggestions__sub-group-header"
    >
      {{ subGroup.key }}
      <div class="suggestions__sub-group-actions">
        <span
          class="suggestions__sub-group-arrow"
          :class="{ 'suggestions__sub-group-arrow--active': active }"
        ></span>
      </div>
    </button>
    <div
      class="suggestions__items"
      :class="{ 'suggestions__items--active': active }"
    >
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
<style lang="scss">
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
  transition: cubic-bezier(0.39, 0.575, 0.565, 1) 275ms;
  &--active {
    transform: rotate(-136deg) translateY(-4px);
  }
}

.suggestions__items {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 3%;
  max-height: 0px;
  // visibility: hidden;
  overflow: hidden;
  opacity: 0;
  transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 275ms;
  &--active {
    visibility: visible;
    opacity: 1;
    padding: 3%;
    height: auto;
    max-height: 200%;
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
  font-size: 14px;
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