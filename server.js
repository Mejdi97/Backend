require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')


const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())




const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "REST API",
        description: "Backend ",
        
        servers: ["http://localhost:3001"]
      }
    },
    apis: ['./routes/*.js']
  };





//routes
const customersRouter = require('./routes/customers')
app.use('/customers', customersRouter)

const assetsRoutes = require('./routes/assets')
app.use('/assets', assetsRoutes)

const orderRoutes = require('./routes/order')
app.use('/order', orderRoutes)

const favoriteRoutes = require('./routes/favorites')
app.use('/favorite', favoriteRoutes)

const likeRoutes = require('./routes/likes')
app.use('/like', likeRoutes)

const bidsRoutes = require('./routes/bids')
app.use('/bids', bidsRoutes)

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(3001, () => console.log('Server Started'))