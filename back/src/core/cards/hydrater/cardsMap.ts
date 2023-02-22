import {
    AVADA_KEDAVRA,
    BOMBARDA,
    DIFFINDO,
    ENDOLORIS,
    EXPELLIARMUS,
    INCENDIO,
    PROTEGO, SECTUM_SEMPRA, STUPEFIX
} from "../../../../../@types/cardsName";
import {Expelliarmus} from "../expelliarmus";
import {Incendio} from "../incendio";
import {AvadaKedavra} from "../avadaKedavra";
import {Endoloris} from "../endoloris";
import {Protego} from "../protego";
import {AbstractCard} from "../../base";
import {Diffindo} from "../diffindo";
import {Bombarda} from "../bombarda";
import {SectumSempra} from "../sectumSempra";
import {Stupefix} from "../stupefix";


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
        case BOMBARDA:
            return new Bombarda(name);
        case SECTUM_SEMPRA:
            return new SectumSempra(name);
        case STUPEFIX:
            return new Stupefix(name);
    }
}
