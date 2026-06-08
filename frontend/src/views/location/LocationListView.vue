<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
import { LogLevel, type LogEntryModel } from '@/models/logentry.model';
import { ref } from 'vue';
import type { Pagenated } from "@/models/pagenated.model";
import { LogEntryService } from '@/services/logentry.service';
import PagenatedNavigation from '@/components/PagenatedNavigation.vue';
import { LocationService } from '@/services/location.service';
import type { LocationModel } from '@/models/location.model';
import LocationComponent from '@/components/LocationComponent.vue';

const locations = ref<Pagenated<LocationModel>>();

function getLocations(pageSize: number, pageNumber: number) {
    LocationService.getLocationsPagenated(pageSize, pageNumber).then(rsp => {
        locations.value = rsp.data;
    })
}

function getPrevious() {
    if (locations.value) getLocations(10, locations.value.currentPage - 1)
}

function getNext() {
    if (locations.value) getLocations(10, locations.value.currentPage + 1)
}

getLocations(10, 1)
</script>

<template>
    <div class="container">
        <section>
            <div class="d-flex align-items-center">
                <div>
                    <h1>Pagenated list of Location</h1>
                    <p>Sorted by id desceding.</p>
                </div>
                <RouterLink to="/location/new"
                    class="ms-auto btn btn-primary d-flex align-items-center justify-content-center p-0">
                    <i class="fa-solid fa-plus fs-2 m-2"></i>
                </RouterLink>
            </div>
            <hr>
        </section>

        <main v-if="locations">
            <LocationComponent :location="location" v-for="location in locations.entries" class="mb-3"/>
            <PagenatedNavigation :onPrevious="getPrevious" :onNext="getNext" :pagenatedData="locations" />
        </main>

    </div>
    <!-- <Loading v-else /> -->
</template>