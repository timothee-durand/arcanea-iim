import {INCENDIO} from "../../../../@types/cardsName";
import {AbstractCard, AttackCard} from "../../base";

export class Incendio extends AttackCard implements AbstractCard {
    constructor(name :string) {
        super(INCENDIO, name, 15);
    }
}
