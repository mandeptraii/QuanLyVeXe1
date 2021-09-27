import React, {Component} from 'react';
import { MenuItems } from './MenuItems';
import { Button } from '../Button';
import './NavBar.css';
import { BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import Home from '../Home';
import Register from '../Register';

class Navbar extends Component {
    state = {clicked:false}

    handleClick=()=>{
        this.setState({ clicked: !this.state.clicked})
    }

    render(){
        return(
            <BrowserRouter>
                <nav className="NavbarItems">
                    <h1 className="navbar-logo">DM Bus <i className="fas fa-bus"></i></h1>
                    <div className="menu-icon" onClick={this.handleClick}>
                        <i className={this.state.clicked ? 'fas fa-times' :'fas fa-bars'}></i>

                    </div>               
                        <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                            {MenuItems.map((item, index)=>{
                                return (
                                    <li key={index}>
                                        <Link className={item.cName} to={item.url}> {item.title} </Link>
                                </li>
                                )
                            })}
                        </ul>                
                    <Button>Đăng nhập</Button>
                </nav>
                <Switch>
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/register" component={Register} />
                </Switch>
            </BrowserRouter>
        )
    }        
}
export default Navbar