export const AVADA_KEDAVRA = 'AVADA_KEDAVRA';
export const ENDOLORIS = 'ENDOLORIS';
export const STUPEFIX = 'STUPEFIX';
export const EXPELLIARMUS = 'EXPELLIARMUS';
export const INCENDIO = 'INCENDIO';
export const PROTEGO = 'PROTEGO';


const cardsKeys = [AVADA_KEDAVRA, ENDOLORIS,EXPELLIARMUS,INCENDIO,PROTEGO] as const;

export type CardName = typeof cardsKeys[number];
