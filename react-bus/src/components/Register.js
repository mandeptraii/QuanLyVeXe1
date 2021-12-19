import React from "react";
import { Form, Button } from "react-bootstrap";
import API, { endpoints } from "./API";
import 'bootstrap/dist/css/bootstrap.min.css';

class Register extends React.Component{
    constructor(){
        super()
        this.user={
            'first_name': '',
            'last_name': '',
            "email": "",
            "username": "",
            "password": "",
            "confirm_password": ""
        }
        this.avatar = React.createRef()
        this.state = {
            'user': this.user
        }
    }

    change = (field, event) => {
        this.user[field] = event.target.value
        this.setState({
            'user': this.user
        })
    }

    register = (event) => {
        if(this.state.user.password === this.state.user.confirm_password){
            const formData = new FormData()
            for (let k in this.state.user)
                if( k !== 'confirm_password')
                    formData.append(k, this.state.user[k])
            
            formData.append('avatar', this.avatar.current.files[0])
            API.post(endpoints['user'], formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res) => {
                console.info(res)
            }).catch(err => console.error(err))
            alert("Bạn đã đăng ký thành công")
        }
        else
            alert("Bạn vui lòng điền đầy đủ thông tin và nhập chính xác mật khẩu lần 2")

        event.preventDefault() //Chặn xử lý mặc định của form để gọi đúng bất đồng bộ
    }

    render(){
        return(
            <>
                <h1 class="text-center text-danger">Đăng ký người dùng</h1>
                <Form onSubmit={this.register}>
                    <RegisterForm id="email" label="Email" type="email" field={this.state.user.email} change={this.change.bind(this, 'email')}/>
                    <RegisterForm id="firstName" label="Họ" type="text" field={this.state.user.first_name} change={this.change.bind(this, 'first_name')}/>
                    <RegisterForm id="lastname" label="Tên" type="text" field={this.state.user.last_name} change={this.change.bind(this, 'last_name')}/>
                    <RegisterForm id="username" label="Tài khoản" type="text" field={this.state.user.username} change={this.change.bind(this, 'username')}/>
                    <RegisterForm id="password" label="Mật khẩu" type="password" field={this.state.user.password} change={this.change.bind(this, 'password')}/>
                    <RegisterForm id="comfirmPass" label="Xác nhận mật khẩu" type="password" field={this.state.user.confirm_password} change={this.change.bind(this, 'confirm_password')}/>
                    <Form.Group controlId='avatar'>
                        <Form.Label>Avatar</Form.Label>
                        <Form.Control type="file" ref={this.avatar} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Đăng ký
                    </Button>
                </Form>
            </>
        )
    }
}

class RegisterForm extends React.Component{
    render(){
        return(
            <Form.Group controlId={this.props.id}>
                <Form.Label>{this.props.label}</Form.Label>
                <Form.Control type={this.props.type} value={this.props.field} onChange={this.props.change}/>
            </Form.Group>
        )
    }
}

export default Register