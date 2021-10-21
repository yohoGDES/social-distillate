<template>
  <input
    type="range"
    name=""
    id=""
    v-model="proxyValue"
    :min="min"
    :max="max"
    :style="`background-size: ${
      (modelValue - min) * 100 / (max - min)
    }% 100%;`"
  />
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      type: [String, Number]
    },
    min: {
      type: Number
    },
    max: {
      type: Number
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const proxyValue = computed({
      get: () => {
        return props.modelValue
      },
      set: (value) => {
        emit('update:modelValue', value)
      }
    })
    return {
      proxyValue
    }
  }
})
</script>
<style lang="scss" scoped>
input,
output {
  display: inline-block;
  vertical-align: middle;
  font-size: 1em;
  font-family: Arial, sans-serif;
}

output {
  background: #ff4500;
  padding: 5px 16px;
  border-radius: 3px;
  color: #fff;
}

input[type='number'] {
  width: 40px;
  padding: 4px 5px;
  border: 1px solid #bbb;
  border-radius: 3px;
}

/* input[type="range"]:focus,
input[type="number"]:focus {
  box-shadow: 0 0 3px 1px #4b81dd;
  outline: none;
} */

input[type='range'] {
  -webkit-appearance: none;
  margin-right: 15px;
  width: 100%;
  height: 7px;
  background: rgb(207 204 204 / 49%);
  border-radius: 5px;
  background-image: linear-gradient(#ff4500, #ff4500);
  background-size: 70% 100%;
  background-repeat: no-repeat;
}

/* Input Thumb */
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #ff4500;
  cursor: ew-resize;
  box-shadow: 0 0 2px 0 #555;
  transition: background 0.3s ease-in-out;
}

input[type='range']::-moz-range-thumb {
  -webkit-appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #ff4500;
  cursor: ew-resize;
  box-shadow: 0 0 2px 0 #555;
  transition: background 0.3s ease-in-out;
}

input[type='range']::-ms-thumb {
  -webkit-appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #ff4500;
  cursor: ew-resize;
  box-shadow: 0 0 2px 0 #555;
  transition: background 0.3s ease-in-out;
}

input[type='range']::-webkit-slider-thumb:hover {
  background: #ff0200;
}

input[type='range']::-moz-range-thumb:hover {
  background: #ff0200;
}

input[type='range']::-ms-thumb:hover {
  background: #ff0200;
}

/* Input Track */
input[type='range']::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}

input[type='range']::-moz-range-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}

input[type='range']::-ms-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}
</style>
