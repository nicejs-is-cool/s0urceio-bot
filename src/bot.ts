import EventEmitter from 'events';
import io, { Socket } from 'socket.io-client';
import {parse} from './mainpkg'
import { mainPackage } from 's0urce.io';

export default class Bot extends EventEmitter {
    public socket: Socket;
    public id: string = "";
    constructor(public nickname: string) {
        super();
        this.socket = io("http://s0urce.io/")
        this.socket.on('connect', () => {
            this.socket.emit('signIn', {name: this.nickname});
        })
        this.socket.on('prepareClient',(id: string) => {
            this.id = id;
        })
        this.socket.on('mainPackage',this.handlePkg);
    }
    handlePkg(pkg: mainPackage) {
        let res = parse(pkg,this);
        for (let task of res) {
            this.emit(task.name, task.data);
        }
    }
    playerRequest(task: number, data: any) {
        this.socket.emit('playerRequest',{task, ...data});
    }
    chat(id: string, message: string) {
        this.playerRequest(300, {id, message});
    }
}