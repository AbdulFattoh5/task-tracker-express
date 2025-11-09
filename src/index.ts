import express from 'express';
import { PORT } from './config.ts';
import { cardsRouter } from './routers/cards.router.ts';
import { createTables } from './database/create-tables.ts';

async function run() {
  await createTables();

  const server = express();

  server.use(express.json());

  server.get('/', (request, response) => {
    response.send('You are ok.');
  });

  server.use('/cards', cardsRouter);

  server.listen(PORT);
}

run().catch((error) => console.error(error));
