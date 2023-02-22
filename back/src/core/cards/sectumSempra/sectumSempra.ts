import {SECTUM_SEMPRA} from "../../../../../@types/cardsName";
import {AbstractCard, AttackCard} from "../../base";

export class SectumSempra extends AttackCard implements AbstractCard {
    constructor(name :string) {
        super(SECTUM_SEMPRA, name, 30);
    }
}
