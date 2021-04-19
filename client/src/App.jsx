import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Navbar from "./components/NavbarComponent";
import { home,crudPerson,crudHealthWorker, detailedFacility, peopleByAddress, showMessages, crudFacility, followUpForm, crudRegion, crudGroupZone, crudPHCR, addAlert, datePeopleSymptoms  } from './data/routes.js';
import PersonCrud from './pages/PersonCrud.jsx';
import FacilityCrud from './pages/FacilityCrud.jsx';
import RegionCrud from './pages/RegionCrud.jsx';
import GroupZoneCrud from './pages/GroupZoneCrud.jsx';
import FollowUpForm from './pages/FollowUpForm.jsx';
import PublicHealthCareRecsCrud from './pages/PublicHealthCareRecsCrud.jsx';
import PublicHealthWorkerCrud from './pages/PublicHealthWorkerCrud.jsx';
import AddAlert from './pages/AddAlert.jsx';
import ShowMessages from './pages/ShowMessages.jsx';
import PeopleByAddress from './pages/PeopleByAddress.jsx';
import DetailedFacility from './pages/DetailedFacility.jsx';
import './scss/app.scss';
import DatePeopleSymptoms from './pages/DatePeopleSymptoms.jsx';

export default function App(){
    return (
    <Router>
          <Navbar/>
          <Switch>
              <Route exact path={home} component={Home}/>
              <Route path={crudPerson} component={PersonCrud} />
              <Route path={crudHealthWorker} component={PublicHealthWorkerCrud} />
              <Route path={crudFacility} component={FacilityCrud} />
              <Route path={crudRegion} component={RegionCrud} />
              <Route path={crudGroupZone} component={GroupZoneCrud} />
              <Route path={crudPHCR} component={PublicHealthCareRecsCrud} />
              <Route path={addAlert} component={AddAlert} /> 
              <Route path={followUpForm} component={FollowUpForm} />  
              <Route path={showMessages} component={ShowMessages} />
              <Route path={peopleByAddress} component={PeopleByAddress} />  
              <Route path={detailedFacility} component={DetailedFacility} /> 
              <Route path={datePeopleSymptoms} component={DatePeopleSymptoms} /> 
               
          </Switch>
    </Router>
    );
}