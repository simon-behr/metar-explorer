<script setup lang="ts">
import CloudLayer from '~/components/CloudLayer.vue'
import type { MetarProperties } from '~/types/MetarProperties'

definePageMeta({ layout: 'default-with-search' })

const data: MetarProperties = {
  "icaoId": "KNUC",
  "receiptTime": "2026-04-15T19:06:04.107Z",
  "obsTime": 1776279360,
  "reportTime": "2026-04-15T19:00:00.000Z",
  "temp": 18.9,
  "dewp": 14.4,
  "wdir": 270,
  "wspd": 7,
  "wxString": "SHSN",
  "visib": "10+",
  "altim": 1018.7,
  "metarType": "METAR",
  "rawOb": "METAR KNUC 151856Z 27007KT 10SM BKN010 BKN250 19/14 A3008 RMK SLPNO T01890144",
  "lat": 33.022,
  "lon": -118.583,
  "elev": 52,
  "name": "San Clemente, CA, US",
  "clouds": [
    {
      "cover": "BKN",
      "base": 1000
    },
    {
      "cover": "BKN",
      "base": 25000
    }
  ],
  "fltCat": "MVFR"
}

const detailedName = computed(() => {
  const [name, region, country] = data.name.split(', ')
  return { name, region, country }
})

const formattedTime = computed(() => {
  const date = new Date(data.reportTime)
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
    timeZoneName: 'short',
  })
})

const hpaToInHg = (hpa: number) => {
  return Math.round((hpa / 33.8639) * 10) / 10
}

const ktToKmh = (kt: number) => {
  return Math.round(kt * 1.852 * 10) / 10
}

const ktToMsec = (kt: number) => {
  return Math.round(kt * 0.514444 * 10) / 10
}

const cloudLayers = computed(() => {
  return (data.clouds ?? []).sort((a, b) => b.base - a.base)
})
</script>

<template>
  <div class="flex px-side">
    <div class="py-8 pr-8 flex-3 flex flex-col gap-5">
      <div class="flex flex-col gap-1">
        <div class="flex justify-between items-center">
          <h2 class="font-bold text-3xl">{{ detailedName.name }}</h2>
          <div v-if="data.fltCat === 'VFR'" class="tag text-green-500">VFR</div>
          <div v-else-if="data.fltCat === 'IFR'" class="tag text-red-500">IFR</div>
          <div v-else-if="data.fltCat === 'MVFR'" class="tag text-blue-500">MVFR</div>
        </div>
        <div class="flex gap-2 text-text-muted font-syne-mono text-sm">
          <span>{{ data.icaoId }}</span>
          <span>·</span>
          <span>{{ detailedName.region }}, {{ detailedName.country }}</span>
          <span>·</span>
          <span>{{ data.elev }}m AMSL</span>
          <span>·</span>
          <span>{{ formattedTime }}</span>
        </div>
      </div>
      <div class="detail-container">
        <div style="grid-area: raw" class="card">
          <h3>RAW METAR</h3>
          <p class="text-text font-syne-mono">
            {{ data.rawOb }}
          </p>
        </div>
        <div style="grid-area: wind" class="card flex items-center flex-row gap-12 p-8">
          <template v-if="data.wdir">
            <CompassRose :direction="data.wdir" />
            <div class="flex flex-col gap-2 max-w-64">
              <p class="text-text text-2xl font-syne font-bold">
                {{ data.wdir }}° · {{ data.wspd }} kt
              </p>
              <p v-if="data?.wdir != null && data?.wspd != null">
                {{ formatWindToText(data.wspd, data.wdir, data.wgst) }}
              </p>
              <div v-if="data.wspd" class="flex gap-4">
                <div class="sub-card">
                  <span class="value">{{ data.wspd }}</span>
                  <span class="unit">kt</span>
                </div>
                <div class="sub-card">
                  <span class="value">{{ ktToKmh(data.wspd) }}</span>
                  <span class="unit">km/h</span>
                </div>
                <div class="sub-card">
                  <span class="value">{{ ktToMsec(data.wspd) }}</span>
                  <span class="unit">m/s</span>
                </div>
              </div>
            </div>
          </template>
          <div v-else>
            <p>No Wind Data</p>
          </div>
        </div>
        <div style="grid-area: temp" class="card">
          <h3>TEMPERATURE</h3>
          <template v-if="data.temp">
            <p class="text-text text-2xl font-syne font-bold">{{ data.temp }}°C</p>
            <p v-if="data.dewp">
              Dew point {{ data.dewp }}°C · spread
              {{ Math.round((data.temp - data.dewp) * 10) / 10 }}°C
            </p>
          </template>
          <p v-else>No Temperature Data</p>
        </div>
        <div style="grid-area: qnh" class="card">
          <h3>QNH</h3>
          <template v-if="data.altim">
            <p class="text-text text-2xl font-syne font-bold">{{ data.altim }} hPa</p>
            <p>{{ hpaToInHg(data.altim) }} inHg</p>
          </template>
          <p v-else>No QNH Data</p>
        </div>
        <div style="grid-area: vis" class="card">
          <h3>VISIBILITY</h3>
          <p class="text-text text-2xl font-syne font-bold">{{ data.visib }} km</p>
        </div>
        <div style="grid-area: wx" class="card">
          <h3>WEATHER</h3>
          <p v-if="data.wxString">{{formatWxString(data.wxString)}}</p>
        </div>
      </div>
      <div class="flex flex-col gap-4 text-xs font-syne-mono">
        <h3>CLOUD LAYERS</h3>
        <CloudLayer
          v-for="(cloudLayer, index) in cloudLayers"
          :cloud-layer="cloudLayer"
          :key="index"
        />
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

.cloud-layer {
  @apply flex h-1.5 rounded-full overflow-hidden flex-1;

  &.active {
    .cloud {
      @apply bg-surface-tertiary rounded-full;
    }
  }
}
</style>
