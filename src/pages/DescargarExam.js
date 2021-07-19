import React , {useState , useEffect , useContext} from "react";
import Auth from '../contexts/Auth'
import { login } from "../services/AuthApi";
import '../styles/DescarFormulario.css'
import BarradeNavegacion from '../components/BarradeNavegacion'
import axios from 'axios'



const DescargarExam = () => {

    const [materia , setMateria] = useState("") ;
    const [año , setAño] = useState("") ;
    const [mes , setMes] = useState("") ;
    const [face , setFace] = useState("") ;

    const {isAuthentificated , setIsAuthentificated} = useContext(Auth)

   
    
    useEffect(() =>{

        const al = document.documentElement.scrollHeight-64
        const alt = al + "px"
        document.getElementById("form").style.height = `${alt}`

       
    } , [  ])
   return (
        <div>
            <BarradeNavegacion/>

            <div className="formID" id = "form">
                <div className ="row formulario-contenedor-text z-depth-1" >
                    <div className ="col s12 texto-encabezado-formulario">
                        <p>iniciar session</p>
                    </div>
                    <form className ="formulario "  >


                        <div className ="input-field contenedor-input  col s12">
                            <select  className ="browser-default" onChange = {(e) =>{setMateria(e.target.value)}} >
                                <option  disabled selected>Elige la materia</option>
                                <option value="matematicas">matematicas</option>
                                <option value="fisica">fisica</option>
                                <option value="lengua y literatura">lengua y literatura</option>
                                <option value="filosofia">filosofia</option>
                                <option value="CNS">CNS</option>
                                <option value="historia de Africa">historia de Africa</option>
                                <option value="historia de Africa">CSS</option>
                                <option value="historia de Africa">france</option>
                                <option value="historia de Africa">ingles</option>
                                <option value="historia de Africa">electrotecnia</option>
                                <option value="historia de Africa">economia</option>
                                <option value="historia de Africa">quimica</option>
                                <option value="historia de Africa">griego</option>
                            </select>
                        </div>
                        <div className ="input-field contenedor-input  col s12">
                        <select  className ="browser-default"  onChange = {(e) =>{setAño(e.target.value)}} >
                            <option value="" disabled selected>Elige el año</option>
                            <option value="2020">2020</option>
                            <option value="2019">2019</option>
                            <option value="2018">2018</option>
                            <option value="2017">2017</option>
                            <option value="2016">2016</option>
                            <option value="2016">2015</option>
                            <option value="2014">2014</option>
                            <option value="2013">2013</option>
                            <option value="2012">2012</option>
                            <option value="2011">2011</option>
                            <option value="2010">2010</option>
                        </select>
                        </div>
                        <div className ="input-field contenedor-input  col s12">
                            <select  className ="browser-default" onChange = {(e) =>{setFace(e.target.value)}} >
                                <option  disabled selected>Elige el mes</option>
                                <option value="matematicas">junio</option>
                                <option value="fisica">septiembre</option>
                                
                            </select>
                        </div>

                        <div className ="input-field contenedor-input  col s12">
                            <select  className ="browser-default" onChange = {(e) =>{setMes(e.target.value)}} >
                                <option  disabled selected>Elige el mes</option>
                                <option value="matematicas">junio</option>
                                <option value="fisica">septiembre</option>
                                
                            </select>
                        </div>


                        <div className="respuestaError">
                            <p></p>
                        </div>
                        <button 
                        className ="btn btn-small" 
                        type="submit">
                            iniciar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default DescargarExam ;