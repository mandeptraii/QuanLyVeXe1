import React, { useContext, useEffect, useState } from "react"
import { Button, Form, Col, Row, Container } from "react-bootstrap"
import API, { AuthAPI, endpoints } from "./API"
import cookies from 'react-cookies'
import { Redirect } from "react-router"
import { useDispatch } from "react-redux"

export default function Login(props){
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [isLogged, setLogged] = useState(false)
    const dispatch = useDispatch()

    // useEffect(() => {
    //     console.info("test")
    //     console.info(Math.random())
    // })

    // const login = async (event) =>{
    //     event.preventDefault()
    //     // auth.login(username, password)
    //     setLogged(true)
    // }

    const login = async (event) => {
        try{
        event.preventDefault()
        let res = await API.post(endpoints['login'],{
          'client_id': 'y2JYs9gYPhljDKfAnVLf0GwwV2Q23VnJ6dpBQ5AD',
          'client_secret': 'FjNxqR7dy50ziOQ46WmuYwYPOagKoA4UJw3xTBuzWpzYYy5bnNvomG88o2kSd7mmBhAEBf1J0pq7f5J3o7FgzQDeIvin1meUwNZxcyzECSYbCrvEWDD5rfu0UCudTNZ7',
          'username': username,
          'password': password,
          'grant_type': 'password'
        })
        console.info(res.data)
        cookies.save("access_token", res.data.access_token)
    
        let user = await API.get(endpoints['current-user'], {
            headers: {
                'Authorization': `Bearer ${cookies.load('access_token')}`
            }
        })
        console.info(user.data)
    
        cookies.save("user", user.data)
    
        dispatch({
          "type": "login",
          "payload": user.data
        })
    
        // setUser(user)
        setLogged(true)
        } catch(ex){
            alert("Tài khoản không tồn tại hoặc mật khẩu không đúng")
            console.error(ex)
        }
      }

    if(isLogged)
        return <Redirect to="/"/>
    else
        return (
            <>
                <Container>                
                <Row className="mt-5">
                    <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <h1 className="text-center ">Đăng nhập</h1>
                        <Form onSubmit={login}>
                            <LoginForm label="Tài khoản" id="username" type="text" field={username} change={event => setUsername(event.target.value)}/>
                            <LoginForm label="Mật khẩu" id="password" type="password" field={password} change={event => setPassword(event.target.value)}/>
                            <Button type="submit">Đăng nhập</Button>
                        </Form>
                    </Col>
                </Row>               
            </Container>
            </>
        )
}

class LoginForm extends React.Component{
    render(){
        return(
            <Form.Group controlId={this.props.id}>
                <Form.Label>{this.props.label}</Form.Label>
                <Form.Control type={this.props.type} value={this.props.field} onChange={this.props.change}/>
            </Form.Group>
        )
    }
}