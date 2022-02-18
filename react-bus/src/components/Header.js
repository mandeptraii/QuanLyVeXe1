import React, { useContext, useEffect, useState } from 'react';
import API, { endpoints } from './API';
// import './Style.css'
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import cookies from 'react-cookies'
import { useStore } from 'react-redux';

export default function Header(){
    const [benxe, setBenXe] = useState(null)
    const store = useStore()//useStore() trả về tham chiếu đến redux store
    const auth = store.getState()

    useEffect(() => {
        API.get(endpoints['benxe']).then(res => {
            setBenXe(res.data)
        })
    }, [])

    const logOut = () => {
        cookies.remove("user")
        cookies.remove("access_token")
    }

    const isNhanVien = () => {
        alert("Chỉ có nhân viên mới được vào đây")
    }

    let user = auth
    if (cookies.load("user") != null)
        user = cookies.load("user")

    let r = <>
        <Nav.Link href="/register">Đăng ký</Nav.Link>
        <Nav.Link href="/login">Đăng nhập</Nav.Link>
    </>

    let tempp = <>
        <Nav.Link href="/datve">Chuyến xe</Nav.Link>
    </>

    // if(user == null)
    //     tempp = <>
    //         <Nav.Link onClick={() => {
    //             alert("Chỉ có người dùng mới dùng được tính năng này")
    //         }}>Chuyến xe</Nav.Link>
    //     </>

    if(user != null){
        if(user.is_staff){
            r = <>
                <Nav.Link href="/doanhthu">Doanh thu</Nav.Link>
                <Nav.Link href="/user">Hello, {user.last_name}</Nav.Link>
                <Nav.Link href="/" onClick={logOut}>Đăng xuất</Nav.Link>
            </>
        }
        else
            r = <>
                <Nav.Link onClick={isNhanVien}>Doanh thu</Nav.Link>
                <Nav.Link href="/user">Hello, {user.last_name}</Nav.Link>
                <Nav.Link href="/" onClick={logOut}>Đăng xuất</Nav.Link>
            </>
    }

    return(
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Trang chủ</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto"> 
                        <Nav.Link href="/taixe">Tài xế</Nav.Link>
                        {tempp}
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

// export default Header