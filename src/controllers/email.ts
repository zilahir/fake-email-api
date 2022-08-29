import type { Request, Response } from 'express';

import type { NewEmail } from '../models/email';
import { insertNewEmail } from '../models/email';

export async function getEmail(_: any, response: Response) {
  return response.status(200).send({
    hello: true,
  });
}

export async function createNewEmail(
  request: Request<{}, {}, NewEmail>,
  response: Response
) {
  const { content, sentAt, sender } = request.body;

  const emailData = {
    content,
    sentAt,
    sender,
  };

  insertNewEmail(emailData).then(() => {
    response.status(200).send({
      saved: true,
    });
  });
}
