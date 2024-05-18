const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://eduhub:0wlxuwH6c3aNpobF@cluster0.szzsk0a.mongodb.net/test"
);

mongoose.connection.on("connected", () => {
  console.log("connected to MongoDB");
});

mongoose.connection.on("error", (error) => {
  console.log(`MongoDB connection error ${error}`);
});

module.exports = mongoose;
