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

const server = ref<ServerModel>()
const newServer = ref<ServerModel>({})
const locations = ref<LocationModel[]>()

ServerService.getServerById(id).then(data => {
    server.value = data.data
    newServer.value = data.data
})

LocationService.getLocations().then(data => {
    locations.value = data.data;
})

function deleteServer() {
    showConfirm(`Delete server (ID: ${server.value?.serverId})`, () => {
        if (server.value && server.value.serverId) {
            ServerService.deleteServerById(server.value?.serverId)

            router.push({ path: "/server/list", replace: true }).then(() => {
                router.go(0); // refresh previous page
            });
        } else {
            showError("Could not delete server: server.value is undefined!")
        }
    }, true)
}

function saveServer() {
    showConfirm("Are you sure that you want to save this server?", () => {
        if (newServer.value) ServerService.updateServer(newServer.value)
        router.push({ path: `/server/view/${server.value?.serverId}`, replace: true }).then(() => {
            router.go(0); // refresh previous page
        });
    })
}

function cancel() {
    showConfirm("Are you sure that you want to cancel?", () => {
        router.push({ path: `/server/view/${server.value?.serverId}`, replace: true });
    })
}
</script>

<template>
    <div v-if="server && newServer" class="container">
        <section class="card">
            <pre v-if="isDebugging()">{{ newServer }}</pre>
            <div class="card-header d-flex align-items-center">
                <span class="fs-4">Server</span>

                <CommandButtons entityName="server" :entityId="server.serverId" :enableInfo="true" :enableEdit="false"
                    :deleteFunction="deleteServer" />
            </div>
            <form class="card-body">

                <div class="mb-3">
                    <label for="server-id" class="form-label">Id </label>
                    <input class="form-control" type="number" name="" id="server-id" :value="new Number(id)" disabled>
                </div>

                <div class="mb-3">
                    <label for="server-name" class="form-label">Server name: </label><br>
                    <input class="form-control" type="text" name="" id="server-name" v-model="newServer.name">
                </div>

                <div class="mb-3">
                    <label for="location" class="form-label">Server: </label>
                    <select class="form-select" name="" id="location" v-model="newServer.locationId" required>
                        <option :value="l.locationId" v-for="l in locations">
                            ({{ l.shorthand }}) {{ l.address }}, {{ l.city }}, {{ l.country }} - {{ l.locationId }}
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