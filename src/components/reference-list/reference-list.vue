<template>
  <div class="reference-list">
    <draggable
      v-model="proxyValue"
      group="name"
      handle=".handle"
      @start="drag = true"
      @end="drag = false"
      item-key="objectId"
    >
      <template #item="{ element, index }">
        <div class="reference-list__item handle">
          {{ index + 1 }}. {{ element.name }}
          <div class="reference-list__item-actions">
            <div class="reference-list__item-action">
              <a :href="`/beverage/edit/${element.objectId}`" target="_blank">
                <Icon icon="ic:outline-remove-red-eye" />
              </a>
            </div>
            <div class="reference-list__item-action">
              <button @click.prevent="removeBeverage(element.objectId)">
                <Icon icon="ic:outline-close" />
              </button>
            </div>
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import draggable from 'vuedraggable'
import { Icon } from '@iconify/vue'
import outlineRemoveRedEye from '@iconify-icons/ic/outline-remove-red-eye'
import outlineClose from '@iconify-icons/ic/outline-close'
export default defineComponent({
  name: 'reference-list',
  components: { draggable, Icon },
  props: {
    modelValue: {
      type: Array
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const proxyValue = computed({
      get: () => {
        return props.modelValue
      },
      set: (val) => {
        emit('update:modelValue', val)
      }
    })
    return {
      proxyValue,
      icons: {
        outlineRemoveRedEye,
        outlineClose
      }
    }
  },
})
</script>

<style lang="scss">
.handle {
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
}
.reference-list {
  margin-bottom: 12px;
}
.reference-list__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 12px;
  border: 1px solid #c7c7c7;
  margin-bottom: 3px;
  border-radius: 5px;
}
.reference-list__item-actions {
  display: flex;
}
.reference-list__item-action {
  margin-left: 4px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  &:first-child {
    margin-left: 0px;
  }
  svg {
    width: 100%;
    height: auto;
  }
  button {
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
    width: 100%;
    height: 100%;
    color: $charcoal;
    &:hover {
      color: $mahogany;
    }
  }
  a {
    display: block;
    text-decoration: none;
    color: $charcoal;
    &:visited {
      color: $charcoal;
    }
    &:hover {
      color: $mahogany;
    }
  }
}
</style>