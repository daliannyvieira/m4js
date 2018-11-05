'use strict';

module.exports = class Users {
  constructor(router) {
    this.router = router;
  }

  expose() {
    this.checkStatus();
  }

  checkStatus() {
    this.router.get('/status', (req, res) => {
      res.status(200).json({
        'code': 200,
        'message': 'healthy ok'
      });
    });
  }

};