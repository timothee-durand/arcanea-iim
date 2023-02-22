import {describe,beforeEach, expect, it} from 'vitest';
import {SectumSempra} from "./sectumSempra";
import {Wizard} from "../../wizard";
import {INCENDIO} from "../../../../../@types/cardsName";
import {cards} from "../../../cards";

describe('sectum sempra', function () {
    let incendio: SectumSempra;
    let defender: Wizard
    let attacker: Wizard
    beforeEach(() => {
        incendio = new SectumSempra(INCENDIO);
        defender = new Wizard('defender', cards, {iimId :'', iimToken : ''});
        attacker = new Wizard('attacker', cards, {iimId :'', iimToken : ''});
    })

    it('should inflict 20 damage', async () => {
        await incendio.action({defender, attacker});
        expect(defender.health).toBe(70);
    })
});
