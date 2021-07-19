import React , {useState , useEffect , useContext} from "react";
import Auth from '../contexts/Auth'
import { withRouter , Link} from "react-router-dom"
import { registrar } from "../services/AuthApi";
import Input from '../components/Input'
import BotonSubmit from '../components/BotonSubmit'
import BarradeNavegacion from '../components/BarradeNavegacion'
import Footer from '../components/Footer'
import axios from 'axios'


const Registro = ({history}) => {
    const [user , setUser] = useState({
        nombre:'',
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
       console.log(user)
        const datos = await axios({
            method:'post',
            url:'/registro_post' ,
            data:user
        })
        const resp = await datos.data["clave"]
        const datosUser = await datos.data
        console.log(resp)
        if(resp == 'abcdefghigdfdtdgbsojlvkshfjkhjfsvfskfhjkf' ){
            window.sessionStorage.setItem('user' , datosUser["user"])
            const response = await registrar(resp);
            
            setIsAuthentificated(response)
            history.replace('user')
        }else{
            setRespuestaDb(datosUser)
            console.log(datosUser)
        }
   }

   useEffect(() =>{

       const al = document.documentElement.scrollHeight-64
       const alt = al + "px"
       document.getElementById("form").style.height = `${alt}`
       if (isAuthentificated) {
           history.replace("user")
       }
   } , [ history,isAuthentificated ])
        return (
            <div>
           
           <BarradeNavegacion/>

           <div className="formID" id = "form">
           <div className ="row formulario-contenedor-text " >
                <div className ="col s12 texto-encabezado-formulario">
                    <p>Registrate</p>
                </div>
                <form className ="formulario" onSubmit={Enviar} >
                <div className ="input-field contenedor-input  col s12">
                        <input 
                        type="text" 
                        className ="input-text" 
                        name="nombre" required
                        placeholder="tu nombre"
                        onChange={handleChange} 
                        />
                    </div>

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
                    <div className="respuestaError">
                        <p>{respuestaDb}</p>
                    </div>
                    <div className="Registrarse-si-no">
                             <p>Si  tienes una cuenta  </p><Link to="/iniciar">Inicia session !</Link>
                    </div>
                    <button 
                    className ="btnn btn-small" 
                    type="submit">
                        Registrarse
                    </button>
                </form>
            </div>
           </div>

            </div>
        )
}

export default withRouter(Registro);