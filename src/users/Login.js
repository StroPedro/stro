import React , {useState , useEffect , useContext} from "react";
import { Link, withRouter} from "react-router-dom"
import Auth from '../contexts/Auth'
import { login } from "../services/AuthApi";
import BarradeNavegacion from '../components/BarradeNavegacion'
import Footer from '../components/Footer'
import axios from 'axios'
import {getItem } from '../services/LocalStorage'


const Login = (props) => {
    const {history} = props
    const [user , setUser] = useState({
        email:'',
        contrasena:''
    })
    const {isAuthentificated , setIsAuthentificated} = useContext(Auth)
    const [respuestaDb , setRespuestaDb ] = useState('')
    const handleChange = ({currentTarget}) => {
        const {name , value} = currentTarget;
        setUser({...user , [name] : value})
    }

    async  function Enviar(e) {
       e.preventDefault()
          const datos = await axios({
            method:'post',
            url:'/login_post' ,
            data:user
        })
        const resp = await datos.data
        const Error = resp
        const datosUser = resp["user"]        
        const datos_Respuesta = resp["clave"]
        console.log(datos_Respuesta)
        if(datos_Respuesta == 'abcdefghigdfdtdgbsojlvkshfjkhjfsvfskfhjkf' ){
            window.sessionStorage.setItem('user' , datosUser)
            const response = await login(datos_Respuesta);
            console.log(response)
            setIsAuthentificated(response)
            history.replace('/user')
        }else{
            setRespuestaDb(Error)
        }
        
    }
    useEffect(() =>{

        const al = document.documentElement.scrollHeight-64
        const alt = al + "px"
        document.getElementById("form").style.height = `${alt}`

        if (isAuthentificated) {
            history.goBack()
        }
    } , [ history,isAuthentificated ] )
   return (
        <div>
            <BarradeNavegacion/>

            <div className="formID" id = "form">
                <div className ="row formulario-contenedor-text " >
                    <div className ="col s12 texto-encabezado-formulario">
                        <p>iniciar session</p>
                    </div>
                    <form className ="formulario" onSubmit={Enviar} >

                        <div className ="input-field contenedor-input  col s12">
                            <input 
                            type="email" 
                            className ="input-text" 
                            name="email" required
                            placeholder="tu email"
                            onChange={handleChange} 
                            />
                        </div>
                        <div className ="input-field contenedor-input  col s12">
                            <input 
                            type="password" 
                            className ="input-text" 
                            name="contrasena" required
                            placeholder="tu contrasena"
                            onChange={handleChange} 
                            />
                        </div>
                        <div className="Registrarse-si-no">
                             <p>Si no tienes una cuenta  </p><Link to="/registro">Registrate !</Link>
                        </div>
                        <div className="respuestaError">
                            <p>{respuestaDb?respuestaDb:""}</p>
                        </div>
                        <button 
                        className ="btnn btn-small" 
                        type="submit">
                            iniciar
                        </button>
                    </form>
                </div>

            </div>


        </div>
    )
}

export default withRouter(Login);