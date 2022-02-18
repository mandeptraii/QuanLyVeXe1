import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import API, { endpoints } from './API'
import Tuyen from './Tuyen'
import cookies from 'react-cookies'
import { useStore } from 'react-redux'
import { Redirect } from 'react-router'

export default function TableChuyen2(){
   const [Bought, setBought] = useState(false)
   const store = useStore()
   const auth = store.getState()
   const [chuyen1, setChuyen1] = useState([])
   const [tuyen1, setTuyen1] = useState([])
   const [xe1, setXe1] = useState([])
   const [benXe1, setBenXe1] = useState([])
   const [veXe1, setVeXe1] = useState([])
   const [soLuongVe, setSoLuongVe] = useState({
      "soLuong": ""
   })
   const [thongTinChuyen, setThongTinChuyen] = useState({
      "id": "",
      "idXe": "",
      "thoiGianKhoiHanh": "",
      "diemKhoiHanh": "",
      "diemDen": "",
      "giaTien": "",
      "soGhe": ""
   })

   let user = auth
   if (cookies.load("user") != null)
      user = cookies.load("user")

   useEffect(() => {
      API.get(endpoints['chuyen2']).then(res => {
         setChuyen1(res.data)
      })
      API.get(endpoints['xe']).then(res => {
         setXe1(res.data)
      })
      API.get(endpoints['tuyen']).then(res => {
         setTuyen1(res.data)
      })
      API.get(endpoints['benxe']).then(res => {
         setBenXe1(res.data)
      })
      API.get(endpoints['vexe']).then(res => {
         setVeXe1(res.data)
      })
   },[])

   const update = async(idXe, slVe, slVeChuyenHienTai, slVeUser, chuyenId) => {
      if(parseInt(soLuongVe.soLuong) + parseInt(slVeChuyenHienTai) < 46){
         let tongTien = soLuongVe.soLuong*thongTinChuyen.giaTien
         if(user.is_staff == false)
            tongTien =  soLuongVe.soLuong*thongTinChuyen.giaTien-soLuongVe.soLuong*user.DoThanThiet
         if(slVeUser == null)
            slVeUser = 0
         let a = slVe
         const formData = new FormData()
         formData.append('SoVeDaDat', parseInt(slVeUser) + parseInt(a))
         let doanhThuChuyen = chuyen1.filter(c => c.id==chuyenId).map(cTemp => cTemp.DoanhThu)
         try{
            let res = await API.patch(endpoints['update-xe'](idXe),{
               "GheDaDat": parseInt(slVeChuyenHienTai) + parseInt(a)
            })
            let resChuyen = await API.patch(endpoints['update-chuyen'](chuyenId),{
               "DoanhThu": parseInt(tongTien) + parseInt(doanhThuChuyen[0])
            })
            let resUser
            if(user.is_staff == false)
               resUser = await API.patch(endpoints['update-user'](user.id),formData,{
                  headers:{
                     'Content-Type': 'multipart/form-data',
                     "Authorization": `Bearer ${cookies.load("access_token")}`
                  }
               })
            let userTemp = await API.get(endpoints['current-user'], {
               headers: {
                  'Authorization': `Bearer ${cookies.load('access_token')}`
               }
            })
            cookies.save("user", userTemp.data)
            if(veXe1.filter(v => v.Chuyen==chuyenId && v.KhachHang==user.id).length == 0){
               let veXe = await API.post(endpoints['vexe'],{
                  "KhachHang": user.id,
                  "Chuyen": chuyenId,
                  "GiaTien": parseInt(tongTien),
                  "SoLuong": parseInt(a)
               })
            }
            else{
               let veXeInfo = veXe1.filter(v => v.Chuyen==chuyenId && v.KhachHang==user.id)
               let veXe = await API.patch(endpoints['update-vexe'](veXeInfo[0].id),{
                  "GiaTien": parseInt(veXeInfo[0].GiaTien) + parseInt(tongTien),
                  "SoLuong": parseInt(veXeInfo[0].SoLuong) + parseInt(a)
               })
            }
            alert("Bạn đã đặt vé thành công")
            setBought(true)
         } catch(ex){
            console.error(ex)
         }
      }
      else
         alert("Chuyến này đã hết ghế")
   }

   const warn = (() => {
      alert("Bạn đã đặt vé thành công")
      setBought(true)
   })

   const change = (event) => {
      // soLuongVe[field] = event.target.value
      setSoLuongVe({
         'soLuong': event.target.value
      })
   }

   const checked = (id, thoiGian, diemKhoiHanh, diemDen, giaTien, soGheHienTai, idXe) => {
      let diemKhoiHanhTemp = benXe1.filter(b => b.id==diemKhoiHanh)[0].DiaDiem
      let diemDenTemp = benXe1.filter(b => b.id==diemDen)[0].DiaDiem
      setThongTinChuyen({
         "id": id,
         "idXe": idXe,
         "thoiGianKhoiHanh": thoiGian,
         "diemKhoiHanh": diemKhoiHanhTemp,
         "diemDen": diemDenTemp,
         "giaTien": giaTien,
         "soGhe": soGheHienTai
      })
   }

   if(Bought)
      return <Redirect to="/"/>
   else
      return (<>
      <Table striped bordered hover>
      <thead>
         <tr>
            <th>id</th>
            <th>Thời gian khởi hành</th>
            <th>Điểm khởi hành</th>
            <th>Điểm đến</th>
            <th>Giá Tiền</th>
            <th>Số ghế hiện tại</th>
         </tr>
      </thead>
      <tbody>
         {chuyen1.map(c => <DataTable xe={xe1} checked={checked} tuyen={tuyen1} chuyen={c} warn={warn} field={soLuongVe.soLuong}/>)}
      </tbody>
      </Table>
      <h2 style={{marginTop:"4rem"}}>Chuyến bạn đã chọn</h2>
      <Table striped bordered hover>
      <thead>
         <tr>
            <th>id</th>
            <th>Thời gian khởi hành</th>
            <th>Điểm khởi hành</th>
            <th>Điểm đến</th>
            <th>Giá Tiền</th>
            <th>Số ghế hiện tại</th>
         </tr>
      </thead>
      <tbody>
         <td>{thongTinChuyen.id}</td>
         <td>{thongTinChuyen.thoiGianKhoiHanh.slice(0, 10)} | {thongTinChuyen.thoiGianKhoiHanh.slice(11, 19)}</td>
         <td>{thongTinChuyen.diemKhoiHanh}</td>
         <td>{thongTinChuyen.diemDen}</td>
         <td>{thongTinChuyen.giaTien} VNĐ</td>
         <td>{thongTinChuyen.soGhe}/45</td>
         <td><input style={{width: '100px'}} type="number" value={soLuongVe.soLuong} onChange={change}/></td>
         <td><Button onClick={() => update(thongTinChuyen.idXe, soLuongVe.soLuong, thongTinChuyen.soGhe, user.SoVeDaDat, thongTinChuyen.id)}>Đặt vé</Button></td>
         {/* <td>{this.props.slChoNgoi}</td> */}
      </tbody>
      </Table>
      </>
      )
    }

class DataTable extends React.Component{
   render() {
      return(
         <tr>
             <td>{this.props.chuyen.id}</td>
             <td>{this.props.chuyen.ThoiDiemDi.slice(0, 10)} | {this.props.chuyen.ThoiDiemDi.slice(11, 19)}</td>
             <td><Tuyen tuyenId={this.props.chuyen.Tuyen}/></td>
             <td><Tuyen tuyenId={this.props.chuyen.Tuyen} temp="1"/></td>
             <td><Tuyen tuyenId={this.props.chuyen.Tuyen} temp="2"/></td>
            <td>{this.props.xe.filter(x => x.id==this.props.chuyen.Xe).map(xTemp => xTemp.GheDaDat)}/45</td>
             <td><input style={{padding: "5px 5px 5px 5px"}} type="radio" name="checkChuyen" onChange={() => this.props.checked(this.props.chuyen.id, this.props.chuyen.ThoiDiemDi, this.props.tuyen.filter(t => t.id==this.props.chuyen.Tuyen).map(ss => ss.NoiKhoiHanh), this.props.tuyen.filter(t => t.id==this.props.chuyen.Tuyen)[0].NoiDen, this.props.tuyen.filter(t => t.id==this.props.chuyen.Tuyen)[0].GiaTien, this.props.xe.filter(x => x.id==this.props.chuyen.Xe)[0].GheDaDat, this.props.chuyen.Xe)} /></td>
             {/* <td>{this.props.slChoNgoi}</td> */}
         </tr>
      )
  }
}