<template>
  <div>
    <router-link to="/beverages">Back to Beverages</router-link>
    <h2>
      <template v-if="isNewBeverage">New </template>
      <template v-else>Edit </template>
      Beverage
      <code-pill :value="beverage.objectId" />
    </h2>
    <router-link v-if="!isNewBeverage" :to="`/beverage/${beverage.objectId}`"
      >view</router-link
    >
    <form action.prevent="">
      <sc-form-row>
        <sc-form-label>Name</sc-form-label>
        <sc-text v-model="beverage.name" />
      </sc-form-row>
      <sc-form-row>
        <sc-form-label>Category</sc-form-label>
        <sc-form-description>
          What is the category of beverage?
        </sc-form-description>
        <sc-dropdown
          :options="bevCategories"
          v-model="beverage.category"
        ></sc-dropdown>
      </sc-form-row>
      <div class="spirit-values" v-if="beverage.category === 'spirit'">
        <sc-form-row>
          <sc-form-label>Type</sc-form-label>
          <sc-form-description>
            What is the type of spirit?
          </sc-form-description>
          <sc-dropdown
            :options="spiritTypes"
            v-model="beverage.type"
            @change="beverage.subType = null"
          ></sc-dropdown>
        </sc-form-row>
        <sc-form-row>
          <sc-form-label>Style</sc-form-label>
          <sc-form-description>
            Style of this {{ beverage.type }}.
          </sc-form-description>
          <sc-dropdown
            :options="activeSubTypes"
            v-model="beverage.subType"
          ></sc-dropdown>
        </sc-form-row>
        <sc-form-row>
          <sc-form-label>Distillery</sc-form-label>
          <sc-form-description>Who produced this?</sc-form-description>
          <sc-text v-model="beverage.distillery" />
        </sc-form-row>
        <sc-form-row>
          <sc-form-label>Brand</sc-form-label>
          <sc-form-description>What brand is this?</sc-form-description>
          <sc-text v-model="beverage.brand" />
        </sc-form-row>
        <sc-form-row>
          <sc-form-label>Proof</sc-form-label>
          <sc-text v-model="beverage.proof" />
        </sc-form-row>
        <sc-form-row>
          <sc-form-label>Number of Bottles</sc-form-label>
          <sc-text v-model="beverage.numberOfBottles" />
        </sc-form-row>
        <sc-form-row>
          <sc-form-label>Vintage</sc-form-label>
          <sc-text v-model="beverage.vintage" />
        </sc-form-row>
        <sc-form-row>
          <sc-form-label>Bottled</sc-form-label>
          <sc-text v-model="beverage.bottled" />
        </sc-form-row>
        <sc-form-row>
          <sc-form-label>Stated Age</sc-form-label>
          <sc-text v-model="beverage.statedAge" />
        </sc-form-row>
        <sc-form-row>
          <sc-form-label>Cask Number</sc-form-label>
          <sc-text v-model="beverage.caskNumber" />
        </sc-form-row>
        <sc-form-row>
          <sc-form-label>Retail Price</sc-form-label>
          <sc-currency
            v-model="beverage.retailPrice"
            :options="{
              currency: 'USD',
              useGrouping: true
            }"
          />
        </sc-form-row>
        <sc-form-row>
          <sc-form-label>Region</sc-form-label>
          <sc-text v-model="beverage.region" />
        </sc-form-row>
        <sc-form-row>
          <sc-form-label>Cask Type</sc-form-label>
          <sc-form-description
            >What type of cask was this {{ beverage.type }} aged
            in?</sc-form-description
          >
          <sc-text v-model="beverage.cask" />
        </sc-form-row>
        <sc-form-row>
          <sc-form-label>Colored</sc-form-label>
          <sc-form-description>Was color added?</sc-form-description>
          <sc-radio
            :options="['Colored', 'Uncolored']"
            v-model="beverage.colored"
          />
        </sc-form-row>
        <sc-form-row>
          <sc-form-label>Chill-Filtered</sc-form-label>
          <sc-form-description>Was this chill-filtered?</sc-form-description>
          <sc-radio
            :options="['Chill-Filtered', 'Non-Chill Filtered']"
            v-model="beverage.chillFiltered"
          />
        </sc-form-row>
        <sc-form-row>
          <sc-form-label>Single Cask</sc-form-label>
          <sc-form-description
            >Is this a single cask release?</sc-form-description
          >
          <sc-radio :options="['Yes', 'No']" v-model="beverage.singleCask" />
        </sc-form-row>
        <sc-form-row>
          <sc-form-label>Cask Strength</sc-form-label>
          <sc-form-description>Is this cask strength?</sc-form-description>
          <sc-radio :options="['Yes', 'No']" v-model="beverage.caskStrength" />
        </sc-form-row>
        <!-- TODO: (Enhancement) Add photo upload capability -->
      </div>
      <sc-form-row>
        <sc-button @click.prevent="saveBeverage()"> Save </sc-button>
      </sc-form-row>
    </form>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useBeverageStore } from '@/store/modules/beverage'
import {
  BeverageModel,
  BeverageCategories,
  Beverage,
  BeverageCategory
} from '../../../cloud/src/model/beverage'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'beverage-edit',
  setup(_, context) {
    const beverageStore = useBeverageStore()
    const route = useRoute()
    const beverage = ref({
      objectId: null,
      category: 'spirit',
      type: 'whiskey'
    })

    const isNewBeverage = computed(() => route.params.id === 'new')

    const bevCategories = Object.values(BeverageCategories).map((v) => {
      return {
        label: v.charAt(0).toUpperCase() + v.slice(1),
        value: v
      }
    })

    const activeSubTypes = computed<any>(() => {
      let active
      switch (beverage.value.type) {
        case 'gin':
          active = ginStyles
          break
        case 'rum':
          active = rumStyles
          break
        case 'agave':
          active = agaveStyles
          break
        case 'brandy':
          active = brandyStyles
          break
        case 'vodka':
          active = vodkaStyles
          break
        case 'liqueur':
          active = liqueurStyles
          break
        case 'other':
          active = otherStyles
          break
        case 'whiskey':
          active = whiskeyStyles
          break
        default:
          active = whiskeyStyles
          break
      }
      return active
    })

    const spiritTypes = [
      {
        label: 'Whiskey',
        value: 'whiskey'
      },
      {
        label: 'Gin',
        value: 'gin'
      },
      {
        label: 'Agave',
        value: 'agave'
      },
      {
        label: 'Rum',
        value: 'rum'
      },
      {
        label: 'Brandy',
        value: 'brandy'
      },
      {
        label: 'Vodka',
        value: 'vodka'
      },
      {
        label: 'Liqueur',
        value: 'liqueur'
      },
      {
        label: 'Other',
        value: 'other'
      }
    ]

    const whiskeyStyles = [
      'American Single Malt',
      'Blended',
      'Blended American Whiskey',
      'Blended Grain',
      'Blended Malt',
      'Bourbon',
      'Canadian',
      'Corn',
      'Flavored Whiskey',
      'Other Whiskey',
      'Peated Blend',
      'Peated Blended Malt',
      'Peated Single Malt',
      'Rye',
      'Single Grain',
      'Single Malt',
      'Single Pot Still',
      'Spirit ',
      'Tennessee',
      'Wheat Whiskey',
      'White'
    ]

    const agaveStyles = [
      'Bacanora Añejo',
      'Bacanora Blanco',
      'Flavored Tequila',
      'Mezcal Añejo',
      'Mezcal Extra Añejo',
      'Mezcal Gold',
      'Mezcal Joven',
      'Mezcal Reposado',
      'Other Agave',
      'Raicilla ',
      'Sotol ',
      'Tequila Añejo',
      'Tequila Blanco',
      'Tequila Extra Añejo',
      'Tequila Joven',
      'Tequila Mixto Añejo',
      'Tequila Mixto Blanco',
      'Tequila Mixto Extra Añejo',
      'Tequila Mixto Gold',
      'Tequila Mixto Reposado',
      'Tequila Reposado'
    ]

    const rumStyles = [
      'Aged Rum',
      'Aguardiente',
      'Cachaça ',
      'Dark Rum',
      'Flavored Rum',
      'Gold Rum',
      'Navy Rum',
      'Other Sugarcane',
      'Rhum Agricole Blanc',
      'Rhum Agricole Éléve Sous Bois',
      'Rhum Agricole Vieux',
      'Silver Rum',
      'Spiced Rum'
    ]

    const brandyStyles = [
      'American Brandy',
      'Arak',
      'Armagnac',
      'Blanche Armagnac',
      'Calvados',
      'Cognac',
      'Eau-de-Vie',
      'Grappa/Marc ',
      'Other Brandy',
      'Pisco ',
      'Spanish'
    ]

    const ginStyles = [
      'Barrel-Aged Gin',
      'Compound Gin',
      'Distilled Gin',
      'Flavored Gin',
      'Fruit Genever',
      'Genever',
      'Genever-Style',
      'Gin de Mahón',
      'London Dry Gin',
      'Modern Gin',
      'Navy-Strength Gin',
      'Old Tom Gin',
      'Plymouth Gin'
    ]

    const vodkaStyles = [
      'Barrel-Aged Vodka',
      'Flavored Vodka',
      'Unflavored Vodka'
    ]

    const liqueurStyles = [
      'Amaro',
      'Anise Liqueurs',
      'Bitter Liqueurs',
      'Chocolate Liqueurs',
      'Coffee Liqueurs',
      'Dairy/Egg Liqueurs',
      'Floral Liqueurs',
      'Fruit Liqueurs',
      'Herbal/Spice Liqueurs',
      'Non-Potable Bitters',
      'Nut Liqueurs',
      'Other Liqueurs',
      'Sloe Gin &amp; Variants',
      'Triple Sec/Curaçao'
    ]

    const otherStyles = [
      'Absinthe',
      'Aquavit',
      'Baijiu',
      'Botanical Spirit',
      'Other Aromatized Wine',
      'Other Spirits ',
      'Poitín',
      'Ready to Drink',
      'Shochu/Soju',
      'Vermouth',
      'Zero Proof'
    ]
    const saveBeverage = async () => {
      const result = await beverageStore.saveBeverage(beverage.value)
      if (result) {
        beverage.value.objectId = result.objectId
      }
    }
    const getBeverage = async (id: string) => {
      if (!id) return
      const result = await beverageStore.getBeverage(id)
      beverage.value = result
    }

    onMounted(async () => {
      if (route.params.id !== 'new')
        await getBeverage(route.params.id as string)
    })
    return {
      beverage,
      bevCategories,
      spiritTypes,
      activeSubTypes,
      saveBeverage,
      getBeverage,
      isNewBeverage
    }
  }
})
</script>
