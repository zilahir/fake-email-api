import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI: string = process.env.MONGO_URL as string;
    console.log('mongoURI', mongoURI);
    await connect(mongoURI);
    console.log('MongoDB Connected...');
  } catch (err: any) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
