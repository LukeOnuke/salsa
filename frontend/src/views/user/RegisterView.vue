<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue';
import type { GenreModel } from '@/models/genre.model';
import { MovieService } from '@/services/movie.service';
import { UserService } from '@/services/user.service';
import { showError } from '@/utils';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const firstName = ref<string>('')
const lastName = ref<string>('')
const email = ref<string>('')
const phone = ref<string>('')
const genreId = ref<number>(0)
const password = ref<string>('')
const repeat = ref<string>('')

const genres = ref<GenreModel[]>()
const router = useRouter()
MovieService.getGenres()
    .then(rsp => {
        genreId.value = rsp.data[0].genreId
        genres.value = rsp.data
    })

function doRegister() {
    if (firstName.value == '') return
    if (lastName.value == '') return
    if (email.value == '') return
    if (phone.value == '') return
    if (password.value == '') return
    if (repeat.value == '') return

    if (password.value != repeat.value) {
        return
    }

    UserService.register({
        firstName: firstName.value,
        lastName: lastName.value,
        genreId: genreId.value,
        email: email.value,
        phone: phone.value,
        password: password.value
    })
        .then(rsp => router.push('/login'))
        .catch(e => showError('Registracija neuspesna'))
}
</script>

<template>
    <Navigation />
    <div class="auth">
        <h3 class="text-center">PSEP 2025<br>REGISTRUJ NOVI NALOG</h3>
        <form v-on:submit.prevent="doRegister">
            <div class="mb-3">
                <label for="phone" class="form-label">Ime:</label>
                <input type="text" class="form-control" id="phone" v-model="firstName">
            </div>
            <div class="mb-3">
                <label for="phone" class="form-label">Prezime:</label>
                <input type="text" class="form-control" id="phone" v-model="lastName">
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email:</label>
                <input type="email" class="form-control" id="email" v-model="email">
            </div>
            <div class="mb-3">
                <label for="phone" class="form-label">Telefon:</label>
                <input type="text" class="form-control" id="phone" v-model="phone">
            </div>
            <div class="mb-3" v-if="genres">
                <label for="genre" class="form-label">Omiljeni žanr:</label>
                <select class="form-select" id="genre" v-model="genreId">
                    <option v-for="g of genres" :value="g.genreId">{{ g.name }}</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Lozinka:</label>
                <input type="password" class="form-control" id="password" v-model="password">
            </div>
            <div class="mb-3">
                <label for="repeat" class="form-label">Ponovljena lozinka:</label>
                <input type="password" class="form-control" id="repeat" v-model="repeat">
            </div>
            <div class="btn-group">
                <button type="submit" class="btn btn-primary">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> Registruj se
                </button>
                <RouterLink class="btn btn-outline-secondary" to="/login">
                    <i class="fa-solid fa-right-to-bracket"></i> Već posedujem nalog
                </RouterLink>
            </div>
        </form>
    </div>
</template>