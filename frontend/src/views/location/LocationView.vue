<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
import { LogLevel, type LogEntryModel } from '@/models/logentry.model';
import { ref } from 'vue';
import type { Pagenated } from "@/models/pagenated.model";
import { LogEntryService } from '@/services/logentry.service';
import PagenatedNavigation from '@/components/PagenatedNavigation.vue';
import type { ProcessModel } from '@/models/process.model';
import { ProcessService } from '@/services/process.service';
import { useRoute, useRouter } from 'vue-router';
import LocationComponent from '@/components/LocationComponent.vue';
import ProcessComponent from '@/components/ProcessComponent.vue';
import type { LocationModel } from '@/models/location.model';
import { LocationService } from '@/services/location.service';

const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)

const location = ref<LocationModel>()
LocationService.getLocationById(id).then(data => {
    location.value = data.data
})
</script>

<template>
    <main v-if="location" class="container grid">
        <div class="row">
            <div class="mb-3">
                <LocationComponent :location="location" :disableInfo="true" />
            </div>

        </div>
    </main>
    <!-- <Loading v-else /> -->
</template>