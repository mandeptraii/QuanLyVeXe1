import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


class Footer extends React.Component {
    render(){
  return (
    <div class="page-footer font-small blue pt-4">

        
        <div class="container-fluid text-center text-md-left">

         
            <div class="row">

           
            <div class="col-md-6 mt-md-0 mt-3">

               
                <h5 class="text-uppercase">TỔNG ĐÀI ĐẶT VÉ VÀ CSKH</h5>
                <h3>6969696969</h3>
                
                <p style={{marginBottom:"10px"}}>Công ty trách nhiệm hữu hạn 2 thành viên DM Bus</p>           
                <p>Địa chỉ : 208 Nguyễn Hữu Cảnh, phường 22, Quận Bình Thạnh, thành phố Hồ Chí Minh</p>
                
            </div>
            

            <hr class="clearfix w-100 d-md-none pb-3"></hr>

            
            <div class="col-md-3 mb-md-0 mb-3">

                
                <h5 class="text-uppercase">Về chúng tôi</h5>

                <ul class="list-unstyled">
                <li>
                    <a href="#!">Các tuyến đường</a>
                </li>
                <li>
                    <a href="/taixe">Tài xế</a>
                </li>
                <li>
                    <a href="/datve">Các chuyến xe</a>
                </li>
                <li>
                    <a href="#!">Liên lạc</a>
                </li>
                </ul>

            </div>
            
            <div class="col-md-3 mb-md-0 mb-3">

              
                <h5 class="text-uppercase">Mạng xã hội</h5>

                <ul class="list-unstyled">
                <li>
                    <a href="#!">Facebook</a>
                </li>
                <li>
                    <a href="#!">Instagram</a>
                </li>
                <li>
                    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">Youtube</a>
                </li>
                <li>
                    <a href="#!">Twitter</a>
                </li>
                </ul>

            </div>
         

            </div>
            

        </div>
       
        <div class="footer-copyright text-center py-3">© 2021 DM Bus
            
        </div>       

    </div>
  )
}
}

export default Footer