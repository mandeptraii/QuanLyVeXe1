// import logo from './logo.svg';
import React from 'react';
import { BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import Home from './Home';
// import BenXe from './Benxe';
// import Xe from './Xe';
import Header from './Header';
import { Container } from 'react-bootstrap';
// import Body from './Body';
import Register from './Register';
import Login from './Login';

class AppFinal extends React.Component {
  render(){
    return (
      <BrowserRouter>
        <Container>
          <Header />
          <Switch>
            {/* <Route exact path="/" component={Body} /> */}
            {/* <Route exact path="/benxe" component={BenXe} /> */}
            {/* <Route exact path="/xe/:xeId/xes" component={Xe} /> */}
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Container>
      </BrowserRouter>
    )
  }
}

export default AppFinal;
