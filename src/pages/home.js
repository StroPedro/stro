import React , {useState , useEffect} from 'react';
import {Link , withRouter} from "react-router-dom"
import axios from "axios"
import BarradeNavegacion from '../components/BarradeNavegacion'
import '../styles/home.css'
import M from "materialize-css"

const  Home = (props) => {

    const [materia , setMateria] = useState("matematicas") ;
    const [anal , setAnal] = useState("mate")
    const [verOpciones , setVerOpciones ] = useState(false) ;
    const [verDatos , setVerDatos ] = useState(false) ;
    const [verMateria , setVerMateria ] = useState(false) ;
    const [verAnales, setVerAnales ] = useState(false) ;
    const [materiasTraidas,setMateriasTraidas] = useState([])
    const [analesTraidas,setAnalesTraidas] = useState([])
    const [materiasTodas,setMateriasTodas] = useState([])
    const [año , setAño] = useState("") ;
    const [mes , setMes] = useState("") ;
    const [face , setFace] = useState("")
    const [volver , setVolver] = useState(true) ;
    const [grupo , setGrupo] = useState(false);
    const [ver , setVer] = useState("");
    const [mensajeError , setMensajeError] = useState("");
    const {history} = props

    const handleChangeRadio = event => {
        const target = event.target
        const name = target.name
        const value = target.value
        setGrupo(value)
        console.log(grupo)

    }

    // funcion para administrar formulario

    const AdminForm = () =>{
        console.log(materia)
        console.log(año)
        return verOpciones
    }

    // funcion para traer materias
    const ejecutarTraerMateria = async () =>{
        BuscarMateria()
        
    }

    // seleccionar materia
    const CambiarMateria = (e) =>{ 
            ejecutarTraerMateria()
            setVerOpciones(true)
            setMateria(e.target.value)
            todasLasMateriaDatos(e.target.value)
    }
    

    //elegir formulario Anales 
    const ElegirAnales = (Y) => {
        setVer(Y)
        console.log(ver)
    } 
    //obtener valor de checkbox anales
    const Anales = e =>{
        setGrupo(e.target.value) ;
        
        ElegirAnales(false) 
    }


   //elegir formulario examenes
    const ElegirExamenes = (Y) => {
        setVer(Y)
        console.log(ver)
    } 

    //obtener valor de checkbox examenes
    const Examenes = e =>{
        setGrupo(e.target.value) ;
        ElegirExamenes(true)
        
        
    }
    
    
  

    //peticion para traer todas las materias despues de cargar la pagina

    const BuscarMateria = async () =>{
        const datos = await axios({
            method:'get' , 
            url : '/todasM'
        })
        if (datos.data != "") {
            setVerMateria(datos.data)
            setMateriasTraidas(datos.data)
            setVerMateria(true)
            
        }  
    }

    //peticion para traer todos los anales despues de cargar la pagina

    const BuscarAnales = async () =>{
        const datos = await axios({
            method:'get' , 
            url : '/todasAnales'
        })
        console.log(datos.data , "sssssssssssssssssssssssss")
        if (datos.data != "") {
            setAnalesTraidas(datos.data)
            setVerAnales(true)
              
        }  
    }
    
    //peticion para traer los años , meses , faces , de la materia seleccionada

    const todasLasMateriaDatos = async (materias) =>{
        const datos = await axios({
            method:'get' , 
            url : '/uu/' + materias
        })
        console.log(datos.data)
        
        if (datos.data != "") {
            setMateriasTodas(datos.data)
            setVerDatos(true)
        }
        
    }

        //peticion para traer el link del pdf de la materia seleccionada sin correccion
        const BuscarMateriaSeleccionadaLink = async () =>{
            const datosMateria = año + mes + face + materia 
            console.log(datosMateria)
            const datos = await axios({
                method:'get' , 
                url : `/examenesSC/${datosMateria}`
            })
            console.log(datos.data)
            if ((datos.data != "") && ( datos.data != "Examen no disponible")) {                    
                window.open(`${datos.data}`)
                
            }else{
                setMensajeError("No disponile !")
            } 
        }

        //peticion para traer el link del pdf de la materia seleccionada con correccion
        const BuscarMateriaSeleccionadaLinkSinCoreccion = async () =>{
            const datosMateria = año + mes + face + materia 
            console.log(datosMateria)
            const datos = await axios({
                method:'get' , 
                url : `/examenesCC/${datosMateria}`

            })
            
                console.log(datos.data)
                if ((datos.data != "") && ( datos.data != "Correccion no disponible")) {                    
                    window.open(`${datos.data}`)
                    
                }else{
                    setMensajeError("No disponile !")
                }                   
        }

        //------------FUNCION PARA OBTENER EL LINK DEL ANAL_SC SELECCIONADO

        const BuscarMateriaSeleccionadaLinkAnalesSC = async () =>{
            const datosMateria = anal
            console.log(datosMateria)
            const datos = await axios({
                method:'get' , 
                url : `/analesObtenerNo/${datosMateria}`
            })
            
                console.log(datos.data)
                if ((datos.data != "") && ( datos.data != "Correccion no disponible")) {                    
                    window.open(`${datos.data}`)
                    
                }else{
                    setMensajeError("No disponile !")
                }                   
        }


        //-----------FUNCION PARA OBTENER EL LINK DEL ANAL_CC SELECCIONADO

        const BuscarMateriaSeleccionadaLinkAnalesCC = async () =>{
                const datosMateria = anal
                console.log(datosMateria)
                const datos = await axios({
                    method:'get' , 
                    url : `/analesObtenerCo/${datosMateria}`
                })
            
                console.log(datos.data)
                if ((datos.data != "") && ( datos.data != "Correccion no disponible")) {                    
                    window.open(`${datos.data}`)
                    
                }else{
                    setMensajeError("No disponile !")
                }                   
        }

//************************************************************************************* */
    const Modal = (id) => {
        const elems = document.querySelectorAll(".modal")
        const instance = M.Modal.init(elems,{})

    }
    const VolverTrue = () =>{
        setVolver(true)
    }
//************************************************************************************* */
   
    // funcion para ver el pdf del anal corregido seleccionado 
    const Validar1 = ()=>{
        if (anal != "mate"){
            BuscarMateriaSeleccionadaLinkAnalesSC()
        }else{
            setMensajeError("todos las selecciones son obligatorios")
        }       
    }
    

    // funcion para ver el pdf del anal corregido seleccionado 
    const Validar2 = ()=>{
        if (anal != "mate"){
            BuscarMateriaSeleccionadaLinkAnalesSC()
        }else{
            setMensajeError("todos las selecciones son obligatorios")
        } 
    }

    // funcion para ver el pdf del examen no corregido seleccionado 
    const Validar3 = ()=>{
        if (mes&&año&&materia&&face){
            BuscarMateriaSeleccionadaLink()
        }else{
            setMensajeError("todos las selecciones son obligatorios")
        }
        
    }

    // funcion para ver el pdf del examen corregido seleccionado 
    const Validar4 = ()=>{

        if (mes&&año&&materia&&face){
            BuscarMateriaSeleccionadaLinkSinCoreccion()
        }else{
            setMensajeError("todos las selecciones son obligatorios")
        }
        
    }

    useEffect(()=>{
        BuscarMateria()
        todasLasMateriaDatos(materia)
        BuscarAnales()
        
    },[])

   return(
        <div className = "">
            <BarradeNavegacion/>
            <div className="contenedor-de-banner">
                <div className="contenido-banner container">
                    <div>
                        <h4></h4>
                    </div>
                    <div className="link-boton">
                        <Link to = "/iniciar" className="btn-small aparecer-back-boton">Inicia session</Link>
                        <Link to = "/iniciar" className="btn-small aparecer-back-boton">Registrate</Link>
                        <Link to = "/iniciar" className="btn-small no-apareser-boton">Resuelve tus dudas en cualquier parte</Link>
                    </div>
                </div>
            </div>
            <div className="Effectos">
                <div className="Effecto1">
                </div>
                <div className="Effecto2">
            </div>
            <div className="Effecto3">
            </div>
            <div className="Effecto4">
            </div>
            <div className="Effecto5">
            </div>
            <div className="Effecto6">
            </div>
        </div>
            <div className="margen-arriba">
                
            </div>

            <div className="contenedor-de-targetas-visitass">
               <div className="targeta-visitaa">
                   <div className="">
                       <p>Selecciona el asignatura , el  año y el mes del examen o la correccion que deseas descargar </p>
                   </div>
               </div>
            </div>

            <div className="formID" id = "form">
                <div className ="row formulario-contenedor-text z-depth-1" >
                    <div className ="col s12 texto-encabezado-formulario">
                    </div>
                    <form className ="formulario "  >

                        <p className ="contenedor-de-radio">
                            <label>
                            <input 
                            name="grupos" 
                            type="radio" 
                            value = 'anales'
                            onChange = {Anales} 
                                
                                
                            />
                            <span>anales</span>
                            </label>
                        </p>
                        <p className ="contenedor-de-radio">
                            <label>
                            <input 
                            name="grupos" 
                            type="radio" 
                            value = "examenes"
                            onChange = {Examenes} 
                            />
                            <span>solo examene</span>
                            </label>
                        </p>
                        {ver?
                        <div className ="input-field contenedor-input  col s12">
                            <select  className ="browser-default" onChange = {CambiarMateria} >
                                <option  disabled selected>Elige la materia</option>
                               {verMateria?
                                   materiasTraidas.map((datos) =>
                                   <option value={datos} key = {datos.key}>{datos}</option>
                                   )
                               :""}
                            </select>
                        </div>
                        :""}
                        {ver?"":
                        <div className ="input-field contenedor-input  col s12">
                            <select  className ="browser-default" onChange = {(e) =>{setAnal(e.target.value)}} >
                                <option  disabled selected>Elige la materia</option>
                               {verAnales?
                                   analesTraidas.map((datos) =>
                                   <option value={datos} key = {datos.key}>{datos}</option>
                                   )
                               :""}
                            </select>
                        </div>
                        }
                     {(AdminForm()&&ver)? 
                     <div>
                        
                        <div className ="input-field contenedor-input  col s12">
                        <select  className ="browser-default" onChange = {(e) =>{setAño(e.target.value)}} >
                            <option value="" disabled selected>Elige el año</option>
                            {verDatos?
                                    
                                        materiasTodas[2].map((datos) =>
                                        <option value={datos} key = {datos.key}>{datos}</option>
                                        )
                            :""}
                        </select>
                        </div>
                       
                        <div className ="input-field contenedor-input  col s12">
                            <select required  className ="browser-default" onChange = {(e) =>{setFace(e.target.value)}} >
                                <option  disabled selected>Elige la face</option>
                                {verDatos?

                                            materiasTodas[0].map((datos) =>
                                            <option value={datos} key = {datos.key}>{datos}</option>
                                            )

                                :""}
                                
                            </select>
                        </div>
                        <div className ="input-field contenedor-input  col s12">
                            <select required  className ="browser-default" onChange = {(e) =>{setMes(e.target.value)}} >
                                <option  disabled selected>Elige el mes</option>
                                {verDatos?

                                            materiasTodas[1].map((datos) =>
                                            <option value={datos} key = {datos.key}>{datos}</option>
                                            )
                                :""}
                            </select>
                        </div>
                       </div>:""}

                        <div className="respuestaError">
                            <p>{mensajeError}</p>
                        </div>

                        {ver?"":                        
                            <div className="botones-decargas">
                                <Link
                                onClick = {Validar1}
                                className ="btn btn-small" 
                                
                                >
                                    no1 corre..
                                    <i className="material-icons">cloud_download</i>
                                </Link>

                                <Link  
                                
                                onClick = {Validar2}             
                                className ="btn btn-small" 
                                
                            
                                >
                                    corregido
                                    <i className="material-icons">cloud_download</i>
                                </Link>
                            </div>
                        }

                        {ver?       
                            <div>                                       
                                    <div className="botones-decargas">
                                        <Link
                                        onClick = {Validar3}
                                        className ="btn btn-small" 
                                        >
                                        no EXA corre..
                                        <i className="material-icons">cloud_download</i>
                                        </Link>

                                        <Link  
                                        onClick = {Validar4}            
                                        className ="btn btn-small"                                   
                                        >
                                        corregido
                                        <i className="material-icons">cloud_download</i>
                                        </Link>
                                    </div>
                            </div>
                        :""}
                    </form>
                </div>
            </div>



            <div className="contenedor-de-targetas-visitas container ">
               <div className="targeta-visita z-depth-2 b1">
                   <div className="texto">
                       <p>En esta seccion puedes publicar tus dudas  o pedir explicacion sobre algun tema que estas tratando y tambien aqui puedes ver los problemas presentados por los de mas y tienes la oportunidad de poder responderles </p>
                   </div>
                   <div className="botton-ver-seccion">
                       <Link to = "/preguntas" className="btn-small ">ver la seccion de preguntas</Link>
                   </div>
               </div>
            </div>
            <div className="contenedor-de-targetas-visitas container ">
               <div className="targeta-visita z-depth-2 b2">
                   <div className="texto">
                       <p>Aqui encontraras todos los examenes de la selectividad de todas las convocatorias pero no estan corregidos </p>
                   </div>
                   <div className="botton-ver-seccion">
                       <Link to ="/examenes_no_corregidos" className="btn-small ">Examenes no corregidos</Link>
                   </div>
               </div>
            </div>
        </div>
    )    

}



export default withRouter(Home) ;