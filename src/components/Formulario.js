import React , { useState , useEffect , useContext} from 'react'
import '../styles/Formulario.css'
import Input from './Input'
import BotonSubmit from './BotonSubmit'
import  BarradeNavegacion from './BarradeNavegacion'
import FetchDatos from './FetchDatos'
import Auth from '../contexts/Auth'
import { login } from "../services/AuthApi";


 
const  Formulario = ({history}) => {
    const [user , setUser] = useState({
        nombre:'',
        apellidos:''
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
           const response = await login(user);
           setIsAuthentificated(response)
           history.replace('/user')
       } catch ({ response }) {
           console.log(response)
       }
   }


   function redirigir() {
        history.replace('/user')
   }

   useEffect(() =>{
       if (isAuthentificated) {
            redirigir()
       }
   } , [ history,isAuthentificated ])

    return (
        <div>
            <div>
                < BarradeNavegacion/>
            </div>
       
            <div className ="row formulario-contenedor ">
                <div className ="col s12 texto-encabezado">
                    <h4>inicia session</h4>
                </div>
                <form className ="formulario" onSubmit={Enviar}>
                    <Input
                    name = "nombre"
                    type = "text"
                    onChange={handleChange}
                    />
                    <Input
                    type = "password"
                    name = "apellidos"
                    onChange={handleChange}
                    />
                    

                    <BotonSubmit/>
                </form>
            </div>
        </div>
    )
}



export default Formulario;