const fs = require('fs');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan');
const cors = require('cors');
require('./config/MongoDB')();

const ReservationModel = require('./models/Reservation');
class Server {
  constructor() {
    this.app = express();
    this.initializeMiddleware();
    this.initializeRoutes();
  }

  initializeMiddleware() {
    this.app.use(express.json());
    this.app.use(
      morgan(
        ' :method :url HTTP/:http-version : :status : :response-time ms : :res[content-length] _ :remote-addr _ :remote-user _ [:date[clf]] _  ":referrer" _ ":user-agent"'
      )
    );
    this.app.use(cors());
  }

  initializeRoutes() {
    // this.app.use('/hotel', authentification, hotelRoutes);

    this.app.use((req, res) => {
      res.status(404).json({ status: 'error', message: 'Route Not found', api: 'content.boosterbc.com' });
    });
  }

  async start() {
    try {
      this.app.listen(process.env.PORT, () => {
        console.log(`Server is listening on port ${process.env.PORT}`);
      });
    } catch (error) {
      console.error('An error occurred during startup:', error);
    }
  }
}

const serverInstance = new Server();
serverInstance.start();
