export interface HistoryAction {
    player: {
        name: string,
    },
    card: {
        name: string,
            type: "Attack" | "Defense" | "Utility" | "Unforgivable"
    },
    info: string
}

export class HistoryActionDto {
}
