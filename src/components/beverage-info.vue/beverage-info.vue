<template>
  <div>
    <h3>{{ beverage.name }}</h3>
    <div class="beverage-info__row" v-if="beverage.distillery">
      <strong>Distillery:</strong> {{ beverage.distillery }}
    </div>
    <div class="beverage-info__row" v-if="beverage.brand">
      <strong>Brand:</strong> {{ beverage.brand }}
    </div>
    <div class="beverage-info__row" v-if="beverage.category">
      <strong>Category:</strong> <span class="capitalize">{{ beverage.category }}</span>
    </div>
    <div class="beverage-info__row" v-if="beverage.type">
      <strong>Type:</strong> <span class="capitalize">{{ beverage.type }}</span>
    </div>
    <div class="beverage-info__row" v-if="beverage.subType">
      <strong>Style:</strong> {{ beverage.subType }}
    </div>
    <div class="beverage-info__row" v-if="beverage.region">
      <strong>Region:</strong> {{ beverage.region }}
    </div>
    <div class="beverage-info__row" v-if="beverage.proof">
      <strong>Proof:</strong> {{ beverage.proof }}
    </div>
    <div class="beverage-info__row" v-if="beverage.retailPrice">
      <strong>Retail Price:</strong> {{ beverage.retailPrice }}
    </div>
    <div class="beverage-info__row" v-if="beverage.cask">
      <strong>Cask Type:</strong> {{ beverage.cask }}
    </div>
    <div class="beverage-info__row" v-if="beverage.numberOfBottles">
      <strong>Number of Bottles:</strong> {{ beverage.numberOfBottles }}
    </div>
    <div class="beverage-info__row" v-if="beverage.vintage">
      <strong>Vintage:</strong> {{ beverage.vintage }}
    </div>
    <div class="beverage-info__row" v-if="beverage.bottled">
      <strong>Bottled:</strong> {{ beverage.bottled }}
    </div>
    <div class="beverage-info__row" v-if="beverage.statedAge">
      <strong>Stated Age:</strong> {{ beverage.statedAge }}
    </div>
    <div class="beverage-info__row" v-if="beverage.caskNumber">
      <strong>Cask Number:</strong> {{ beverage.caskNumber }}
    </div>
    <div class="beverage-info__row" v-if="beverage.colored">
      <strong>Colored:</strong> {{ beverage.colored }}
    </div>
    <div class="beverage-info__row" v-if="beverage.chillFiltered">
      <strong>Chill Filtered:</strong> {{ beverage.chillFiltered }}
    </div>
    <div class="beverage-info__row" v-if="beverage.singleCask">
      <strong>Single Cask:</strong> {{ beverage.singleCask }}
    </div>
    <div class="beverage-info__row" v-if="beverage.caskStrength">
      <strong>Cask Strength:</strong> {{ beverage.caskStrength }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    beverage: {
      type: Object
    }
  },
  setup(props) {
    return {}
  }
})
</script>
<style lang="scss">
.beverage-info__row {
  display: block;
  padding: 4px 0;
  border-bottom: 1px solid lighten($charcoal, 50%);
}
.capitalize {
  text-transform: capitalize;
}
</style>
