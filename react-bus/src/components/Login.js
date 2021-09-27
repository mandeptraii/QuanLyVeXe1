import React, { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import API, { AuthAPI, endpoints } from "./API"
import cookies from 'react-cookies'

export default function Login(props){
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)

    // useEffect(() => {
    //     console.info("test")
    //     console.info(Math.random())
    // })

    const login = async (event) =>{
        event.preventDefault()

        let res = await API.post(endpoints['login'],{
            'client_id': '6f2uzEDaCaEHPtJjzE3iHvlzJDt34CuNCLwpBrB1',
            'client_secret': '5qJStAg1hXkjU4463isvlGjga9pyBuZi5EMWtU1fdJcyTGhtLiuOoqLo0036khARbcMTH9WJXtLwxDQiALbLuUYNTYqXvND8r0HL9F3wXRUWdukuPQm1Hz4C16GnDiSA',
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

        props.history.push("/")
    }

    return (
        <>
            <h1 className="text-center text-danger">Dang nhap</h1>
            <Form onSubmit={login}>
                <LoginForm id="username" type="text" field={username} change={event => setUsername(event.target.value)}/>
                <LoginForm id="password" type="password" field={password} change={event => setPassword(event.target.value)}/>
                <Button type="submit">Login</Button>
            </Form>
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