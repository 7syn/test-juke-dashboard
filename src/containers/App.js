import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EmployeeListPage from './pages/Employee/EmployeeListPage';
import EmployeeFormPage from './pages/Employee/EmployeeForm/EmployeeFormPage';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
        	<Route exact path="/" component={EmployeeListPage}/>
        	<Route exact path="/employees" component={EmployeeListPage}/>
          <Route path="/employees/create" component={EmployeeFormPage}/>
          <Route path="/employees/:id/edit" component={EmployeeFormPage}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
