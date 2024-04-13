
export type Level = 'low' | 'medium' | 'high'
export type NoteType = {
    id:string,
    text: string,
    level: 'high' | 'medium' | 'low'
}

export enum ColorLight {
    high='#ff4d4d',
    medium='#e9e957',
    low='#69dd69'
}

export enum ColorDark {
    high='#53151',
    medium='#828227',
    low='#265226'
}