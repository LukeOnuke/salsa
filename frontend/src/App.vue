<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';

const year = new Date().getFullYear()
</script>

<template>
  <Navigation />
  <div class="container mt-3">
    <RouterView />
    <p class="text-center mt-3">
      COPYRIGHT &copy; {{ year }} Luka Kresoja<br>
      Licenced under GNU GPLv3
    </p>
  </div>
</template>