export const formatWindToText = (
  speed: number,
  direction: number | 'VRB',
  gusts?: number | null,
): string => {
  let dirLabel: string = 'Variabel'
  const directions = [
    'North',
    'North-northeast',
    'Northeast',
    'East-northeast',
    'East',
    'East-southeast',
    'Southeast',
    'South-southeast',
    'South',
    'South-southwest',
    'Southwest',
    'West-southwest',
    'West',
    'West-northwest',
    'Northwest',
    'North-northwest',
  ]

  if (typeof direction === 'number') {
    dirLabel = directions[Math.round(direction / 22.5) % 16]!
  }

  const conditionLabel =
    speed === 0
      ? 'calm'
      : speed <= 10
        ? 'light breeze'
        : speed <= 20
          ? 'moderate breeze'
          : speed <= 30
            ? 'fresh breeze'
            : speed <= 40
              ? 'strong wind'
              : speed <= 55
                ? 'near gale'
                : 'storm conditions'

  const gustLabel = gusts ? `Gusts up to ${gusts} kt` : 'No significant gusts reported'

  return `${dirLabel} · ${conditionLabel} · ${gustLabel}`
}
