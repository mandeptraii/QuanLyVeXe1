
import {BrowserRouter,Route, Switch} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
export default function AppBase (){
    return(
        <BrowserRouter>
            <Header/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                </Switch>
            <Footer/>
        </BrowserRouter>
    )
}