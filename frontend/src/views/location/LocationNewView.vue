<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { isDebugging, showConfirm, showError } from '@/utils';
import { LocationService } from '@/services/location.service';
import type { LocationModel } from '@/models/location.model';

const router = useRouter()

const newLocation = ref<LocationModel>({
    address: "",
    city: "",
    country: "",
    shorthand: "",
    locationId: 1
})

function saveLocation() {
    showConfirm("Are you sure that you want to create this location?", () => {
        LocationService.createLocation(newLocation.value)
        router.push({ path: `/location/list`, replace: true }).then(() => {
            router.go(0); // refresh previous page
        });
    })
}

function cancel() {
    showConfirm("Are you sure that you want to cancel?", () => {
        router.push({ path: `/location/list}`, replace: true });
    })
}
</script>

<template>
    <div class="container">
        <section class="card">
            <pre v-if="isDebugging()">{{ newLocation }}</pre>
            <div class="card-header d-flex align-items-center">
                <span class="fs-4">New Location</span>

            </div>
            <form class="card-body">
                <div class="mb-3">
                    <label for="location-address" class="form-label">Address: </label><br>
                    <input class="form-control" type="text" name="" id="location-address" v-model="newLocation.address" required>
                </div>

                <div class="mb-3">
                    <label for="location-city" class="form-label">City: </label><br>
                    <input class="form-control" type="text" name="" id="location-city" v-model="newLocation.city" required>
                </div>

                <div class="mb-3">
                    <label for="location-country" class="form-label">Country: </label><br>
                    <input class="form-control" type="text" name="" id="location-country" v-model="newLocation.country" required>
                </div>

                <div class="mb-3">
                    <label for="location-shorthand" class="form-label">Shorthand: </label><br>
                    <input class="form-control" type="text" name="" id="location-shorthand" v-model="newLocation.shorthand" required>
                </div>

            </form>
            <div class="card-footer text-muted d-flex align-items-center">
                <button v-on:click="cancel()" class="btn btn-danger ms-auto" role="button">
                    <i class="fa-solid fa-angle-left"></i> Cancel
                </button>
                <button v-on:click="saveLocation()" class="btn btn-primary ms-3" role="button">
                    <i class="fa-regular fa-floppy-disk"></i> Save
                </button>
            </div>
        </section>
    </div>
    <!-- <Loading v-else /> -->
</template>