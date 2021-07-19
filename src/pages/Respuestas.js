import React , {useState , useEffect , useContext} from "react";
import Auth from '../contexts/Auth'
import { login , registrar } from "../services/AuthApi";
import {useParams} from "react-router-dom"
import '../styles/Respuestas.css'
import axios from 'axios'
import BarradeNavegacion from '../components/BarradeNavegacion'
import {CKEditor} from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import ReactHtmlParser from "react-html-parser"
import M from "materialize-css"
import {Link , withRouter} from 'react-router-dom'
import Loader from "react-loader-spinner";
import  { format , register } from "timeago.js"

//timeago
register('es_ES', (number, index, total_sec) => [
    ['justo ahora', 'ahora mismo'],
    ['hace %s segundos', 'en %s segundos'],
    ['hace 1 minuto', 'en 1 minuto'],
    ['hace %s minutos', 'en %s minutos'],
    ['hace 1 hora', 'en 1 hora'],
    ['hace %s horas', 'in %s horas'],
    ['hace 1 dia', 'en 1 dia'],
    ['hace %s dias', 'en %s dias'],
    ['hace 1 semana', 'en 1 semana'],
    ['hace %s semanas', 'en %s semanas'],
    ['1 mes', 'en 1 mes'],
    ['hace %s meses', 'en %s meses'],
    ['hace 1 año', 'en 1 año'],
    ['hace %s años', 'en %s años']
][index]);
const timeago = timestamp => format(timestamp, 'es_ES');
////////////////////////////////////////////
const Respuestas = (props) => {
    const [respuestaDb , setRespuestaDb ] = useState('')
    const [respuestaDbR , setRespuestaDbR ] = useState('')
    const {history} = props
    const [elegirForm, setElegirForm] = useState(true);
    const [imagen, setImagen] = useState(null);
    const [preview, setPreview] = useState("");
    const [addData , setVal] = useState('')
    const [pregunta , setPregunta] = useState([])
    const [respuestas , setRespuestas] = useState([])
    const [datoBusqueda , setDatoBusqueda] = useState([])
    const [carga, setCarga] = useState(false)
    const {isAuthentificated , setIsAuthentificated} = useContext(Auth)
    const [spinnerHacerPregunta, setSpinnerHacerPregunta] = useState(false);
    const [mensajeError , setMensajeError] = useState("");

    const [user , setUser] = useState({
        email:'',
        contrasena:''
    })
    const [userR , setUserR] = useState({
        nombre:'',
        email:'',
        contrasena:''
    })


    const {id} = useParams()

    const handleChangeImagen = e => {
        setImagen(e)
        console.log(e)
        console.log(imagen)
    }

    const TraerPreguntas = async () => {
        const datos = await axios({
            method:'get' , 
            url : `/pregunta-respuestas/${id}` , 
        })
        setPregunta(datos.data)
        console.log(datos.data)
        
    }
    const BuscarDatos = (e) => {
        setDatoBusqueda(e.target.value) 
        
    }
    const BuscarMateria = async (e) =>{
        e.preventDefault()
        const datos = await axios({
            method:'post' , 
            url : '/buscar_respuesta', 
            data: {'respuestaQueSeBusca':datoBusqueda}
        })
        
        console.log(datos.data)
        setRespuestas(datos.data)
    }


    const handleChange = ({currentTarget}) => {
        const {name , value} = currentTarget;
        setUser({...user , [name] : value})
        
    }
    
    const handleChangeR = ({currentTarget}) => {
        const {name , value} = currentTarget;
        setUserR({...userR , [name] : value})
        console.log(userR)
    }


    const TraerRespuestas = async () =>{
        const datos = await axios({
            method:'get' , 
            url : `/coger-respuestas/${id}` , 
        })
        setRespuestas(datos.data)
        console.log(datos.data)
        if (datos.data) {
            setCarga(true)
            setSpinnerHacerPregunta(false)
            
        }
        else{
            setCarga(false)
        }

    }

    const CogerDatosEditorTexto = (e , editor) =>{
        const data = editor.getData()
        setVal(data)
        
    }

    const ResponderPregunta = async (e) => {
        e.preventDefault()
        if (isAuthentificated) {
            setSpinnerHacerPregunta(true)
            const fs = new FormData()
            fs.append("file" , imagen)
            fs.append("user" , window.sessionStorage.getItem('user'))
            fs.append("respuesta" , addData)
            fs.append("id" , id)
            const respuesta = await axios.post( `/respuestas/${id}`, fs , {headers :{"Content-Type":"multipart/form-data"}} )
            const respuestaServidor = respuesta.data
    
            if (respuestaServidor != "") {
                var toastHTML = '<span>'+ respuestaServidor + '</span>';
                M.toast({html: toastHTML})
            }
            await TraerRespuestas()
            await TraerPreguntas()
            setPreview("")
            setVal("")
            setImagen(null)
            
        }

   }






   async  function Enviar(e) {
    e.preventDefault()
    console.log(user)
     const datos = await axios({
         method:'post',
         url:'/enviar' ,
         data:user
     })
     const resp = await datos.data["clave"]
     const datosUser = datos.data["user"]
     const ErrorServidor = datos.data
     if(resp == 'abcdefghigdfdtdgbsojlvkshfjkhjfsvfskfhjkf' ){
         window.sessionStorage.setItem('user' , datosUser)
         const response = await login(resp);
         console.log(response)
         setIsAuthentificated(response)
         
     }else{
         setRespuestaDb(ErrorServidor)
     }
   }





   async  function Registrarse(e) {
    e.preventDefault()
    console.log(user)
     const datos = await axios({
         method:'post',
         url:'/api' ,
         data:userR
     })
     const resp = await datos.data["clave"]
     const datosUser = await datos.data
     console.log(resp)
     if(resp == 'abcdefghigdfdtdgbsojlvkshfjkhjfsvfskfhjkf' ){
         window.sessionStorage.setItem('user' , datosUser["user"])
         const response = await registrar(resp);
         console.log(response)
         setIsAuthentificated(response)
         
     }else{
         setRespuestaDbR(datosUser)
     }
}








useEffect(()=>{
    
    if (imagen) {
        const reader = new FileReader()
        reader.onloadend = () =>{
            setPreview(reader.result) ;

        }
        reader.readAsDataURL(imagen)
    }else{
        setPreview(null)
    }


},[imagen] )



    useEffect(()=>{
        TraerPreguntas()
        TraerRespuestas()
    }, [])
   return (
<div>
    <BarradeNavegacion/>

    <div className ="contenedor-buscar display-no">
        <form  className ="formulario-buscar" onSubmit = {BuscarMateria}>
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

    <div className ="contenedor-pub ">
        <div className ="container-img-pub ">

                    <div className ="row formulario-contenedor-text-editor " >
                        <div className ="col s12 texto-encabezado-formulario">
                            <p>publica tu respuesta</p>
                        </div>
                        <form className ="formulario" onSubmit ={ResponderPregunta}  >
                            <div className="editor">
                            <CKEditor editor= {ClassicEditor} data={addData} onChange={CogerDatosEditorTexto}  />
                            </div>
                            <div className="file-select" id="src-file1" >
                                <input type="file" name="src-file1" aria-label="Archivo" onChange={(e)=>handleChangeImagen(e.target.files[0])}/>
                            </div>
                            {isAuthentificated ?"":                         
                            <div className="respuestaError">
                                <p>{mensajeError}</p>
                            </div>
                            }
                            {spinnerHacerPregunta?      
                            <div className="Spinner-añadir-pregunta">
                                    <Loader
                                        type="TailSpin"
                                        color="#0d47a1"
                                        secondaryColor = "#0d47a1"
                                        height={30}
                                        width={30}         
                                    />
                                </div>  :""}



                            {isAuthentificated?                
                            <button
                            type="submit" 
                            className=" btnn btn-small"                
                            >                               

                            Publicar
                            </button>:
                            <a
                            onClick = {()=>{setMensajeError("por favor inicia session")}}  className="modal-trigger btnn btn-small" href= "#connectarse"                
                            >                               
                            
                            Publicar
                            </a>

                            }

                        </form>
                    </div>






                    

                    <div className="previsualizacion">
                        <div className="previsualizacion-50">
                            <div className="aviso-previsualiz">

                            </div>
                            <div className="contenido-teorico">
                                {ReactHtmlParser(addData)}
                            </div>

                            <div className = "imagen-previ">
                                <a onClick = {()=>{
                                    const elems = document.querySelectorAll(".previsualisacioFotoFFF");
                                    const instance = M.Modal.init(elems,{"inDuration":0,"outDuration":0,"preventScrolling":false});
                                    }}  className="modal-trigger" href= "#previsualisacioFotoFFF">
                                    <img src={preview}  alt="" />
                                </a>
                            </div>

                            <div >
                                <div className= " modal modall previsualisacioFotoFFF"id= "previsualisacioFotoFFF">
                                    <div className="modal-content">
                                        <img src={preview}  />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>






                    {pregunta.map((datos)=>
                    <div className ="estilos-preguntas " key = {datos["url"]}>
                        <div className ="contenedor-titulo-fecha-pregunta ">

                            <div className ="contenedor-titulo-fecha">
                                    <div className ="contenedor-fecha">
                                            <p>{timeago(datos["fecha"])}</p> 
                                    </div>
                                    <div className ="contenedor-user">
                                            <p>{datos["user"]}</p>
                                    </div>
                            </div>

                                <div className ="contenedor-titulo-pregunta">
                                    <h4>{ReactHtmlParser(datos["pregunta"])}</h4>                                                
                                </div>
                                {datos["url"]?
                                    <div className="Imagen-Pregunta">
                                        <a onClick = {()=> {                                                    
                                            const elems = document.querySelector(`#${datos["clave"]}`);
                                            const instance = M.Modal.init(elems,{"inDuration":0,"outDuration":0,"preventScrolling":false});
                                            }} className="modal-trigger" href={`#${datos["clave"]}`}><img src= {`${datos["url"]}`} alt="" /></a>
                                    </div>:""}

                                    <div >
                                        <div className={`modal modall ${datos["clave"]}`} id={`${datos["clave"]}`}>
                                            <div className="modal-content">
                                                <img  src= {`${datos["url"]}`} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    

                                    </div>
                                </div>
                            )
                        }
                    <div>

                    <div className ="texto-encabezado-pregunats-recientes">
                        <p>Respuestas</p>
                    </div>

                    {respuestas.map((datos)=>
                    <div className ="estilos-respuestas " key = {datos["url"]} >
                        <div className ="contenedor-titulo-fecha-respuesta ">

                            <div className ="contenedor-titulo-fecha">
                                    <div className ="contenedor-fecha">
                                            <p>{timeago(datos["fecha"])}</p> 
                                    </div>
                                    <div className ="contenedor-user">
                                            <p>{datos["user"]}</p>
                                    </div>
                            </div>

                                <div className ="contenedor-titulo-pregunta">
                                    <h4>
                                        {ReactHtmlParser(datos["respuesta"])}
                                    </h4>         
                                </div>

                                {datos["url"]?
                                    <div className="Imagen-Pregunta">
                                        <a onClick = {()=> {                                                    
                                            const elems = document.querySelector(`#${datos["clave"]}`);
                                            const instance = M.Modal.init(elems,{"inDuration":0,"outDuration":0,"preventScrolling":false});
                                            }} className="modal-trigger" href={`#${datos["clave"]}`}><img src= {`${datos["url"]}`} alt="" /></a>
                                    </div>:""}

                                    <div >
                                        <div className={`modal modall ${datos["clave"]}`} id={`${datos["clave"]}`}>
                                            <div className="modal-content">
                                                <img  src= {`${datos["url"]}`} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    

                                    </div>
                                </div>
                            )
                        }
                    <div>
                </div>


            </div>
        </div>
    </div>

</div>
    )
}

export default withRouter(Respuestas) ;