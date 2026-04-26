<script setup lang="ts">
import type { MetarProperties } from '~/types/MetarProperties'

const navigateToDetailPage = (icaoId: string) => {
  navigateTo({ path: '/detail', query: { icaoId } })
}

const { data, pending } = useAsyncData('sample-metars', async (): Promise<MetarProperties[]> => {
  const metarResponse = await $fetch(`/api/metar?ids=EDDM,EDDF,LOWW,LSZH`)
  if (metarResponse) {
    return metarResponse
  }
  return []
})
</script>
<template>
  <div class="flex pt-header items-center justify-center px-side">
    <div class="flex flex-col items-center gap-4 max-w-2xl">
      <CompassRose />
      <h2 class="text-xl">Enter an ICAO code to get started</h2>
      <SearchInput class="my-2" @search="navigateToDetailPage" />
      <p class="text-text-muted text-sm text-center">
        Search any airport worldwide - get real-time weather decoded from raw METAR strings,
        including wind, clouds, visibility and flight category.
      </p>
      <p>Quick Access</p>
      <div class="airport-cards">
        <template v-if="pending">
          <SkeletonCard v-for="i in 4" :key="i" />
        </template>
        <template v-else-if="data">
          <NuxtLink
            class="card gap-1 text-sm transition-all hover:bg-surface-tertiary hover:border-primary"
            v-for="airport in data"
            :key="airport.icaoId"
            :to="`/detail?icaoId=${airport.icaoId}`"
          >
            <div class="flex justify-between items-end">
              <span class="font-bold font-syne-mono text-text">
                {{ airport.icaoId }}
              </span>
              <FltCatTag :flt-cat="airport.fltCat" :small="true" />
            </div>
            <span class="text-xs">
              {{ airport.name.split(', ')[0] }}
            </span>
          </NuxtLink>
        </template>
        <p v-else>No airports found :(</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.airport-cards {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(135px, 1fr));
  grid-gap: 16px;
}
</style>
