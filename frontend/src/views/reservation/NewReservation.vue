<script lang="ts" setup>
import Loading from '@/components/Loading.vue';
import Navigation from '@/components/Navigation.vue';
import YesNo from '@/components/YesNo.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { CinemaModel } from '@/models/cinema.model';
import type { HallModel } from '@/models/hall.model';
import type { OptionsModel } from '@/models/options.model';
import type { ProjectionModel } from '@/models/projection.model';
import { ReservationService } from '@/services/reservation.service';
import { formatDate } from '@/utils';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const logout = useLogout()
const link = String(route.params.link)

const options = ref<OptionsModel>()
ReservationService.getReservationOptionsByMovieShortUrl(link)
    .then(rsp => options.value = rsp.data)
    .catch(e => logout(e))

const selectedCinema = ref<Number>(0)
const selectedHall = ref<Number>(0)
const reservation = ref({
    projectionId: 0,
    numOfSeats: 1
})

function getCinemas() {
    if (options.value == null)
        return []

    const cinemas: CinemaModel[] = []
    options.value.projections.forEach(p => {
        if (!cinemas.map(c => c.cinemaId).includes(p.hall.cinemaId)) {
            cinemas.push(p.hall.cinema)
        }
    })

    return cinemas
}

function getHalls() {
    if (options.value == null)
        return []

    if (selectedCinema.value == 0)
        return []

    const halls: HallModel[] = []
    options.value.projections
        .filter(p => p.hall.cinemaId === selectedCinema.value)
        .map(p => p.hall)
        .forEach(h => {
            if (!halls.map(h1 => h1.hallId).includes(h.hallId)) {
                halls.push(h)
            }
        })

    return halls
}

function getProjections() {
    if (options.value == null)
        return []

    if (selectedCinema.value == 0)
        return []

    if (selectedHall.value == 0)
        return []

    const projections: ProjectionModel[] = []
    options.value.projections
        .filter(p => p.hallId === selectedHall.value)
        .forEach(p => {
            if (!projections.map(obj => obj.projectionId).includes(p.projectionId)) {
                projections.push(p)
            }
        })

    return projections
}

function onCinemaChange() {
    selectedHall.value = 0
    reservation.value.projectionId = 0
}

function onHallChange() {
    reservation.value.projectionId = 0
}

function makeReservation() {
    if (reservation.value.projectionId == 0) return
    if (reservation.value.numOfSeats < 1) return

    ReservationService.createReservation(reservation.value)
        .then(rsp => router.push('/reservation'))
        .catch(e => logout(e))
}
</script>

<template>
    <Navigation />
    <div v-if="options">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <RouterLink to="/">Početna</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink :to="`/movie/${options.movie.shortUrl}`">
                        {{ options.movie.title }}
                    </RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    Rezervacija
                </li>
            </ol>
        </nav>
        <h1>Rezervacija</h1>
        <div class="row">
            <div class="col-12 col-md-6">
                <form v-if="getCinemas().length > 0" v-on:submit.prevent="makeReservation">
                    <div class="mb-3">
                        <label for="cinema" class="form-label">Bioskop:</label>
                        <select class="form-select" id="cinema" v-model="selectedCinema" @change="onCinemaChange()">
                            <option :value="0">Odaberite bioskop</option>
                            <option v-for="c of getCinemas()" :value="c.cinemaId">
                                {{ c.name }} ({{ c.location }})
                            </option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="hall" class="form-label">Sala:</label>
                        <select class="form-select" id="hall" v-model="selectedHall" :disabled="selectedCinema == 0"
                            @change="onHallChange()">
                            <option :value="0">Odaberite salu</option>
                            <option v-for="h of getHalls()" :value="h.hallId">
                                {{ h.name }} [3D:
                                <YesNo :data="h.has3d" />, Dolby:
                                <YesNo :data="h.dolby" />]
                            </option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="projection" class="form-label">Vreme:</label>
                        <select class="form-select" id="projection" v-model="reservation.projectionId"
                            :disabled="selectedHall == 0">
                            <option :value="0">Odaberite vreme projekcije</option>
                            <option v-for="p of getProjections()" :value="p.projectionId">
                                {{ formatDate(p.time) }}
                            </option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="num" class="form-label">Broj mesta:</label>
                        <input type="number" class="form-control" id="num" v-model="reservation.numOfSeats"
                            :disabled="reservation.projectionId == 0">
                    </div>
                    <button class="btn btn-primary mb-3">
                        <i class="fa-solid fa-floppy-disk"></i> Sačuvaj
                    </button>
                </form>
                <p v-else>Ovaj film trenutno nije dostupan</p>
            </div>
            <div class="col-12 col-md-6">
                <div class="card">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img :src="options.movie.poster" class="img-fluid rounded-start" :alt="options.movie.title">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">{{ options.movie.title }}</h5>
                                <h6 class="card-subtitle mb-2 text-body-secondary">{{ options.movie.director.name }}
                                </h6>
                                <p class="card-text">{{ options.movie.shortDescription }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Loading v-else />
</template>