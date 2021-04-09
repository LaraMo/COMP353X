import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import { home } from '../data/routes.js';
import PersonCrud from './pages/PersonCrud.jsx';
export default function App(){
    return (
    <Router>
          <Switch>
              <Route exact path={home} component={Home}/>
              <Route path='/1' component={PersonCrud} />
              {/* <Route path='/2' component={About} />
              <Route path='/3' component={About} />
              <Route path='/4' component={About} />
              <Route path='/5' component={About} />
              <Route path='/6' component={About} /> */}
          </Switch>
    </Router>
    );
}