// const mongoose = require("mongoose");
// require("dotenv").config();

// const mongoUri = process.env.MONGODB;

// const initializeDatabase = async () => {
//   await mongoose
//     .connect(mongoUri)
//     .then(() => console.log("Connected to database."))
//     .catch((error) => console.log("error while connecting to database", error));
// };

// module.exports = { initializeDatabase };



const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGODB;
const initializeDatabase = async () => {
  try {
    const connection = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (connection) {
      console.log("connected succesfully");
    }
  } catch (error) {
    console.log("connection failed", error);
  }
};

module.exports = { initializeDatabase };
