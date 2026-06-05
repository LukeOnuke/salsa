<script lang="ts" setup>
import type { LogEntry } from '@/models/logentry.model';
import { LogEntryService } from '@/services/logentry.service';
import { showConfirm, showError, toLocalDatetimeInputString } from '@/utils';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)

const log = ref<LogEntry>()

LogEntryService.getLogById(id).then(resp => log.value = resp.data)
</script>

<template>
    <main class="container grid">
        <div class="row" v-if="log">
            <div class="col-xl-6 col-lg-12 mb-3">
                <section class="card">
                    <div class="card-header d-flex align-items-center">
                        <span class="fs-4 fw-bold">Log Entry</span>

                        <RouterLink :to="`/log/edit/${log.logEntryId}`" class="btn btn-success ms-auto" role="button">
                            <i class="fa-regular fa-pen-to-square"></i>
                        </RouterLink>
                    </div>
                    <div class="card-body">
                        <p>Severity: <span class="fw-bold">{{ log.severity }}</span></p>
                        <p>Importance level: <span class="fw-bold">{{ log.importance }}</span></p>
                        <p>Is important: <span class="fw-bold">{{ log.isImportant }}</span></p>
                        <p>Created at: <span class="fw-bold">{{ new Date(log.createdAt).toLocaleString("de") }} -
                            </span>
                            <span class="badge text-bg-secondary">{{ new Date(log.createdAt).getTimezoneOffset() }}m to
                                UTC</span>
                        </p>
                        <pre class="card">{{ log.content }}</pre>
                    </div>
                    <div class="card-footer text-muted">
                        Time: {{ log.createdAt }} - Id: {{ log.logEntryId }}
                    </div>
                </section>
            </div>
            <div class="container col-xl-6 col-lg-12">
                <div class="mb-3">
                    <section class="card">
                        <div class="card-header d-flex align-items-center">
                            <span class="fs-4">Process</span>

                            <RouterLink :to="`/log/edit/${log.logEntryId}`" class="btn btn-info ms-auto" role="button">
                                <i class="fa-solid fa-circle-info"></i>
                            </RouterLink>
                            <RouterLink :to="`/log/edit/${log.logEntryId}`" class="btn btn-success ms-3" role="button">
                                <i class="fa-regular fa-pen-to-square"></i>
                            </RouterLink>
                        </div>
                        <div class="card-body">
                            <p>Process name: <span class="fw-bold">{{ log.process.name }}</span></p>
                        </div>
                        <div class="card-footer text-muted">
                            Process ID: {{ log.processId }}
                        </div>
                    </section>
                </div>
                <div class="mb-3">
                    <section class="card" v-if="log">
                        <div class="card-header d-flex align-items-center">
                            <span class="fs-4">Location</span>

                            <RouterLink :to="`/log/edit/${log.logEntryId}`" class="btn btn-info ms-auto" role="button">
                                <i class="fa-solid fa-circle-info"></i>
                            </RouterLink>
                            <RouterLink :to="`/log/edit/${log.logEntryId}`" class="btn btn-success ms-3" role="button">
                                <i class="fa-regular fa-pen-to-square"></i>
                            </RouterLink>
                        </div>
                        <div class="card-body">
                            <p>Address: <span class="fw-bold">{{ log.process.server.location.address }}</span></p>
                            <p>City: <span class="fw-bold">{{ log.process.server.location.city }}</span></p>
                            <p>Country: <span class="fw-bold">{{ log.process.server.location.country }}</span></p>
                            <p>Shorthand: <span class="fw-bold">{{ log.process.server.location.shorthand }}</span></p>
                        </div>
                        <div class="card-footer text-muted">
                            Location ID: {{ log.process.server.locationId }}
                        </div>
                    </section>
                </div>
                <div class="mb-3">
                    <section class="card" v-if="log">
                        <div class="card-header d-flex align-items-center">
                            <span class="fs-4">Server</span>

                            <RouterLink :to="`/log/edit/${log.logEntryId}`" class="btn btn-info ms-auto" role="button">
                                <i class="fa-solid fa-circle-info"></i>
                            </RouterLink>
                            <RouterLink :to="`/log/edit/${log.logEntryId}`" class="btn btn-success ms-3" role="button">
                                <i class="fa-regular fa-pen-to-square"></i>
                            </RouterLink>
                        </div>
                        <div class="card-body">
                            <p>Name: <span class="fw-bold">{{ log.process.server.name }}</span></p>
                        </div>
                        <div class="card-footer text-muted">
                            Server ID: {{ log.process.server.serverId }}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </main>
</template>