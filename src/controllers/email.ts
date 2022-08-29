import type { Response } from 'express';

export async function getEmail(_: any, response: Response) {
  return response.status(200).send({
    hello: true,
  });
}
