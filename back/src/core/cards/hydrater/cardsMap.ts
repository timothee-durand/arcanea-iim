import {
    AVADA_KEDAVRA,
    BOMBARDA,
    DIFFINDO,
    ENDOLORIS,
    EXPELLIARMUS,
    INCENDIO, PETRIFICUS_TOTALUS,
    PROTEGO, SECTUM_SEMPRA, STUPEFIX, VULNERA_SANENTUR
} from "../../../../@types/cardsName";
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
import {PetrificusTotalus} from "../petrificusTotalus";
import {VulneraSanentur} from "../vulneraSanentur";


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
        case PETRIFICUS_TOTALUS:
            return new PetrificusTotalus(name);
        case VULNERA_SANENTUR:
            return new VulneraSanentur(name);
    }
}
