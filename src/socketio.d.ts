declare module 'socket.io-client' {
    export interface SocketOptions {
        reconnect?: boolean;
        forceNew?: boolean;
    }
    export default function io(url: string, options?: SocketOptions): Socket;
    export class Socket {
        public connected: boolean;
        public disconnected: boolean;
        public id: string;

        on(event: string, callback: Function): Socket;
        once(event: string, callback: Function): Socket;
        off(event: string): Socket;
        emit(event: string, ...arguments: any): Socket;
        disconnect(): Socket;
        connect(): Socket;
        destroy(): Socket;
        send(...arguments: any): Socket
    }
}