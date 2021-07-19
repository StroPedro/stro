import React , {useContext}  from "react";
import Auth from '../contexts/Auth'
import {logout} from '../services/AuthApi'


const Profil = (props) => {
    const {isAuthentificated , setIsAuthentificated} = useContext(Auth)
    const handleClick = () => {
        logout()
        setIsAuthentificated(false)
        console.log('deconecte')
    }
    return(
        <div>
            <h1>Profil</h1>
            <button onClick = {handleClick}>enviar</button>
        </div>
    )
}

export default Profil;