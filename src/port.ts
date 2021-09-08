let ports = ["A","B","C"]
export default class Port {
    public portIndex: number = 0;
    constructor(public portstr: string) {
        this.portIndex = ports.indexOf(this.portstr);
        
    }
}