export type MetarType = 'METAR' | 'SPECI' | 'SYNOP' | 'BUOY' | 'CMAN'

export type CloudCover = 'CLR' | 'CAVOK' | 'FEW' | 'SCT' | 'BKN' | 'OVC' | 'OVX'

export interface CloudLayer {
  cover: CloudCover
  base: number
  top?: number
}

export interface MetarProperties {
  icaoId: string
  receiptTime: string
  obsTime: number
  reportTime: string
  temp?: number
  dewp?: number | null
  wdir?: number | 'VRB' | null
  wspd?: number | null
  wgst?: number | null
  visib?: number | string | null
  altim?: number | null
  slp?: number | null
  wxString?: string | null
  presTend?: number | null
  maxT?: number | null
  minT?: number | null
  maxT24?: number | null
  minT24?: number | null
  precip?: number | null
  pcp3hr?: number | null
  pcp6hr?: number | null
  pcp24hr?: number | null
  snow?: number | null
  vertVis?: number | null
  metarType?: MetarType | ''
  rawOb?: string
  lat: number
  lon: number
  elev?: number
  name: string
  clouds?: CloudLayer[]
  fltCat?: string
}
