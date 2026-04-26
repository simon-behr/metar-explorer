<script setup lang="ts">
const emit = defineEmits<{
  search: [string]
}>()
const value = ref('')

const handleSearch = () => {
  if (value.value.length === 4) {
    emit('search', value.value)
  }
}
</script>

<template>
  <div class="flex rounded-md border border-border overflow-hidden">
    <input
      type="text"
      v-model="value"
      class="bg-surface-secondary px-3 outline-none"
      :class="{ uppercase: value }"
      maxlength="4"
      minlength="4"
      placeholder="Search for a METAR"
      @keyup.enter="handleSearch"
    />
    <button class="button-primary filled rounded-none" @click="handleSearch">Search</button>
  </div>
</template>
