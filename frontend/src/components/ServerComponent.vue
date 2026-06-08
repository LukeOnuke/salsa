<script setup lang="ts">
import type { ServerModel } from '@/models/server.model';
import CommandButtons from './CommandButtons.vue';

const props = defineProps<{
    server: ServerModel,
    disableInfo?: boolean
}>();
</script>

<template>
    <section class="card" v-if="server">
        <div class="card-header d-flex align-items-center">
            <span class="fs-4">Server</span>

            <CommandButtons entityName="server" :entityId="server.serverId" :enableInfo="!disableInfo" :enableEdit="true" />
        </div>
        <div class="card-body">
            <p>Name: <span class="fw-bold">{{ server.name }}</span></p>
        </div>
        <div class="card-footer text-muted">
            Server ID: {{ server.serverId }}
        </div>
    </section>
</template>