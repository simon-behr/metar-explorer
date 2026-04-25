<script setup lang="ts">
import CloudLayer from '~/components/CloudLayer.vue'
import type { MetarProperties } from '~/types/MetarProperties'

definePageMeta({ layout: 'default-with-search' })

const data: MetarProperties = {
  icaoId: 'KNUC',
  receiptTime: '2026-04-15T19:06:04.107Z',
  obsTime: 1776279360,
  reportTime: '2026-04-15T19:00:00.000Z',
  temp: 12,
  dewp: 4,
  wdir: 270,
  wspd: 7,
  wxString: 'SHSN FZFG BLDU DRSA MIRA PRFG BCFG VCSH',
  visib: '10+',
  altim: 1018.7,
  metarType: 'METAR',
  rawOb: 'METAR KNUC 151856Z 27007KT 10SM BKN010 BKN250 19/14 A3008 RMK SLPNO T01890144',
  lat: 33.022,
  lon: -118.583,
  elev: 52,
  name: 'San Clemente, CA, US',
  clouds: [
    {
      cover: 'BKN',
      base: 1000,
    },
    {
      cover: 'BKN',
      base: 25000,
    },
  ],
  fltCat: 'MVFR',
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

const spread = computed(() => {
  if (data.temp && data.dewp) {
    return Math.round(data.temp) - Math.round(data.dewp)
  }
  return null
})

const fogRisk = computed<{ risk: string; color: string }>(() => {
  if (spread.value != null) {
    if (spread.value <= 2) {
      return { risk: 'High', color: 'text-red-500' }
    } else if (spread.value <= 4) {
      return { risk: 'Moderate', color: 'text-yellow-400' }
    } else {
      return { risk: 'Low', color: 'text-green-500' }
    }
  }
  return { risk: '', color: '' }
})

const hpaToInHg = (hpa: number) => {
  return Math.round((hpa / 33.8639) * 10) / 10
}

const ktToKmh = (kt: number) => {
  return Math.round(kt * 1.852)
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
            <p class="text-text text-2xl font-syne font-bold">{{ Math.round(data.temp) }}°C</p>
            <p v-if="data.dewp">Dew point {{ Math.round(data.dewp) }}°C · spread {{ spread }}°C</p>
          </template>
          <p v-else>No Temperature Data</p>
        </div>
        <div style="grid-area: qnh" class="card">
          <h3>QNH</h3>
          <template v-if="data.altim">
            <p class="text-text text-2xl font-syne font-bold">{{ Math.round(data.altim) }} hPa</p>
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
          <div class="flex gap-4 flex-wrap" v-if="data.wxString">
            <div
              v-for="wx in data.wxString.split(' ')"
              class="tag flex gap-1 w-fit text-cyan-500"
              :class="getWxTailwindColor(wx)"
            >
              <span>{{ wx }}:</span>
              <span>{{ formatWxString(wx) }}</span>
            </div>
          </div>
          <p v-else>No Weather Data</p>
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
    <div class="py-8 pl-8 flex-1 border-l-border border-l flex flex-col gap-4">
      <div class="card flex flex-col gap-4">
        <h3>TEMP / DEW POINT / SPREAD</h3>
        <div class="text-xs flex flex-col gap-2">
          <div v-if="data.temp" class="side-detail-container">
            <span>Temperature</span>
            <span class="data">{{ Math.round(data.temp) }}°C</span>
          </div>
          <hr />
          <div v-if="data.dewp" class="side-detail-container">
            <span>Dew Point</span>
            <span class="data">{{ Math.round(data.dewp) }}°C</span>
          </div>
          <hr />
          <div v-if="spread != null" class="side-detail-container">
            <span>Spread</span>
            <span class="font-bold font-syne-mono" :class="fogRisk.color">
              {{ spread }}°C - {{ fogRisk.risk }} fog risk
            </span>
          </div>
        </div>
      </div>
      <div class="card flex flex-col gap-4">
        <h3>STATION INFO</h3>
        <div class="text-xs flex flex-col gap-2">
          <div class="side-detail-container">
            <span>ICAO</span>
            <span class="data">{{ data.icaoId }}</span>
          </div>
          <hr />
          <div class="side-detail-container">
            <span>Elevation</span>
            <span class="data">{{ data.elev }}</span>
          </div>
          <hr />
          <div class="side-detail-container">
            <span>Coordinates</span>
            <span class="data">{{ coordinatesToHuman(data.lat, data.lon) }}</span>
          </div>
          <hr />
          <div class="side-detail-container">
            <span>Type</span>
            <span class="data">{{ data.metarType }}</span>
          </div>
        </div>
      </div>
    </div>
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

.side-detail-container {
  @apply flex justify-between items-center;

  span.data {
    @apply font-bold text-text font-syne-mono;
  }
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
