export class Horario {
    public lun: boolean;
    public mar: boolean;
    public mie: boolean;
    public jue: boolean;
    public vie: boolean;
    public sab: boolean;

    public h1: any;
    public h2: any;
    public h3: any;
    public h4: any;
    public h5: any;
    public h6: any;

    constructor(){
        this.lun = false;
        this.mar = false;
        this.mie = false;
        this.jue = false;
        this.vie = false;
        this.sab = false;
    }
}