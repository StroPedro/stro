import React , {Suspense , lazy} from "react"
import App from "./App"
import  MostrarMateria from "./pages/mostrarMateria"
import './styles/blog.css'
import "./styles/examenes.css"
const Log = lazy(()=> import("./pages/Blog"))

const BBlog =()=>{
    return(
    <div>
        <Suspense fallback = {<MostrarMateria/>}>
                   <Log/>
        </Suspense>
    </div>
    )
}


export default BBlog