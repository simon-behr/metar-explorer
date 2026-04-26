<script setup lang="ts">
defineProps<{ showSearch?: boolean }>()
</script>

<template>
  <div id="layout">
    <TheHeader :show-search="showSearch" />
    <slot />
  </div>
</template>

<style scoped>
#layout {
  min-height: 100dvh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  padding-top: var(--spacing-header);
}
</style>
