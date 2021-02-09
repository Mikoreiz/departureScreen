const mongoose = require("mongoose")
const Schema = mongoose.Schema

const StopSchema = new Schema(
  {
    stop_id: Number,
    stop_code: Number,
    stop_name: String,
    stop_desc: String,
    stop_lat: Number,
    stop_lon: Number,
    zone_id: String,
    stop_url: String,
    parent_station: String,
    stop_timezone: String,
    wheelchair_boarding: Number,
    agency_key: String,
    created_at: String,
    loc: Number
  },
  { collection: "stops" }
)

module.exports = Stops = mongoose.model("stop", StopSchema)
