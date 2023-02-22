import {describe,beforeEach, expect, it} from 'vitest';
import {AvadaKedavra} from "../avadaKedavra";
import {Protego} from "./Protego";
import {Wizard} from "../../wizard";


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
