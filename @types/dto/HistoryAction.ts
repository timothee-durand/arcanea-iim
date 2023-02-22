export interface HistoryAction {
    player: {
        name: string,
    },
    card: {
        name: string,
        type: "Attack" | "Defense" | "Utility" | "Unforgivable" | "Block"

    },
    info: string
}

export class HistoryActionDto {
}
