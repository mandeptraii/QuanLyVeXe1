
import {Bar} from 'react-chartjs-2'
import React, { Component, useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import API, { endpoints } from './API'

const BarChart = ()=>{
    const [chuyen1, setChuyen1] = useState([])
    const [tuyen1, setTuyen1] = useState([])
    const [ben1, setBen1] = useState([])
    const [nam, setNam] = useState({
        "nam": ""
    })
    const [chuyenThang, setChuyenThang] = useState([])
    const [chuyenArray, setChuyenArray] = useState([])
    const [doanhThuArray, setDoanhThuArray] = useState([])

    let chuyenArrayTemp = []
    let doanhThuArrayTemp = []

    useEffect(() => {
        API.get(endpoints['chuyen']).then(res => {
           setChuyen1(res.data)
        })
        API.get(endpoints['tuyen']).then(res => {
        setTuyen1(res.data)
        })
        API.get(endpoints['benxe']).then(res => {
        setBen1(res.data)
        })
    },[])

    const checked = (thang) => {
        let chuyenTemp = chuyen1.filter(c => c.ThoiDiemDi.slice(0, 4)==nam.nam).map(cTemp => cTemp)
        let chuyenTemp1 = chuyenTemp.filter(c => c.ThoiDiemDi.slice(5, 7)==thang).map(cTemp => cTemp)
        // chuyenTemp1.map(c => chuyenArrayTemp.push(tuyen1.filter(t => t.id == c.Tuyen).map(a => {
        //     return ben1.filter(b => b.id == a.NoiKhoiHanh).map(temp => temp.DiaDiem) + "->" + ben1.filter(b => b.id == a.NoiDen).map(temp => temp.DiaDiem)
        // })))
        // setChuyenArray(chuyenArrayTemp)

        tuyen1.map(a => {
            chuyenArrayTemp.push(ben1.filter(b => b.id == a.NoiKhoiHanh).map(temp => temp.DiaDiem) + "->" + ben1.filter(b => b.id == a.NoiDen).map(temp => temp.DiaDiem))
        })
        setChuyenArray(chuyenArrayTemp)
        
        let tong1=0, tong2=0, tong3=0, tong4=0, tong5=0, tong6=0
        chuyenTemp1.filter(c => c.Tuyen == 1).map(cTemp => tong1= parseInt(tong1) + parseInt(cTemp.DoanhThu))
        chuyenTemp1.filter(c => c.Tuyen == 2).map(cTemp => tong2 = parseInt(tong2)+parseInt(cTemp.DoanhThu))
        chuyenTemp1.filter(c => c.Tuyen == 3).map(cTemp => tong3 = parseInt(tong3)+parseInt(cTemp.DoanhThu))
        chuyenTemp1.filter(c => c.Tuyen == 4).map(cTemp => tong4 = parseInt(tong4)+parseInt(cTemp.DoanhThu))
        chuyenTemp1.filter(c => c.Tuyen == 5).map(cTemp => tong5 = parseInt(tong5)+parseInt(cTemp.DoanhThu))
        chuyenTemp1.filter(c => c.Tuyen == 6).map(cTemp => tong6 = parseInt(tong6)+parseInt(cTemp.DoanhThu))
        doanhThuArrayTemp.push(tong1, tong2, tong3, tong4, tong5, tong6)
        console.info(doanhThuArrayTemp)
        setDoanhThuArray(doanhThuArrayTemp)
    }

    const change = (event) => {
        setNam({
           'nam': event.target.value
        })
     }

    return(<> 
    <div style={{margin: "2rem 0 2rem 0"}}>
        <input placeholder="Nhập năm" type="number" value={nam.nam} onChange={change} />
    </div>
    <div style={{margin: "2rem 0 2rem 0"}}>
        Tháng 1 <input onChange={() => checked("01")} name="thang" type="radio"/>&ensp;
        Tháng 2 <input onChange={() => checked("02")} name="thang" type="radio"/>&ensp;
        Tháng 3 <input onChange={() => checked("03")} name="thang" type="radio"/>&ensp;
        Tháng 4 <input onChange={() => checked("04")} name="thang" type="radio"/>&ensp;
        Tháng 5 <input onChange={() => checked("05")} name="thang" type="radio"/>&ensp;
        Tháng 6 <input onChange={() => checked("06")} name="thang" type="radio"/>&ensp;
        Tháng 7 <input onChange={() => checked("07")} name="thang" type="radio"/>&ensp;
        Tháng 8 <input onChange={() => checked("08")} name="thang" type="radio"/>&ensp;
        Tháng 9 <input onChange={() => checked("09")} name="thang" type="radio"/>&ensp;
        Tháng 10 <input onChange={() => checked("10")} name="thang" type="radio"/>&ensp;
        Tháng 11 <input onChange={() => checked("11")} name="thang" type="radio"/>&ensp;
        Tháng 12 <input onChange={() => checked("12")} name="thang" type="radio"/>&ensp;
    </div>
    <div style={{marginBottom: "2rem"}}>
        <Bar
            data={
                {
                    labels: ["Tuyến 1", "Tuyến 2", "Tuyến 3", "Tuyến 4", "Tuyến 5", "Tuyến 6"],// tên cột, cái này để tên tuyến hợp lý
                    datasets: [{
                        label: 'Số tiền thu được(nghìn VND)',
                        data: doanhThuArray,// doanh thu
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'lightblue',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                }              
            }
            height={400}
            width={600}
            options={{                
                maintainAspectRatio:true
            }}
            
        />          
    </div>
    <h3 style={{textAlign:"center", marginBottom:"4rem"}}>
        Biểu đồ doanh thu của các tuyến trong tháng
    </h3>
    <div>
            <div style={{padding: ".5rem 1rem .5rem 0", marginBottom: "1rem"}}>
                <span style={{padding:".5rem 1rem .5rem 1.5rem", border: "1px solid rgba(255, 99, 132, 1)", backgroundColor: "rgba(255, 99, 132, 0.2)", width:"200px", height:"100px", color: "rgba(255, 99, 132, 0)"}}></span>
                <span style={{marginLeft:"1rem"}}> Tuyến 1: {chuyenArray[0]}</span>
            </div>
            <div style={{padding:".5rem 1rem .5rem 0", marginBottom: "1rem"}}>
                <span style={{padding:".5rem 1rem .5rem 1.5rem", border: "1px solid rgba(54, 162, 235, 1)", backgroundColor: "rgba(54, 162, 235, 0.2)", width:"300px", color: "rgba(54, 162, 235, 0)"}}></span>
                <span style={{marginLeft:"1rem"}}> Tuyến 2: {chuyenArray[1]}</span>
            </div>
            <div style={{padding:".5rem 1rem .5rem 0", marginBottom: "1rem"}}>
                <span style={{padding:".5rem 1rem .5rem 1.5rem", border: "1px solid rgba(255, 206, 86, 1)", backgroundColor: "rgba(255, 206, 86, 0.2)", width:"300px", color: "rgba(255, 206, 86, 0)"}}></span>
                <span style={{marginLeft:"1rem"}}> Tuyến 3: {chuyenArray[2]}</span>
            </div>
            <div style={{padding:".5rem 1rem .5rem 0", marginBottom: "1rem"}}>
                <span style={{padding:".5rem 1rem .5rem 1.5rem", border: "1px solid rgba(75, 192, 192, 1)", backgroundColor: "lightblue", width:"100px", color: "rgba(75, 192, 192, 0)"}}></span>
                <span style={{marginLeft:"1rem"}}> Tuyến 4: {chuyenArray[3]}</span>
            </div>
            <div style={{padding:".5rem 1rem .5rem 0", marginBottom: "1rem"}}>
                <span style={{padding:".5rem 1rem .5rem 1.5rem", border: "1px solid rgba(153, 102, 255, 1)", backgroundColor: "rgba(153, 102, 255, 0.2)", width:"100px", color: "rgba(153, 102, 255, 0)"}}></span>
                <span style={{marginLeft:"1rem"}}> Tuyến 5: {chuyenArray[4]}</span>
            </div>
            <div style={{padding:".5rem 1rem .5rem 0", marginBottom: "1rem"}}>
                <span style={{padding:".5rem 1rem .5rem 1.5rem", border: "1px solid rgba(255, 159, 64, 1)", backgroundColor: "rgba(255, 159, 64, 0.2)", width:"100px", color: "rgba(255, 159, 64, 0)"}}></span>
                <span style={{marginLeft:"1rem"}}> Tuyến 6: {chuyenArray[5]}</span>
            </div>
    </div>
    </>)
}

export default BarChart