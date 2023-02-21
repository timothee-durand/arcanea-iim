import {AttackCard} from "@/core/base";
import {INCENDIO} from "@/core/cards/hydrater/cardsName";

export class Incendio extends AttackCard {
    constructor(name :string) {
        super(INCENDIO, name, 10);
    }
}
