<script setup lang="ts">
import type { Pagenated } from '@/models/pagenated.model';

const props = defineProps<{
    pagenatedData: Pagenated<any>,
    onPrevious: Function,
    onNext: Function
}>();
</script>

<template>
    <nav>
        <ul class="pagination justify-content-center">
            <li class="page-item" v-if="pagenatedData.currentPage > 1">
                <button class="page-link" v-on:click="onPrevious()">
                    Previous
                </button>
            </li>
            <li class="page-item" v-if="pagenatedData.currentPage > 1">
                <button class="page-link" v-on:click="onPrevious()">
                    {{ pagenatedData.currentPage - 1 }}
                </button>
            </li>
            <li class="page-item disabled"><span class="page-link" href="#">{{ pagenatedData.currentPage }}</span></li>
            <li class="page-item" v-if="Math.ceil(pagenatedData.totalPages) != pagenatedData.currentPage">
                <button class="page-link" v-on:click="onNext()">
                    {{ pagenatedData.currentPage + 1 }}
                </button>
            </li>
            <li class="page-item" v-if="Math.ceil(pagenatedData.totalPages) != pagenatedData.currentPage">
                <button class="page-link" v-on:click="onNext()">
                    Next
                </button>
            </li>
        </ul>
    </nav>
</template>