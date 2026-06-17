<script lang="ts" setup>
import { AuthService } from '@/services/auth.service';
import { useLogout } from '@/hooks/logout.hook';
import { isDebugging, setDebug } from '@/utils';
import { useRouter } from 'vue-router';
import { onDeactivated, onMounted, onUnmounted, onUpdated, ref } from 'vue';

const logout = useLogout()
const refreshToken = ref<string | null>(AuthService.getRefreshToken());
const router = useRouter()

function debugToggler(payload: PointerEvent) {
    if (payload.shiftKey && payload.altKey) {
        const futureDebugState = !isDebugging();

        setDebug(futureDebugState)
        alert(`Debug mode is now ${futureDebugState ? "enabled" : "disabled"}!`)
    }
}

const unregister = router.afterEach(() => {
    refreshToken.value = AuthService.getRefreshToken();
    console.log("Navigation: Refreshed refreshToken. (Used to indicate if user is logged in.)")
})

onUnmounted(() => {
    unregister();
})
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <span class="navbar-brand" @click="debugToggler">SALSA</span>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="refreshToken">
                    <li class="nav-item">
                        <RouterLink :to="'/'" class="nav-link">
                            Home
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink :to="'/'" class="nav-link">
                            Logs
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink :to="'/process/list'" class="nav-link">
                            Processes
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink :to="'/server/list'" class="nav-link">
                            Servers
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink :to="'/location/list'" class="nav-link">
                            Locations
                        </RouterLink>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            User
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <RouterLink class="dropdown-item" to="/user">My account</RouterLink>
                            </li>
                            <li><hr class="dropdown-divider"></li>
                            <li>
                                <div class="dropdown-item">
                                    <button type="button" class="btn btn-danger w-100" @click="logout">Logout</button>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
                <span class="text-danger" v-else>
                    Missing Credentials - <RouterLink to="/login">Log in</RouterLink> to use/navigate the program!
                </span>
            </div>
            <RouterLink class="nav-link active" to="/user" v-if="refreshToken">
                <i class="fa-solid fa-user"></i> {{ AuthService.getUserEmail() }}
            </RouterLink>
        </div>
    </nav>
</template>