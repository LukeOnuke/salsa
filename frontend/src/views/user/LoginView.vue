<script lang="ts" setup>
import { AuthService } from '@/services/auth.service';
import Navigation from '@/components/Navigation.vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { UserService } from '@/services/user.service';
import { showError } from '@/utils';

const email = ref<string>('')
const password = ref<string>('')
const route = useRoute()
const router = useRouter()

function doLogin() {
    if (email.value == '' || password.value == '') return
    UserService.login(email.value, password.value)
        .then(rsp => {
            AuthService.setTokens(rsp.data)
            if (route.query.r) {
                router.push(route.query.r as string)
                return
            }

            router.push('/')
        })
        .catch(e => showError('Neispravan mejl ili lozinka'))
}
</script>

<template class="">
    <div class="card">
        <div class="card-header">
            <h1 class="card-title">Log In to your account</h1>
        </div>
        <form v-on:submit.prevent="doLogin" class="card-body">
            <div class="mb-3">
                <label for="email" class="form-label">Email:</label>
                <input type="email" class="form-control" id="email" v-model="email">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Lozinka:</label>
                <input type="password" class="form-control" id="password" v-model="password">
            </div>
            <div class="btn-group">
                <button type="submit" class="btn btn-primary">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> Log In
                </button>
                <!-- <RouterLink class="btn btn-outline-secondary" to="/register">
                    <i class="fa-solid fa-user-plus"></i> Make a new account
                </RouterLink> -->
            </div>
        </form>
    </div>
</template>

<style>
.tiled-element {
    background-image: url('@/assets/bg.svg');
    background-repeat: repeat;
    /* This is the default behavior */
}

.h-fill {
    height: 50vh;
}
</style>