<script setup lang="ts">
import ColorModeButton from '~/components/ColorModeButton.vue'

defineProps<{ showSearch?: boolean }>()

const navigateToDetailPage = (icaoId: string) => {
  navigateTo({ path: '/detail', query: { icaoId } })
}

const isSmall = useMediaQuery('(max-width: 640px)')

const title = computed(() => (isSmall.value ? 'METAR' : 'METAR Explorer'))
</script>

<template>
  <header
    class="bg-background fixed top-0 left-0 right-0 z-50 px-side border-b border-border flex justify-between gap-4 items-center h-header py-2"
  >
    <NuxtLink to="/" class="flex flex-col">
      <h1 class="text-2xl font-bold hidden md:block">Aviation Weather Dashboard</h1>
      <div class="flex items-center gap-2">
        <div class="w-1.5 h-1.5 bg-primary rounded-full" />
        <span class="font-bold whitespace-nowrap">{{ title }}</span>
      </div>
    </NuxtLink>
    <div class="flex gap-4 items-center">
      <SearchInput v-if="showSearch" @search="navigateToDetailPage" />
      <ColorModeButton />
    </div>
  </header>
</template>

<style scoped></style>
