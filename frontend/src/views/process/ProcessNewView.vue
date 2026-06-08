<script setup lang="ts">
import { ref } from 'vue';
import type { ProcessModel } from '@/models/process.model';
import { ProcessService } from '@/services/process.service';
import { useRoute, useRouter } from 'vue-router';
import { isDebugging, showConfirm, showError } from '@/utils';
import type { ServerModel } from '@/models/server.model';
import { ServerService } from '@/services/server.service';
import CommandButtons from '@/components/CommandButtons.vue';

const route = useRoute()
const router = useRouter()

const newProcess = ref<ProcessModel>({
    name: "",
    serverId: 1,
    secret: "",
    server: undefined
})
const servers = ref<ServerModel[]>()

ServerService.getServers().then(data => {
    servers.value = data.data;
})

function saveProcess() {
    showConfirm("Are you sure that you want to create a new process?", () => {
        if (newProcess.value) ProcessService.createProcess(newProcess.value)
        router.push({ path: `/process/list`, replace: true }).then(() => {
            router.go(0); // refresh previous page
        });
    })
}

function cancel() {
    showConfirm("Are you sure that you want to cancel?", () => {
        router.push({ path: `/process/list`, replace: true });
    })
}
</script>

<template>
    <div class="container">
        <section class="card">
            <pre v-if="isDebugging()">{{ newProcess }}</pre>
            <div class="card-header d-flex align-items-center">
                <span class="fs-4">Process</span>
            </div>
            <form class="card-body">
                <div class="mb-3">
                    <label for="process-name" class="form-label">Process name: </label><br>
                    <input class="form-control" type="text" name="" id="process-name" v-model="newProcess.name">
                </div>

                <div class="mb-3">
                    <label for="server" class="form-label">Server: </label>
                    <select class="form-select" name="" id="server" v-model="newProcess.serverId" required>
                        <option :value="s.serverId" v-for="s in servers">
                            {{ s.name }} - {{ s.serverId }}
                        </option>
                    </select>
                </div>

            </form>
            <div class="card-footer text-muted d-flex align-items-center">
                <button v-on:click="cancel()" class="btn btn-danger ms-auto" role="button">
                    <i class="fa-solid fa-angle-left"></i> Cancel
                </button>
                <button v-on:click="saveProcess()" class="btn btn-primary ms-3" role="button">
                    <i class="fa-regular fa-floppy-disk"></i> Save
                </button>
            </div>
        </section>
    </div>
    <!-- <Loading v-else /> -->
</template>