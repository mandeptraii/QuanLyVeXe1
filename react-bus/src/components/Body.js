import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,Row,Col,Button, Nav} from 'react-bootstrap'
import bus from '../img/bus.jpg'
import API, { endpoints } from './API'
import BenXe from './BenXe'
import { useDispatch, useStore } from 'react-redux';
import cookies from 'react-cookies'
import Register from './Register';
import { BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import TableChuyen from './TableChuyen';
import TableChuyen1 from './TableChuyen1';

export default function Body(){
    const [tuyen, setTuyen] = useState([])
    const [tuyen1, setTuyen1] = useState([])
    const [tuyen2, setTuyen2] = useState([])
    const [tuyen3, setTuyen3] = useState([])
    const [tuyen4, setTuyen4] = useState([])
    const [tuyen5, setTuyen5] = useState([])
    const [tuyen6, setTuyen6] = useState([])
    const store = useStore()//useStore() trả về tham chiếu đến redux store
    const auth = store.getState()
    
    let doThanThietUser = 0
    const formData = new FormData()

    useEffect( () => {
        API.get(endpoints['tuyen']).then(res => {
            setTuyen(res.data)
        }).then(
        API.get(endpoints['tuyen1']).then(res => {
            setTuyen1(res.data)
        })).then(
        API.get(endpoints['tuyen2']).then(res => {
            setTuyen2(res.data)
        })).then(
        API.get(endpoints['tuyen3']).then(res => {
            setTuyen3(res.data)
        })).then(
        API.get(endpoints['tuyen4']).then(res => {
            setTuyen4(res.data)
        })).then(
        API.get(endpoints['tuyen5']).then(res => {
            setTuyen5(res.data)
        })).then(
        API.get(endpoints['tuyen6']).then(res => {
            setTuyen6(res.data)
        }))
    }, [])

    let user = auth
    if (cookies.load("user") != null){
        user = cookies.load("user")

        if(user.SoVeDaDat >= 10 && user.SoVeDaDat < 20)
            doThanThietUser = 20000
        else if(user.SoVeDaDat >=20 && user.SoVeDaDat < 40)
            doThanThietUser = 50000
        else if(user.SoVeDaDat >=40)
            doThanThietUser = 100000
        formData.append('DoThanThiet', doThanThietUser)
        
        let updateUser2 = API.patch(endpoints['update-user'](user.id), formData, {
            headers:{
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${cookies.load("access_token")}`
            }
        })
    
        let userTemp1 = API.get(endpoints['current-user'], {
            headers: {
                'Authorization': `Bearer ${cookies.load('access_token')}`
            }
        }).then(res => cookies.save("user", res.data))
        // console.info(userTemp1.data)
        // cookies.save("user", userTemp1.data)
    }

    const datVe = () => {
        if(user == null)
            alert("Bạn phải đăng nhập mới dùng được chức năng này")
    }
    
    let r = <>
        <Button variant="primary" onClick={datVe}>Đặt vé </Button>
    </>

    let r1 = <>
    <Button variant="primary" onClick={datVe}>Đặt vé </Button>
    </>

    let r2 = <>
    <Button variant="primary" onClick={datVe}>Đặt vé </Button>
    </>

    let r3 = <>
    <Button variant="primary" onClick={datVe}>Đặt vé </Button>
    </>

    let r4 = <>
    <Button variant="primary" onClick={datVe}>Đặt vé </Button>
    </>

    let r5 = <>
    <Button variant="primary" onClick={datVe}>Đặt vé </Button>
    </>

    let r6 = <>
    <Button variant="primary" onClick={datVe}>Đặt vé </Button>
    </>

    if(user!=null){
        r = <>
        <Nav.Link href="/datve"><Button variant="primary">Đặt vé </Button></Nav.Link>
        </>
        r1 = <>
        <Nav.Link href="/datve1"><Button variant="primary">Đặt vé </Button></Nav.Link>
        </>
        r2 = <>
        <Nav.Link href="/datve2"><Button variant="primary">Đặt vé </Button></Nav.Link>
        </>
        r3 = <>
        <Nav.Link href="/datve3"><Button variant="primary">Đặt vé </Button></Nav.Link>
        </>
        r4 = <>
        <Nav.Link href="/datve4"><Button variant="primary">Đặt vé </Button></Nav.Link>
        </>
        r5 = <>
        <Nav.Link href="/datve5"><Button variant="primary">Đặt vé </Button></Nav.Link>
        </>
        r6 = <>
        <Nav.Link href="/datve6"><Button variant="primary">Đặt vé </Button></Nav.Link>
        </>
    }
    const styles ={
        backgroundColor:"red",
        
    }

    return(
        <Row >
            {tuyen1.map(c =><ACard tuyen={c} temp={r1}/>)}
            {tuyen2.map(c =><ACard tuyen={c} temp={r2}/>)}
            {tuyen3.map(c =><ACard tuyen={c} temp={r3}/>)}
            {tuyen4.map(c =><ACard tuyen={c} temp={r4}/>)}
            {tuyen5.map(c =><ACard tuyen={c} temp={r5}/>)}
            {tuyen6.map(c =><ACard tuyen={c} temp={r6}/>)}
        </Row>
    )
    
 }

 class ACard extends React.Component {
     render() {
         return(
            <Col md={4} >
                <Card style={{ width: '18rem', marginTop:'2rem'}}>
                <Card.Img variant="top" src={bus} />
                <Card.Body>
                    Điểm khởi hành: 
                    <Card.Title><BenXe benId={this.props.tuyen.NoiKhoiHanh}/></Card.Title>
                    Điểm đến: 
                    <Card.Title><BenXe benId={this.props.tuyen.NoiDen}/></Card.Title>           
                    {this.props.temp}               
                </Card.Body>
            </Card>
          </Col>
         )
     }
 }