<template>
  <div class="card">
    <div class="skeleton-label" />
    <div class="skeleton-value" />
  </div>
</template>

<style scoped>
.skeleton-label {
  height: 8px;
  width: 60px;
  border-radius: 99px;
  background: var(--color-shimmer);
  animation: shimmer 1.6s ease infinite;
}

.skeleton-value {
  height: 24px;
  width: 80px;
  border-radius: 6px;
  background: var(--color-shimmer);
  animation: shimmer 1.6s ease infinite;
  animation-delay: 0.1s;
}

@keyframes shimmer {
  0% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0.4;
  }
}
</style>
