<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
import { LogLevel, type LogEntryModel } from '@/models/logentry.model';
import { ref } from 'vue';
import type { Pagenated } from "@/models/pagenated.model";
import { LogEntryService } from '@/services/logentry.service';
import PagenatedNavigation from '@/components/PagenatedNavigation.vue';
import type { ProcessModel } from '@/models/process.model';
import { ProcessService } from '@/services/process.service';
import { ServerService } from '@/services/server.service';
import type { ServerModel } from '@/models/server.model';
import CommandButtons from '@/components/CommandButtons.vue';

const servers = ref<Pagenated<ServerModel>>();

function getLogs(pageSize: number, pageNumber: number) {
    ServerService.getServersPagenated(pageSize, pageNumber).then(rsp => {
        servers.value = rsp.data;
    })
}

function getPrevious() {
    if (servers.value) getLogs(10, servers.value.currentPage - 1)
}

function getNext() {
    if (servers.value) getLogs(10, servers.value.currentPage + 1)
}

getLogs(10, 1)
</script>

<template>
    <div class="container">
        <section>
            <div class="d-flex align-items-center">
                <div>
                    <h1>Pagenated list of Server</h1>
                    <p>Sorted by id desceding.</p>
                </div>
                <RouterLink to="/server/new" class="ms-auto btn btn-primary d-flex align-items-center justify-content-center p-0">
                    <i class="fa-solid fa-plus fs-2 m-2"></i>
                </RouterLink>
            </div>
            <hr>
        </section>

        <main v-if="servers">
            <section class="card mb-3" v-for="server in servers.entries">
                <div class="card-header d-flex align-items-center">
                    <span class="fs-4">Server</span>

                    <CommandButtons entityName="server" :entityId="server.serverId" :enableInfo="true"
                        :enableEdit="true" />
                </div>
                <div class="card-body">
                    <p>Name: <span class="fw-bold">{{ server.name }}</span></p>
                    <p v-if="server.location">Location: <span class="fw-bold">{{ server.location.shorthand }} - {{ server.location.address }}, {{ server.location.city }}, {{ server.location.country }}</span> <span
                            class="badge bg-secondary">ID: {{ server.locationId }}</span></p>
                </div>
                <div class="card-footer text-muted">
                    Server ID: {{ server.serverId }}
                </div>
            </section>
            <PagenatedNavigation :onPrevious="getPrevious" :onNext="getNext" :pagenatedData="servers" />
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