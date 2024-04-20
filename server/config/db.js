const mongoose = require("mongoose")
const mongo_url = process.env.MONGO_URL;
const atlas_url = process.env.ATLAS_URL; 
const connectDB = async () => {
    try {
      const atlasURL = atlas_url;
      const mongoURL = mongo_url;
  
      await mongoose.connect(mongoURL)
      .then(()=>console.log(`Database Connected`))

    } catch (error) {
      console.error("Error connecting to MongoDB:", error.message);
      process.exit(1);
    }
  };
  
  module.exports = connectDB;