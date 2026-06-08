<script setup lang="ts">
import type { LocationModel } from '@/models/location.model';

const props = defineProps<{
    entityName: string,
    entityId: number,
    enableInfo?: boolean,
    enableEdit?: boolean,
    /**
     * If left undefined no delete button will be available
     */
    deleteFunction?: Function
}>();
</script>

<template>
    <nav class="ms-auto">
        <RouterLink v-if="enableInfo" :to="`/${entityName}/view/${entityId}`" class="btn btn-info" role="button">
            <i class="fa-solid fa-circle-info"></i>
        </RouterLink>
        <RouterLink v-if="enableEdit" :to="`/${entityName}/edit/${entityId}`" class="btn btn-success ms-3"
            role="button">
            <i class="fa-regular fa-pen-to-square"></i>
        </RouterLink>
        <button v-if="deleteFunction" v-on:click="deleteFunction()" class="btn btn-danger ms-3" role="button">
            <i class="fa-regular fa-trash-can"></i>
        </button>
    </nav>
</template>