import React , {useState , useEffect , useContext} from "react";
import Auth from '../contexts/Auth'
import { login } from "../services/AuthApi";
import '../styles/solicitud.css'
import Input from '../components/Input'
import BotonSubmit from '../components/BotonSubmit'
import BarradeNavegacion from '../components/BarradeNavegacion'
import Footer from '../components/Footer'

const Solicitud = ({history}) => {
    const [user , setUser] = useState({
        nombre:'',
        apellido:''
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

   useEffect(() =>{
       if (isAuthentificated) {
           history.replace('/user')
       }
   } , [ history,isAuthentificated ])
   return (
    <div>
            <BarradeNavegacion/>
            <div className ="row formulario-contenedor">
                <div className ="col s12 texto-encabezado">
                    <h4>elige las materias </h4>
                </div>
                <form className ="formulario" id = "formulario">
                    <p>
                        <label>
                        <input type="checkbox" className ="filled-in" value = "matematicas 1"  name = "matematicas"/>
                        <span>matematicas 1</span>
                        </label>
                    </p>
                    <p>
                        <label>
                        <input type="checkbox" className ="filled-in" value = "Fisica" name="Fisica" />
                        <span>Fisica</span>
                        </label>
                    </p>
                    <p>
                        <label>
                        <input type="checkbox" className ="filled-in" value = "Quimica" name = "Quimica" />
                        <span>Quimica</span>
                        </label>
                    </p>
                    <p>
                        <label>
                        <input type="checkbox" className ="filled-in" value = "Biologia" name="Biologia" />
                        <span>Biologia</span>
                        </label>
                    </p>
                    <p>
                        <label>
                        <input type="checkbox" className ="filled-in" value = "Lengua y Literatura" name="Lengua" />
                        <span>Lengua y Literatura</span>
                        </label>
                    </p>
                    <p>
                        <label>
                        <input type="checkbox" className ="filled-in" value = "Dibujo tecnico" name="Dibujo" />
                        <span>Dibujo tecnico</span>
                        </label>
                    </p>
                    <p>
                        <label>
                        <input type="checkbox" className ="filled-in" value="CNS" name="CNS" />
                        <span>CNS</span>
                        </label>
                    </p>
                    <p>
                        <label>
                        <input type="checkbox" className ="filled-in" value = "Ingles"  name="Ingles"/>
                        <span>Ingles</span>
                        </label>
                    </p>
                    <p>
                        <label>
                        <input type="checkbox" className ="filled-in" value="Frances" name="Frances" />
                        <span>Frances</span>
                        </label>
                    </p>
                    <p>
                        <label>
                        <input id = "i" type="checkbox" className ="filled-in" value="Filosofia" name="Filosofia"/>
                        <span>Filosofia</span>
                        </label>
                    </p>
                    <p>
                        <label>
                        <input type="checkbox" className ="filled-in" value="Latin" name="Latin" />
                        <span>Latin</span>
                        </label>
                    </p>
                    <p>
                        <label>
                        <input type="checkbox" name = "griego" class="filled-in" value = "Griego" name="Griego"/>
                        <span>Griego</span>
                        </label>
                    </p>

                    <input className ="btn btn-small form"type="submit" value="comprar"/>
                </form>
            </div>
            <Footer/>
        </div>
    )
}

export default Solicitud;