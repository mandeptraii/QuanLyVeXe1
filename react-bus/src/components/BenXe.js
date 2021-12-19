import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap'
import API, { endpoints } from './API'

 class BenXe extends React.Component {
    constructor(){
        super()
        this.state = {
            'benxe':[]
        }
   }
// 

   componentDidMount(){
        API.get(endpoints['benxe']).then(res => {
            this.setState({
                'benxe':res.data
            })
        })
   }
    render(){
        return(<>
                {this.state.benxe.filter(person => person.id == this.props.benId).map(a => a.DiaDiem)}</>
        )
    }
 }
 
export default BenXe