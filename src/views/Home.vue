<template>
  <div class="home">The Social Cask - a work in progress</div>
  <h4>Things to make</h4>
  <ul>
    <li>Groups
      <ul>
        <li>Create group</li>
        <li>Register for group</li>
        <li>Update group</li>
      </ul>
    </li>
    <li>Tasting
      <ul>
        <li>Create tasting (bind to group)</li>
        <li>Tasting View (uses the /Rate view)</li>
      </ul>
    </li>
    <li>
      Beverage
      <ul>
        <li>Create Beverage</li>
        <li>Attach Beverage to Tasting</li>
        <li>Attach rating to Beverage</li>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  components: {}
})
</script>
