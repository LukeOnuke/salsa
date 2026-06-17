<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
import { LogLevel, type LogEntryModel } from '@/models/logentry.model';
import { ref } from 'vue';
import type { Pagenated } from "@/models/pagenated.model";
import { LogEntryService } from '@/services/logentry.service';
import PagenatedNavigation from '@/components/PagenatedNavigation.vue';
import type { ProcessModel } from '@/models/process.model';
import { ProcessService } from '@/services/process.service';
import CommandButtons from '@/components/CommandButtons.vue';

const processes = ref<Pagenated<ProcessModel>>();

function getProcesses(pageSize: number, pageNumber: number) {
    ProcessService.getProcessesPagenated(pageSize, pageNumber).then(rsp => {
        processes.value = rsp.data;
    })
}

function getPrevious() {
    if (processes.value) getProcesses(10, processes.value.currentPage - 1)
}

function getNext() {
    if (processes.value) getProcesses(10, processes.value.currentPage + 1)
}

getProcesses(10, 1)
</script>

<template>
    <div class="container">
        <section>
            <div class="d-flex align-items-center">
                <div>
                    <h1>Pagenated list of Process</h1>
                    <p>Sorted by id desceding.</p>
                </div>
                <RouterLink to="/process/new"
                    class="ms-auto btn btn-primary d-flex align-items-center justify-content-center p-0">
                    <i class="fa-solid fa-plus fs-2 m-2"></i>
                </RouterLink>
            </div>
            <hr>
        </section>

        <main v-if="processes">
            <section class="card mb-3" v-for="process in processes.entries">
                <div class="card-header d-flex align-items-center">
                    <span class="fs-4">Process</span>

                    <CommandButtons entityName="process" :entityId="process.processId" :enableInfo="true"
                        :enableEdit="true" />
                </div>
                <div class="card-body">
                    <p>Process name <span class="fw-bold">{{ process.name }}</span></p>
                    <p v-if="process.server">Host server: <span class="fw-bold">{{ process.server.name }}</span> <span
                            class="badge bg-secondary">ID: {{ process.server.serverId }}</span></p>
                </div>
                <div class="card-footer text-muted">
                    Process ID: {{ process.processId }}
                </div>
            </section>
            <PagenatedNavigation :onPrevious="getPrevious" :onNext="getNext" :pagenatedData="processes" />
        </main>

    </div>
    <!-- <Loading v-else /> -->
</template>