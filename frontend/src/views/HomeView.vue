<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
import { LogLevel, type LogEntry } from '@/models/logentry.model';
import { ref } from 'vue';
import type { Pagenated } from "@/models/pagenated.model";
import { LogEntryService } from '@/services/logentry.service';

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

getLogs(10, 1)
</script>

<template>
    <Navigation />
    <div class="container">
        <section v-if="logs">
            <div class="card mb-3" v-for="log in logs.entries">
                <div class="card-header text-white" v-bind:class="{'bg-info' : log.severity === LogLevel.INFO, 'bg-warning': log.severity === LogLevel.WARN, 'bg-danger': log.severity === LogLevel.ERROR, 'bg-purple': log.severity === LogLevel.FATAL}">
                    <span>{{ log.processId }} | {{ log.severity }} | {{ log.importance }}</span>
                </div>
                <div class="card-body">
                    <p>⚠️ For now Cross Site Scripting is possible since the content isnt sanitised!</p>
                    <pre>
                        {{ log.content }}
                    </pre>
                </div>
                <div class="card-footer">
                    <span>{{ new Date(log.createdAt).toLocaleString("sr-RS") }}</span>
                    <RouterLink :to="`/log/${log.logEntryId}`" class="btn btn-primary" role="button">
                        <i class="fa-solid fa-right-from-bracket"></i> More
                    </RouterLink>
                </div>
            </div>
            <ul class="pagination justify-content-center">
                <li class="page-item" v-if="logs.currentPage > 1">
                    <RouterLink class="page-link" v-on:click="getPrevious()" to="#">
                        Previous
                    </RouterLink>
                </li>
                <li class="page-item" v-if="logs.currentPage > 1">
                    <RouterLink class="page-link" to="#">
                        {{ logs.currentPage - 1}}
                    </RouterLink>
                </li>
                <li class="page-item disabled"><span class="page-link" href="#">{{ logs?.currentPage }}</span></li>
                <li class="page-item" v-if="logs.totalPages != logs.currentPage">
                    <RouterLink class="page-link" to="#">
                        {{logs.currentPage + 1 }}
                    </RouterLink>
                </li>
                <li class="page-item" v-if="logs.totalPages != logs.currentPage">
                    <RouterLink class="page-link" v-on:click="getNext()" to="#">
                        Next
                    </RouterLink>
                </li>
            </ul>
        </section>

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