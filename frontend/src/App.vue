<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <div class="container">
    <RouterView />
    <p class="text-center mt-3">
      COPYRIGHT &copy; {{ year }} Luka Kresoja<br>
      Licenced under GNU GPLv3
    </p>
  </div>
</template>