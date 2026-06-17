<script lang="ts" setup>
import { LogLevel, type LogEntryModel } from '@/models/logentry.model';
import { LogEntryService } from '@/services/logentry.service';
import { isDebugging, showConfirm, showError, toLocalDatetimeInputString } from '@/utils';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import { VueDatePicker } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import type { ProcessModel } from '@/models/process.model';
import { ProcessService } from '@/services/process.service';
import CommandButtons from '@/components/CommandButtons.vue';

const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)

const log = ref<LogEntryModel>()
const newLogEntry = ref<LogEntryModel>()
const processes = ref<ProcessModel[]>()

LogEntryService.getLogById(id).then(resp => {
    log.value = resp.data
    newLogEntry.value = log.value;
})

ProcessService.getProcesses().then(resp => {
    processes.value = resp.data;
})

function deleteLog() {
    showConfirm(`Delete Log Entry (ID: ${log.value?.logEntryId})`, () => {
        if (log.value && log.value.logEntryId) {
            LogEntryService.deleteLogById(log.value.logEntryId);

            router.push({ path: "/", replace: true, }).then(() => {
                router.go(0); // refresh previous page
            });
        } else {
            showError("Could not delete LogEntry: log.value is undefined!")
        }
    }, true)
}

function saveLogEntry(){
    showConfirm("Are you sure that you want to save this log entry?", () => {
        if(newLogEntry.value) LogEntryService.updateLogEntry(newLogEntry.value)
        router.push({ path: `/log/${log.value?.logEntryId}`, replace: true }).then(() => {
            router.go(0); // refresh previous page
        });
    })
}

function cancel(){
    showConfirm("Are you sure that you want to cancel?", () => {
        router.push({ path: `/log/${log.value?.logEntryId}`, replace: true });
    })
}
</script>

<template>
    <main class="container">
        <div class="card" v-if="newLogEntry && log">
            <pre v-if="isDebugging()">{{ newLogEntry }}</pre>
            <div class="card-header d-flex align-items-center">
                <span class="fs-4 fw-bold">Log Entry</span>

                
                <CommandButtons entityName="log" :entityId="log.logEntryId" :enableInfo="true"
                        :enableEdit="false" :deleteFunction="deleteLog" />
            </div>
            <form class="card-body" v-on:submit.prevent="saveLogEntry">
                <div class="mb-3">
                    <label for="log-id" class="form-label">Id </label>
                    <input class="form-control" type="number" name="" id="log-id" :value="new Number(id)" disabled>
                </div>

                <div class="mb-3">
                    <label for="log-level" class="form-label">Severity: </label>
                    <select class="form-control" name="" id="log-level" v-model="newLogEntry.severity" required>
                        <option :value="severityIterator" v-for="severityIterator in LogLevel">{{ severityIterator
                        }}</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="importanceInput" class="form-label">Importance: </label>
                    <input class="form-control" type="number" id="importanceInput" min="0" max="100" value="0"
                        v-model="newLogEntry.importance" required>
                </div>

                <div class="mb-3">
                    <label for="isImportantInput" class="form-label">Is Important: </label>
                    <input class="ms-1" type="checkbox" name="" id="isImportantInput" v-model="newLogEntry.isImportant">
                </div>

                <div class="mb-3">
                    <label for="createdAtInput" class="form-label">Created At: </label>
                    <VueDatePicker  v-model="newLogEntry.createdAt" :input-attrs="{ clearable: false }" dark required></VueDatePicker>
                </div>

                <div class="mb-3">
                    <label for="process" class="form-label">Process: </label>
                    <select class="form-select" name="" id="process" v-model="newLogEntry.processId" required>
                        <option :value="p.processId" v-for="p in processes">
                            {{ p.name }} - {{ p.processId }}
                        </option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="contentInput" class="form-label">Content: </label>
                    <br>
                    <textarea name="" id="contentInput" class="w-100" v-model="newLogEntry.content"></textarea>
                </div>

            </form>
            <div class="card-footer text-muted d-flex align-items-center">
                <button v-on:click="cancel()" class="btn btn-danger ms-auto" role="button">
                    <i class="fa-solid fa-angle-left"></i> Cancel
                </button>
                <button v-on:click="saveLogEntry()" class="btn btn-primary ms-3" role="button">
                    <i class="fa-regular fa-floppy-disk"></i> Save
                </button>
            </div>
        </div>
    </main>
</template>