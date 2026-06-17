<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
import { useRouter } from 'vue-router';
import { AuthService } from './services/auth.service';

const year = new Date().getFullYear()
const router = useRouter()

// Handle the wierd event where you are logged out but the aplication still tries.
if(!AuthService.getRefreshToken()){
    router.push({ path: `/login`, replace: true });
}
</script>

<template>
  <Navigation />
  <div class="container mt-3">
    <RouterView />
  </div>
  <footer class="text-center mt-3">
      COPYRIGHT &copy; {{ year }} Luka Kresoja<br>
      Licenced under GNU GPLv3
  </footer>
</template>