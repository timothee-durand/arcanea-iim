import {Router} from "express";
import {getCards} from "./cards";
import {getDeck, getDecks} from "./decks";

export const router = Router();

router.get('/cards', async (req, res) => {
    try {
        await getCards(res);
    } catch (e) {
        console.log(e)
        res.send({error: e})
    }

})

router.get('/decks', async (req, res) => {
    try {
        await getDecks(res);
    } catch (e) {
        console.log(e)
        res.send({error: e})
    }
})

router.get('/decks/:id', async (req, res) => {
    try {
        await getDeck(res, req.params.id);
    } catch (e) {
        console.log(e)
        res.send({error: e})
    }
})
