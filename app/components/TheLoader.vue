<template>
  <div class="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <svg class="size-12" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <!-- Outer ring -->
      <circle cx="30" cy="30" r="26" class="ring ring-outer" />
      <!-- Inner ring -->
      <circle cx="30" cy="30" r="16" class="ring ring-inner" />
      <!-- Center dot -->
      <circle cx="30" cy="30" r="3" class="dot" />
      <!-- Tick marks -->
      <g class="ticks">
        <line
          v-for="i in 12"
          :key="i"
          x1="30"
          y1="5"
          x2="30"
          y2="9"
          :transform="`rotate(${i * 30}, 30, 30)`"
          class="tick"
          :class="{ major: i % 3 === 0 }"
        />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.ring {
  fill: none;
  stroke-width: 1;
}

.ring-outer {
  stroke: rgba(88, 166, 255, 0.25);
  stroke-dasharray: 6 4;
  animation: spin 8s linear infinite;
  transform-origin: 30px 30px;
}

.ring-inner {
  stroke: rgba(88, 166, 255, 0.4);
  stroke-dasharray: 163;
  stroke-dashoffset: 163;
  animation: fill 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  transform-origin: 30px 30px;
}

.dot {
  fill: #58a6ff;
  animation: pulse 1.4s ease infinite;
}

.tick {
  stroke: rgba(88, 166, 255, 0.2);
  stroke-width: 1;
  stroke-linecap: round;
}

.tick.major {
  stroke: rgba(88, 166, 255, 0.5);
  stroke-width: 1.5;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes fill {
  0% {
    stroke-dashoffset: 163;
    opacity: 1;
  }
  70% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 0;
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}
</style>
