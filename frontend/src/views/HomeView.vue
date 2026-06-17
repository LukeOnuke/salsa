<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
import { LogLevel, type LogEntryModel } from '@/models/logentry.model';
import { ref } from 'vue';
import type { Pagenated } from "@/models/pagenated.model";
import { LogEntryService } from '@/services/logentry.service';
import PagenatedNavigation from '@/components/PagenatedNavigation.vue';
import CommandButtons from '@/components/CommandButtons.vue';

const logs = ref<Pagenated<LogEntryModel>>();

function getLogs(pageSize: number, pageNumber: number) {
    LogEntryService.getLogsPagenated(pageSize, pageNumber).then(rsp => {
        logs.value = rsp.data;
    })
}

function getPrevious() {
    if (logs.value) getLogs(10, logs.value.currentPage - 1)
}

function getNext() {
    if (logs.value) getLogs(10, logs.value.currentPage + 1)
}

function sanitize(unsafeText: string): string {
    if (!unsafeText) return '';

    return unsafeText
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;"); // or &apos;
}

getLogs(10, 1)
</script>

<template>
    <div class="container">
        <section>
            <h1>Pagenated list of LogEntry</h1>
            <p>Sorted by id desceding.</p>
            <hr>
        </section>

        <main v-if="logs">
            <section class="card mb-3" v-for="log in logs.entries">
                <div class="card-header d-flex align-items-center">

                    <span class="badge bg-secondary">{{ log.process.name }}</span> 
                    <span>{{ log.severity }} | {{log.importance }}</span>

                    <CommandButtons class="" entityName="log" :entityId="log.logEntryId" :enableInfo="true" :enableEdit="true" />
                </div>
                <div class="card-body">
                    <pre>{{ sanitize(log.content) }}</pre>
                </div>
                <div class="card-footer text-white"
                v-bind:class="{ 'bg-info': log.severity === LogLevel.INFO, 'bg-warning': log.severity === LogLevel.WARN, 'bg-danger': log.severity === LogLevel.ERROR, 'bg-purple': log.severity === LogLevel.FATAL }">
                    <span class="">{{ new Date(log.createdAt).toLocaleString("sr-RS") }}</span>
                </div>
            </section>
            <PagenatedNavigation :onPrevious="getPrevious" :onNext="getNext" :pagenatedData="logs" />
        </main>

    </div>
    <!-- <Loading v-else /> -->
</template>

<style>
.card-holder {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
}

.movie-card {
    width: 18rem;
    min-height: 200px;
}
</style>