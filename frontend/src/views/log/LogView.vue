<script lang="ts" setup>
import type { LogEntryModel } from '@/models/logentry.model';
import { LogEntryService } from '@/services/logentry.service';
import { showConfirm, showError, toLocalDatetimeInputString } from '@/utils';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import LocationComponent from '@/components/LocationComponent.vue';
import ServerComponent from '@/components/ServerComponent.vue';
import ProcessComponent from '@/components/ProcessComponent.vue';
import CommandButtons from '@/components/CommandButtons.vue';

const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)

const log = ref<LogEntryModel>()

LogEntryService.getLogById(id).then(resp => log.value = resp.data)
</script>

<template>
    <main class="container grid">
        <div class="row" v-if="log">
            <div class="col-xl-6 col-lg-12 mb-3">
                <section class="card">
                    <div class="card-header d-flex align-items-center">
                        <span class="fs-4 fw-bold">Log Entry</span>

                        <CommandButtons entityName="log" :entityId="log.logEntryId" :enableInfo="false"
                        :enableEdit="true" />
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
                    <ProcessComponent :process="log.process" />
                </div>
                <div class="mb-3">
                    <LocationComponent :location="log.process.server.location"/>
                </div>
                <div class="mb-3">
                    <ServerComponent :server="log.process.server" />
                </div>
            </div>
        </div>
    </main>
</template>