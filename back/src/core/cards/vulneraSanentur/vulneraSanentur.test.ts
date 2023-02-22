import {describe,beforeEach, expect, it} from 'vitest';
import {VulneraSanentur} from "./VulneraSanentur";
import {Wizard} from "../../wizard";
import {cards} from "../../../cards";


describe('vulnera sanentur', function () {
    let protego: VulneraSanentur;
    let defender: Wizard;
    let attacker: Wizard;
    beforeEach(() => {
        protego = new VulneraSanentur("protego");
        defender = new Wizard('defender', cards, {iimId :'', iimToken : ''});
        attacker = new Wizard('attacker', cards, {iimId :'', iimToken : ''});
    })
    it('should return false', async () => {
        const result = await protego.action({attacker, defender});
        expect(result.block).toBe(false);
    })
    it('should heal the player', async () => {
        attacker.takeDamage(30)
        await protego.action({attacker, defender});
        expect(attacker.health).toBe(90);
    })
});
