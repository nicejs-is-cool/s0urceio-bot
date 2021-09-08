import { mainPackage } from 's0urce.io';
import Bot from './bot';
import ChatMessage from './chatmessage';
export class Task {
    constructor(public name: string, public data: any) {}
}
export interface taskHandler {
    [key: string]: (task: Task, client: Bot) => Task;
}

let firewallNames = [
    "Charge"
]
let minerNames = [
    "Data Miner",
    "Advanced Miner"
]

let taskHandler: taskHandler = {
    updateData(task) {
        let {coins, firewall, market} = task.data;
        
        let nFirewall = Object.entries(firewall).map(x => [firewallNames[Number(x[0])], x[1]]);

        return new Task("updateData",{
            firewall: nFirewall,
            coins,
            market
        })
    },
    chatMessage(task, client) {
        return new Task('chatMessage', new ChatMessage(task.data.id, task.data.message, task.data.name, client));
    }
}
export function parse(pkg: mainPackage, client: Bot) {
    let tasksByName: {[key: number]: string} = {
        // 2010: "updateData",
        // 2008: "updateUsers",
        2006: "chatMessage"
    }
    let result = [];
    for (let task of pkg.unique) {
        if (!taskHandler.hasOwnProperty(tasksByName[task.task])) {console.error('Non-handled task:',task.task); continue};
        result.push(taskHandler[tasksByName[task.task]](task as any, client));
    }
    return result;
}