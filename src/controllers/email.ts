import type { Request, Response } from 'express';

import type { NewEmail } from '../models/email';
import { allEmail, findById, insertNewEmail } from '../models/email';

export async function getAllEmail(_: any, response: Response) {
  const emails = await allEmail();
  return response.status(200).send({ emails });
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

  insertNewEmail(emailData).then((email) => {
    response.status(200).send({
      saved: true,
      email,
    });
  });
}

export interface FindEmailById {
  id: string;
}

export async function getOneById(
  request: Request<FindEmailById>,
  response: Response
) {
  const { id } = request.params;
  const thisEmail = await findById(id);

  response.status(200).send({
    ...thisEmail,
  });
}
