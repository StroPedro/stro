import React , {Suspense , lazy} from "react"
import App from "./App"
import  MostrarMateria from "./pages/mostrarMateria"

const Log = lazy(()=> import("./users/Registro"))

const RegisT =()=>{
    return(
    <div>
        <Suspense fallback = {<MostrarMateria/>}>
                   <Log/>
        </Suspense>
    </div>
    )
}


export default RegisT