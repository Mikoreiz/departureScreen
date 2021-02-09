const express = require("express")
const router = express.Router()
const config = require("../../config.json")
const Routes = require("../../models/routes")
const getStops = require("../../models/getStops")

// Route for list of all bus routes
router.get("/", async (request, response) => {
  try {
    // Imports routes.json 
    const routes = require('../../json/route_list/routes.json')
    if (!routes) {
      return response.status(400).json({ msg: "There are no routes" })
    }
    // Pushes the data from routes.json into routes.pug
    response.render("routes", {
      routes: routes
    })
  } catch (err) {
    console.error(err.message)
    response.status(500).send("Server Error")
  }
})

// Route for vertical timetable
router.get("/tv/:route_id/:direction_id", async (request, response) => {
  try {
   
    // Imports timetable data from times_vert json folder
    const route = request.params.route_id
    const vertTime = require('../../json/times_vert/' + route + '.json')

    // Imports map data from route_details json folder
    const map = require('../../json/route_details/' + route + '.json')
    
    if (!vertTime && !direct && !routeId && !map) {
      return response.status(400).json({ msg: "No times to show" })
    }
    // Pushes the timetable data, map data, directionId, routeId, and mapBox token into onSide.pug
    response.render("onSide", {
      vertTime: vertTime,
      map: map,
      direct: request.params.direction_id,
      routeId: request.params.route_id,
      mapBox: config.development.mapbox_token
    })
  } catch (err) {
    console.error(err.message)
    response.status(500).send("Server Error")
  }
})

// Route for horizontal time table
router.get("/:route_id/:direction_id", async (request, response) => {
  try {
    
    const route = request.params.route_id
    
    // Imports timetable data from times_vert json folder
    const horTime = require('../../json/times_hori/' + route + '.json')
    const map = require('../../json/route_details/' + route + '.json')

    if (!horTime && !direct && !routeId && !map) {
      return response.status(400).json({ msg: "No times to show" })
    }

    // Pushes the timetable data, map data, directionId, routeId, and mapBox token into onTop.pug
    response.render("onTop", {
      horTime: horTime,
      map: map,
      direct: request.params.direction_id,
      routeId: request.params.route_id,
      mapBox: config.development.mapbox_token
    })
  } catch (err) {
    console.error(err.message)
    response.status(500).send("Server Error")
  }
})

// Currently not in use
router.get("/map/:route_id/:direction_id", async (request, response) => {
  try {
    const route = request.params.route_id
    const map = require('../../json/route_details/' + route + '.json')

    if (!map) {
      return response.status(400).json({ msg: "No times to show" })
    }
    response.render("map", {
      map: map,
      direct: request.params.direction_id,
      mapBox: config.development.mapbox_token
    })
  } catch (err) {
    console.error(err.message)
    response.status(500).send("Server Error")
  }
})

// Currently not in use
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