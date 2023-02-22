import {describe,beforeEach, expect, it} from 'vitest';
import {Diffindo} from "./diffindo";
import {Wizard} from "../../wizard";
import {INCENDIO} from "../../../../../@types/cardsName";
import {cards} from "../../../cards";

describe('diffindo', function () {
    let incendio: Diffindo;
    let defender: Wizard
    let attacker: Wizard
    beforeEach(() => {
        incendio = new Diffindo(INCENDIO);
        defender = new Wizard('defender', cards, {iimId :'', iimToken : ''});
        attacker = new Wizard('attacker', cards, {iimId :'', iimToken : ''});
    })

    it('should inflict 20 damage', async () => {
        await incendio.action({defender, attacker});
        expect(defender.health).toBe(80);
    })
});
