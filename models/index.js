"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require("../config/db.js");

let sequelizeOptions = {
  host: config.host,
  dialect: config.dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
      }
  }
};

if (process.env.DATABASE_URL) {
  sequelizeOptions = {
    ...sequelizeOptions,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  };
  
  var sequelize = new Sequelize(process.env.DATABASE_URL, sequelizeOptions);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, sequelizeOptions);
}

sequelize
  .authenticate()
  .then(function () {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

sequelize
  .sync( /*{ force: true }*/ ) // Force to re-initialize tables on each run
  .then(function () {
    console.log('It worked!');
  })
  .catch(function (err) {
    console.log('An error occurred while creating the table:', err);
  });

var db = {};

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function (file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
