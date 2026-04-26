<script setup lang="ts">
const navigateToDetailPage = (icaoId: string) => {
  navigateTo({ path: '/detail', query: { icaoId } })
}
</script>
<template>
  <div class="flex pt-header items-center justify-center px-side">
    <div class="flex flex-col items-center gap-4 max-w-xl">
      <CompassRose />
      <h2 class="text-xl">Enter an ICAO code to get started</h2>
      <SearchInput class="my-2" @search="navigateToDetailPage" />
      <p class="text-text-muted text-sm text-center">
        Search any airport worldwide - get real-time weather decoded from raw METAR strings,
        including wind, clouds, visibility and flight category.
      </p>
    </div>
  </div>
</template>
