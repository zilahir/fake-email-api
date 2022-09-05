import type { Request, Response } from 'express';

import type { EmailType, NewEmail } from '../models/email';
import { allEmail, findById, insertNewEmail } from '../models/email';

export async function getAllEmail(request: Request, response: Response) {
  const { type } = request.params;
  const emails = await allEmail(type as EmailType);
  return response.status(200).send({ emails: emails || [] });
}

export async function createNewEmail(
  request: Request<{}, {}, NewEmail>,
  response: Response
) {
  const { content, sentAt, sender, emailType } = request.body;

  const emailData = {
    content,
    sentAt,
    sender,
    emailType,
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
