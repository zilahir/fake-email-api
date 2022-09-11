import { faker } from '@faker-js/faker';
import type { Request, Response } from 'express';

import type { NewEmail, SingleEmail } from '../models/email';
import {
  allEmail,
  createRandomIncomingEmail,
  EmailType,
  findById,
  insertNewEmail,
  updateOneEmail,
} from '../models/email';

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

export async function insertNewRandomEmail(
  _request: Request,
  response: Response
) {
  const randomEmailData: SingleEmail = {
    sender: faker.internet.email(),
    sentAt: new Date().getTime(),
    content: faker.lorem.paragraph(10),
    isRead: false,
    emailType: EmailType.INCOMING,
  };

  const newRandomIncomingEmail = await createRandomIncomingEmail(
    randomEmailData
  );

  response.status(200).send({
    email: newRandomIncomingEmail,
  });
}

export async function markEmailAsRead(request: Request, response: Response) {
  const { id } = request.params;
  const email = await updateOneEmail(id as string);

  response.status(200).send({
    email,
  });
}
