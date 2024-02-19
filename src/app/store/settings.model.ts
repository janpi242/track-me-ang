export type MapType = 'osm' | 'google'
export type Interval = 1 | 15 | 60

export interface Settings {
    interval: Interval;
    mapType: MapType;
}
