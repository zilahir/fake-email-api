import dotenv from 'dotenv';
import express, { json } from 'express';
import helmet from 'helmet';

import connectDB from './config/db';
import emailRouter from './routes/email';

const app = express();
app.use(json());
app.use(helmet());

dotenv.config();

// Connect to MongoDB
connectDB();

app.get('/', (_, res) => {
  res.json({
    msg: 'Hello World',
  });
});

app.use('/email', emailRouter);

app.use((_, res, _2) => {
  res.status(404).json({ error: 'NOT FOUND' });
});

export { app };
