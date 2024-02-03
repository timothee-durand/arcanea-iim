import {BOMBARDA} from "../../../../@types/cardsName";
import {AbstractCard, AttackCard} from "../../base";

export class Bombarda extends AttackCard implements AbstractCard {
    constructor(name :string) {
        super(BOMBARDA, name, 25);
    }
}
