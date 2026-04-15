<script setup lang="ts">
import type { CloudLayer } from '~/types/MetarProperties'

const { cloudLayer } = defineProps<{
  cloudLayer: CloudLayer
}>()

const layerName = computed(() => {
  switch (cloudLayer.cover) {
    case 'OVC':
      return 'OVC 8/8'
    case 'BKN':
      return 'BKN 5-7/8'
    case 'SCT':
      return 'SCT 3-4/8'
    case 'FEW':
      return 'FEW 1-2/8'
    default:
      return 'Unknown'
  }
})
</script>

<template>
  <div class="flex gap-2 items-center">
    <p class="mr-2 font-bold">{{ layerName }}</p>

    <div class="cloud-layer" v-if="cloudLayer.cover === 'OVC'">
      <div class="flex-6 cloud" />
    </div>

    <div class="cloud-layer" v-if="cloudLayer.cover === 'BKN'">
      <div class="flex-3 cloud" />
      <div class="flex-1" />
      <div class="flex-3 cloud" />
    </div>

    <div class="cloud-layer" v-if="cloudLayer.cover === 'SCT'">
      <div class="flex-1" />
      <div class="flex-1 cloud" />
      <div class="flex-1" />
      <div class="flex-1 cloud" />
      <div class="flex-1" />
      <div class="flex-1 cloud" />
      <div class="flex-1" />
    </div>

    <div class="cloud-layer" v-if="cloudLayer.cover === 'FEW'">
      <div class="flex-2" />
      <div class="flex-1 cloud" />
      <div class="flex-2" />
      <div class="flex-1 cloud" />
      <div class="flex-2" />
    </div>

    <p>{{ cloudLayer.base || '--' }}ft</p>
  </div>
</template>

<style scoped>
@reference '~/assets/css/main.css';
.cloud-layer {
  @apply flex h-1.5 rounded-full overflow-hidden flex-1;

  .cloud {
    @apply bg-surface-tertiary rounded-full;
  }
}
</style>
