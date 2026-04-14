<script setup lang="ts">
definePageMeta({ layout: 'default-with-search' })
</script>

<template>
  <div class="flex px-side">
    <div class="py-8 pr-8 flex-3 flex flex-col gap-5">
      <div class="flex flex-col gap-1">
        <div class="flex justify-between items-center">
          <h2 class="font-bold text-3xl">Munich Intl.</h2>
          <div class="tag text-green-500">VFR</div>
        </div>
        <div class="flex gap-2 text-text-muted font-syne-mono text-sm">
          <span>EDDM</span>
          <span>·</span>
          <span>BY, DE</span>
          <span>·</span>
          <span>445m AMSL</span>
          <span>·</span>
          <span>10 Apr 2026 08:00Z</span>
        </div>
      </div>
      <div class="detail-container">
        <div style="grid-area: raw" class="card">
          <h3>RAW METAR</h3>
          <p class="text-text font-syne-mono">
            METAR EDDM 141950Z AUTO 32004KT 9999 BKN014 OVC025 09/07 Q1022 NOSIG
          </p>
        </div>
        <div style="grid-area: wind" class="card flex items-center flex-row gap-12 p-8">
          <CompassRose :direction="320" />
          <div class="flex flex-col gap-2 max-w-64">
            <p class="text-text text-2xl font-syne font-bold">320° · 4 kt</p>
            <p>South-southwest · calm conditions No significant gusts reported</p>
            <div class="flex gap-4">
              <div class="sub-card">
                <span class="value">8</span>
                <span class="unit">kt</span>
              </div>
              <div class="sub-card">
                <span class="value">15</span>
                <span class="unit">km/h</span>
              </div>
              <div class="sub-card">
                <span class="value">4</span>
                <span class="unit">m/s</span>
              </div>
            </div>
          </div>
        </div>
        <div style="grid-area: temp" class="card">
          <h3>TEMPERATURE</h3>
          <p class="text-text text-2xl font-syne font-bold">+8°C</p>
          <p>Dew point +6°C · spread 2°C</p>
        </div>
        <div style="grid-area: qnh" class="card">
          <h3>QNH</h3>
          <p class="text-text text-2xl font-syne font-bold">1015 hPa</p>
          <p>29.97 inHg · rising</p>
        </div>
        <div style="grid-area: vis" class="card">
          <h3>VISIBILITY</h3>
          <p class="text-text text-2xl font-syne font-bold">10 km+</p>
          <p>CAVOK conditions</p>
        </div>
        <div style="grid-area: wx" class="card">
          <h3>WEATHER</h3>
        </div>
      </div>
    </div>
    <div class="py-8 pl-8 flex-1 border-l-border border-l">side</div>
  </div>
</template>

<style scoped>
@reference '~/assets/css/main.css';
.detail-container {
  @apply grid gap-4;
  grid-template-areas:
    'raw raw'
    'wind wind'
    'temp qnh'
    'vis wx';
}
</style>
