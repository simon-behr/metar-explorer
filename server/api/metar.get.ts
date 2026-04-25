import type { MetarProperties } from '~/types/MetarProperties'

export default defineEventHandler(async (event): Promise<MetarProperties[]> => {
  const query = getQuery(event)

  // Einzelne Station
  if (query.ids) {
    return await $fetch(`https://aviationweather.gov/api/data/metar?ids=${query.ids}&format=json`)
  }

  // Bounding Box
  if (query.bbox) {
    return await $fetch(`https://aviationweather.gov/api/data/metar?bbox=${query.bbox}&format=json`)
  }

  throw createError({ statusCode: 400, message: 'ids or bbox required' })
})
