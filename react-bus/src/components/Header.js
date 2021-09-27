import React from 'react';
import API, { endpoints } from './API';
// import './Style.css'
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import cookies from 'react-cookies'

class Header extends React.Component{
    constructor() {
        super()
        this.state = {"benxe": []}
    }

    componentDidMount(){
        API.get(endpoints['benxe']).then(res => {
            this.setState({
                "benxe": res.data
            })
        })
    }

    render(){
        let user = cookies.load("user")
        let r = <>
            <Nav.Link href="/register">Đăng ký</Nav.Link>
            <Nav.Link href="/login">Đăng nhập</Nav.Link>
        </>
        if(user != null)
        r = <Nav.Link href="/">{user.username}</Nav.Link>
        return(
            <>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">Trang chủ</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            {r}
                            
                            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </>
        )
    }
}

export default Header