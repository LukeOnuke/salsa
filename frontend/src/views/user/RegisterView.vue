<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue';
import type { GenreModel } from '@/models/genre.model';
import { UserService } from '@/services/user.service';
import { showError } from '@/utils';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const firstName = ref<string>('')
const lastName = ref<string>('')
const email = ref<string>('')
const phone = ref<string>('')
const password = ref<string>('')
const repeat = ref<string>('')

const router = useRouter()

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
        email: email.value,
        phone: phone.value,
        password: password.value
    })
        .then(rsp => router.push('/login'))
        .catch(e => showError('Registracija neuspesna'))
}
</script>

<template>
    <div class="auth card">
        <div class="card-header">
            <h1 class="text-center card-title">Register a new account!</h1>
        </div>
        <form v-on:submit.prevent="doRegister" class="card-body">
            <div class="mb-3">
                <label for="phone" class="form-label">Name:</label>
                <input type="text" class="form-control" id="phone" v-model="firstName">
            </div>
            <div class="mb-3">
                <label for="phone" class="form-label">Sirname:</label>
                <input type="text" class="form-control" id="phone" v-model="lastName">
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email:</label>
                <input type="email" class="form-control" id="email" v-model="email">
            </div>
            <div class="mb-3">
                <label for="phone" class="form-label">Phone:</label>
                <input type="text" class="form-control" id="phone" v-model="phone">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password:</label>
                <input type="password" class="form-control" id="password" v-model="password">
            </div>
            <div class="mb-3">
                <label for="repeat" class="form-label">Repeat password:</label>
                <input type="password" class="form-control" id="repeat" v-model="repeat">
            </div>
        </form>
        <div class="card-footer d-flex justify-content-center align-items-center p-3">
            <div class="btn-group">
                <button type="submit" class="btn btn-primary">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> Register!
                </button>
                <RouterLink class="btn btn-outline-secondary" to="/login">
                    <i class="fa-solid fa-right-to-bracket"></i> I already have an account.
                </RouterLink>
            </div>
        </div>
    </div>
</template>