<script lang="ts" setup>
import { AuthService } from '@/services/auth.service';
import { useLogout } from '@/hooks/logout.hook';
import { isDebugging, setDebug } from '@/utils';

const logout = useLogout()

function debugToggler(payload: PointerEvent){
    if(payload.shiftKey && payload.altKey) {
        const futureDebugState = !isDebugging();
        
        setDebug(futureDebugState)
        alert(`Debug mode is now ${futureDebugState? "enabled" : "disabled"}!`)
    }
}
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
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
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
                </ul>
            </div>
            <RouterLink class="nav-link active" to="/user" v-if="AuthService.getRefreshToken()">
                <i class="fa-solid fa-user"></i> {{ AuthService.getUserEmail() }}
            </RouterLink>
        </div>
    </nav>
</template>