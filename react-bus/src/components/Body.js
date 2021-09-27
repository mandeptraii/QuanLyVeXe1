import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,Row,Col,Button} from 'react-bootstrap'
import '../img/bus.jpg'


 class Body extends React.Component {
    constructor(){
        super()
        this.state = {
            'tuyen':[]
        }
   }
// Cái này phải có API

//    componentDidMount(){
//         API.get(endpoints['tuyen']).then(res => {
//             this.setState({
//                 'tuyen':res.data.results
//             })
//         })   
//    }
    render(){
        return(
            <Row>
                {this.states.tuyen.map(c =><ACard tuyen = {c}/>)}
            </Row>
        )
    }
 }

 class ACard extends React.Component {
     render() {
         return(
            <Col md={6}>
                <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="bus.jpg" />
                <Card.Body>
                <Card.Title>{this.props.tuyen.tenchuyen}</Card.Title> Tên                 
                <Button variant="primary">Đặt vé </Button>                
                </Card.Body>
            </Card>
          </Col>
         )
     }
 }

 export default Body