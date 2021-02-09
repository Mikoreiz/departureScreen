const mongoose = require("mongoose")
const Schema = mongoose.Schema

const gtStpsSchema = new Schema(
  {
    trip_id: String,
    stop_id: String,
    route_id: String,
    trip_headsign: String
  },
  { collection: "getStops" }
)

module.exports = Departure = mongoose.model("getStop", gtStpsSchema)
