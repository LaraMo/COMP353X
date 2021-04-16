
const express = require('express')
const app = express()
var mysqlssh = require('mysql-ssh');
const port = 3001;
require('dotenv').config()


let db;
mysqlssh.connect(
  {
      host: process.env.SSH_HOST,
      user: process.env.SSH_USER,
      password: process.env.SSH_PASS,
  },
  {
      host: 'xdc353.encs.concordia.ca',
      user: 'xdc353_4',
      password: 'COMP353X',
      database: 'xdc353_4'
  }
)
.then(client => {
  db = client;
})
.catch(err => {
  console.log(err)
})


// db.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

/********************* PERSON /1 **********************/
app.post('/addPerson', (req, res) => {
   
});

app.post('/editPerson', (req, res) => {

});

app.post('/deletePerson', (req, res) => {

});

app.get('/selectPerson', (req, res) => {

});

/********************* PUBLIC HEALTH CARE WORKER /2 **********************/
app.post('/addPhcw', (req, res) => {
   
});

app.post('/editPhcw', (req, res) => {

});

app.post('/deletePhcw', (req, res) => {

});

app.get('/selectPhcw', (req, res) => {

});


/********************* Facility /3 **********************/
app.post('/addFacility', (req, res) => {
   
});

app.post('/editFacility', (req, res) => {

});

app.post('/deleteFacility', (req, res) => {

});

app.get('/selectFacility', (req, res) => {

});


/********************* Region /4 **********************/
app.post('/addRegion', (req, res) => {
   
});

app.post('/editRegion', (req, res) => {

});

app.post('/deleteRegion', (req, res) => {

});

app.get('/selectRegion', (req, res) => {

});



/********************* GroupZone /5 **********************/
app.post('/addGz', (req, res) => {
   
});

app.post('/editGz', (req, res) => {

});

app.post('/deleteGz', (req, res) => {

});

app.get('/selectGz', (req, res) => {

});



/********************* PHCRecs /5 **********************/
app.post('/addPHCRecs', (req, res) => {
   
});

app.post('/editPHCRecs', (req, res) => {

});

app.post('/deletePHCRecs', (req, res) => {

});

app.get('/selectPHCRecs', (req, res) => {

});


/********************* AddAlert /7 **********************/
app.post('/addAlert', (req, res) => {

});


/********************* FollowUpForm /8 **********************/
app.post('/followUpForm', (req, res) => {

});









app.listen(port, () => console.log(`Example app listening on port ${port}!`))