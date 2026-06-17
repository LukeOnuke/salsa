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
const id = Number(route.params.id)

const process = ref<ProcessModel>()
const newProcess = ref<ProcessModel>({})
const servers = ref<ServerModel[]>()

ProcessService.getProcessById(id).then(data => {
    process.value = data.data
    newProcess.value = data.data
})

ServerService.getServers().then(data => {
    servers.value = data.data;
})

function deleteProcess() {
    showConfirm(`Delete process (ID: ${process.value?.processId})`, () => {
        if (process.value && process.value.processId) {
            ProcessService.deleteProcessById(process.value?.processId)

            router.push({ path: "/process/list", replace: true, }).then(() => {
                router.go(0); // refresh previous page
            });
        } else {
            showError("Could not delete process: process.value is undefined!")
        }
    }, true)
}

function saveProcess() {
    showConfirm("Are you sure that you want to save this process?", () => {
        if (newProcess.value) ProcessService.updateProcess(newProcess.value)
        router.push({ path: `/process/view/${process.value?.processId}`, replace: true }).then(() => {
            router.go(0); // refresh previous page
        });
    })
}

function cancel() {
    showConfirm("Are you sure that you want to cancel?", () => {
        router.push({ path: `/process/view/${process.value?.processId}`, replace: true });
    })
}
</script>

<template>
    <div v-if="process && newProcess" class="container">
        <section class="card">
            <pre v-if="isDebugging()">{{ newProcess }}</pre>
            <div class="card-header d-flex align-items-center">
                <span class="fs-4">Edit Process</span>

                <CommandButtons entityName="process" :entityId="process.processId" :enableInfo="true" :enableEdit="false"
                    :deleteFunction="deleteProcess" />
            </div>
            <form class="card-body">

                <div class="mb-3">
                    <label for="process-id" class="form-label">Id </label>
                    <input class="form-control" type="number" name="" id="process-id" :value="new Number(id)" disabled>
                </div>

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