import React , { useState , useEffect , useContext} from 'react'
import '../styles/Formulario.css'
import Input from './Input'
import BotonSubmit from './BotonSubmit'
import  BarradeNavegacion from './BarradeNavegacion'
import Auth from '../contexts/Auth'
import { registrar } from "../services/AuthApi";


const Registro = ({history}) => {
    const [user , setUser] = useState({
        nombre:'',
        apellidos:'',
        correo:''
    })
    const {isAuthentificated , setIsAuthentificated} = useContext(Auth)
    const handleChange = ({currentTarget}) => {
        const {name , value} = currentTarget;
        setUser({...user , [name] : value})
    }

    async  function Enviar(e) {
       e.preventDefault()
       console.log(user)

       try {
           const response = await registrar(user);
           setIsAuthentificated(response)
           history.replace('/userffffffffffffffffff')
       } catch ({ response }) {
           console.log(response)
       }
   }




    return (
        <div>
         <div>
             < BarradeNavegacion/>
         </div>
       
        <div className ="row formulario-contenedor">
            <div className ="col s12 texto-encabezado">
                <h4>inicia session</h4>
            </div>
            <form className ="formulario" onSubmit={Enviar}>
                <Input
                 nombre = "nombre"
                 onChange={handleChange}
                 type = "text"
                 />
                <Input
                 nombre = "email"
                 onChange={handleChange}
                 type = "email"
                />
                 
                <Input
                 nombre = "contrasena"
                 type = "password"
                 onChange={handleChange}/>
                <BotonSubmit/>
            </form>
        </div>
        </div>
    )
}

export default Registro;