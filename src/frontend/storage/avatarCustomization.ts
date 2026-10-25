// values are estimates from the Figma screenshot; replace them with the exact hex codes
export const skinColors = [
    'ffdfc0', 'fbd3c8', 'f4b09c', 'e58f7a', 'e8a672',
    'b96f5d', '965b4d', '7a4636', '633e34',
]

export const clothesColors = [
    '4a6cf7', '5b3eff', '6bb955', 'f95f85', '7455c9',
    'e54458', '55d6c8', 'f5b53c', 'ff8b5a',
]

export const hairColors = [
    '362c47', '6c4545', '2c1b18', '4a312c', 'a55728',
    'b58143', 'd6b370', 'c93305', 'dee1f5',
]

export interface AvatarCustomization {
    id: string
    label: string
    value: string        // DiceBear value
    lockedBy?: string    // item id that has to be unlocked first
}

export const clothingOptions: AvatarCustomization[] = [
    { id: 'squared',   label: 'Shirt',    value: 'squared' },
    { id: 'rounded',   label: 'Pullover', value: 'rounded' },
    { id: 'small',     label: 'Tanktop',  value: 'small', lockedBy: 'clothing-small' },
    { id: 'checkered', label: 'Kariert',  value: 'checkered', lockedBy: 'clothing-checkered'  },
]

export const hairOptions: AvatarCustomization[] = [
    { id: 'shortCombover',      label: 'Seitenscheitel',       value: 'shortCombover' },
    { id: 'bobCut',             label: 'Bob',                  value: 'bobCut' },
    { id: 'long',               label: 'Lang',                 value: 'long' },
    { id: 'curly',              label: 'Locken',               value: 'curly' },
    { id: 'curlyHighTop',       label: 'Lockentolle',          value: 'curlyHighTop' },
    { id: 'pigtails',           label: 'Zöpfe',                value: 'pigtails' },
    { id: 'sideShave',          label: 'Seitlich rasiert',     value: 'sideShave' },
    { id: 'mohawk',             label: 'Irokese',              value: 'mohawk' },
    { id: 'buzzcut',            label: 'Stoppelschnitt',       value: 'buzzcut' },
    { id: 'bald',               label: 'Glatze',               value: 'bald' },
    { id: 'bobBangs',           label: 'Bob mit Pony',         value: 'bobBangs', lockedBy: 'hair-bobBangs-small' },
    { id: 'extraLong',          label: 'Extralang',            value: 'extraLong', lockedBy: 'hair-extraLong'  },
    { id: 'curlyBun',           label: 'Lockiger Dutt',        value: 'curlyBun', lockedBy: 'hair-curlyBun' },
    { id: 'straightBun',        label: 'Glatter Dutt',         value: 'straightBun', lockedBy: 'hair-straightBun'  },
    { id: 'bunUndercut',        label: 'Undercut Dutt',        value: 'bunUndercut', lockedBy: 'hair-bunUndercut' },
    { id: 'fade',               label: 'Fade',                 value: 'fade', lockedBy: 'hair-fade' },
]

export const beardOptions: AvatarCustomization[] = [
    { id: 'none',          label: 'Kein Bart',    value: '' },
    { id: 'shadow',        label: 'Dreitagebart', value: 'shadow' },
    { id: 'goatee',        label: 'Ziegenbart',   value: 'goatee' },
    { id: 'beardMustache', label: 'Vollbart',     value: 'beardMustache' },
    { id: 'walrus',        label: 'Walrossbart',  value: 'walrus', lockedBy: 'beard-walrus' },
    { id: 'soulPatch',     label: 'Kinnbärtchen', value: 'soulPatch', lockedBy: 'beard-soulPatch' },
    { id: 'pyramid',       label: 'Schnurrbart',  value: 'pyramid', lockedBy: 'beard-pyramid' },
]

export const eyesOptions: AvatarCustomization[] = [
    { id: 'open',       label: 'Offen',      value: 'open' },
    { id: 'happy',      label: 'Fröhlich',   value: 'happy' },
    { id: 'wink',       label: 'Zwinkern',   value: 'wink', lockedBy: 'eyes-wink' },
    { id: 'sleep',      label: 'Schlafend',  value: 'sleep', lockedBy: 'eyes-sleep'  },
]

export const noseOptions: AvatarCustomization[] = [
    { id: 'mediumRound', label: 'Mittel',     value: 'mediumRound' },
    { id: 'smallRound',  label: 'Klein',      value: 'smallRound' },
    { id: 'wrinkles',    label: 'Mit Falten', value: 'wrinkles', lockedBy: 'nose-wrinkles' },
]

export const mouthOptions: AvatarCustomization[] = [
    { id: 'smile',    label: 'Lächeln',         value: 'smile' },
    { id: 'smirk',    label: 'Schmunzeln',      value: 'smirk' },
    { id: 'lips',     label: 'Lippen',          value: 'lips' },
    { id: 'surprise', label: 'Überrascht',      value: 'surprise', lockedBy: 'mouth-surprise' },
    { id: 'frown',    label: 'Traurig',         value: 'frown', lockedBy: 'mouth-frown' },
    { id: 'bigSmile', label: 'Breites Lächeln', value: 'bigSmile', lockedBy: 'mouth-bigSmile' },
]

export const glassesOptions: AvatarCustomization[] = [
    { id: 'none',       label: 'Keine',         value: '' },
    { id: 'glasses',    label: 'Brille',        value: 'glasses', lockedBy: 'glasses-glasses' },
    { id: 'sunglasses', label: 'Sonnenbrille',  value: 'sunglasses', lockedBy: 'glasses-sunglasses'  },
]

export const headwearOptions: AvatarCustomization[] = [
    { id: 'none',       label: 'Keine',         value: '' },
    { id: 'beanie',     label: 'Mütze',         value: 'beanie', lockedBy: 'hair-beanie' },
    { id: 'cap',        label: 'Kappe',         value: 'cap', lockedBy: 'hair-cap' },
]