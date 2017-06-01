import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  IndexRoute,
  Link
} from 'react-router'
import App from './App';
import HomePage from './HomePage';
import RobotPage from './RobotPage';
import CreatePage from './CreatePage';


export default(
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/robot/create" component={CreatePage}></Route>
    <Route path="/robot/:id" component={RobotPage}></Route>
    <Route path="/robot/edit/:id" component={RobotPage} editMode={true}></Route>
  </Route>
)