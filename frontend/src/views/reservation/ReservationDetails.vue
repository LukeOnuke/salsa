<script lang="ts" setup>
import Loading from '@/components/Loading.vue';
import Navigation from '@/components/Navigation.vue';
import type { MovieModel } from '@/models/movie.model';
import type { ReservationModel } from '@/models/reservation.model';
import { MovieService } from '@/services/movie.service';
import { ReservationService } from '@/services/reservation.service';
import { formatDate } from '@/utils';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const id = Number(route.params.id)
const reservation = ref<ReservationModel>()
const movie = ref<MovieModel>()

ReservationService.getReservationById(id)
    .then(rsp => {
        reservation.value = rsp.data
        MovieService.getMovieById(rsp.data.projection.movieId)
            .then(rsp => movie.value = rsp.data)
    })

</script>

<template>
    <Navigation />
    <div v-if="reservation && movie">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <RouterLink to="/">Početna</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink to="/user">Moj Nalog</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink to="/reservation">Rezervacije</RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    {{ movie.title }}
                </li>
            </ol>
        </nav>
        <div class="row mb-3">
            <div class="col-12 col-md-8">
                <h3>Detalji</h3>
                <table class="table table-striped">
                    <tbody>
                        <tr>
                            <th scope="row">Rezervacija:</th>
                            <td>{{ reservation.reservationId }}-{{ movie.corporateId }}-{{ movie.movieId }}</td>
                        </tr>
                        <tr>
                            <th scope="row">Naziv:</th>
                            <td>{{ movie.title }}</td>
                        </tr>
                        <tr>
                            <th scope="row">Režiser:</th>
                            <td>{{ movie.director.name }}</td>
                        </tr>
                        <tr>
                            <th scope="row">Dužina projekcije:</th>
                            <td>{{ movie.runTime }} min</td>
                        </tr>
                        <tr>
                            <th scope="row">Broj mesta:</th>
                            <td>{{ reservation.numOfSeats }}</td>
                        </tr>
                        <tr>
                            <th scope="row">Bioskop:</th>
                            <td>{{ reservation.projection.hall.cinema.name }}</td>
                        </tr>
                        <tr>
                            <th scope="row">Sala:</th>
                            <td>{{ reservation.projection.hall.name }}</td>
                        </tr>
                        <tr>
                            <th scope="row">Opcije:</th>
                            <td>
                                <span v-if="reservation.projection.hall.has3d">3D</span>
                                <span v-if="reservation.projection.hall.dolby">, Dolby</span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Vreme:</th>
                            <td>{{ formatDate(reservation.projection.time) }}</td>
                        </tr>
                        <tr v-if="reservation.paidAt">
                            <th scope="row">Plaćeno:</th>
                            <td>{{ formatDate(reservation.paidAt) }}</td>
                        </tr>
                        <tr v-if="reservation.watchedAt">
                            <th scope="row">Odgledano:</th>
                            <td>{{ formatDate(reservation.watchedAt) }}</td>
                        </tr>
                        <tr v-if="reservation.rating">
                            <th scope="row">Vaša ocena:</th>
                            <td>
                                <i class="fa-solid fa-star" v-if="reservation.rating > 0"></i>
                                <i class="fa-regular fa-star" v-else></i>
                                <i class="fa-solid fa-star" v-if="reservation.rating > 1"></i>
                                <i class="fa-regular fa-star" v-else></i>
                                <i class="fa-solid fa-star" v-if="reservation.rating > 2"></i>
                                <i class="fa-regular fa-star" v-else></i>
                                <i class="fa-solid fa-star" v-if="reservation.rating > 3"></i>
                                <i class="fa-regular fa-star" v-else></i>
                                <i class="fa-solid fa-star" v-if="reservation.rating > 4"></i>
                                <i class="fa-regular fa-star" v-else></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-12 col-md-4">
                <div class="text-center mx-auto invoice">
                    <h5>Fiskalni Račun</h5>
                    <p class="m-0">**********************</p>
                    <p class="m-0">Praktikum Sistemi E-Poslovanja</p>
                    <p class="m-0">Tehnički Fakultet</p>
                    <p class="m-0">Univerzitet Singidunum</p>
                    <p class="m-0">Danijelova 32, 11000 Beograd</p>
                    <p class="m-0">**********************</p>
                    <p class="m-0">Kasir: Online Kupovina</p>
                    <p class="m-0">Sifra: #0001</p>
                    <p class="m-0">**********************</p>
                    <p class="m-0">
                        {{ reservation.numOfSeats }}x {{ movie.title }} u {{ formatDate(reservation.projection.time) }}
                    </p>
                    <p class="m-0">Ukupno: {{ reservation.numOfSeats * 3500 }}</p>
                    <p class="m-0">**********************</p>
                    <p class="m-0">{{ formatDate(reservation.paidAt) }}</p>
                    <img
                        :src="`https://quickchart.io/qr?text=https://sim.purs.singidunum.ac.rs/?token=${reservation.transactionId}`">
                    <p class="m-0">**********************</p>
                    <p class="m-0">Kraj Fiskalnog Računa</p>
                    <p class="m-0">**********************</p>
                    <img :src="`https://barcodeapi.org/api/auto/${reservation.reservationId}?`">
                </div>
            </div>
        </div>
    </div>
    <Loading v-else />
</template>

<style>
.fa-star {
    color: goldenrod;
}

.invoice {
    font-size: 9px;
}

.invoice img {
    max-width: 90px;
}
</style>