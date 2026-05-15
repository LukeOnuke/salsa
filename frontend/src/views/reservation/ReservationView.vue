<script lang="ts" setup>
import Loading from '@/components/Loading.vue';
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import { useRating } from '@/hooks/rating.hook';
import type { ReservationModel } from '@/models/reservation.model';
import { ReservationService } from '@/services/reservation.service';
import { formatDate, showConfirm } from '@/utils';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const reservations = ref<ReservationModel[]>()
const router = useRouter()
const rating = useRating()
const logout = useLogout()

function loadReservations() {
    ReservationService.getReservations()
        .then(rsp => reservations.value = rsp.data)
        .catch(e => logout(e))
}

function deleteReservation(model: ReservationModel) {
    showConfirm(
        `Obrisati rezervaciju ${model.projection.movie.title} za ${formatDate(model.projection.time)}?`,
        () => {
            ReservationService.deleteReservation(model.reservationId)
                .then(rsp => {
                    reservations.value = reservations.value?.filter(obj => obj.reservationId !== model.reservationId)
                })
                .catch(e => logout(e))
        })
}

function payReservation(model: ReservationModel) {
    showConfirm(`Plati rezervaciju ${model.projection.movie.title} za ${formatDate(model.projection.time)}?`, () => {
        ReservationService.payReservation(model.reservationId)
            .then(rsp => loadReservations())
            .catch(e => logout(e))
    })
}

async function watchReservation(model: ReservationModel) {
    const val = await rating(`Ocenite ${model.projection.movie.title}`)
    if (val != null && val != 0) {
        ReservationService.rateReservation(model.reservationId, val)
            .then(rsp => loadReservations())
            .catch(e => logout(e))
    }
}

function isOutdated(model: ReservationModel) {
    return new Date(model.projection.time) >= new Date() ? 'text-success fw-bold' : 'text-danger fw-bold'
}

loadReservations()

function showRatingModal() {
    throw new Error('Function not implemented.');
}
</script>

<template>
    <Navigation />
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <RouterLink to="/">Početna</RouterLink>
            </li>
            <li class="breadcrumb-item">
                <RouterLink to="/user">Moj Nalog</RouterLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
                Rezervacije
            </li>
        </ol>
    </nav>
    <h1>Rezervacije</h1>
    <table class="table table-striped table-hover" v-if="reservations">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Film</th>
                <th scope="col">Br. Karata</th>
                <th scope="col">Vreme</th>
                <th scope="col">Sala</th>
                <th scope="col">Bioskop</th>
                <th scope="col">Odgledano</th>
                <th scope="col">Izmenjeno</th>
                <th scope="col">Opcije</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="reservations.length > 0" v-for="r of reservations">
                <th scope="row">{{ r.reservationId }}</th>
                <td>{{ r.projection.movie.title }}</td>
                <td>{{ r.numOfSeats }}</td>
                <td :class="isOutdated(r)">{{ formatDate(r.projection.time) }}</td>
                <td>{{ r.projection.hall.name }}</td>
                <td>{{ r.projection.hall.cinema.name }}</td>
                <td>{{ formatDate(r.watchedAt) }}</td>
                <td>{{ formatDate(r.updatedAt ?? r.createdAt) }}</td>
                <td>
                    <div class="btn-group">
                        <template v-if="r.paidAt == null">
                            <button type="button" class="btn btn-sm btn-primary" @click="payReservation(r)"
                                :disabled="new Date(r.projection.time) <= new Date()">
                                <i class="fa-solid fa-credit-card"></i>
                            </button>
                            <button class="btn btn-sm btn-success"
                                @click="() => router.push(`/reservation/${r.reservationId}`)"
                                :disabled="new Date(r.projection.time) <= new Date()">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button type="button" class="btn btn-sm btn-danger" @click="deleteReservation(r)">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </template>
                        <template v-else>
                            <RouterLink :to="`/reservation/${r.reservationId}/details`" class="btn btn-sm btn-primary">
                                <i class="fa-solid fa-arrow-up-right-from-square"></i>
                            </RouterLink>
                            <button type="button" class="btn btn-sm btn-warning" @click="watchReservation(r)"
                                :disabled="new Date(r.projection.time) <= new Date()">
                                <i class="fa-solid fa-star-half-stroke"></i>
                            </button>
                        </template>
                    </div>
                </td>
            </tr>
            <tr v-else>
                <td colspan="8">Nemate rezervisanih karata</td>
            </tr>
        </tbody>
    </table>
    <Loading v-else />
</template>