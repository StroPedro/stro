import React , {useState , useEffect} from 'react';
import {Link} from 'react-router-dom'
import '../styles/CollectionExamenes.css'
import axios from "axios"
import ReactHtmlParser from "react-html-parser"
const CollectionExamenes = ()=>{
    const [preguntas,setPreguntasTraida] = useState([])

    const TraerPreguntas = async () =>{
        const datos = await axios({
            method:'get' , 
            url : '/coger-preguntas' , 
        })
        setPreguntasTraida(datos.data)
        console.log(datos.data)
    }
    useEffect(()=>{
        TraerPreguntas()
    } , [])

        return (
            <div className  = "contenedor-lista-mat-formulario-ver-anuncio">
                <div className ="collection coleccion-de-examenes" id="lista">
                <li className ='collection-item'><h6>Tus examenes comprados</h6></li>
                <li className ='collection-item lista'>
                    <Link className = "examen" to ="/materias">Matematicas</Link>
                </li>
                <li className='collection-item lista'>
                    <Link className = "examen" to ="/materias">Matematicas</Link>
                </li>
                </div>


                <div className = "ver-solicitudes-nuevos-anuncios">
                {preguntas.map((datos)=>
                    <div className ="estilos-preguntas" key = {datos[0]}>
                        <div className ="contenedor-titulo-fecha-pregunta">
                            <div className ="contenedor-titulo-fecha">
                                <div className ="contenedor-fecha">
                                    <p>{datos[2]}</p>
                                </div>
                                <div className ="contenedor-user">
                                <p>{datos[1]}</p>
                                </div>
                            </div>
                            <div className ="contenedor-titulo-pregunta">
                                <h4>{ReactHtmlParser(datos[3])}</h4>
                            </div>
                            <div className ="contenedor-ver-y-responder">
                                <div className ="contenedor-numero-respuestas">
                                <p> <span>65</span> respuestas </p>
                                </div>
                                <div className ="contenedor-responder">
                                <Link to = {`/respuestas/${datos[0]}`} className ="btn btn-small">responder</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    )}   
                </div>

                
            </div>
        )
    
}

export default CollectionExamenes;