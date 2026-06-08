<script setup lang="ts">
import type { LocationModel } from '@/models/location.model';
import CommandButtons from './CommandButtons.vue';

const props = defineProps<{
    location: LocationModel,
    disableInfo?: boolean
}>();
</script>

<template>
    <section class="card" v-if="location">
        <div class="card-header d-flex align-items-center">
            <span class="fs-4">Location</span>

            <CommandButtons entityName="location" :entityId="location.locationId" :enableInfo="!disableInfo" :enableEdit="true" />
        </div>
        <div class="card-body">
            <p>Address: <span class="fw-bold">{{ location.address }}</span></p>
            <p>City: <span class="fw-bold">{{ location.city }}</span></p>
            <p>Country: <span class="fw-bold">{{ location.country }}</span></p>
            <p>Shorthand: <span class="fw-bold">{{ location.shorthand }}</span></p>
        </div>
        <div class="card-footer text-muted">
            Location ID: {{ location.locationId }}
        </div>
    </section>
</template>