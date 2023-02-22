import {describe,beforeEach, expect, it} from 'vitest';
import {AvadaKedavra} from "../avadaKedavra";
import {Protego} from "./Protego";
import {Wizard} from "../../wizard";
import {cards} from "../../../cards";
import {AVADA_KEDAVRA} from "../../../../../@types/cardsName";


describe('protego', function () {
    let protego: Protego;
    let defender: Wizard;
    let attacker: Wizard;
    beforeEach(() => {
        protego = new Protego("protego");
        defender = new Wizard('defender', cards);
        attacker = new Wizard('attacker', cards);
    })
    it('should return false', async () => {
        expect(await protego.action({attacker, defender})).toBe(false);
    })
    it('should return true if avada kedavra', async () => {
        attacker.currentCard = new AvadaKedavra(AVADA_KEDAVRA)
        expect(await protego.action({attacker, defender})).toBe(true);
    })
});
