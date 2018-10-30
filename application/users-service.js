'use strict';
const JsonResponse = require('./responses');
const { User } = require('../domain');

module.exports = class Users {
  constructor(router) {
    this.router = router;
  }

  expose() {
    this.createUser();
    this.findAll();
  }

  createUser() {
    this.router.post('/users', async (req, res) => {
      const user = await User.create(req.body);
      res.json(JsonResponse.formatUserData(user, 'post'));
    });
  }

  findAll() {
    this.router.get('/users', async (req, res) => {
      const users = await User.findAll();
      const lista = []
      users.map((user) => {
        lista.push(JsonResponse.formatUserData(user, 'get'))
      })
      res.json(lista);
    });
  }

};