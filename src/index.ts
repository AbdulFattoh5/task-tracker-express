import express from 'express'
import {PORT} from './config.ts'
import { cardsRouter } from './routers/cards.router.ts';

const server = express();

server.get('/', (request, response) =>{
    response.send('You are ok.')
})

server.use('/cards', cardsRouter)

server.listen(PORT)