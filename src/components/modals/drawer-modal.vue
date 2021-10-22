<template>
  <div class="drawer-modal" :class="{ 'drawer-modal--active': active }">
    <div class="drawer-modal__content">
      <h3>{{ title }}</h3>
      <slot></slot>
    </div>

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
  overflow: hidden;
  padding: 12px 0;
  transform: translateX(110%);
  transition: 320ms cubic-bezier(0.39, 0.575, 0.565, 1);
  background-color: $charcoal;
  color: white;
  &--active {
    transform: translateX(0%);
  }
}
.drawer-modal__content {
  overflow-y: auto;
  height: 100vh;
  padding: 0 20px 100px;
}
.drawer-modal__actions {
  position: fixed;
  min-height: 50px;
  bottom: 0px;
  padding: 20px 3%;
  background: white;
  width: 100%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
}
.drawer-modal__action {
  display: inline-block;
  width: 48%;
  background: none;
  border: 1px solid $charcoal;
  color: $charcoal;
  padding: 12px 6px;
  font-size: 16px;
  &--primary {
    color: $auburn;
    border-color: $auburn;
  }
}
</style>
