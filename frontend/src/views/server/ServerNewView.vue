<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { isDebugging, showConfirm, showError } from '@/utils';
import type { ServerModel } from '@/models/server.model';
import { ServerService } from '@/services/server.service';
import CommandButtons from '@/components/CommandButtons.vue';
import { LocationService } from '@/services/location.service';
import type { LocationModel } from '@/models/location.model';

const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)

const newServer = ref<ServerModel>({
    locationId: 1,
    name: "",
    location: undefined,
    serverId: undefined
})
const locations = ref<LocationModel[]>()
LocationService.getLocations().then(data => {
    locations.value = data.data;
})

function saveServer() {
    showConfirm("Are you sure that you want to create this server?", () => {
        ServerService.createServer(newServer.value)
        router.push({ path: `/server/list`, replace: true }).then(() => {
            router.go(0); // refresh previous page
        });
    })
}

function cancel() {
    showConfirm("Are you sure that you want to cancel?", () => {
        router.push({ path: `/server/list`, replace: true });
    })
}
</script>

<template>
    <div class="container">
        <section class="card">
            <pre v-if="isDebugging()">{{ newServer }}</pre>
            <div class="card-header d-flex align-items-center">
                <span class="fs-4">New Server</span>
            </div>
            <form class="card-body">

                <div class="mb-3">
                    <label for="server-name" class="form-label">Server name: </label><br>
                    <input class="form-control" type="text" name="" id="server-name" v-model="newServer.name" required>
                </div>

                <div class="mb-3">
                    <label for="location" class="form-label">Server: </label>
                    <select class="form-select" name="" id="location" v-model="newServer.locationId" required>
                        <option :value="l.locationId" v-for="l in locations">
                            {{ l.address }}, {{ l.city }}, {{ l.country }} ({{ l.shorthand }}) - {{ l.locationId }}
                        </option>
                    </select>
                </div>

            </form>
            <div class="card-footer text-muted d-flex align-items-center">
                <button v-on:click="cancel()" class="btn btn-danger ms-auto" role="button">
                    <i class="fa-solid fa-angle-left"></i> Cancel
                </button>
                <button v-on:click="saveServer()" class="btn btn-primary ms-3" role="button">
                    <i class="fa-regular fa-floppy-disk"></i> Save
                </button>
            </div>
        </section>
    </div>
    <!-- <Loading v-else /> -->
</template>