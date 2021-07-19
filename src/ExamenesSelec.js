import React , {Suspense , lazy} from "react"
import App from "./App"
import  MostrarMateria from "./pages/mostrarMateria"
import "./styles/examenes.css"
const Log = lazy(()=> import("./pages/examenes"))

const ExamenesSelec =()=>{
    return(
    <div>
        <Suspense fallback = {<MostrarMateria/>}>
                   <Log/>
        </Suspense>
    </div>
    )
}


export default ExamenesSelec