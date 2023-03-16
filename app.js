import { Servidor } from "./models/server.js";
import dotenv from 'dotenv';

dotenv.config();

const server = new Servidor();

server.listen();