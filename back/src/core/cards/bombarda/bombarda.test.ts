import {describe,beforeEach, expect, it} from 'vitest';
import {Bombarda} from "./bombarda";
import {Wizard} from "../../wizard";
import {INCENDIO} from "../../../../../@types/cardsName";
import {cards} from "../../../cards";

describe('bombarda', function () {
    let incendio: Bombarda;
    let defender: Wizard
    let attacker: Wizard
    beforeEach(() => {
        incendio = new Bombarda(INCENDIO);
        defender = new Wizard('defender', cards, {iimId :'', iimToken : ''});
        attacker = new Wizard('attacker', cards, {iimId :'', iimToken : ''});
    })

    it('should inflict 20 damage', async () => {
        await incendio.action({defender, attacker});
        expect(defender.health).toBe(75);
    })
});
