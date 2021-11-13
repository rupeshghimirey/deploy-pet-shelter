const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")

const app = express();
const port = 8000;

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors()) //this allows the express application (backend) to share information and resources with the front end(react app client)

//these imports of mongoose.config and the routes should be below the "app.use() commands above"
require("./server/config/mongoose.config")
const AllMyRoutes = require("./server/routes/pet.routes")
// all routes are linked with express to create a new server on port 8000
AllMyRoutes(app)

app.listen(port, ()=>{console.log(`listening on port ${port} `)})

