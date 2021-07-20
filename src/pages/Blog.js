import React , {useState , useEffect , useContext} from "react";
import {CKEditor} from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { login , registrar } from "../services/AuthApi";
import axios from 'axios'
import {Link , withRouter} from 'react-router-dom'
import Auth from '../contexts/Auth'
import '../styles/blog.css'
import '../styles/paginacion.css'
import BarradeNavegacion from '../components/BarradeNavegacion'
import ReactHtmlParser from "react-html-parser"
import M from 'materialize-css'
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




const Blog = (props) => {
    const {history} = props

    const [user , setUser] = useState({
        email:'',
        contrasena:''
    })
    const [userR , setUserR] = useState({
        nombre:'',
        email:'',
        contrasena:''
    })
    const [respuestaDbR , setRespuestaDbR ] = useState('')
    const [preguntasTraidas , setPreguntasTraida] = useState([])
    const [respuestaDb , setRespuestaDb ] = useState('')
    const [paginaSiguiente , setPaginaSiguiente ] = useState(1)
    const [paginaAnterior , setPaginaAnterior ] = useState(1)
    const [totalPage , setTotalPage ] = useState(1)
    const [addData , setVal] = useState('')
    const {isAuthentificated , setIsAuthentificated} = useContext(Auth)
    const [probar , setProbar] = useState(true) 
    const [imagen , setImagen] = useState('') 
    const [preview, setPreview] = useState(""); 
    const [cargar, setCargar] = useState(false); 
    const [cargarPagina, setCargarPagina] = useState(false); 
    const [mensajeServidor, setMensajeServidor] = useState("");
    const [spinnerHacerPregunta, setSpinnerHacerPregunta] = useState(false);
    const [elegirForm, setElegirForm] = useState(true);
    const [datoBusqueda , setDatoBusqueda] = useState([]) 
    const [mensajeError , setMensajeError] = useState("");
    const [pageActual , setPageActual] = useState(1)
   

















   


    const handleChange = ({currentTarget}) => {
        const {name , value} = currentTarget;
        setUser({...user , [name] : value})
        
    }

    const handleChangeR = ({currentTarget}) => {
        const {name , value} = currentTarget;
        setUserR({...userR , [name] : value})
        console.log(userR)
    }


    const HacerPregunta = async (e) => {
        e.preventDefault()
        if (isAuthentificated) {
            setSpinnerHacerPregunta(true)
            console.log(addData)
            const fs = new FormData()
            fs.append("file" , imagen)
            fs.append("user" , window.sessionStorage.getItem('user'))
            fs.append("pregunta" , addData)
            fs.append("numresp" , 0)
            const respuesta = await axios.post("https://app-node-react.herokuapp.com/preguntas", fs , {headers :{"Content-Type":"multipart/form-data"}})
            const respuestaServidor = respuesta.data
            console.log(respuestaServidor)
            setMensajeServidor(respuestaServidor)
    
            if (respuestaServidor != "") {
                var toastHTML = '<span>'+ respuestaServidor + '</span>';
                M.toast({html: toastHTML})
            }

            setPreview("")
            setVal("")
            await TraerPreguntas()


        }else{
            
        }

    }



   const BuscarDatos = (e) => {
    setDatoBusqueda(e.target.value) 
    
   }
    const BuscarMateria = async (e) =>{
        e.preventDefault()
        const datos = await axios({
            method:'post' , 
            url : 'https://app-node-react.herokuapp.com/buscar_pregunta', 
            data: {'preguntaQueSeBusca':datoBusqueda}
        })
        
        console.log(datos.data)
        setPreguntasTraida(datos.data)
    }


   const CogerDatosEditorTexto = (e , editor) =>{
       const data = editor.getData()
       setVal(data)
       
   }


   const TraerPreguntas = async () =>{
    const datos = await axios({
        method:'get' , 
        url : 'https://app-node-react.herokuapp.com/coger-preguntas' , 
    })
    console.log(datos.data.docs , "ffffffffffffffffffffffff")
    setPreguntasTraida(datos.data.docs)
    setPaginaSiguiente(datos.data.nextPage)
    setPaginaAnterior(datos.data.prevPage)
    setTotalPage(datos.data.totalPages)
    setPageActual(datos.data.page)
    console.log(totalPage, "gggggggggggggggggggggggggggggg")
    if (datos.data.docs) {
        setCargar(true)
        setSpinnerHacerPregunta(false)
    }else{
        setCargar(false)
    }
    console.log(datos.data)
    
  }

  const TraerPreguntasConPaginacion = async (id) =>{
    const datos = await axios({
        method:'get' , 
        url : `https://app-node-react.herokuapp.com/coger-preguntas-paginacio/${id}` , 
    })
    console.log(datos.data.docs)
    setPreguntasTraida(datos.data.docs)
    setPaginaSiguiente(datos.data.nextPage)
    setPaginaAnterior(datos.data.prevPage)
    setTotalPage(datos.data.totalPages)
    setPageActual(datos.data.page)
    if (datos.data.docs) {
        setCargar(true)
        setSpinnerHacerPregunta(false)
    }else{
        setCargar(false)
    }
    console.log(datos.data)
    
  }


  const handleChangeImagen = e =>{
    setImagen(e)
  }
  
       

const PaginacionPage = () => {
        const y = []
        var w = ""
     
            for (let i = 0; i < totalPage; i++) {
                var e = i+1
                y.push(e)

                if (pageActual == i+1) {
                }else{
                    
                }
            }
        console.log(w)

        const lista = y.map((x)=>(
            <>
                {pageActual==x?
                <li  class = "active paginacion-boton" ><a href="#!" onClick = { () =>{ 
                    const val = "e"+ x ;
                    TraerPreguntasConPaginacion(val)}
                } >{x}</a>
                </li>
                :
                <li  class = "paginacion-boton " ><a href="#!" onClick = { () =>{ 
                    const val = "e"+ x ;
                    TraerPreguntasConPaginacion(val)}
                } >{x}</a>
                </li>
                }
  
            </>

            )                          
        )
        console.log(lista)
    return(
        <ul class="pagination">
            {paginaAnterior?
            <li class="waves-effect"><a href="#!" onClick = { () =>{ 
                const val = "p"+ paginaAnterior ;
                TraerPreguntasConPaginacion(val)}
               }><i class="material-icons">chevron_left</i></a>
            </li>
            :
            <li class="disabled"><a href="#!" 
               ><i class="material-icons">chevron_left</i></a>
            </li>
            }


            {lista}
            
            
            {paginaSiguiente?
            <li class="waves-effect"><a href="#!"
             onClick = { () =>{ 
                const val = "n"+ paginaSiguiente ;
                TraerPreguntasConPaginacion(val)}
               }
            ><i class="material-icons">chevron_right</i></a></li>
            :
            <li class="disabled"><a href="#!" ><i class="material-icons">chevron_right</i></a></li>
            }

        </ul>
    )
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

        if (document.readyState == "loading") {
            console.log(cargarPagina)

        }else{
            
            setCargarPagina(true)
        }
},[imagen] )


useEffect(()=>{
    
    TraerPreguntas()
    
} , [])

return (
    
<div>
    <BarradeNavegacion/>


    <div className ="contenedor-buscar">
        <form onSubmit = {BuscarMateria}  className ="formulario-buscar" action="/articulos_pc" method="POST">
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


    <div className = 'contenedor-pub'>
            <div className="container-img-pub  " >
                <div className ="row formulario-contenedor-text-editor " >
                    <div className ="col s12 texto-encabezado-formulario">
                        <p>publica tu problema</p>
                    </div>
                    <form className ="formulario" onSubmit ={HacerPregunta}  >
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
                        <button type="submit" className=" btnn btn-small">Publicar</button>:                               
                        <a onClick = {()=>{setMensajeError("por favor inicia session")}}  className="btnn btn-small">Publicar </a>}                                                  

                    </form>
                </div>
                    <div className="previsualizacion margen-abajo">
                        <div className="previsualizacion-50">
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

                    <div className ="texto-encabezado-pregunats-recientes">
                        <p>Mas recientes</p>
                    </div>
                {cargar?
                    preguntasTraidas.map((datos)=>
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
                                    <div className="contenedor-ver-imagen">
                                        <a onClick = {()=> {                                                    
                                            const elems = document.querySelector(`#${datos["clave"]}`);
                                            const instance = M.Modal.init(elems,{"inDuration":0,"outDuration":0,"preventScrolling":false});
                                            }} className="modal-trigger" href={`#${datos["clave"]}`}><img src= {`${datos["url"]}`} alt="" />
                                        </a>
                                        <a onClick = {()=> {                                                    
                                            const elems = document.querySelector(`#${datos["clave"]}`);
                                            const instance = M.Modal.init(elems,{"inDuration":0,"outDuration":0,"preventScrolling":false});
                                            }}
                                            className="ver-imagen modal-trigger" href={`#${datos["clave"]}`}><i className=" material-icons">visibility</i></a>
                                    </div>

                                            
                                </div>:""}

                                <div >
                                        <div className={`modal modall ${datos["clave"]}`} id={`${datos["clave"]}`}>
                                            <div className="modal-content">
                                                <img  src= {`${datos["url"]}`} alt="" />
                                            </div>
                                        </div>
                                </div>
                        

                                <div className ="contenedor-ver-y-responder">
                                    <div className ="contenedor-numero-respuestas">
                                        <p> <span>{datos["numresp"]} </span> respuestas</p>
                                    </div>
                                    <div className="contenedor-ver-mas">
                                        <Link to = {`/respuestas/${datos["_id"]}`} className ="btn btn-small">respo.</Link>
                                    </div>
                                    <div className ="contenedor-responder">
                                    </div>
                                </div>



                            </div>
                        </div>
                        ):

                        <div className ="estilos-spiner container">
                            <div className ="contenedor-spinner">
                            <Loader
                                    type="TailSpin"
                                    color="#0d47a1"
                                    secondaryColor = "#0d47a1"
                                    height={40}
                                    width={40}        
                            />
                            </div>
                        </div>
                }




        </div>
    </div>
    <div className="paginacion">
        <PaginacionPage/>
     </div>        
</div>
    )
}
export default withRouter(Blog);