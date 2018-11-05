'use strict';

const express = require('express');
const config = require('./config/database.js');
const StatusService = require('./application/status-service');
const UserService = require('./application/user-service');
const bodyParser = require('body-parser');

const port = 3000

class Server {
  constructor () {
    this.app = express();
    this.router = express.Router();
  }

  setup () {
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'DELETE, GET, POST, PATCH');
      res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With,Content-Type,Accept, Authorization');
      next();
    });
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(bodyParser.json());
  }

  start () {
    new StatusService(this.router).expose();
    new UserService(this.router).expose();

    this.router.get('/', (req, res) => {
      res.status(200).json({
        status: 'horrayyyy'
      });
    });

    this.app.enable('trust proxy');
    this.app.use('/', this.router);

    this.app.listen(port, () => {
      console.log(`Readyy! http://localhost:${port}/`);
    });

  }
}

const api = new Server();

api.setup();
api.start();