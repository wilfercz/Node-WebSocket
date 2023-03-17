import path from 'path';
import fs from 'fs';

import * as info from '../db/data.json' assert {type : "json"};
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

class Ticket {
    constructor( numero, escritorio){
        this.numero = numero,
        this.escritorio = escritorio
    };
};

class TicketControl{

    constructor(){
        this.ultimo   = 0;
        this.hoy      = new Date().getDate();
        this.tickets  = [];
        this.ultimos4 = [];
        
        this.init();
    };

    get toJson(){
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };
    };

    init(){
        const {hoy, tickets, ultimos4, ultimo} = info;

        if(hoy === this.hoy){
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimos4 = ultimos4;
        }else{
            //Es otro día
            this.guardarDB();
        }
    };

    guardarDB(){
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
    };

    siguiente(){
        this.ultimo += 1;
        const ticket = new Ticket(this.ultimo, null);

        this.tickets.push(ticket);

        this.guardarDB();
        return 'Ticker '+ ticket.numero;

    };

    atenderTicket(escritorio){

        //No tenemos tickets
        if(this.tickets.length === 0){
            return null;
        };

        const ticket = this.tickets.shift();

        ticket.escritorio = escritorio;

        this.ultimos4.unshift(ticket);

        if(this.ultimos4.length > 4){
            this.ultimos4.splice(-1,1);
        }

        this.guardarDB();

        return ticket;
    };

};

export {TicketControl};