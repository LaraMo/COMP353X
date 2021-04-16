import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Navbar from "./components/NavbarComponent";
import { home,crudPerson,crudHealthWorker, crudFacility, crudRegion, crudGroupZone, crudPHCR  } from './data/routes.js';
import PersonCrud from './pages/PersonCrud.jsx';
import FacilityCrud from './pages/FacilityCrud.jsx';
import RegionCrud from './pages/RegionCrud.jsx';
import GroupZoneCrud from './pages/GroupZoneCrud.jsx';

import './scss/app.scss';
import PublicHealthCareRecsCrud from './pages/PublicHealthCareRecsCrud.jsx';

export default function App(){
    return (
    <Router>
          <Navbar/>
          <Switch>
              <Route exact path={home} component={Home}/>
              <Route path={crudPerson} component={PersonCrud} />
              <Route path={crudHealthWorker} component={() => <PersonCrud phw/>} />
              <Route path={crudFacility} component={FacilityCrud} />
              <Route path={crudRegion} component={RegionCrud} />
              <Route path={crudGroupZone} component={GroupZoneCrud} />
              <Route path={crudPHCR} component={PublicHealthCareRecsCrud} />

              
          </Switch>
    </Router>
    );
}