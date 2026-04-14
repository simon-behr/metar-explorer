<script setup lang="ts">
defineProps<{ showSearch?: boolean }>()
</script>

<template>
  <header
    class="bg-background top-0 left-0 right-0 z-50 px-side border-b border-border flex justify-center gap-3 flex-col py-4"
  >
    <h1 class="text-2xl font-bold">
      <NuxtLink to="/">Aviation Weather Dashboard</NuxtLink>
    </h1>
    <div class="flex justify-between">
      <div class="flex items-center gap-2">
        <div class="w-1.5 h-1.5 bg-primary rounded-full" />
        <span class="font-bold">METAR Explorer</span>
      </div>
      <SearchInput v-if="showSearch" />
    </div>
  </header>
</template>

<style scoped></style>
