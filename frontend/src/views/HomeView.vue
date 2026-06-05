<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
import { LogLevel, type LogEntry } from '@/models/logentry.model';
import { ref } from 'vue';
import type { Pagenated } from "@/models/pagenated.model";
import { LogEntryService } from '@/services/logentry.service';
import PagenatedNavigation from '@/components/PagenatedNavigation.vue';

const logs = ref<Pagenated<LogEntry>>();

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
                <div class="card-header text-white"
                    v-bind:class="{ 'bg-info': log.severity === LogLevel.INFO, 'bg-warning': log.severity === LogLevel.WARN, 'bg-danger': log.severity === LogLevel.ERROR, 'bg-purple': log.severity === LogLevel.FATAL }">
                    <span class="badge bg-secondary">{{ log.process.name }}</span> <span>{{ log.severity }} | {{
                        log.importance }}</span>
                </div>
                <div class="card-body">
                    <pre>{{ sanitize(log.content) }}</pre>
                </div>
                <div class="card-footer d-flex align-items-center">
                    <span class="">{{ new Date(log.createdAt).toLocaleString("sr-RS") }}</span>
                    <RouterLink :to="`/log/${log.logEntryId}`" class="btn btn-primary ms-auto" role="button">
                        <i class="fa-solid fa-right-from-bracket"></i> More
                    </RouterLink>
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