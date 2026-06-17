<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()


</script>

<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <RouterLink to="/">Home</RouterLink>
            </li>
            <li class="breadcrumb-item" v-for="matched in route.matched">
                <RouterLink :to="matched.path">{{ matched.name }}</RouterLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">{{ route.name }}</li>
        </ol>
    </nav>
</template>