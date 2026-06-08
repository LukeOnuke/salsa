<script setup lang="ts">
import CommandButtons from './CommandButtons.vue';
import type { ProcessModel } from '@/models/process.model';

const props = defineProps<{
    process: ProcessModel
    disableInfo?: boolean
}>();
</script>

<template>
    <section class="card" v-if="process">
        <div class="card-header d-flex align-items-center">
            <span class="fs-4">Process</span>

            <CommandButtons entityName="process" :entityId="process.processId" :enableInfo="!disableInfo" :enableEdit="true" />
        </div>
        <div class="card-body">
            <p>Process name: <span class="fw-bold">{{ process.name }}</span></p>
        </div>
        <div class="card-footer text-muted">
            Process ID: {{ process.processId }}
        </div>
    </section>
</template>