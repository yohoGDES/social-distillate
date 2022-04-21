<template>
  <div v-if="displayName" class="user-badge" :class="displayStyle">
    <div
      class="user-badge__image"
      :style="`background-image: url('${imageUrl}');`"
    ></div>
    <span>{{ displayName }}</span>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
// import personCircle from '@iconify-icons/bi/person-circle';
export default defineComponent({
  name: 'user-badge',
  props: {
    user: {
      type: Object,
      required: true
    },
    display: {
      type: String,
      description:
        'default displays a standard view. `pill` creates a background and rounded edge appearance.'
    },
    colorMode: {
      type: String,
      description: 'display in light or dark mode',
      default: 'light'
    }
  },
  setup(props) {
    const displayName = computed(() => {
      const user = props.user
      return user.firstName && user.lastName
        ? `${user.firstName} ${user.lastName}`
        : user.username
    })

    const imageUrl = computed(() => {
      const user = props.user
      const fallbackImage = undefined
      const userImage = user?.profileImage?.url || user.profileImage?.url()
      return userImage ? userImage : fallbackImage
    })

    const displayStyle = computed(() => {
      const display = props.display === 'pill' ? 'user-badge--pill' : ''
      const mode = props.colorMode === 'dark' ? 'user-badge--dark-mode' : ''
      return `${display} ${mode}`
    })
    return {
      displayName,
      displayStyle,
      imageUrl
    }
  }
})
</script>
<style lang="scss">
.user-badge {
  display: inline-flex;
  font-size: 14px;
  color: $charcoal;
  align-items: center;
  font-weight: bold;
  &--pill {
    background: lighten($charcoal, 65%);
    padding: 4px 10px 4px 4px;
    border-radius: 20px;
  }
  &--dark-mode {
    color: $clear;
  }
}
.user-badge__image {
  width: 30px;
  height: 30px;
  border: 1px solid $mahogany;
  border-radius: 50%;
  background-size: contain;
  background-position: center;
  margin-right: 6px;
  background-color: $charcoal;
}
</style>
