import React, { useContext, useEffect, useState } from 'react';
// import './Style.css'
import { Navbar, Nav, Button, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import cookies from 'react-cookies'
import { useStore } from 'react-redux';
import './UserStyle.css'
import API, { endpoints } from '../API';
import { Redirect } from 'react-router';


export default function Customer(){
    const [Delete, setDelete] = useState(false)
    const [chuyen, setChuyen] = useState([])
    const [xe, setXe] = useState([])
    const [veXe, setVeXe] = useState([])
    const [benXe, setBenXe] = useState([])
    const [tuyen, setTuyen] = useState([])
    const store = useStore()
    const auth = store.getState()

    useEffect(() => {
        API.get(endpoints['vexe']).then(res => {
            setVeXe(res.data)
        })
        API.get(endpoints['chuyen']).then(res => {
            setChuyen(res.data)
        })
        API.get(endpoints['xe']).then(res => {
            setXe(res.data)
        })
        API.get(endpoints['benxe']).then(res => {
            setBenXe(res.data)
        })
        API.get(endpoints['tuyen']).then(res => {
            setTuyen(res.data)
        })
    }, [])

    let user = auth
    if (cookies.load("user") != null)
        user = cookies.load("user")
    
    const xoaVe = async(idXe, slVeXeHienTai, slVeUser, idVeXe) => {
        let doThanThietUser=user.DoThanThiet
        const formData = new FormData()
        formData.append('SoVeDaDat', user.SoVeDaDat - parseInt(slVeUser))
        try{
            let updateChuyen = await API.patch(endpoints["update-xe"](idXe),{
                "GheDaDat": parseInt(slVeXeHienTai) - parseInt(slVeUser)
            })

            let deleteVeXe = await API.delete(endpoints["update-vexe"](idVeXe))

            let updateUser1 = await API.patch(endpoints['update-user'](user.id), formData, {
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
            
            alert("Bạn đã xóa vé thành công")
            setDelete(true)
        } catch(ex){
            console.error(ex)
        }
    }

    
    let avatarr = "http://127.0.0.1:8000/static" + user.avatar
    if(Delete)
        return <Redirect to="/"/>
    else{
        if((user.ChuyenDaLai == null || user.ChuyenDaLai < 0) && user.is_staff)
            return(<>
                <div class="page-content page-container" id="page-content">
                    <div class="padding">
                        <div class="row container d-flex justify-content-center">
                            <div class="col-xl-6 col-md-12">
                                <div class="card user-card-full">
                                    <div class="row m-l-0 m-r-0">
                                        <div class="col-sm-4 bg-c-lite-green user-profile">
                                            <div class="card-block text-center text-white">
                                                <div class="m-b-25"> <img style={{width: "100px"}} src={avatarr} class="img-radius" alt="User-Profile-Image"/> </div>
                                                <h6 class="f-w-600">{user.last_name}</h6>
                                                <p>Nhân Viên</p> <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                            </div>
                                        </div>
                                        <div class="col-sm-8">
                                            <div class="card-block">
                                                <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Thông tin người dùng</h6>
                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <p class="m-b-10 f-w-600">Email</p>
                                                        <h6 class="text-muted f-w-400">{user.email}</h6>
                                                    </div>
                                                </div>
                                                <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Thông tin khác</h6>
                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <p class="m-b-10 f-w-600">Bến xe</p>
                                                        <h6 class="text-muted f-w-400">{benXe.filter(b => b.id==user.BenXe).map(bTemp => bTemp.DiaDiem) }</h6>
                                                    </div>
                                                </div>
                                                <ul class="social-link list-unstyled m-t-40 m-b-10">
                                                    <li><a href={"https://www.facebook.com/profile.php?id=100008323817696"} data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true"><i class="mdi mdi-facebook feather icon-facebook facebook" aria-hidden="true"></i>Facebook</a></li>
                                                    <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true"><i class="mdi mdi-twitter feather icon-twitter twitter" aria-hidden="true"></i>Twitter</a></li>
                                                    
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 style={{marginBottom:"2rem"}}>Các chuyến đã đặt</h2>
                <div style={{marginBottom: "5rem"}}>
                    <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>Thời gian khởi hành</th>
                        <th>Điểm khởi hành</th>
                        <th>Điểm đến</th>
                        <th>Giá Tiền</th>
                        <th>Số vé đã đặt</th>
                    </tr>
                    </thead>
                    <tbody>
                        {veXe.filter(v => v.KhachHang == user.id && chuyen.filter(c => c.id==v.Chuyen).map(cTemp => cTemp.DaKhoiHanh)[0] == false ).map(veXeTemp => 
                            <tr>
                                <td>{veXeTemp.id}</td>
                                <td>{chuyen.filter(c => c.id == veXeTemp.Chuyen).map(cTemp => cTemp.ThoiDiemDi)}</td>
                                <td>{benXe.filter(b => b.id == tuyen.filter(t => t.id == chuyen.filter(c => c.id == veXeTemp.Chuyen).map(cTemp => cTemp.Tuyen)).map(tTemp => tTemp.NoiKhoiHanh)).map(bTemp => bTemp.DiaDiem)}</td>
                                <td>{benXe.filter(b => b.id == tuyen.filter(t => t.id == chuyen.filter(c => c.id == veXeTemp.Chuyen).map(cTemp => cTemp.Tuyen)).map(tTemp => tTemp.NoiDen)).map(bTemp => bTemp.DiaDiem)}</td>
                                <td>{veXeTemp.GiaTien}</td>
                                <td>{veXeTemp.SoLuong}</td>
                                <Button onClick={() => xoaVe(chuyen.filter(c => c.id == veXeTemp.Chuyen).map(cTemp => cTemp.Xe), xe.filter(x => x.id == chuyen.filter(c => c.id == veXeTemp.Chuyen).map(cTemp => cTemp.Xe)).map(xTemp => xTemp.GheDaDat), veXeTemp.SoLuong, veXeTemp.id )}>Xóa vé</Button>
                            </tr>
                        )}
                        
                    </tbody>
                    </Table>
                </div>
            </>)
        else if((user.ChuyenDaLai != null || user.ChuyenDaLai >=0) && user.is_staff)
                return(<>
                    <div class="page-content page-container" id="page-content">
                        <div class="padding">
                            <div class="row container d-flex justify-content-center">
                                <div class="col-xl-6 col-md-12">
                                    <div class="card user-card-full">
                                        <div class="row m-l-0 m-r-0">
                                            <div class="col-sm-4 bg-c-lite-green user-profile">
                                                <div class="card-block text-center text-white">
                                                    <div class="m-b-25"> <img style={{width: "100px"}} src={avatarr} class="img-radius" alt="User-Profile-Image"/> </div>
                                                    <h6 class="f-w-600">{user.last_name}</h6>
                                                    <p>Tài xế</p> <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                                </div>
                                            </div>
                                            <div class="col-sm-8">
                                                <div class="card-block">
                                                    <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Thông tin người dùng</h6>
                                                    <div class="row">
                                                        <div class="col-sm-6">
                                                            <p class="m-b-10 f-w-600">Email</p>
                                                            <h6 class="text-muted f-w-400">{user.email}</h6>
                                                        </div>
                                                    </div>
                                                    <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Thông tin khác</h6>
                                                    <div class="row">
                                                        <div class="col-sm-6">
                                                            <p class="m-b-10 f-w-600">Bến xe</p>
                                                            <h6 class="text-muted f-w-400">{benXe.filter(b => b.id==user.BenXe).map(bTemp => bTemp.DiaDiem) }</h6>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <p class="m-b-10 f-w-600">Chuyến đã lái</p>
                                                            <h6 class="text-muted f-w-400">{user.ChuyenDaLai}</h6>
                                                        </div>
                                                    </div>
                                                    <ul class="social-link list-unstyled m-t-40 m-b-10">
                                                        <li><a href={"https://www.facebook.com/profile.php?id=100008323817696"} data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true"><i class="mdi mdi-facebook feather icon-facebook facebook" aria-hidden="true"></i>Facebook</a></li>
                                                        <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true"><i class="mdi mdi-twitter feather icon-twitter twitter" aria-hidden="true"></i>Twitter</a></li>
                                                        
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>)
        else
            return(<>
            <div class="page-content page-container" id="page-content">
                <div class="padding">
                    <div class="row container d-flex justify-content-center">
                        <div class="col-xl-6 col-md-12">
                            <div class="card user-card-full">
                                <div class="row m-l-0 m-r-0">
                                    <div class="col-sm-4 bg-c-lite-green user-profile">
                                        <div class="card-block text-center text-white">
                                            <div class="m-b-25"> <img style={{width: "100px"}} src={avatarr} class="img-radius" alt="User-Profile-Image"/> </div>
                                            <h6 class="f-w-600">{user.last_name}</h6>
                                            <p>Khách hàng</p> <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                        </div>
                                    </div>
                                    <div class="col-sm-8">
                                        <div class="card-block">
                                            <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Thông tin người dùng</h6>
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">Email</p>
                                                    <h6 class="text-muted f-w-400">{user.email}</h6>
                                                </div>
                                            </div>
                                            <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Thông tin vé</h6>
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">Giảm giá</p>
                                                    <h6 class="text-muted f-w-400">{user.DoThanThiet}</h6>
                                                </div>
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">Tổng vé đã đặt</p>
                                                    <h6 class="text-muted f-w-400">{user.SoVeDaDat}</h6>
                                                </div>
                                            </div>
                                            <ul class="social-link list-unstyled m-t-40 m-b-10">
                                                <li><a href={"https://www.facebook.com/profile.php?id=100008323817696"} data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true"><i class="mdi mdi-facebook feather icon-facebook facebook" aria-hidden="true"></i>Facebook</a></li>
                                                <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true"><i class="mdi mdi-twitter feather icon-twitter twitter" aria-hidden="true"></i>Twitter</a></li>
                                                
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h2 style={{marginBottom:"2rem"}}>Các chuyến đã đặt</h2>
            <div style={{marginBottom: "5rem"}}>
                <Table striped bordered hover>
                <thead>
                <tr>
                    <th>id</th>
                    <th>Thời gian khởi hành</th>
                    <th>Điểm khởi hành</th>
                    <th>Điểm đến</th>
                    <th>Giá Tiền</th>
                    <th>Số vé đã đặt</th>
                </tr>
                </thead>
                <tbody>
                    {veXe.filter(v => v.KhachHang == user.id).map(veXeTemp => 
                        <tr>
                            <td>{veXeTemp.id}</td>
                            <td>{chuyen.filter(c => c.id == veXeTemp.Chuyen).map(cTemp => cTemp.ThoiDiemDi)}</td>
                            <td>{benXe.filter(b => b.id == tuyen.filter(t => t.id == chuyen.filter(c => c.id == veXeTemp.Chuyen).map(cTemp => cTemp.Tuyen)).map(tTemp => tTemp.NoiKhoiHanh)).map(bTemp => bTemp.DiaDiem)}</td>
                            <td>{benXe.filter(b => b.id == tuyen.filter(t => t.id == chuyen.filter(c => c.id == veXeTemp.Chuyen).map(cTemp => cTemp.Tuyen)).map(tTemp => tTemp.NoiDen)).map(bTemp => bTemp.DiaDiem)}</td>
                            <td>{veXeTemp.GiaTien}</td>
                            <td>{veXeTemp.SoLuong}</td>
                            <Button onClick={() => xoaVe(chuyen.filter(c => c.id == veXeTemp.Chuyen).map(cTemp => cTemp.Xe), xe.filter(x => x.id == chuyen.filter(c => c.id == veXeTemp.Chuyen).map(cTemp => cTemp.Xe)).map(xTemp => xTemp.GheDaDat), veXeTemp.SoLuong, veXeTemp.id )}>Xóa vé</Button>
                        </tr>
                    )}
                </tbody>
                </Table>
            </div>
        </>
        )
    }
    
}
