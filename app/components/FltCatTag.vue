<script setup lang="ts">
defineProps<{ fltCat?: string; small?: boolean }>()
</script>

<template>
  <div v-if="fltCat === 'VFR'" class="tag text-green-500" :class="{ small }">VFR</div>
  <div v-else-if="fltCat === 'IFR'" class="tag text-red-500" :class="{ small }">IFR</div>
  <div v-else-if="fltCat === 'MVFR'" class="tag text-blue-500" :class="{ small }">MVFR</div>
</template>

<style scoped></style>
