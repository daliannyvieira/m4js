`use strict`;

const fs = require('fs');
const path = require('path');
const orm = require('sequelize');
const config = require('../config/database.js');

const Repository = {};
const sql = new orm(config);

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sql.import(path.join(__dirname, file));
    Repository[model.name] = model;
  });

Object.keys(Repository).forEach((modelName) => {
  if (Repository[modelName].associate) {
    Repository[modelName].associate(Repository);
  }
});

Repository.sql = sql;
Repository.orm = orm;

module.exports = Repository;