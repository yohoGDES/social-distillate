<template>
  <div>
    <h3>Ratings ({{ ratingsCount }})</h3>
    <div v-if="averageRating">
      <strong>Average Rating</strong> {{ averageRating }}
    </div>
    <ul>
      <li v-for="rating in ratings" :key="rating.index">
        <code-pill :value="rating.objectId" />
        Rating: {{ rating.rating }}
        <flavor-wheel-chart :flavors="rating.flavorProfile" />
        <!-- <pre>{{ rating }}</pre> -->
      </li>
    </ul>
  </div>
</template>