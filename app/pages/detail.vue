<script setup lang="ts">
import type { MetarProperties } from '~/types/MetarProperties'

definePageMeta({ layout: 'default-with-search' })

type AirportData = {
  metar: MetarProperties | null
  nearbyAirports: MetarProperties[]
}

const icaoId = computed(() => useRoute().query.icaoId || null)

const { data: asyncData, pending } = useAsyncData(
  'metar',
  async (): Promise<AirportData> => {
    const metarResponse = await $fetch(`/api/metar?ids=${icaoId.value}`)
    const metar = metarResponse[0]
    if (metar) {
      const { lamin, lamax, lomin, lomax } = getBoundingBox(metar.lat, metar.lon)
      const bbox = `${lamin},${lomin},${lamax},${lomax}`
      const nearbyAirports = await $fetch(`/api/metar?bbox=${bbox}`)
      if (nearbyAirports) {
        return {
          metar,
          nearbyAirports: nearbyAirports
            .filter((airport) => airport.icaoId !== metar.icaoId)
            .slice(0, 4),
        }
      }
    }
    return {
      metar: null,
      nearbyAirports: [],
    }
  },
  {
    watch: [icaoId],
  },
)

const metar = computed(() => {
  return asyncData.value?.metar
})

const nearbyAirports = computed(() => {
  return asyncData.value?.nearbyAirports ?? []
})

const getBoundingBox = (lat: number, lon: number, radiusKm = 100) => {
  const deg = radiusKm / 111
  return {
    lamin: lat - deg,
    lamax: lat + deg,
    lomin: lon - deg / Math.cos((lat * Math.PI) / 180),
    lomax: lon + deg / Math.cos((lat * Math.PI) / 180),
  }
}

const detailedName = computed(() => {
  if (!metar.value) return { name: '', region: '', country: '' }
  const [name, region, country] = metar.value.name.split(', ')
  return { name, region, country }
})

const formattedTime = computed(() => {
  if (!metar.value) return ''
  const date = new Date(metar.value.reportTime)
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
  if (!metar.value) return null
  if (metar.value.temp && metar.value.dewp) {
    return Math.round(metar.value.temp) - Math.round(metar.value.dewp)
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
  return (metar.value?.clouds ?? []).sort((a, b) => b.base - a.base)
})
</script>

<template>
  <p v-if="pending" class="m-auto">Loading...</p>
  <div v-else-if="metar" class="flex px-side">
    <div class="py-8 pr-8 flex-3 flex flex-col gap-5">
      <div class="flex flex-col gap-1">
        <div class="flex justify-between items-center">
          <h2 class="font-bold text-3xl">{{ detailedName.name }}</h2>
          <FltCatTag :flt-cat="metar.fltCat" />
        </div>
        <div class="flex gap-2 text-text-muted font-syne-mono text-sm">
          <span>{{ metar.icaoId }}</span>
          <span>·</span>
          <span>{{ detailedName.region }}, {{ detailedName.country }}</span>
          <span>·</span>
          <span>{{ metar.elev }} m AMSL</span>
          <span>·</span>
          <span>{{ formattedTime }}</span>
        </div>
      </div>
      <div class="detail-container">
        <div style="grid-area: raw" class="card">
          <h3>RAW METAR</h3>
          <p class="text-text font-syne-mono">
            {{ metar.rawOb }}
          </p>
        </div>
        <div style="grid-area: wind" class="card flex items-center flex-row gap-12 p-8">
          <template v-if="metar.wdir">
            <CompassRose :direction="metar.wdir" />
            <div class="flex flex-col gap-2 max-w-64">
              <p class="text-text text-2xl font-syne font-bold">
                {{ metar.wdir }}° · {{ metar.wspd }} kt
              </p>
              <p v-if="metar?.wdir != null && metar?.wspd != null">
                {{ formatWindToText(metar.wspd, metar.wdir, metar.wgst) }}
              </p>
              <div v-if="metar.wspd" class="flex gap-4">
                <div class="sub-card">
                  <span class="value">{{ metar.wspd }}</span>
                  <span class="unit">kt</span>
                </div>
                <div class="sub-card">
                  <span class="value">{{ ktToKmh(metar.wspd) }}</span>
                  <span class="unit">km/h</span>
                </div>
                <div class="sub-card">
                  <span class="value">{{ ktToMsec(metar.wspd) }}</span>
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
          <template v-if="metar.temp">
            <p class="text-text text-2xl font-syne font-bold">{{ Math.round(metar.temp) }}°C</p>
            <p v-if="metar.dewp">
              Dew point {{ Math.round(metar.dewp) }}°C · spread {{ spread }}°C
            </p>
          </template>
          <p v-else>No Temperature Data</p>
        </div>
        <div style="grid-area: qnh" class="card">
          <h3>QNH</h3>
          <template v-if="metar.altim">
            <p class="text-text text-2xl font-syne font-bold">{{ Math.round(metar.altim) }} hPa</p>
            <p>{{ hpaToInHg(metar.altim) }} inHg</p>
          </template>
          <p v-else>No QNH Data</p>
        </div>
        <div style="grid-area: vis" class="card">
          <h3>VISIBILITY</h3>
          <p class="text-text text-2xl font-syne font-bold">{{ metar.visib || '?' }} km</p>
        </div>
        <div style="grid-area: wx" class="card">
          <h3>WEATHER</h3>
          <div class="flex gap-4 flex-wrap" v-if="metar.wxString">
            <div
              v-for="wx in metar.wxString.split(' ')"
              class="tag flex gap-1 w-fit text-cyan-500"
              :class="getWxTailwindColor(wx)"
            >
              <span>{{ wx }}:</span>
              <span>{{ formatWxString(wx) }}</span>
            </div>
          </div>
          <p v-else>No significant Weather</p>
        </div>
      </div>
      <div class="flex flex-col gap-4 text-xs font-syne-mono">
        <h3>CLOUD LAYERS</h3>
        <p v-if="!cloudLayers.length">No Clouds</p>
        <CloudLayer
          v-else
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
          <div v-if="metar.temp" class="side-detail-container">
            <span>Temperature</span>
            <span class="data">{{ Math.round(metar.temp) }}°C</span>
          </div>
          <hr />
          <div v-if="metar.dewp" class="side-detail-container">
            <span>Dew Point</span>
            <span class="data">{{ Math.round(metar.dewp) }}°C</span>
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
            <span class="data">{{ metar.icaoId }}</span>
          </div>
          <hr />
          <div class="side-detail-container">
            <span>Elevation</span>
            <span class="data">{{ metar.elev }} m</span>
          </div>
          <hr />
          <div class="side-detail-container">
            <span>Coordinates</span>
            <span class="data">{{ coordinatesToHuman(metar.lat, metar.lon) }}</span>
          </div>
          <hr />
          <div class="side-detail-container">
            <span>Type</span>
            <span class="data">{{ metar.metarType }}</span>
          </div>
        </div>
      </div>
      <div class="card flex flex-col gap-4 mt-auto">
        <h3>NEARBY AIRPORTS</h3>
        <div class="text-xs flex flex-col gap-2">
          <template v-for="(airport, index) in nearbyAirports" :key="airport.icaoId">
            <button
              @click="navigateTo({ path: '/detail', query: { icaoId: airport.icaoId } })"
              class="flex items-center justify-between text-start"
            >
              <span class="flex flex-col">
                <span class="font-bold text-text">{{ airport.icaoId }}</span>
                <span>{{ airport.name }}</span>
              </span>
              <span class="flex gap-2 items-center">
                <span>{{ airport.altim }}</span>
                <FltCatTag :flt-cat="airport.fltCat" :small="true" />
              </span>
            </button>
            <hr v-if="index < nearbyAirports.length - 1" />
          </template>
        </div>
      </div>
    </div>
  </div>
  <p class="m-auto" v-else>
    No METAR data found for this ICAO code. <br />
    Try something like: EDDM, LOWW, EDDF
  </p>
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
