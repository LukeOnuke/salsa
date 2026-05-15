<script lang="ts" setup>
import Loading from '@/components/Loading.vue';
import Navigation from '@/components/Navigation.vue';
import type { MovieModel } from '@/models/movie.model';
import { MovieService } from '@/services/movie.service';
import { formatDate } from '@/utils';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const movie = ref<MovieModel>()
const short = route.params.link as string

MovieService.getMovieByShortUrl(short)
    .then(rsp => movie.value = rsp.data)
</script>

<template>
    <Navigation />
    <div v-if="movie">
        <div class="row mt-3">
            <div class="col-12 col-md-9">
                <table class="table table-striped">
                    <tbody>
                        <tr>
                            <th scope="row">Naziv:</th>
                            <td>{{ movie.title }}</td>
                        </tr>
                        <tr>
                            <th scope="row">Režiser:</th>
                            <td>{{ movie.director.name }}</td>
                        </tr>
                        <tr>
                            <th scope="row">Opis:</th>
                            <td>{{ movie.description }}</td>
                        </tr>
                        <tr>
                            <th scope="row">Početak projekcije:</th>
                            <td>{{ movie.startDate }}</td>
                        </tr>
                        <tr>
                            <th scope="row">Dužina projekcije:</th>
                            <td>{{ movie.runTime }} min</td>
                        </tr>
                        <tr>
                            <th scope="row">Izmenjeno datuma:</th>
                            <td>{{ formatDate(movie.updatedAt ?? movie.createdAt) }}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="mb-3">
                    <RouterLink class="btn btn-primary" :to="`/movie/${short}/reservation`">
                        <i class="fa-solid fa-ticket"></i> Rezerviši
                    </RouterLink>
                </div>
            </div>
            <div class="col-12 col-md-3">
                <img :src="movie.poster" :alt="movie.title" class="img-fluid">
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12 col-md-6">
                <h3>Glumci:</h3>
                <ul class="list-group">
                    <li class="list-group-item" v-for="a of movie.movieActors">{{ a.actor.name }}</li>
                </ul>
            </div>
            <div class="col-12 col-md-6">
                <h3>Žanrovi:</h3>
                <ul class="list-group">
                    <li class="list-group-item" v-for="g of movie.movieGenres">{{ g.genre.name }}</li>
                </ul>
            </div>
        </div>
    </div>
    <Loading v-else />
</template>