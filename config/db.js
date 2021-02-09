const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost/gtfs", {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    console.log("MongoDB connected..")
  } catch (err) {
    console.error(err.message)
    //Exit process with failure
    process.exit(1)
  }
}

module.exports = connectDB
