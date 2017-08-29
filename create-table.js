'use strict';

// console log to make sure the module was created
console.log('create table module');

// initializes sqlite3 and executes verbose
const sqlite3 = require('sqlite3').verbose();

// exports the result of the anonymous function
module.exports = () => {

  // creates a new promise to be returned at some point
  return new Promise( (resolve, reject) => {

    // sets db to equal a new database within sqlite3 that also is the result of an anonymous function
    const db = new sqlite3.Database('company.sqlite', (err) => {

      // console log to see if createTable was connected correctly
      console.log('Connected, createTable');

      // runs the commands that creates the employee table within sqlite
      db.run(`DROP TABLE IF EXISTS employees`);

      // creates a new table in sqlite if none exists and adds the following properties:
      db.run("CREATE TABLE IF NOT EXISTS employees (id INT, first TEXT, last TEXT, job TEXT, address TEXT)");

      // console log to see if the table was made correctly through the excecutiong
      console.log('table made?');

      // resolves the promes
      resolve();
    });
  })

  // catches an error within the promise so now console error hits
  .catch( (err) => {

    // console logs the error if one is made
    console.log('error', err);
  });
};