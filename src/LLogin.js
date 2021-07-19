import React , {Suspense , lazy} from "react"
import  MostrarMateria from "./pages/mostrarMateria"
import './styles/Formulario.css'
const Log = lazy(()=> import("./users/Login"))

const LLogin =()=>{
    return(
    <div>
        <Suspense fallback = {<MostrarMateria/>}>
                   <Log/>
        </Suspense>
    </div>
    )
}


export default LLogin