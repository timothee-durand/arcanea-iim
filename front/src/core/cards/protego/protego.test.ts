import {describe,beforeEach, expect, it} from 'vitest';
import {Wizard} from "@/core/wizard";
import {Protego} from "./Protego";
import {AvadaKedavra} from "@/core/cards/avadaKedavra";

describe('protego', function () {
    let protego: Protego;
    let defender: Wizard;
    let attacker: Wizard;
    beforeEach(() => {
        protego = new Protego("protego", "Protego");
        defender = new Wizard('defender');
        attacker = new Wizard('attacker');
    })
    it('should return false', async () => {
        expect(await protego.action({attacker, defender})).toBe(false);
    })
    it('should return true if avada kedavra', async () => {
        attacker.currentCard = new AvadaKedavra()
        expect(await protego.action({attacker, defender})).toBe(true);
    })
});
