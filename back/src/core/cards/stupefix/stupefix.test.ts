import {describe,beforeEach, expect, it} from 'vitest';
import {Stupefix} from "./stupefix";
import {Wizard} from "../../wizard";
import {INCENDIO} from "../../../../../@types/cardsName";
import {cards} from "../../../cards";

describe('stupefix', function () {
    let incendio: Stupefix;
    let defender: Wizard
    let attacker: Wizard
    beforeEach(() => {
        incendio = new Stupefix(INCENDIO);
        defender = new Wizard('defender', cards, {iimId :'', iimToken : ''});
        attacker = new Wizard('attacker', cards, {iimId :'', iimToken : ''});
    })

    it('should inflict 20 damage', async () => {
        await incendio.action({defender, attacker});
        expect(defender.health).toBe(90);
    })
});
