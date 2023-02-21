import {AVADA_KEDAVRA, ENDOLORIS, EXPELLIARMUS, INCENDIO, PROTEGO} from "@/core/cards/hydrater/cardsName";
import {AvadaKedavra} from "@/core/cards/avadaKedavra";
import {Endoloris} from "@/core/cards/endoloris";
import {Expelliarmus} from "@/core/cards/expelliarmus";
import {Incendio} from "@/core/cards/incendio";
import {Protego} from "@/core/cards/protego";
import {AbstractCard, BaseCard} from "@/core/base";

const cardsKeys = [AVADA_KEDAVRA, ENDOLORIS,EXPELLIARMUS,INCENDIO,PROTEGO] as const;

type CardName = typeof cardsKeys[number];

export function getCardByName(name: string): AbstractCard | undefined{
    switch (name) {
        case AVADA_KEDAVRA:
            return new AvadaKedavra(name);
        case ENDOLORIS:
            return new Endoloris(name);
        case EXPELLIARMUS:
            return new Expelliarmus(name);
        case INCENDIO:
            return new Incendio(name);
        case PROTEGO:
            return new Protego(name);
    }
}
