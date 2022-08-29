import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI: string = process.env.MONGOURL as string;
    await connect(mongoURI);
    console.log('MongoDB Connected...');
  } catch (err: any) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
