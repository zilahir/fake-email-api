import type { Document } from 'mongoose';
import { model, Schema } from 'mongoose';

export enum EmailType {
  INCOMING = 'INCOMING',
  OUTGOING = 'OUTGOING',
}

export interface SingleEmail {
  sender: string;
  sentAt: number;
  content: string;
  isRead: boolean;
  emailType: EmailType;
}

export interface IEmail extends SingleEmail, Document {}

const emailSchema: Schema = new Schema({
  sender: {
    type: String,
    required: true,
  },
  sentAt: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    required: true,
    default: false,
  },
  emailType: {
    type: String,
    required: true,
  },
});

// mongodb queries, and mutations

export interface NewEmail extends Omit<SingleEmail, 'isRead'> {}

const Email = model('Email', emailSchema);

export async function insertNewEmail(email: NewEmail) {
  const newEmail = new Email(email);
  return newEmail.save();
}

export async function findById(emailId: string) {
  return Email.findById(emailId).lean();
}

export async function allEmail(emailType: EmailType) {
  return Email.find({
    emailType: emailType.toUpperCase(),
  });
}

export async function createRandomIncomingEmail(emailData: NewEmail) {
  return new Email(emailData).save();
}

export async function updateOneEmail(id: string) {
  const thisEmail = Email.findByIdAndUpdate(
    id,
    {
      isRead: true,
    },
    {
      returnOriginal: false,
    }
  );

  return thisEmail.lean();
}

export default Email;
