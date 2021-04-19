
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
  db.query("SELECT id, name FROM Region;", function(error, results, fields){
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

/********************* /9 **********************/
app.get('/datePeopleSymptoms', (req, res) => {
    let {date, id} = req.query;
    db.query("SELECT  p.first_name, p.last_name, group_concat(s.symptom) as 'Common Symptom', group_concat(ds.other) as 'Other Symptoms' FROM DiagnosticSymptoms as ds INNER JOIN Diagnostic as d ON ds.Diagnostic_id = d.id INNER JOIN Person as p ON d.person_id = p.id INNER JOIN Symptom as s ON ds.Symptom_id = s.id WHERE p.id = ? AND d.date_taken = ? GROUP BY p.first_name;", [id, date], function(error, results, fields){
        if (error) {
            console.log(error)
            res.send({ success: false });
        }
        else {
            res.send({ success: true, data: [...results] });
        }
    });
})

app.get('/infectedPeople', (req, res) => {
  db.query("SELECT p.id, p.first_name, p.last_name FROM Person p JOIN Diagnostic diag on diag.person_id = p.id WHERE diag.is_infected = true;", function(error, results, fields){
    if (error) {
      console.log(error)
      res.send({ success: false });
    }
    else {
      res.send({ success: true, data: [...results] });
    }
  });
})

/********************* /10 **********************/

app.get('/showMessages', (req, res) => {
  let {start_date, end_date} = req.query;
  db.query("SELECT m.message, m.time FROM Messages m WHERE m.time BETWEEN ? AND ?;", [start_date, end_date], function(error, results, fields){
    if (error) {
      console.log(error)
      res.send({ success: false });
    }
    else {
      res.send({ success: true, data: [...results] });
    }
  });
})

/********************** /11 *******************/
app.get('/query11', (req, res) => {
  let {address} = req.query;
  db.query("SELECT DISTINCT p.id, p.first_name, p.last_name, p.date_of_birth, p.medicare_number, p.telephone_number, p.citizenship, p.email_address, CONCAT(parent1.first_name, ' ', parent1.last_name) as parent1, CONCAT(parent2.first_name, ' ', parent2.last_name) as parent2 FROM Person p LEFT JOIN Person parent1 on (parent1.id = p.parent1_id) LEFT JOIN Person parent2 on (parent2.id = p.parent2_id  AND parent2.id <> parent1.id) WHERE p.address = ?; ", [address], function(error, results, fields){
    if (error) {
      console.log(error)
      res.send({ success: false });
    }
    else {
      res.send({ success: true, data: [...results] });
    }
  });
})

/********************** /12 *******************/
app.get('/query12', (req, res) => {
  db.query("SELECT phc.id, phc.address, SUM(phcw.phw_id) as number_of_workers, phc.name, phc.phone_number, phc.web_address, phc.type, IF(phc.has_drivethrough = 1, \"true\", \"false\") as has_drivethrough FROM PublicHealthCenter phc JOIN PublicHealthCenterWorkers phcw on phcw.phc_id = phc.id GROUP BY phc.id, phc.name, phc.phone_number, phc.web_address, phc.type, phc.has_drivethrough;", function(error, results, fields){
    if (error) {
      console.log(error)
      res.send({ success: false });
    }
    else {
      res.send({ success: true, data: [...results] });
    }
  });
})

/********************** /13 *******************/
app.get('/query13', (req, res) => {
  db.query("SELECT  distinct r.id, r.name as 'Region Name', group_concat(Distinct c.name) as Cities, group_concat( distinct pc.postal_code) as 'Postal Codes' FROM Region as r JOIN City c ON r.id = c.region_id JOIN PostalCode pc ON c.id = pc.city_id GROUP BY r.id, r.name;", function(error, results, fields){
    if (error) {
      console.log(error)
      res.send({ success: false });
    }
    else {
      res.send({ success: true, data: [...results] });
    }
  });
})

/********************** /14 *******************/
app.get('/query14', (req, res) => {
  let {date} = req.query;
  db.query("SELECT Person.first_name, Person.last_name, Person.date_of_birth, Person.telephone_number, Person.email_address, Diagnostic.is_infected FROM Person INNER JOIN Diagnostic ON Person.id = Diagnostic.person_id WHERE Diagnostic.date_taken = ? ORDER BY Diagnostic.is_infected DESC;", [date], function(error, results, fields){
    if (error) {
      console.log(error)
      res.send({ success: false });
    }
    else {
      res.send({ success: true, data: [...results] });
    }
  });
})

/********************** /15 *******************/
app.get('/query15', (req, res) => {
  let {id} = req.query;
  db.query("SELECT PublicHealthCenter.name as facility, group_concat(concat(Person.first_name, ' ', Person.last_name)) as workers FROM Person INNER JOIN PublicHealthWorker ON Person.id = PublicHealthWorker.person_id INNER JOIN PublicHealthCenterWorkers ON PublicHealthWorker.id = PublicHealthCenterWorkers.phw_id INNER JOIN PublicHealthCenter on PublicHealthCenter.id = PublicHealthCenterWorkers.phc_id WHERE PublicHealthCenter.id = ? GROUP BY PublicHealthCenter.id, PublicHealthCenter.name;", [id], function(error, results, fields){
    if (error) {
      console.log(error)
      res.send({ success: false });
    }
    else {
      res.send({ success: true, data: [...results] });
    }
  });
})

/********************** /16 *******************/
app.get('/query16', (req, res) => {
  let {date} = req.query;
  db.query("SELECT phcw.phc_id, infected.id as infected_id, infected.first_name, infected.last_name, (SELECT group_concat(CONCAT(souls.first_name, ' ', souls.last_name)) FROM Person souls JOIN PublicHealthWorker sphw on sphw.person_id = souls.id JOIN PublicHealthCenterWorkers sphcw on sphcw.phw_id = sphw.id  WHERE sphcw.phc_id = phcw.phc_id AND sphcw.schedule = phcw.schedule AND (diag.date_resolved - sphcw.start_date) >= 14) from Person infected  JOIN PublicHealthWorker worker on worker.person_id = infected.id JOIN Diagnostic diag on diag.person_id = infected.id JOIN PublicHealthCenter phc on diag.phc_id = phc.id JOIN PublicHealthCenterWorkers phcw on phcw.phw_id = worker.id WHERE diag.is_infected = true AND diag.date_taken = ?;", [date], function(error, results, fields){
    if (error) {
      console.log(error)
      res.send({ success: false });
    }
    else {
      res.send({ success: true, data: [...results] });
    }
  });
})

/********************** /17 *******************/
app.get('/query17', (req, res) => {
  db.query("SELECT r.id as regID, r.name as regName, count(infected.id) as infected, count(healthy.id) as healthy, group_concat(distinct m.message) AS allmessages From Region r LEFT JOIN City city ON r.id = city.region_id LEFT JOIN PostalCode pc ON city.id = pc.city_id LEFT JOIN Person infected on (pc.id = infected.postal_code AND infected.is_infected = true) LEFT JOIN Person healthy on (pc.id = healthy.postal_code AND healthy.is_infected = false) LEFT JOIN Messages m ON r.id = m.region_id GROUP by r.id, r.name", function(error, results, fields){
    if (error) {
      console.log(error)
      res.send({ success: false });
    }
    else {
      res.send({ success: true, data: [...results] });
    }
  });
})

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
  let {region_id} = req.query
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