import express from 'express';
import type { Response, Request } from 'express';
import type {
  GetCardsResponse,
  Card,
  CreateCardRequest,
} from '../types/cards/index.ts';
import type { IdParams } from '../types/common/index.ts';
import { createCard, deleteCard, getManyCards, getOneCard, updateCard } from '../database/cards-repository.ts';
import { randomUUID } from 'crypto';

export const cardsRouter = express.Router();

cardsRouter.get(
  '/',
  async (request: Request<{}, {}>, response: Response<GetCardsResponse>) => {
    const cards = await getManyCards();
    response.send(cards);
  },
);

cardsRouter.get(
  '/:id',
  async (
    request: Request<IdParams, Card | string, {}>,
    response: Response<Card | string>,
  ) => {
    const card = await getOneCard(request.params.id);

    if (!card) {
      return response.status(404).send('Card not found');
    }

    response.send(card);
  },
);

cardsRouter.post(
  '/',
  async (request: Request<{}, Card, CreateCardRequest>, response: Response<Card>) => {
    const card: Card ={
      text:request.body.text,
      id: randomUUID()
    };

    await createCard(card);

    response.send(card);
  },
);

cardsRouter.put(
  '/:id',
  async (request: Request<IdParams, Card, CreateCardRequest>, response: Response<Card>) => {
    const card = {
      id:request.params.id,
      text:request.body.text
    };

    await updateCard(card);

    return response.send(card);
  },
);

cardsRouter.delete(
  '/:id',
  async (request: Request<IdParams>, response: Response<void>) => {
    await deleteCard(request.params.id);
    response.sendStatus(204);
  },
);
