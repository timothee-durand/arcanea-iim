import {AVADA_KEDAVRA, DIFFINDO, ENDOLORIS, EXPELLIARMUS, INCENDIO, PROTEGO} from "../../../../../@types/cardsName";
import {Expelliarmus} from "../expelliarmus";
import {Incendio} from "../incendio";
import {AvadaKedavra} from "../avadaKedavra";
import {Endoloris} from "../endoloris";
import {Protego} from "../protego";
import {AbstractCard} from "../../base";
import {Diffindo} from "../diffindo";


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
        case DIFFINDO:
            return new Diffindo(name);
    }
}
