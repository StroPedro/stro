import BarradeNavegacion from '../components/BarradeNavegacion'
import Footer from '../components/Footer'
import Login from '../users/Login'
import React , {useState , useEffect , useContext} from "react";
import Auth from '../contexts/Auth'
import { login } from "../services/AuthApi";

class IniciarSession extends React.Component {
    render() { return(
        <div className="alargar-heig">
            <BarradeNavegacion/>
            <Login/>
            <Footer/>
        </div>
    )}
}

export default IniciarSession ;