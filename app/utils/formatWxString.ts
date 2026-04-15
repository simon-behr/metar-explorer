const wxDescriptions: Record<string, string> = {
  // Precipitation
  RA: 'rain',
  SN: 'snow',
  DZ: 'drizzle',
  GR: 'hail',
  GS: 'small hail',
  PL: 'ice pellets',
  IC: 'ice crystals',
  UP: 'unknown precipitation',

  // Obscuration
  FG: 'fog',
  BR: 'mist',
  HZ: 'haze',
  FU: 'smoke',
  DU: 'dust',
  SA: 'sand',
  VA: 'volcanic ash',
  PY: 'spray',

  // Other
  TS: 'thunderstorm',
  SQ: 'squall',
  FC: 'funnel cloud',
  SS: 'sandstorm',
  DS: 'duststorm',
  PO: 'dust whirls',

  // Descriptors
  SH: 'showers of',
  FZ: 'freezing',
  BL: 'blowing',
  DR: 'drifting',
  MI: 'shallow',
  PR: 'partial',
  BC: 'patches of',
  VC: 'in vicinity',
}

const intensityMap: Record<string, string> = {
  '-': 'light',
  '+': 'heavy',
  '': '',
}

export const formatWxString = (wx: string): string => {
  if (!wx) return ''

  let intensity = ''
  let rest = wx

  if (wx.startsWith('-') || wx.startsWith('+')) {
    intensity = intensityMap[wx[0]!]!
    rest = wx.slice(1)
  }

  const parts: string[] = []
  for (let i = 0; i < rest.length; i += 2) {
    const code = rest.slice(i, i + 2)
    const label = wxDescriptions[code]
    if (label) parts.push(label)
  }

  if (parts.length === 0) return wx

  const description = parts.join(' ')

  return intensity ? `${intensity} ${description}` : description
}
