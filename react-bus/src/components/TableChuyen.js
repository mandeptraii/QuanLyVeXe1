import React, { useEffect, useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import API, { endpoints } from './API'
import Tuyen from './Tuyen'
import cookies from 'react-cookies'
import { useStore } from 'react-redux'
import { Redirect } from 'react-router'

export default function TableChuyen(){
   const [veXe1, setVeXe1] = useState([])
   const [nguoiDung, setNguoiDung] = useState([])
   const [cmt, setCmt] = useState(false)
   const [danhGia, setDanhGia] = useState([])
   const [Bought, setBought] = useState(false)
   const store = useStore()
   const auth = store.getState()
   const [chuyen1, setChuyen1] = useState([])
   const [chuyenDaChay, setChuyenDaChay] = useState([])
   const [tuyen1, setTuyen1] = useState([])
   const [xe1, setXe1] = useState([])
   const [benXe1, setBenXe1] = useState([])
   const [khoiHanh, setKhoiHanh] = useState(true)
   let tongSao = 0
   const [thongTinChuyen, setThongTinChuyen] = useState({
      "id": "",
      "idXe": "",
      "thoiGianKhoiHanh": "",
      "diemKhoiHanh": "",
      "diemDen": "",
      "giaTien": "",
      "soGhe": "",
      "daKhoiHanh": false,
      "taiXe": ""
   })
   const [noiDungCmt, setNoiDungCmt] = useState({
      'noiDung': "",
   })
   const [soSaoTemp, setSoSaoTemp] = useState({
      'soSaoTemp': ""
   })

   let user = auth
   if (cookies.load("user") != null)
      user = cookies.load("user")

   useEffect(() => {
      API.get(endpoints['chuyenchuachay']).then(res => {
         setChuyen1(res.data)
      })
      API.get(endpoints['chuyendachay']).then(res => {
         setChuyenDaChay(res.data)
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
      API.get(endpoints['danhgia']).then(res => {
         setDanhGia(res.data)
      })
      API.get(endpoints['user']).then(res => {
         setNguoiDung(res.data)
      })
      API.get(endpoints['vexe']).then(res => {
         setVeXe1(res.data)
      })
   },[])

   const update = async(chuyenId, xeId) => {
      try{
         // let updateChuyen = await API.patch(endpoints['update-chuyen'](chuyenId),{
         // })
         let tong=0
         veXe1.filter(v => v.Chuyen==chuyenId).map(vTemp => tong = parseInt(tong) + parseInt(vTemp.GiaTien))
         let updateChuyen = await API.patch(endpoints['update-chuyen'](chuyenId),{
            "DoanhThu": parseInt(tong),
            "DaKhoiHanh": khoiHanh
         })
         let updateXe = await API.patch(endpoints['update-xe'](xeId),{
            "GheDaDat": 0
         })
         alert("Bạn đã cập nhật chuyến thành công")
         setBought(true)
      } catch(ex){
         console.error(ex)
      }
   }

   const checked = (id, thoiGian, diemKhoiHanh, diemDen, giaTien, soGheHienTai, idXe, khoiHanh, taiXeId) => {
      let diemKhoiHanhTemp = benXe1.filter(b => b.id==diemKhoiHanh)[0].DiaDiem
      let diemDenTemp = benXe1.filter(b => b.id==diemDen)[0].DiaDiem
      setThongTinChuyen({
         "id": id,
         "idXe": idXe,
         "thoiGianKhoiHanh": thoiGian,
         "diemKhoiHanh": diemKhoiHanhTemp,
         "diemDen": diemDenTemp,
         "giaTien": giaTien,
         "soGhe": soGheHienTai,
         "daKhoiHanh": khoiHanh,
         "taiXe": taiXeId
      })
   }

   const binhLuan = (status) => {
      if(thongTinChuyen.daKhoiHanh==false)
         alert("Chuyến này chưa khởi hành")
      else
         setCmt(status)
   }

   const change = (event) => {
      setNoiDungCmt({
         'noiDung': event.target.value
      })
   }

   const change1 = (event) => {
      setSoSaoTemp({
         'soSaoTemp': event.target.value
      })
   }

   danhGia.filter(d => d.Chuyen==thongTinChuyen.id).map(dTemp => tongSao = parseFloat(tongSao) + parseFloat(dTemp.SoSao))
   tongSao = (parseFloat(tongSao) / danhGia.filter(d => d.Chuyen==thongTinChuyen.id).length).toFixed(2)

   const dangBinhLuan = async(taiXeId) => {
      if(soSaoTemp.soSaoTemp < 6 && soSaoTemp.soSaoTemp >=0){
         if(tongSao == NaN)
            tongSao = null
         const formData = new FormData()
         formData.append('DiemUyTin', tongSao)
         console.info(formData.get("DiemUyTin"))
         console.info(taiXeId)
         console.info(tongSao)
         try{
            let themBinhLuan = await API.post(endpoints['danhgia'],{
               'NoiDung': noiDungCmt.noiDung,
               'SoSao': soSaoTemp.soSaoTemp,
               'Chuyen': thongTinChuyen.id,
               'NguoiDung': user.id
            })
            let updateUser = await API.patch(endpoints['update-user'](taiXeId),formData,{
               headers:{
                  'Content-Type': 'multipart/form-data',
                  "Authorization": `Bearer ${cookies.load("access_token")}`
               }
            })
            alert("Bạn đã đăng bình luận thành công")
            API.get(endpoints['danhgia']).then(res => {
               setDanhGia(res.data)
            })
         } catch(ex){
            console.error(ex)
         }
      }
      else
         alert("Bạn chưa nhập số sao hoặc số sao bạn nhập không hợp lệ")
   }

   if(cmt)
      return(<>
         <div style={{marginTop:"1rem", marginBottom:"1rem"}}><Button onClick={() => binhLuan(false)}>Quay lại</Button></div>
         <h2>Tổng sao: {tongSao}
               </h2>
         <Table striped bordered hover>
            <tbody>
               {danhGia.filter(d => d.Chuyen==thongTinChuyen.id).map(dTemp => {
                  return(
                  <>
                     <tr>
                        <h4>{nguoiDung.filter(n => n.id == dTemp.NguoiDung).map(nTemp => nTemp.last_name)}</h4>
                     </tr>
                     <tr>
                        <div>Đánh giá: {dTemp.SoSao}/5</div>
                        <div>Nội dung: {dTemp.NoiDung}</div>
                     </tr>
                  </>
                  )
               })}
            </tbody>
         </Table>
         <h2>Thêm bình luận</h2>
         <Form >
            <Form.Group>
                <Form.Control type="text" value={noiDungCmt.noiDung} onChange={change}/>
            </Form.Group>
            <Form.Group>
               <Form.Label>Số sao:</Form.Label>
               <Form.Control type="number" value={soSaoTemp.soSaoTemp} onChange={change1}/>
            </Form.Group>
            <Button onClick={() => dangBinhLuan(thongTinChuyen.taiXe)}>
               Đăng
            </Button>
         </Form>
      </>)
   else
      if(Bought)
         return <Redirect to="/"/>
      else{
         if(user == null){
            return (<>
               <h2 style={{marginTop:"4rem"}}>Chuyến đã khởi hành</h2>
               <Table striped bordered hover>
                  <thead>
                     <tr>
                        <th>id</th>
                        <th>Thời gian khởi hành</th>
                        <th>Điểm khởi hành</th>
                        <th>Điểm đến</th>
                        <th>Giá Tiền</th>
                     </tr>
                  </thead>
                  <tbody>
                     {chuyenDaChay.map(c => <DataTablee xe={xe1} checked={checked} tuyen={tuyen1} chuyen={c}/>)}
                  </tbody>
               </Table>
               <h2 style={{marginTop:"4rem"}}>Chuyến chưa khởi hành</h2>
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
                  {chuyen1.map(c => <DataTable xe={xe1} checked={checked} tuyen={tuyen1} chuyen={c}/>)}
               </tbody>
               </Table>
               </>
            )
         }
         else
            if(user.is_staff)
               return (<>
                  <h2 style={{marginTop:"4rem"}}>Chuyến đã khởi hành</h2>
                  <Table striped bordered hover>
                     <thead>
                        <tr>
                           <th>id</th>
                           <th>Thời gian khởi hành</th>
                           <th>Điểm khởi hành</th>
                           <th>Điểm đến</th>
                           <th>Giá Tiền</th>
                        </tr>
                     </thead>
                     <tbody>
                        {chuyenDaChay.map(c => <DataTablee xe={xe1} checked={checked} tuyen={tuyen1} chuyen={c}/>)}
                     </tbody>
                  </Table>
                  <h2 style={{marginTop:"4rem"}}>Chuyến chưa khởi hành</h2>
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
                     {chuyen1.map(c => <DataTable xe={xe1} checked={checked} tuyen={tuyen1} chuyen={c}/>)}
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
                     <td><Button onClick={() => update(thongTinChuyen.id, thongTinChuyen.idXe)}>Cập nhật chuyến</Button></td>
                     <td><Button onClick={() => binhLuan(true)}>Xem bình luận</Button></td>
                     {/* <td>{this.props.slChoNgoi}</td> */}
                  </tbody>
                  </Table>
                  </>
               )
            else
               return (<>
                  <h2 style={{marginTop:"4rem"}}>Chuyến đã khởi hành</h2>
                  <Table striped bordered hover>
                     <thead>
                        <tr>
                           <th>id</th>
                           <th>Thời gian khởi hành</th>
                           <th>Điểm khởi hành</th>
                           <th>Điểm đến</th>
                           <th>Giá Tiền</th>
                        </tr>
                     </thead>
                     <tbody>
                        {chuyenDaChay.map(c => <DataTablee xe={xe1} checked={checked} tuyen={tuyen1} chuyen={c}/>)}
                     </tbody>
                  </Table>
                  <h2 style={{marginTop:"4rem"}}>Chuyến chưa khởi hành</h2>
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
                     {chuyen1.map(c => <DataTable xe={xe1} checked={checked} tuyen={tuyen1} chuyen={c}/>)}
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
                     <td><Button onClick={() => binhLuan(true)}>Xem bình luận</Button></td>
                  </tbody>
                  </Table>
                  </>
               )
      }
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
            <td><input style={{padding: "5px 5px 5px 5px"}} type="radio" name="checkChuyen" onChange={() => this.props.checked(this.props.chuyen.id, this.props.chuyen.ThoiDiemDi, this.props.tuyen.filter(t => t.id==this.props.chuyen.Tuyen).map(ss => ss.NoiKhoiHanh), this.props.tuyen.filter(t => t.id==this.props.chuyen.Tuyen)[0].NoiDen, this.props.tuyen.filter(t => t.id==this.props.chuyen.Tuyen)[0].GiaTien, this.props.xe.filter(x => x.id==this.props.chuyen.Xe)[0].GheDaDat, this.props.chuyen.Xe, this.props.chuyen.DaKhoiHanh, this.props.chuyen.TaiXe)} /></td>
            {/* <td>{this.props.slChoNgoi}</td> */}
         </tr>
      )
  }
}

class DataTablee extends React.Component{
   render() {
      return(
         <tr>
            <td>{this.props.chuyen.id}</td>
            <td>{this.props.chuyen.ThoiDiemDi.slice(0, 10)} | {this.props.chuyen.ThoiDiemDi.slice(11, 19)}</td>
            <td><Tuyen tuyenId={this.props.chuyen.Tuyen}/></td>
            <td><Tuyen tuyenId={this.props.chuyen.Tuyen} temp="1"/></td>
            <td><Tuyen tuyenId={this.props.chuyen.Tuyen} temp="2"/></td>
            <td><input style={{padding: "5px 5px 5px 5px"}} type="radio" name="checkChuyen" onChange={() => this.props.checked(this.props.chuyen.id, this.props.chuyen.ThoiDiemDi, this.props.tuyen.filter(t => t.id==this.props.chuyen.Tuyen).map(ss => ss.NoiKhoiHanh), this.props.tuyen.filter(t => t.id==this.props.chuyen.Tuyen)[0].NoiDen, this.props.tuyen.filter(t => t.id==this.props.chuyen.Tuyen)[0].GiaTien, this.props.xe.filter(x => x.id==this.props.chuyen.Xe)[0].GheDaDat, this.props.chuyen.Xe, this.props.chuyen.DaKhoiHanh, this.props.chuyen.TaiXe)} /></td>
            {/* <td>{this.props.slChoNgoi}</td> */}
         </tr>
      )
  }
}