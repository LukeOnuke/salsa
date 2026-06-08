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
import ServerComponent from '@/components/ServerComponent.vue';
import { ServerService } from '@/services/server.service';
import type { ServerModel } from '@/models/server.model';

const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)

const server = ref<ServerModel>()
ServerService.getServerById(id).then(data => {
    server.value = data.data
})
</script>

<template>
    <main v-if="server" class="container grid">
        <div class="row">
            <div class="col-xl-6 col-lg-12 mb-3">
                <ServerComponent :server="server" :disableInfo="true"/>
            </div>

            <div class="container col-xl-6 col-lg-12">
                <div class="mb-3">
                    <LocationComponent :location="server.location" />
                </div>
            </div>
        </div>
    </main>
    <!-- <Loading v-else /> -->
</template>