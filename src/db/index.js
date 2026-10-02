import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const connectDB = async () => {
    try {
      const uri = process.env.MONGODB_URI;
      if (!uri) {
        throw new Error('MONGODB_URI is not set');
      }

      const connectionInstance = await mongoose.connect(uri, { dbName: DB_NAME });
      console.log(`MongoDB connected successfully: ${connectionInstance.connection.host}/${connectionInstance.connection.name}`);
    }
    catch (error) {
        console.error('Error connecting to the database', error);
        process.exit(1);
    }
}

export default connectDB;