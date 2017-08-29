'use strict';

// Require in the Database method from the sqlite3 module
// We will be using the verbose execution mode, which will help with debugging errors.
const { Database } = require('sqlite3').verbose();

// Returns a new database object and automatically opens the database
// Database method accepts a callback function for successful connection
const db = new Database('example.sqlite', () => console.log('Connected!'));




