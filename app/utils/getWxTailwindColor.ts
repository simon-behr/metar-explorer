const wxColors: Record<string, string> = {
  // Precipitation
  RA: 'text-blue-500',
  SN: 'text-slate-100',
  DZ: 'text-blue-300',
  GR: 'text-indigo-500',
  GS: 'text-indigo-300',
  PL: 'text-cyan-300',
  IC: 'text-cyan-100',
  UP: 'text-gray-500',

  // Obscuration
  FG: 'text-slate-400',
  BR: 'text-slate-300',
  HZ: 'text-orange-200',
  FU: 'text-gray-600',
  DU: 'text-yellow-700',
  SA: 'text-yellow-600',
  VA: 'text-stone-600',
  PY: 'text-blue-200',

  // Other
  TS: 'text-yellow-400',
  SQ: 'text-amber-600',
  FC: 'text-red-600',
  SS: 'text-orange-800',
  DS: 'text-orange-700',
  PO: 'text-orange-400',

  // Descriptors
  SH: 'text-blue-500',
  FZ: 'text-cyan-500',
  BL: 'text-gray-300',
  DR: 'text-gray-200',
  MI: 'text-slate-200',
  PR: 'text-slate-300',
  BC: 'text-slate-300',
  VC: 'text-gray-400',
}

export const getWxTailwindColor = (wx: string): string => {
  if (!wx) return ''

  let rest = wx
  if (wx.startsWith('-') || wx.startsWith('+')) {
    rest = wx.slice(1)
  }

  // Find the first matching color code
  for (let i = 0; i < rest.length; i += 2) {
    const code = rest.slice(i, i + 2)
    const color = wxColors[code]
    if (color) return color
  }

  return ''
}
