const express = require("express")
const bodyParser = require("body-parser")
// const connectDB = require("./config/db")
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set("view engine", "pug")
app.locals.moment = require("moment")
// connectDB()

app.use(express.json({ extended: false }))

//Swiftly
app.use("/", require("./routes/api/swiftly"))
//Position
app.use("/position", require("./routes/api/realPosition"))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log("Server listening on port 3000"))