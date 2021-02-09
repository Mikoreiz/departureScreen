const mongoose = require("mongoose")
const Schema = mongoose.Schema

const RteSchema = new Schema(
  {
    route_id: Number,
    agency_id: Number,
    route_short_name: String,
    route_long_name: String,
    route_desc: String,
    route_type: String,
    route_url: String,
    route_color: String,
    route_text_color: String
  },
  { collection: "routes" }
)

module.exports = Routes = mongoose.model("route", RteSchema)
