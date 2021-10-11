<template>
  <div class="drawer-modal" :class="{ 'drawer-modal--active': active }">
    <h3>{{ title }}</h3>
    <slot></slot>

    <div class="drawer-modal__actions">
      <button
        class="drawer-modal__action"
        type="button"
        @click.prevent="toggleDrawer()"
      >
        Cancel
      </button>
      <button
        class="drawer-modal__action drawer-modal__action--primary"
        type="button"
        @click.prevent="toggleDrawer('confirm')"
      >
        Confirm
      </button>
    </div>
  </div>
</template>
<script lang="ts">
/**
 * drawer-modal.vue is used to show content in a slide-in panel.
 * Usage:
 * <drawer-modal
    title="Drawer Title"
    :active="booleanToShowHideDrawer"
    @update:drawer-cancel="doSomething()"
    @update:drawer-confirm="doMainSomething()"
  >
    // SLOT CONTENT HERE
  </drawer-modal>
 */
import { defineComponent, watch } from 'vue'
import { toggleBodyClass } from '@/utilities'
export default defineComponent({
  name: 'drawer-modal',
  emits: ['update:drawer-cancel', 'update:drawer-confirm'],
  props: {
    title: {
      type: String
    },
    active: {
      type: Boolean
    }
  },
  setup(props, context) {
    const toggleDrawer = (action = 'cancel') => {
      action === 'confirm'
        ? context.emit('update:drawer-confirm')
        : context.emit('update:drawer-cancel')
      toggleBodyClass(false, 'modal-open')
    }

    watch(
      () => props.active,
      (value) => {
        if (value) toggleBodyClass(value, 'modal-open')
      }
    )

    return {
      toggleDrawer
    }
  }
})
</script>
<style lang="scss">
.drawer-modal {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 12px 20px;
  transform: translateX(110%);
  transition: 320ms cubic-bezier(0.39, 0.575, 0.565, 1);
  background-color: #2c3e50;
  color: white;
  &--active {
    transform: translateX(0%);
  }
}
.drawer-modal__actions {
  position: sticky;
  bottom: -12px;
  padding: 5% 3%;
  background: white;
  width: 113%;
  left: 0px;
  transform: translateX(-6%);
  margin-bottom: -5%;
}
.drawer-modal__action {
  display: inline-block;
  width: 48%;
  background: none;
  border: 1px solid #2c3e50;
  color: #2c3e50;
  padding: 12px 6px;
  font-size: 16px;
  &:first-child {
    margin-right: 2%;
  }
  &--primary {
    color: #e06429;
    border-color: #e06429;
  }
}
</style>
