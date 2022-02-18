import React, { useEffect, useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import API, { endpoints } from './API'
import Tuyen from './Tuyen'
import cookies from 'react-cookies'
import { useStore } from 'react-redux'
import { Redirect } from 'react-router'

export default function TaiXe(){
    const [taiXe, setTaiXe] = useState([])

    useEffect(() => {
        API.get(endpoints['user']).then(res => {
           setTaiXe(res.data)
        })
     },[])

     console.info(taiXe)

    return(
    <>
        <Table striped bordered hover>
        <thead>
           <tr>
              <th>id</th>
              <th>Họ</th>
              <th>Tên</th>
              <th>Điểm uy tín</th>
           </tr>
        </thead>
        <tbody>
            {taiXe.filter(t => t.DiemUyTin != null).map(tTemp => <DataTable taiXe={tTemp} />)}
        </tbody>
        </Table>
        </>
        )
}

class DataTable extends React.Component{
    render() {
       return(
          <tr>
              <td>{this.props.taiXe.id}</td>
              <td>{this.props.taiXe.first_name}</td>
              <td>{this.props.taiXe.last_name}</td>
              <td>{this.props.taiXe.DiemUyTin}</td>
          </tr>
       )
   }
 }