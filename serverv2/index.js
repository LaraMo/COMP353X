
const express = require('express')
const app = express()
var mysqlssh = require('mysql-ssh');
const port = 3001;
require('dotenv').config()

var bodyParser = require('body-parser')
let jsonParser = bodyParser.json()
app.use(jsonParser)

app.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);

	next();
})



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
  let { postal_code, city_id, first_name, last_name, date_of_birth, medicare_number, telephone_number, address, province, email_address, is_infected, citizenship } = req.body;
  db.query("INSERT INTO PostalCode(postal_code, city_id) VALUES(?, ?);", [postal_code, city_id,], function (error, results) {
    if (error) {
      console.log(error)
      res.send({ success: false });
    }
    else {
      db.query("INSERT INTO Person(first_name, last_name, date_of_birth, medicare_number, telephone_number, address, province, email_address, is_infected, postal_code, citizenship) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [first_name, last_name, date_of_birth, medicare_number, telephone_number, address, province, email_address, is_infected, results.insertId, citizenship], (err, resul) => {
          if (err) {
            console.log(err)
            res.send({ success: false });
          } else {
            res.send({ success: true });
          }
        })
    }
  });
});

app.post('/editPerson', (req, res) => {
  let { id, first_name, last_name, date_of_birth, medicare_number, telephone_number, address, province, email_address, is_infected, postal_code, city_id, postal_code_id, citizenship } = req.body;
  db.query("UPDATE Person Set first_name = ?, last_name = ?, date_of_birth = ?, medicare_number = ?, telephone_number = ?, address = ?, province = ?, email_address = ?, is_infected = ?, postal_code = ?, citizenship = ? WHERE id = ?;",
    [first_name, last_name, date_of_birth, medicare_number, telephone_number, address, province, email_address, is_infected, postal_code_id, citizenship, id], function (error, results, fields) {
      if (error) {
        console.log(error)
        res.send({ success: false });
      }
      else {
        db.query("UPDATE PostalCode SET postal_code =  ?, city_id = ? WHERE id = ?", [postal_code, city_id, postal_code_id], (err) => {
          if (err) {
            res.send({ success: false });
          } else {
            res.send({ success: true });
          }
        })
      }
    });
});

app.post('/deletePerson', (req, res) => {
  let { person_id, postal_code_id } = req.body;
  db.query("DELETE FROM Person WHERE id = ?;", [person_id], function (error, results) {
    if (error) {
      console.log(error)
      res.send({ success: false });
    }
    else {
      db.query("DELETE FROM PostalCode WHERE id = ?;", [postal_code_id], (err, resul) => {
        if (err) {
          console.log(err)
          res.send({ success: false });
        } else {
          res.send({ success: true });
        }
      })
    }
  });
});

app.get('/selectPerson', (req, res) => {
  db.query("SELECT p.id, p.first_name, p.last_name, p.date_of_birth, p.medicare_number, p.telephone_number, p.address, p.province, p.email_address, p.is_infected, pc.postal_code, p.citizenship, city.name, city.id as city_id, pc.id as postal_code_id FROM Person p JOIN PostalCode pc on pc.id = p.postal_code JOIN City city on city.id = pc.city_id JOIN Region r ON r.id=city.region_id ORDER BY p.id ASC;", function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send({ success: false });
    }
    else {
      res.send({ success: true, data: [...results] });
    }
  });
});

/********************* PUBLIC HEALTH CARE WORKER /2 **********************/
app.post('/addPhcw', (req, res) => {
  let { postal_code, city_id, first_name, last_name, date_of_birth, medicare_number, telephone_number, address, province, email_address, is_infected, citizenship, phc_id, schedule } = req.body;
  db.query("INSERT INTO PostalCode(postal_code, city_id) VALUES(?, ?);", [postal_code, city_id,], function (error, results) {
    if (error) {
      console.log(error)
      res.send({ success: false });
    }
    else {
      db.query("INSERT INTO Person(first_name, last_name, date_of_birth, medicare_number, telephone_number, address, province, email_address, is_infected, postal_code, citizenship) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [first_name, last_name, date_of_birth, medicare_number, telephone_number, address, province, email_address, is_infected, results.insertId, citizenship], (person_err, person_resul) => {
          if (person_err) {
            console.log(person_err)
            res.send({ success: false });
          } else {
            db.query("INSERT INTO PublicHealthWorker(person_id) VALUES(?);", [person_resul.insertId], (phw_err, phw_result) => {
              if (phw_err) {
                console.log(phw_err)
                res.send({ success: false });
              } else {
                db.query("INSERT INTO PublicHealthCenterWorkers(phw_id, phc_id, schedule, start_date) VALUES (?, ?, ?, ?);", [phw_result.insertId, phc_id, schedule, new Date()], (phcw_err, phcw_resul) => {
                  if (phcw_err) {
                    console.log(phcw_err)
                    res.send({ success: false });
                  } else {
                    res.send({ success: true });
                  }
                })
              }
            })
          }
        })
    }
  });
});

app.post('/editPhcw', (req, res) => {
  let { phw_id, phc_id, new_phc_id, start_date, end_date, schedule } = req.body;
  console.log( schedule, end_date, start_date, phw_id);
  if(new_phc_id) {
    db.query("UPDATE PublicHealthCenterWorkers SET end_date = ? WHERE phw_id = ?;", [end_date, phw_id], function (phcw_error) {
        if (phcw_error) {
          console.log(phcw_error)
          res.send({ success: false });
        }
        else {
          db.query("INSERT INTO PublicHealthCenterWorkers(phw_id, phc_id, schedule, start_date) VALUES (?, ?, ?, ?);", [phw_id, new_phc_id, schedule, new Date()], (phcw_err, phcw_resul) => {
            if (phcw_err) {
              console.log(phcw_err)
              res.send({ success: false });
            } else {
              res.send({ success: true });
            }
          })
        }
      });
  } else {
    db.query("UPDATE PublicHealthCenterWorkers Set schedule = ?, end_date = ?, start_date = ? WHERE phw_id = ?;", [schedule, end_date, start_date, phw_id], function (error) {
      if (error) {
        console.log(error)
        res.send({ success: false });
      } else {
        res.send({ success: true });
      }
    })
  }
});

app.post('/deletePhcw', (req, res) => {
  let {id} = req.body;
  db.query("DELETE FROM PublicHealthWorker WHERE id = ?;", [id], function (error, results) {
    if (error) {
      console.log(error)
      res.send({ success: false });
    }
    else {
        res.send({ success: true });
      }
    })
  });

app.get('/selectPhcw', (req, res) => {
  db.query("SELECT phw.id as worker_id, phc.name as facility, phcw.start_date, phcw.end_date, phcw.phc_id, phcw.schedule, p.id, p.first_name, p.last_name, p.date_of_birth, p.medicare_number, p.telephone_number, p.address, p.province, p.email_address, p.is_infected, pc.postal_code, p.citizenship, city.name, city.id as city_id, pc.id as postal_code_id FROM Person p JOIN PostalCode pc on pc.id = p.postal_code JOIN City city on city.id = pc.city_id JOIN Region r ON r.id=city.region_id JOIN PublicHealthWorker phw ON phw.person_id = p.id JOIN PublicHealthCenterWorkers phcw on phcw.phw_id = phw.id JOIN PublicHealthCenter phc on phc.id = phcw.phc_id ORDER BY p.id ASC;", function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send({ success: false });
    }
    else {
      res.send({ success: true, data: [...results] });
    }
  });
});


/********************* Facility /3 **********************/
app.post('/addFacility', (req, res) => {
  let { name, phone_number, web_address, type, has_drivethrough, address, appointment_type} = req.body;
  db.query("INSERT INTO PublicHealthCenter(name, phone_number, web_address, type, has_drivethrough, address, appointment_type) VALUES(?, ?, ?, ?, ?, ?, ?);", [name, phone_number, web_address, type, has_drivethrough, address, appointment_type], function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send({ success: false });
    }
    else {
      res.send({ success: true });
    }
  });
});

app.post('/editFacility', (req, res) => {
  let { name, phone_number, web_address, type, has_drivethrough, appointment_type, address, id } = req.body;
  db.query("UPDATE PublicHealthCenter SET name = ?, phone_number = ?, web_address = ?, type = ?, appointment_type = ?, has_drivethrough = ?, appointment_type = ?, address = ? WHERE id = ?;", [name, phone_number, web_address, type, appointment_type, has_drivethrough, appointment_type, address, id], function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send({ success: false });
    }
    else {
      res.send({ success: true });
    }
  });
});

app.post('/deleteFacility', (req, res) => {
  let { id } = req.body;
  db.query("DELETE FROM PublicHealthCenter WHERE id = ?;", [id], function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send({ success: false });
    }
    else {
      res.send({ success: true });
    }
  });
});

app.get('/selectFacility', (req, res) => {
  db.query("SELECT id, name, phone_number, web_address, type, has_drivethrough, appointment_type, address FROM PublicHealthCenter;", function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send({ success: false });
    }
    else {
      res.send({ success: true, data: [...results] });
    }
  });
});


/********************* Region /4 **********************/
app.post('/addRegion', (req, res) => {
  let { region_name, alert_id } = req.body;
  db.query("INSERT INTO Region(name, alert_id) VALUES (?, ?)", [region_name, alert_id], function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send({ success: false });
    }
    else {
      res.send({ success: true });
    }
  });
});

app.post('/editRegion', (req, res) => {
  let { region_name, alert_id, id } = req.body;
  db.query("UPDATE Region SET name = ?, alert_id = ? WHERE id = ?", [region_name, alert_id, id], function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send({ success: false });
    }
    else {
      res.send({ success: true });
    }
  });
});

app.post('/deleteRegion', (req, res) => {
  let { id } = req.body;
  db.query("DELETE FROM Region WHERE id = ?", [id], function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send({ success: false });
    }
    else {
      res.send({ success: true });
    }
  });
});

app.get('/selectRegion', (req, res) => {
  db.query("SELECT r.id, r.name, a.level, a.color FROM Region r JOIN Alert a on a.id = r.alert_id;", function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send({ success: false });
    }
    else {
      res.send({ success: true, data: [...results] });
    }
  });
});

app.get('/selectRegionName', (req, res) => {
  let { id } = req.body;
  db.query("SELECT id, name FROM Region WHERE id = ?;", [id], function(error, results, fields){
    if(error){
      console.log(error)
      res.send({success: false});
    }
    else{
      res.send({success: true, data: [...results]})
    }
  })
})

/********************* GroupZone /5 **********************/
app.post('/addGz', (req, res) => {
  let { type } = req.body;
  db.query("INSERT INTO GroupZone(type) VALUES(?)", [type], function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send({ success: false });
    }
    else {
      res.send({ success: true });
    }
  });
});

app.post('/editGz', (req, res) => {
  let { type, id } = req.body;
  db.query("UPDATE GroupZone SET type = ? WHERE id = ?", [type, id], function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send({ success: false });
    }
    else {
      res.send({ success: true });
    }
  });
});

app.post('/deleteGz', (req, res) => {
  let { id } = req.body;
  db.query("DELETE FROM GroupZone WHERE id = ?", [id], function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send({ success: false });
    }
    else {
      res.send({ success: true });
    }
  });
});

app.get('/selectGz', (req, res) => {
  db.query("SELECT id, type FROM GroupZone;", function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send({ success: false });
    }
    else {
      res.send({ success: true, data: [...results] });
    }
  });
});

/********************* PHRecs /6 **********************/
app.post('/addPHRecs', (req, res) => {
  let { reccomendation_text, substeps } = req.body;
  db.query("INSERT INTO Reccomendation(reccomendation) VALUES(?);", [reccomendation_text], function (error, results, fields) {
    if (error) {
      console.log(error);
      res.send({ success: false });
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
        res.send({ success: true })
      }
    };
  })
});

app.post('/editPHRecs', (req, res) => {
  let { id, reccomendation_text, substeps } = req.body;
  db.query("UPDATE Reccomendation SET reccomendation = ? WHERE id = ?", [reccomendation_text, id], function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send({ success: false });
    }
    else {
      db.query("DELETE FROM SubSteps WHERE reccomendation_id = ?", [id], function (error, results, fields) {
        if (error) {
          console.log(error)
          res.send({ success: false });
        }
        else {
          if (substeps && substeps.length > 0) {
            let substep_query = "INSERT INTO SubSteps(step, reccomendation_id) VALUES " + substeps.map(step => "(?,?) ");
            substep_query = substep_query.substring(0, substep_query.length - 1);
            let substep_params = [];
            substeps.forEach(step => {
              substep_params.push(step, id);
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
            res.send({ success: true })
          }
        }
      });
    }
  });
  
});

app.post('/deletePHRecs', (req, res) => {
  let { id } = req.body;
  db.query("DELETE FROM Reccomendation WHERE id = ?", [id], function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send({ success: false });
    }
    else {
      res.send({ success: true });
    }
  });
});

app.get('/selectPHRecs', (req, res) => {
  db.query("SELECT r.id, r.reccomendation, group_concat(ss.step SEPARATOR \"|\") as steps FROM Reccomendation r LEFT JOIN SubSteps ss on ss.reccomendation_id = r.id GROUP BY r.id, r.reccomendation;", function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send({ success: false });
    }
    else {
      res.send({ success: true, data: results.map(result =>  { return {id: result.id, reccomendation: result.reccomendation, steps: result.steps? result.steps.split('|'): undefined}} ) });
    }
  });
});


/********************* AddAlert /7 **********************/
app.post('/addAlert', (req, res) => {
  let { message, region } = req.body;
  db.query("INSERT INTO Messages(date, time, message, region_id) VALUES(now(),now(),?,?)", [message, region.value], function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send({ success: false });
    }
    else {
      res.send({ success: true });
    }
  });
});


/********************* FollowUpForm /8 **********************/
app.post('/followUpForm', (req, res) => {
    let {symptoms, temperature, id, other} = req.body;
    db.query("SELECT id, person_id from Diagnostic diag WHERE date_taken = (SELECT max(date_taken) FROM Diagnostic WHERE id = diag.id) AND person_id = ?", [id], function (error, results, fields) {
      if (error) {
        console.log(error)
        res.send({ success: false });
      }
      else {
        if (symptoms && symptoms.length > 0) {
          let symptom_query = "INSERT INTO DiagnosticSymptoms (Diagnostic_id, Symptom_id, date, temperature, other) VALUES " + symptoms.map(step => "(?, ?, now(), ?, ?) ");
          symptom_query = symptom_query.substring(0, symptom_query.length - 1);
          symptom_query += (other? ", (?, ?, now(), ?, ?) " : "");
          console.log(symptom_query)
          let symptom_params = [];
          symptoms.forEach(symptom => {
              symptom_params.push(results[0].id, symptom, temperature, null);
          });
          if(other) {
              symptom_params.push(results[0].id, 12, temperature, other);
          }
          db.query(symptom_query, symptom_params, (err, resul) => {
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
          res.send({ success: true })
        }
      }
    })
   
      
});



/********************* Helper method: Check if loggedin ****************************/
app.post('/isLoggedIn', (req, res) => {
  let {medicare_number, date_of_birth} = req.body;
  db.query("SELECT p.id, p.medicare_number, p.date_of_birth FROM Person p JOIN Diagnostic diag on diag.person_id = p.id WHERE p.medicare_number = ? AND diag.is_infected = true;", [medicare_number],function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send({ success: false });
    }
    else {
        if(results.length > 0 && new Date(results[0].date_of_birth).toISOString().slice(0, 10) == new Date(date_of_birth).toISOString().slice(0, 10)) {
            res.send({ success: true, id: results[0].id});
        } else {
            res.send({ success: false });
        }
    }
  });
});

/********************* Helper method: Check if loggedin ****************************/
app.get('/selectSymptomes', (req, res) =>{
  db.query("SELECT id, symptom FROM Symptom", [], function(error, results, fields){
    if(error){
      console.log(error)
      res.send({success: false});
    }
    else{
      res.send({success: true, data: [...results]})
    }
  })
})


/********************* Helper method: Select all Cities ****************************/
app.get('/selectCity', (req, res) =>{
  db.query("SELECT * FROM City", [], function(error, results, fields){
    if(error){
      console.log(error)
      res.send({success: false});
    }
    else{
      res.send({success: true, data: [...results]})
    }
  })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))