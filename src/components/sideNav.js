import React , {useEffect, useContext } from "react"
import {Link} from "react-router-dom"
import M from "materialize-css"
import Auth from '../contexts/Auth'
import {logout} from '../services/AuthApi'
 const  Side = () =>{
    const {isAuthentificated , setIsAuthentificated} = useContext(Auth)

    useEffect(()=>{
        const all = document.querySelector(".sidenav")
        M.Sidenav.init(all , {})
    })
    const Destruir = () =>{
        const elem = document.querySelector(".sidenav")
        var instance = M.Sidenav.getInstance(elem);
        instance.close()
    }

    const handleClick = () => {
        logout()
        setIsAuthentificated(false)
        console.log('deconecte')
        const elem = document.querySelector(".sidenav")
        var instance = M.Sidenav.getInstance(elem);
        instance.close()
    }

    return(
        <ul  id="slide-out" class="collection white sidenav">
            <Link onClick = {Destruir} className="collection-item" to = "/">Home</Link>
            <Link onClick = {Destruir} className="collection-item" to = "/preguntas">Blog</Link>
            {isAuthentificated ?    
            <div>
                <Link onClick = {Destruir} to = "/" className="collection-item">{window.sessionStorage.getItem('user')}</Link>
                 <Link onClick = {handleClick} className="collection-item" >Salir</Link>
            </div>
            :
              <div>
                    <Link onClick = {Destruir} className="collection-item" to = "/iniciar">Iniciar session</Link>
                    <Link onClick = {Destruir} className="collection-item" to = "/registro">Registrarse</Link>
              </div>}
        </ul>
    )
}
export default  Side