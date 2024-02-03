import {describe,beforeEach, expect, it} from 'vitest';
import {Incendio} from "./Incendio";
import {Wizard} from "../../wizard";
import {INCENDIO} from "../../../../@types/cardsName";
import {cards} from "../../../cards";

describe('incendio', function () {
    let incendio: Incendio;
    let defender: Wizard
    let attacker: Wizard
    beforeEach(() => {
        incendio = new Incendio(INCENDIO);
        defender = new Wizard('defender', cards, {iimId :'', iimToken : ''});
        attacker = new Wizard('attacker', cards, {iimId :'', iimToken : ''});
    })

    it('should inflict 15 damage', async () => {
        await incendio.action({defender, attacker});
        expect(defender.health).toBe(85);
    })
});
