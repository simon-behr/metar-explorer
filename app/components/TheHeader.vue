<script setup lang="ts">
defineProps<{ showSearch?: boolean }>()

const navigateToDetailPage = (icaoId: string) => {
  navigateTo({ path: '/detail', query: { icaoId } })
}
</script>

<template>
  <header
    class="bg-background fixed top-0 left-0 right-0 z-50 px-side border-b border-border flex justify-between items-center h-header py-2"
  >
    <NuxtLink to="/" class="flex flex-col">
      <h1 class="text-2xl font-bold">
        Aviation Weather Dashboard
      </h1>
      <div class="flex items-center gap-2">
        <div class="w-1.5 h-1.5 bg-primary rounded-full" />
        <span class="font-bold">METAR Explorer</span>
      </div>
    </NuxtLink>
    <SearchInput v-if="showSearch" @search="navigateToDetailPage" />
  </header>
</template>

<style scoped></style>
