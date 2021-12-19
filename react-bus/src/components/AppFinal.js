// import logo from './logo.svg';
import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import Home from './Home';
// import BenXe from './Benxe';
// import Xe from './Xe';
import Header from './Header';
import { Container } from 'react-bootstrap';
// import Body from './Body';
import Register from './Register';
import Login from './Login';
import API, { endpoints } from './API';
import cookies from 'react-cookies'
import { useDispatch } from 'react-redux';
import TableChuyen from './TableChuyen';
import Customer from './UserPages/Customer';
import TableChuyen1 from './TableChuyen1';
import TableChuyen2 from './TableChuyen2';
import TableChuyen3 from './TableChuyen3';
import TableChuyen4 from './TableChuyen4';
import TableChuyen5 from './TableChuyen5';
import TableChuyen6 from './TableChuyen6';
import BarChart from './Chart';
import Footer from './Footer';
import TaiXe from './TaiXe';

// export let UserContext = React.createContext()

export default function AppFinal(){
  return (
    <BrowserRouter>
      <Container>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/benxe" component={BenXe} /> */}
          {/* <Route exact path="/xe/:xeId/xes" component={Xe} /> */}
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/datve" component={TableChuyen} />
          <Route exact path="/datve1" component={TableChuyen1} />
          <Route exact path="/datve2" component={TableChuyen2} />
          <Route exact path="/datve3" component={TableChuyen3} />
          <Route exact path="/datve4" component={TableChuyen4} />
          <Route exact path="/datve5" component={TableChuyen5} />
          <Route exact path="/datve6" component={TableChuyen6} />
          <Route exact path="/doanhthu" component={BarChart} />
          <Route exact path="/user" component={Customer} />
          <Route exact path="/taixe" component={TaiXe} />
        </Switch>
        <Footer/>
      </Container>
    </BrowserRouter>
    )
}

// export default AppFinal;
