'use strict';

// sets constant variable sqlite 3 to equal js to require and incorporate sqlite 3
const sqlite3 = require('sqlite3').verbose();

// sets constant variable db ("Database") to equal the stored db within sqlite
const db = new sqlite3.Database('company.sqlite', (err) => {

  // console log to see if connection worked
  console.log('Connected, main');

  // fetches create-table file within the app and links it to the new db
  require('./create-table')()

  // executes populateExmployees to fill stored employee data into SQLite
  .then( () => populateEmployees())

  // after populating, gets the employee data as objects so they can be manipulated
  .then( () => getEmployeesAndDoStuff() )
});

// db.run('INSERT INTO employees VALUES (1, "Fred", "Jones", 23000, "Janitorial")');
// db.run('INSERT INTO employees VALUES (2, "Linda", "Mack", 83000, "CTO")');
const populateEmployees = () => {
  const { list } = require('./employees.json');
  return new Promise ( (resolve, reject) => {
    list.forEach( (employee) => {
      db.run(`INSERT INTO employees VALUES(
        ${employee.id},
        "${employee.firstName}",
        "${employee.lastName}",
        ${employee.salary},
        "${employee.dept}")`
      )
      console.log("Populate employees table");
    });
    console.log('populate resolve called');
    resolve();
  });
};

const getEmployeesAndDoStuff = () => {
  console.log('getEmployees called');
  
  // Gets one result, even if we ask for all ( * )
  // db.get('SELECT * FROM employees', (err, {id, first, last, department, salary}) => {
  //   console.log('from db.get');
  //   console.log(`${id} ${first} ${last} ${department} ${salary}`); // only logs first employee
  // });

  // gives us back an array of results
  // db.all('SELECT * FROM employees', (err, allRows) => {
  //   // console.log('all rows', allRows);
  //   if (err) {
  //     return console.log('err', err.toString());
  //   }

  //   // sort alphabetically by first name
  //   // make array of emps who make > 50k
  //   // make array of person's first and last names and salary
  //   allRows.sort( (a,b) => a.first.localeCompare(b.first) )
  //   .filter( (emp) => emp.salary > 50000)
  //   .map( (emp) => `${emp.first} ${emp.last}'s salary: ${emp.salary}`)
  //   .forEach( (emp) => console.log(emp));
  // });

  // Does what the above stuff does, but we're filtering in our query instead 
  // setTimeout( () => { //added this when we got "no table" error. But doesn't always happen.
  // Looking into why. Think it may have to do with how quickly it builds the db.
  // db.all(`SELECT first, last, salary 
  //         FROM employees
  //         WHERE salary > 50000 
  //         ORDER BY first`, 
  //         (err, allRows) => {
  //   console.log('all rows', allRows);
  // });
  // }, 500);

  // .each() is a nice compromise between the above 2 options
  // db.each('SELECT * FROM employees', (err, { id, first, last, department, salary}) => {
  //   if (err) {
  //     return console.log(err.toString());
  //   }
  //   console.log(`${id} ${first} ${last}`);
  // });
};