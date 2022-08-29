import type { Document } from 'mongoose';
import { model, Schema } from 'mongoose';

export interface SingleEmail {
  sender: string;
  sentAt: number;
  content: string;
  isRead: boolean;
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

export default Email;
