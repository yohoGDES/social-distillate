<template>
  <button
    class="color-buttons__toggle"
    type="button"
    :style="getButtonColor(color)"
    @click.prevent="toggleColors()"
  >
    {{ color }}
  </button>
  <div class="color-buttons" v-if="showColors">
    <button
      class="color-button"
      type="button"
      @click.prevent="setColor(color.name)"
      v-for="color in colors"
      :key="color.slug"
      :style="getButtonColor(color.name)"
    >
      <span class="color-btn__label">{{ color.name }} ({{ color.value }})</span>
    </button>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

type color = {
  value: number
  name: string
  hex: string
}

export default defineComponent({
  name: 'colors',
  emits: ['update:color'],
  props: {
    color: {
      type: String
    }
  },
  setup(props, context) {
    const colorSelection = computed({
      get: () => props.color,
      set: (val) => {
        context.emit('update:color', val)
      }
    })
    const showColors = ref(false)
    const toggleColors = () => (showColors.value = !showColors.value)
    const setColor = (color: string) => {
      colorSelection.value = color
      toggleColors()
    }
    const getColor = (color: string): color => {
      return colors.value.find((c: color) => c.name === color) as color
    }
    const colors = computed<color[]>(() => {
      return [
        {
          value: 0.0,
          name: 'Clear',
          hex: '#fff'
        },
        {
          value: 0.1,
          name: 'White Wine',
          hex: '#fffdde'
        },
        {
          value: 0.2,
          name: 'Pale Straw',
          hex: '#feee98'
        },
        {
          value: 0.3,
          name: 'Pale Gold',
          hex: '#fcea77'
        },
        {
          value: 0.4,
          name: 'Corn',
          hex: '#fae165'
        },
        {
          value: 0.5,
          name: 'Yellow Gold',
          hex: '#f9db54'
        },
        {
          value: 0.6,
          name: 'Old Gold',
          hex: '#f9d64a'
        },
        {
          value: 0.7,
          name: 'Amber',
          hex: '#f8ce4b'
        },
        {
          value: 0.8,
          name: 'Deep Gold',
          hex: '#f4c94d'
        },
        {
          value: 0.9,
          name: 'Amontillado Sherry',
          hex: '#f8c13c'
        },
        {
          value: 1.0,
          name: 'Deep Copper',
          hex: '#f5bd33'
        },
        {
          value: 1.1,
          name: 'Burnished',
          hex: '#eaac08'
        },
        {
          value: 1.2,
          name: 'Chestnut',
          hex: '#e89e13'
        },
        {
          value: 1.3,
          name: 'Russet Muscat',
          hex: '#e79404'
        },
        {
          value: 1.4,
          name: 'Tawny',
          hex: '#dc7217'
        },
        {
          value: 1.5,
          name: 'Auburn',
          hex: '#e06429'
        },
        {
          value: 1.6,
          name: 'Mahogany',
          hex: '#cc502f'
        },
        {
          value: 1.7,
          name: 'Burnt Umber',
          hex: '#b02f28'
        },
        {
          value: 1.8,
          name: 'Old Oak',
          hex: '#9f241d'
        },
        {
          value: 1.9,
          name: 'Red Wine',
          hex: '#712b1e'
        },
        {
          value: 2.0,
          name: 'Chocolate',
          hex: '#431b0a'
        }
      ]
    })

    const darkColors = computed(() =>
      colors.value.filter((c: color) => c?.value > 0.9)
    )

    const colorIsDark = (color: string) => {
      return darkColors.value.some((c: color) => c.name === color)
    }

    const getButtonColor = (color: string) => {
      const colorRef = getColor(color)
      const bgColor = colorRef.hex
      const fontColor = colorIsDark(colorRef.name) ? 'white' : 'black'

      return [`background-color: ${bgColor}`, `color: ${fontColor}`]
    }

    return {
      colorSelection,
      colors,
      darkColors,
      colorIsDark,
      getColor,
      setColor,
      getButtonColor,
      showColors,
      toggleColors
    }
  }
})
</script>
<style lang="scss">
.color-buttons__toggle {
  width: 100%;
  padding: 12px 14px;
  margin-bottom: 8px;
  border: none;
  font-weight: bold;
}
// .color-buttons {
//   display: flex;
// }
.color-button {
  display: block;
  width: 100%;
  border: none;
  margin-bottom: 2px;
  padding: 6px 8px;
  text-align: left;
  font-weight: bold;
}
</style>
