import mongoose from "mongoose";

let MONGO_DB = null;
const connectDB = async () => {
  try {
    MONGO_DB = await mongoose.connect(process.env.MONGO_URI, {});
    console.log(`mongo database is connected!!! ${MONGO_DB.connection.host} `);
  } catch (error) {
    console.error(`Error: ${error} `);
    process.exit(1);
  }
};
export { MONGO_DB };
export default connectDB;
