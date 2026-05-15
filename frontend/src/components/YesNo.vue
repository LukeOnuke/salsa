<script lang="ts" setup>
export interface YesNoProps {
    data: boolean
}

const {data} = defineProps<YesNoProps>()
</script>

<template>
    <span v-if="data">✅DA</span>
    <span v-else>❌NE</span>
</template>