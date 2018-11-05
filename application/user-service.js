'use strict';
const JsonResponse = require('./responses/responses');
const ErrorResponse = require('./responses/errors');
const { User } = require('../domain');

module.exports = class Users {
  constructor(router) {
    this.router = router;
  }

  expose() {
    this.createUser();
    this.findUsers();
    this.findUser();
    this.updateUser();
    this.deleteUser();
  }

  createUser() {
    this.router.post('/users', async (req, res) => {
      await User.create(req.body)
        .then(user => {
          res.json(JsonResponse.formatUserData(user));
        })
        .catch(err => {
          const error = ErrorResponse.formatError(err)
          res.status(error.status).json(error);
        });
    });
  }

  findUsers() {
    this.router.get('/users', async (req, res) => {
      await User.findAll()
        .then(users => {
          const lista = []
          users.map((user) => {
            lista.push(JsonResponse.formatUserData(user))
          })    
          res.json(lista);
        })
        .catch(err => {
          const error = ErrorResponse.formatError(err)
          res.status(error.status).json(error);
        });
    });
  }

  findUser() {
    this.router.get('/users/:id', async (req, res) => {
      const id = req.params.id;
      await User.find({ where: { id: id } })
        .then(user => {
          if (user === null) {
            res.status(404).json({ message: 'Didn’t find anything here!' });
          }
          res.json(JsonResponse.formatUserData(user));
        })
        .catch(err => {
          const error = ErrorResponse.formatError(err)
          res.status(error.status).json(error);
        });
    });
  }

  updateUser() {
    this.router.put('/users/:id', async (req, res) => {
      const id = req.params.id;
      const updates = req.body;
      
      const user = await User.find({ where: { id: id } })

      if (user) {
        User.update(updates, { where: { id: id } })
        res.json({type: 'User', message: 'User ' + id + ' was updated with success!' });
      }

      else {
        res.status(404).json({ message: 'Didn’t find anything here!' });
      }
    });
  }

  deleteUser() {
    this.router.delete('/users/:id', async (req, res) => {
      const id = req.params.id;

      let deleted = await User.destroy({ where: { id: id } })

      if (deleted) {
        res.json({type: 'User', message: 'User ' + id + ' was deleted with success!' });
      }
      else {
        res.status(404).json({ message: 'Didn’t find anything here!' });
      }

    });
  }

};