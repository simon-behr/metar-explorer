<script setup lang="ts">
defineProps<{
  error: {
    statusCode: number
    statusMessage: string
    message: string
  }
}>()

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="error-page">
    <div class="content">
      <p class="section-label">// {{ error.statusCode }}</p>
      <h1 class="title">
        <span v-if="error.statusCode === 404">Page not found.</span>
        <span v-else>Something went wrong.</span>
      </h1>
      <p class="sub" v-if="error.statusCode === 404">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <p class="sub" v-else>An unexpected error occurred. Try refreshing the page.</p>
      <button class="button-primary filled" @click="handleError">← Back home</button>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--spacing-side);
}

.content {
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-label {
  font-family: 'Syne Mono', monospace;
  font-size: 10px;
  color: var(--color-primary);
  letter-spacing: 0.14em;
}

.title {
  font-size: clamp(36px, 6vw, 64px);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.05;
  color: var(--color-text);
}

.sub {
  font-size: 15px;
  color: var(--color-text-muted);
  line-height: 1.7;
}
</style>
