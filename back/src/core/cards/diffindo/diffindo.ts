import {DIFFINDO} from "../../../../../@types/cardsName";
import {AbstractCard, AttackCard} from "../../base";

export class Diffindo extends AttackCard implements AbstractCard {
    constructor(name :string) {
        super(DIFFINDO, name, 20);
    }
}
