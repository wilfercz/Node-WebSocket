import {createServer} from 'http';

import express from 'express';
import cors from 'cors';
import {Server} from 'socket.io';
import { socketController } from '../sockets/controller.js';

class Servidor {

    constructor(){
        this.app    = express();
        this.port   = process.env.PORT;
        this.server = createServer(this.app);
        this.io     = new Server(this.server);

        this.paths = {}
        
        //Middlewares
        this.middlewares();

        //Rutas de la Aplicacion
        this.routes();

        //Sockets
        this.sockets();
    };

    middlewares(){
        //CORS
        this.app.use(cors());

        //Directorio Público
        this.app.use(express.static('public'));

    };

    routes(){};

    sockets(){

        this.io.on('connection', socketController);
    };

    listen(){
        this.server.listen(this.port, ()=>{
            console.log(`Aplicación desplegada en http://localhost:${this.port}`);
        }); 
    }

};

export {Servidor};