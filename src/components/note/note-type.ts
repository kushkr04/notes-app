
export type Level = 'low' | 'medium' | 'high'
export type NoteType = {
    id:string,
    text: string,
    level: Level,
    createdAt: Date,
    updatedAt: Date
}

export enum ColorLight {
    high='#ff4d4d',
    medium='#e9e957',
    low='#69dd69'
}

export enum ColorDark {
    high='#861515',
    medium='#828227',
    low='#265226'
}