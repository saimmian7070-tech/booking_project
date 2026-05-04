import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect("mongodb+srv://saimmian7070_db_user:Aer505bmw@cluster0.cydnigr.mongodb.net/");
  console.log("DB connected");
};

export default connectDB;