<script lang="ts" setup>
import Loading from '@/components/Loading.vue';
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { UserModel } from '@/models/user.model';
import { UserService } from '@/services/user.service';
import { formatDate, showConfirm } from '@/utils';
import { ref } from 'vue';

const user = ref<UserModel>()
const logout = useLogout()
UserService.getSelfUser()
    .then(rsp => user.value = rsp.data)
    .catch(e => logout(e))

</script>

<template>
    <div class="" v-if="user">
        <div class="card">
            <div class="card-header">
                User
            </div>
            <main class="card-body">
                <div class="mb-3">
                    <p class="form-label">Name:</p>
                    <p class="form-control">{{ user.firstName }}</p>
                </div>

                <div class="mb-3">
                    <p class="form-label">Sirname:</p>
                    <p class="form-control">{{ user.lastName }}</p>
                </div>

                <div class="mb-3">
                    <p class="form-label">Email:</p>
                    <p class="form-control">{{ user.email }}</p>
                </div>

                <div class="mb-3">
                    <p class="form-label">Tel:</p>
                    <p class="form-control">{{ user.phone }}</p>
                </div>
            </main>
        </div>
    </div>
    <Loading v-else />
</template>