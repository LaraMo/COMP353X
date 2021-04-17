
const express = require('express')
const app = express()
var mysqlssh = require('mysql-ssh');
const port = 3001;
require('dotenv').config()

var bodyParser = require('body-parser')
let jsonParser = bodyParser.json()
app.use(jsonParser)

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
  let {postal_code, city_id, first_name, last_name, date_of_birth, medicare_number, telephone_number, address, province, email_address, is_infected, citizenship} = req.body;
  db.query("SELECT id FROM PostalCode WHERE postal_code = ?", [postal_code], (errr, ress, fiell) => {
    if(errr) {
      console.log(errr)
      res.send({success:false});
   } else {
      let postal_code_id = -1;
       res.send({success:true});
       if (ress.length==0){
        db.query("INSERT INTO PostalCode(postal_code, city_id) VALUES(?, ?);",[postal_code, city_id, ], function (error, results, fields) {
          if (error) {
            console.log(error)
            res.send({success:false});
          } 
          else {
            postal_code_id = results.insertId;
              }
        });
       } else {
         postal_code_id = results[0].id;
       }
       db.query("INSERT INTO Person(first_name, last_name, date_of_birth, medicare_number, telephone_number, address, province, email_address, is_infected, postal_code, citizenship) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, last_insert_id(), ?);", 
              [first_name, last_name, date_of_birth, medicare_number, telephone_number, address, province, email_address, is_infected, postal_code_id, citizenship], (err, resul, fiel)  => {
                 if(err) {
                    console.log(err)
                    res.send({success:false});
                 } else {
                     res.send({success:true});
                 }
              })
   }
  })
});

app.post('/editPerson', (req, res) => {
  let {first_name, last_name, date_of_birth, medicare_number, telephone_number, address, province, email_address, is_infected, postal_code, citizenship} = req.body;
  db.query("Update Person Set first_name = ?, last_name = ?, date_of_birth = ?, medicare_number = ?, telephone_number = ?, address = ?, province = ?, email_address = ?, is_infected = ?, postal_code = ? WHERE id = ?;",[first_name, last_name, date_of_birth, medicare_number, telephone_number, address, province, email_address, is_infected, results.insertId, citizenship], function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send({success:false});
    }
    else {
      res.send({success:true});}
  });
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
  let {name, phone_number, web_address, type, has_drivethrough, address} = req.body;
  db.query("INSERT INTO PublicHealthCenter(name, phone_number, web_address, type, has_drivethrough, address) VALUES(?, ?, ?, ?, ?, ?);", [name, phone_number, web_address, type, has_drivethrough, address], function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send({success:false});
    }
    else {
      res.send({success:true});}
  });
});

app.post('/editFacility', (req, res) => {
  let {name, phone_number, web_address, type, appointment_type, has_drivethrough, id} = req.body;
  db.query("UPDATE PublicHealthCenter SET name = ?, phone_number = ?, web_address = ?, type = ?, appointment_type = ?, has_drivethrough = ? WHERE id = ?;",[name, phone_number, web_address, type, appointment_type, has_drivethrough, id], function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send({success:false});
    }
    else {
      res.send({success:true});}
  });
});

app.post('/deleteFacility', (req, res) => {
  let {id} = req.body;
  db.query("DELETE FROM PublicHealthCenter WHERE id = ?;",[id], function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send({success:false});
    }
    else {
      res.send({success:true});}
  });
});

app.get('/selectFacility', (req, res) => {
  db.query("SELECT id, name, phone_number, web_address, type FROM PublicHealthCenter;", function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send({success:false});
    }
    else {
      res.send({success:true, data: [...results]});}
  });
});


/********************* Region /4 **********************/
app.post('/addRegion', (req, res) => {
  let {region_name, alert_id} = req.body;
  db.query("INSERT INTO Region(name, alert_id) VALUES (?, ?)",[region_name, alert_id], function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send({success:false});
    }
    else {
      res.send({success:true});}
  });
});

app.post('/editRegion', (req, res) => {
  let {region_name, alert_id, id} = req.body;
  db.query("UPDATE Region SET name = ?, alert_id = ? WHERE id = ?",[region_name, alert_id, id], function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send({success:false});
    }
    else {
      res.send({success:true});}
  });
});

app.post('/deleteRegion', (req, res) => {
  let {id} = req.body;
  db.query("DELETE FROM Region WHERE id = ?", [id], function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send({success:false});
    }
    else {
      res.send({success:true});}
  });
});

app.get('/selectRegion', (req, res) => {
  db.query("SELECT r.id, r.name, a.level, a.color FROM Region r JOIN Alert a on a.id = r.alert_id;", function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send({success:false});
    }
    else {
      res.send({success:true, data: [...results]});}
  });
});



/********************* GroupZone /5 **********************/
app.post('/addGz', (req, res) => {
  let {type} = req.body;
  db.query("INSERT INTO GroupZone(type) VALUES(?)", [type], function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send({success:false});
    }
    else {
      res.send({success:true});}
  });
});

app.post('/editGz', (req, res) => {
  let {type, id} = req.body;
  db.query("UPDATE GroupZone SET type = ? WHERE id = ?",[type, id], function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send({success:false});
    }
    else {
      res.send({success:true});}
  });
});

app.post('/deleteGz', (req, res) => {
  let {id} = req.body;
  db.query("DELETE FROM GroupZone WHERE id = ?", [id], function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send({success:false});
    }
    else {
      res.send({success:true});}
  });
});

app.get('/selectGz', (req, res) => {
  db.query("SELECT id, type FROM GroupZone;", function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send({success:false});
    }
    else {
      res.send({success:true, data: [...results]});}
  });
});

/********************* PHRecs /6 **********************/
app.post('/addPHRecs', (req, res) => {
   let {reccomendation_text, substeps} = req.body;
   db.query("INSERT INTO Reccomendation(reccomendation) VALUES(?);",[reccomendation_text], function (error, results, fields) {
    if (error) {
      console.log(error);
      res.send({success:false});
    }
    else {
      if (substeps && substeps.length > 0) {
        let substep_query = "INSERT INTO SubSteps(step, reccomendation_id) VALUES " + substeps.map(step => "(?,?) ");
        substep_query = substep_query.substring(0, substep_query.length - 1);
        let substep_params = [];
        substeps.forEach(step => {
          substep_params.push(step, results.insertId);
        });
        db.query(substep_query, substep_params, (err, resul) => {
          if (err) {
            console.log(err);
            res.send({ success: false });
          }
          else {
            res.send({ success: true });
          }
        })
      }
      else {
        res.send({success: true})
      }
  };
})});

app.post('/editPHRecs', (req, res) => {

});

app.post('/deletePHRecs', (req, res) => {

});

app.get('/selectPHRecs', (req, res) => {

});


/********************* AddAlert /7 **********************/
app.post('/addAlert', (req, res) => {

});


/********************* FollowUpForm /8 **********************/
app.post('/followUpForm', (req, res) => {

});









app.listen(port, () => console.log(`Example app listening on port ${port}!`))