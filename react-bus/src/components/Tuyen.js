import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap'
import API, { endpoints } from './API'
import BenXe from "./BenXe";

 class Tuyen extends React.Component {
    constructor(){
        super()
        this.state = {
            'tuyen':[]
        }
   }
// 

   componentDidMount(){
        API.get(endpoints['tuyen']).then(res => {
            this.setState({
                'tuyen':res.data
            })
        })
    
   }
    render(){
        return(<>
                {this.state.tuyen.filter(person => person.id == this.props.tuyenId).map(a => {
                    if(this.props.temp == "1")
                        return <>
                            <BenXe benId={a.NoiDen}/>
                        </>
                    else if (this.props.temp=="2")
                        return <>
                            {a.GiaTien} VNĐ
                        </>
                    else
                        return <>
                            <BenXe benId={a.NoiKhoiHanh}/>
                        </>
                    })}
            </>
        )
    }
 }
 
export default Tuyen