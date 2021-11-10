<template>
  <div class="home">The Social Cask - a work in progress</div>
  <h4>Things to make</h4>
  <ul>
    <li>
      General UI
      <ul></ul>
    </li>
    <li>
      Users
      <ul>
        <li>Route Guard</li>
        <li>User info / Edit</li>
      </ul>
    </li>
    <li>
      Groups
      <ul>
        <li>Create group</li>
        <li>Register for group</li>
        <li>Update group</li>
      </ul>
    </li>
    <li>
      Tasting
      <ul>
        <li>Tasting View (uses the /Rate view)</li>
      </ul>
    </li>
    <li>
      Beverage
      <ul>
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
