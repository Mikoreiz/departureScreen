const express = require("express")
const fetch = require("node-fetch")
const router = express.Router()
const config = require("../../config.json")

const Routes = require("../../models/routes")
const Stops = require("../../models/stops")

router.get("/:route_id/", async (request, response) => {
  try {
    const posRes = await fetch(config.development.position)
    const position = await posRes.json()

    const rteDetailsRes = await fetch(
      config.development.route_details +
        request.params.route_id +
        "&format=json"
    )
    const rteDetails = await rteDetailsRes.json()

    const routes = await Routes.find({}).sort({ _id: -1 })

    if (!rteDetails && !position) {
      return response.status(400).json({ msg: "No times to show" })
    }
    response.render("position", {
      routes: routes,
      position: position,
      rteDetails: rteDetails,
      routeIdParam: request.params.route_id
    })
  } catch (err) {
    console.error(err.message)
    response.status(500).send("Server Error")
  }
})

module.exports = router
