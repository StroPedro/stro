import React , {useEffect , useState} from "react"
import {Link} from "react-router-dom"
import axios from "axios"
import "../styles/examenes.css"
import BarradeNavegacion from '../components/BarradeNavegacion'


export const  DatosExamen = (datos) => {
    return datos

}

const Examenes = () => {
    const [datoBusqueda , setDatoBusqueda] = useState([])
    const [materias , setMaterias] = useState([]) ;
    const [materia , setMateria] = useState("") ;
    const [año , setAño] = useState("") ;
    const [grupo , setGrupo] = useState(null);

    const BuscarMateria = async (e) =>{
        e.preventDefault()
        const datos = await axios({
            method:'post' , 
            url : '/buscar_materias', 
            data: {'materiaQueSeBusca':datoBusqueda}
        })
        setMaterias(datos.data)
       
        console.log(datos.data)
    }
    const BuscarDatos = (e) => {
        setDatoBusqueda(e.target.value) 
        
    }

    const handleChangeRadio = event => {
        const target = event.target
        const value = target.value
  
        setGrupo(value)
        console.log(grupo)
    }

    const TraerMateria = async () =>{
        const datos = await axios({
            method:'get' , 
            url : `/Obtener_Materias` , 
        })
        setMaterias(datos.data)
        console.log(datos.data)
        
    }

    const AgregarMat = async (e) => {
        e.preventDefault()
        console.log(grupo)
        console.log(materia)
        console.log(año)
        const fs = new FormData()
        fs.append("año" , año)
        fs.append("materia" , materia)
        fs.append("face" , grupo)

        const datos = await axios({
            method:'post' , 
            url : '/buscar_materiass', 
            data: fs
        })
        setMaterias(datos.data)
        console.log(datos.data)

   }
    
    useEffect(() =>{
        TraerMateria()
    }, [])




    return(
        <div>
            < BarradeNavegacion/>

            <div className ="contenedor-buscar">
                <form onSubmit = {BuscarMateria} className ="formulario-buscar" action="/articulos_pc" method="POST">
                    <div className ="input-field input-buscar">
                            <input 
                                id="icon_prefix" 
                                type="text" 
                                name="articulo" 
                                value = {datoBusqueda}
                                placeholder="Que buscas ?"
                                onChange={BuscarDatos}
                                required/>
                            <button type="submit" className ="btn-small prefix boton-de-busqueda"><i className ="material-icons ">search</i></button>
                    </div>
                </form>
            </div>



            <div className="contenedor-de-tabla-articulo ">
                <div className="contenedor-tabla">
                    <div className=" tabla ">                    
                        <div className="collection">
                            {materias.map((data)=>
                                    
                            
                                <Link key = {data[0]} className="collection-item" to = {`/ver_materia_selectividad/${data[2]}`}>{data[1]} {data[4]} {data[5]}</Link> 
                          
                    
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Examenes