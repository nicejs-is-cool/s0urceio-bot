import Bot from "./bot";

export default class ChatMessage {
    constructor(public id: string, public message: string, public name: string, private client: Bot) {}
    reply(message: string) {
        this.client.chat(this.id, message);
    }
}