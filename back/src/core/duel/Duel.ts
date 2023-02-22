import {Wizard} from "../wizard";
import {AbstractCard} from "../base";
import {RoomDto} from "../../../../@types/dto";
import {HistoryAction} from "../../../../@types/dto/HistoryAction";
import {CardName} from "../../../../@types/cardsName";




export type ApiCard = {
    key: string;
    title: string;
    description?: string;
    image?: string;
    sound?: string;
}

type BoardCard = {
    card: AbstractCard;
    playerId: string;
}

export class Duel {
    public readonly roomId: string;
    players: Wizard[] =[];
    private turn: number;
    private readonly cards: ApiCard[];
    private board: BoardCard[] = [];

    constructor(roomId: string, cards: ApiCard[]) {
        this.roomId = roomId;
        this.cards = cards;
        this.turn = 0;
    }

    addPlayer(username) {
        if(this.players.length >= 2)
            throw new Error("Room is full")
        const newPlayer = new Wizard(username, this.cards);
        this.players.push(newPlayer);
        return newPlayer
    }

    addCardToBoard(cardKey: string, playerId: string) {
        const player = this.players.find(player => player.id === playerId);
        if(!player) {
            throw new Error("Player not found")
        }
        const card = player.cards.find(card => card.key === cardKey);
        if(!card) {
            throw new Error("Card not found")
        }
        const hasAlreadyPlayed = this.board.find(boardCard => boardCard.playerId === playerId);
        if(hasAlreadyPlayed) {
            throw new Error("Player has already played")
        }
        this.board.push({card: card, playerId})
        console.log(`${cardKey} added to board by ${playerId}`)
    }

    async tryPlayTurn(): Promise<false | HistoryAction[]> {
        if(this.board.length < 2) {
            return false;
        }
        const orderedBoard = this.board.sort((a, b) => {
            if(a.card.order > b.card.order) {
                return -1;
            }
            if(a.card.order < b.card.order) {
                return 1;
            }
            return 0;
        })
        this.board = [];
        const actions : HistoryAction[]= []

        for (const player of this.players) {
            const result = await player.executeAsyncAction(player)
            if(result.actions.length > 0) {
                actions.push(...result.actions)
            }
        }
        let isBlocked = false;
        for (const boardCard of orderedBoard) {
            const attacker = this.players.find(player => player.id === boardCard.playerId);
            const defender = this.players.find(player => player.id !== boardCard.playerId);
            if(!attacker || !defender) {
                throw new Error("Player not found")
            }

            let blockedPlayer = this.players.filter(player => player.isBlockedNextTurn).map(player => player.id);
            if(blockedPlayer.length > 0 && blockedPlayer.includes(boardCard.playerId)) {
                actions.push({
                    player: {
                        name: attacker.name,
                    },
                    card: {
                        name: boardCard.card.key,
                        type: "Block"
                    },
                    info: `${attacker.name} can't play ${boardCard.card.title} because it has been blocked`
                })
                continue;
            }
            if(isBlocked) {
                actions.push({
                    player: {
                        name: attacker.name,
                    },
                    card: {
                        name: boardCard.card.key,
                        type: "Block"
                    },
                    info: `${boardCard.card.key} has no effect on ${defender.name} because it has been blocked`
                })
                continue;
            }
            console.log(`${boardCard.card.key} played by ${attacker.name} on ${defender.name}`)
            const result = await boardCard.card.action({defender, attacker})
            actions.push(result.action)
            if(result.block)  isBlocked = true
        }

        this.players.forEach((player) => {
            player.isBlockedNextTurn = false;
            console.log(`${player.name} has ${player.health} health`)
        })

        this.turn++;
        return actions
    }

    get toObject() :RoomDto {
        return {
            roomId: this.roomId,
            players: this.players.map(player => player.toObject()),
            turn: this.turn,
        }
    }

    get boardObject() : CardName[] {
        return this.board.map(boardCard => boardCard.card.key)
    }

    removePlayer(userId: string) : Wizard {
        const playerIndex = this.players.findIndex(player => player.id === userId);
        const player = this.players.find(player => player.id === userId);
        if(playerIndex === -1) {
            throw new Error("Player not found")
        }
        this.players.splice(playerIndex, 1);
        return player
    }
}
