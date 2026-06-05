<script lang="ts" setup>
import { AuthService } from '@/services/auth.service';
import { useLogout } from '@/hooks/logout.hook';

const logout = useLogout()
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">SALSA</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink :to="'/'" class="nav-link active">
                            Home
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink :to="'/'" class="nav-link active">
                            Logs
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink :to="'/'" class="nav-link active">
                            Processes
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink :to="'/'" class="nav-link active">
                            Servers
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink :to="'/'" class="nav-link active">
                            Locations
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                    </li>
                </ul>
            </div>
            <span class="navbar-text" v-if="AuthService.getRefreshToken()">
                <i class="fa-solid fa-user"></i> {{ AuthService.getUserEmail() }}
            </span>
        </div>
    </nav>
</template>