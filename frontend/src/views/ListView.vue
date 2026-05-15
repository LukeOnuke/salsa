<script lang="ts" setup>
import Loading from '@/components/Loading.vue';
import Navigation from '@/components/Navigation.vue';
import type { MovieModel } from '@/models/movie.model';
import axios from 'axios';
import { ref } from 'vue';

const movies = ref<MovieModel[]>()
axios.get('https://movie.pequla.com/api/movie')
    .then(rsp => movies.value = rsp.data)
    .catch(e=>{})
</script>

<template>
    <Navigation />
    <div v-if="movies">
        <p>Filmovi:</p>
        <ul>
            <li v-for="m of movies">
                <RouterLink :to="`/movie/${m.shortUrl}`">
                    {{ m.title }} (Reziser: {{ m.director.name }})
                </RouterLink>
                <p>Glumci:</p>
                <ul v-for="a of m.movieActors">
                    <li>{{ a.actor.name }}</li>
                </ul>
                <p>Zanrovi:</p>
                <ul v-for="g of m.movieGenres">
                    <li>{{ g.genre.name }}</li>
                </ul>
            </li>
        </ul>
        <pre>{{ movies }}</pre>
    </div>
    <Loading v-else />
</template>