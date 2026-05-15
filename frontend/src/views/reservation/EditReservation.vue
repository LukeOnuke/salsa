<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue';
import YesNo from '@/components/YesNo.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { CinemaModel } from '@/models/cinema.model';
import type { HallModel } from '@/models/hall.model';
import type { MovieModel } from '@/models/movie.model';
import type { ProjectionModel } from '@/models/projection.model';
import type { ReservationModel } from '@/models/reservation.model';
import { MovieService } from '@/services/movie.service';
import { ProjectionService } from '@/services/projection.service';
import { ReservationService } from '@/services/reservation.service';
import { formatDate } from '@/utils';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const logout = useLogout()
const id = Number(route.params.id)

const selectedMovie = ref<number>(0)
const selectedCinema = ref<number>(0)
const selectedHall = ref<number>(0)
const selectedProjection = ref<number>(0)

const reservation = ref<ReservationModel>()
ReservationService.getReservationById(id)
    .then(rsp => {
        selectedMovie.value = rsp.data.projection.movieId
        selectedCinema.value = rsp.data.projection.hall.cinemaId
        selectedHall.value = rsp.data.projection.hallId
        selectedProjection.value = rsp.data.projectionId
        reservation.value = rsp.data
    })
    .catch(e => logout(e))

const movies = ref<MovieModel[]>()
MovieService.getMovies()
    .then(rsp => movies.value = rsp.data)
    .catch(e => logout(e))


const projections = ref<ProjectionModel[]>([])
watch(selectedMovie, () => {
    ProjectionService.getProjectionsByMovieId(selectedMovie.value)
        .then(rsp => projections.value = rsp.data)
        .catch(e => logout(e))
})

function getCinemas() {
    const cinemas: CinemaModel[] = []
    projections.value.forEach((p: ProjectionModel) => {
        if (!cinemas.map(c => c.cinemaId).includes(p.hall.cinemaId)) {
            cinemas.push(p.hall.cinema)
        }
    })

    // Ako je projekcija istekla
    if (!cinemas.find(obj => obj.cinemaId === selectedCinema.value)) {
        selectedCinema.value = 0
        selectedHall.value = 0
        selectedProjection.value = 0
    }

    return cinemas
}

function getHalls() {
    const halls: HallModel[] = []
    projections.value
        .filter(p => p.hall.cinemaId === selectedCinema.value)
        .map(p => p.hall)
        .forEach(h => {
            if (!halls.map(h1 => h1.hallId).includes(h.hallId)) {
                halls.push(h)
            }
        })

    // Ako je projekcija istekla
    if (!halls.find(obj => obj.hallId === selectedHall.value)) {
        selectedHall.value = 0
        selectedProjection.value = 0
    }

    return halls
}

function getProjections() {
    const filtered: ProjectionModel[] = []
    projections.value
        .filter(p => p.hallId === selectedHall.value)
        .forEach(p => {
            if (!filtered.map(obj => obj.projectionId).includes(p.projectionId)) {
                filtered.push(p)
            }
        })

    // Ako je projekcija istekla
    if (!filtered.find(p => p.projectionId === selectedProjection.value)) {
        selectedProjection.value = 0
    }

    return filtered
}

function onCinemaChange() {
    selectedHall.value = 0
    selectedProjection.value = 0
}

function onHallChange() {
    selectedProjection.value = 0
}

function updateReservation() {
    ReservationService.updateReservation(id, selectedProjection.value, reservation.value!.numOfSeats)
    .then(rsp=>router.push('/reservation'))
    .catch(e => logout(e))
}
</script>

<template>
    <Navigation />
    <h1>Izmeni Rezervaciju</h1>
    <form v-if="reservation && movies" v-on:submit.prevent="updateReservation">
        <div class="mb-3">
            <label for="cinema" class="form-label">Film:</label>
            <select class="form-select" id="cinema" v-model="selectedMovie">
                <option v-for="m of movies" :value="m.movieId">
                    {{ m.title }}
                </option>
            </select>
        </div>
        <div class="mb-3" v-if="projections">
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
            <select class="form-select" id="hall" v-model="selectedHall" @change="onHallChange()">
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
            <select class="form-select" id="projection" v-model="selectedProjection">
                <option :value="0">Odaberite vreme projekcije</option>
                <option v-for="p of getProjections()" :value="p.projectionId">
                    {{ formatDate(p.time) }}
                </option>
            </select>
        </div>
        <div class="mb-3">
            <label for="num" class="form-label">Broj mesta:</label>
            <input type="number" class="form-control" id="num" v-model="reservation.numOfSeats">
        </div>
        <button class="btn btn-primary mb-3">
            <i class="fa-solid fa-floppy-disk"></i> Sačuvaj
        </button>
    </form>
</template>