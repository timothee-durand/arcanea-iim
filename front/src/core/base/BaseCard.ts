import type {Card, Order} from "./type";

export class BaseCard implements Card {
    key: string;
    title: string;
    order: Order = 2;
    description?: string;
    image?: string;
    sound?: string;


    constructor(key:string, title:string) {
        this.key = key;
        this.title = title;
    }

    async action(): Promise<boolean> {
        throw new Error("Action not implemented")
    }

}
