import BACK from './back.jpg'
import BOMBARDA from './Bombarda.jpg'
import DIFFINDO from './Diffindo.jpg'
import BABBLING_BEVERAGE from './cards/Babbling Beverage.jpg'
import EXPELLIARMUS from './Expelliarmus.jpg'
import ENDOLORIS from './Endoloris.jpg'
import IMPERO from './Impero.jpg'
import AVADA_KEDAVRA from './cards/Avada Kedavra.jpg'
import INCENDIO from './Incendio.jpg'
import PROTEGO from './Protego.jpg'
import LUMOS from './Lumos.jpg'
import SECTUM_SEMPRA from './Sectum Sempra.jpg'
import VULNERA_SANENTUR from './Vulnera Sanentur.jpg'
import PETRIFICUS_TOTALUS from './Petrificus.jpg'
import STUPEFIX from './Stupefix.jpg'
import {Card} from "@/store/cards";
 export const cards : Card[] = [
    {
        "id": 5,
        "name": "Bombarda",
        "key": "BOMBARDA",
        "description": "Explosion sur l'ennemie",
        "image": BOMBARDA,
        "sound": null
    },
    {
        "id": 7,
        "name": "Diffindo",
        "key": "DIFFINDO",
        "description": "20 dégâts",
        "image": DIFFINDO,
        "sound": null
    },
    {
        "id": 14,
        "name": "Babbling Beverage",
        "key": "BABBLING_BEVERAGE",
        "description": "Potion qui quand elle est jouée fait que le sort de l’adversaire à 50% de chance de se jeter sur lui même ",
        "image": BABBLING_BEVERAGE,
        "sound": null
    },
    {
        "id": 13,
        "name": "Expelliarmus",
        "key": "EXPELLIARMUS",
        "description": "L’adversaire ne peut attaquer le prochain tour",
        "image": EXPELLIARMUS,
        "sound": null
    },
    {
        "id": 11,
        "name": "Endoloris",
        "key": "ENDOLORIS",
        "description": "15 dégâts + 5 dégâts sur les 2 prochains tours. Si le sort est envoyé, les dégats sur la durée ne peuvent pas être paré par Protego",
        "image": ENDOLORIS,
        "sound": null
    },
    {
        "id": 15,
        "name": "Impero",
        "key": "IMPERO",
        "description": "Ordonne à l’adversaire de défausser 2 cartes de ses cartes",
        "image": IMPERO,
        "sound": null
    },
    {
        "id": 1,
        "name": "Avada Kedavra",
        "key": "AVADA_KEDAVRA",
        "description": "15 dégâts",
        "image": AVADA_KEDAVRA,
        "sound": null
    },
    {
        "id": 2,
        "name": "Incendio",
        "key": "INCENDIO",
        "description": "15 dégâts",
        "image": INCENDIO,
        "sound": null
    },
    {
        "id": 3,
        "name": "Protego",
        "key": "PROTEGO",
        "description": "protège le joueur",
        "image": PROTEGO,
        "sound": null
    },
    {
        "id": 6,
        "name": "Lumos",
        "key": "LUMOS",
        "description": "trouve les cartes adverse",
        "image": LUMOS,
        "sound": null
    },
    {
        "id": 8,
        "name": "Sectum Sempra",
        "key": "SECTUM_SEMPRA",
        "description": "30 dégâts",
        "image": SECTUM_SEMPRA,
        "sound": null
    },
    {
        "id": 9,
        "name": "Vulnera Sanentur",
        "key": "VULNERA_SANENTUR",
        "description": "Régénère 20 pv à l’utilisateur du sort",
        "image": VULNERA_SANENTUR,
        "sound": null
    },
    {
        "id": 20,
        "name": "Petrificus",
        "key": "PETRIFICUS_TOTALUS",
        "description": "bloque l'adversaire pendant un tour et fait 5 points de dégâts.",
        "image": PETRIFICUS_TOTALUS,
        "sound": null
    },
    {
        "id": 12,
        "name": "Stupefix",
        "key": "STUPEFIX",
        "description": "10 dégâts",
        "image": STUPEFIX,
        "sound": null
    }
]