const express = require("express")
const fetch = require("node-fetch")
const router = express.Router()
const config = require("../../config.json")
const Routes = require("../../models/routes")
const getStops = require("../../models/getStops")

router.get("/", async (request, response) => {
  try {
    const routes = await Routes.find({}).sort({ _id: -1 })
    if (!routes) {
      return response.status(400).json({ msg: "There are no routes" })
    }
    response.render("routes", {
      routes: routes
    })
  } catch (err) {
    console.error(err.message)
    response.status(500).send("Server Error")
  }
})

router.get("/map/:route_id/:direction_id", async (request, response) => {
  try {
    const mapRes = await fetch(
      config.development.route_details +
        request.params.route_id +
        "&format=json"
    )
    const map = await mapRes.json()
    const direct = await request.params.direction_id

    if (!map && !direct) {
      return response.status(400).json({ msg: "No times to show" })
    }
    response.render("map", {
      map: map,
      direct: direct,
      mapBox: config.development.mapbox_token
    })
  } catch (err) {
    console.error(err.message)
    response.status(500).send("Server Error")
  }
})

router.get("/tv/:route_id/:direction_id", async (request, response) => {
  try {
    const timeVert = await fetch(
      config.development.times_vert + request.params.route_id + "&format=json"
    )
    const vertTime = await timeVert.json()

    if (!vertTime && !direct && !routeId) {
      return response.status(400).json({ msg: "No times to show" })
    }
    response.render("onSide", {
      vertTime: vertTime,
      direct: request.params.direction_id,
      routeId: request.params.route_id
    })
  } catch (err) {
    console.error(err.message)
    response.status(500).send("Server Error")
  }
})

router.get("/:route_id/:direction_id", async (request, response) => {
  try {
    const timeHor = await fetch(
      config.development.times_hori + request.params.route_id + "&format=json"
    )
    const horTime = await timeHor.json()

    if (!horTime && !direct && !routeId) {
      return response.status(400).json({ msg: "No times to show" })
    }
    response.render("onTop", {
      horTime: horTime,
      direct: request.params.direction_id,
      routeId: request.params.route_id
    })
  } catch (err) {
    console.error(err.message)
    response.status(500).send("Server Error")
  }
})

router.get("/:stop_id", async (request, response) => {
  try {
    const getstops = await getStops.distinct("route_id", {
      stop_id: request.params.stop_id
    })

    const stopID = await request.params.stop_id

    if (!getstops && !stopID) {
      return response.status(400).json({ msg: "No routes to show" })
    }
    response.render("stopRoutes", {
      getstops: getstops,
      stopID: stopID
    })
  } catch (err) {
    console.error(err.message)
    response.status(500).send("Server Error")
  }
})

module.exports = router
