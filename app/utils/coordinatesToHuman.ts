export const coordinatesToHuman = (lat: number, lon: number): string => {
  const latDir = lat >= 0 ? 'N' : 'S'
  const lonDir = lon >= 0 ? 'E' : 'W'
  return `${Math.abs(lat).toFixed(3)}°${latDir} ${Math.abs(lon).toFixed(3)}°${lonDir}`
}
