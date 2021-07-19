import React , {useState , useEffect , useContext} from "react";
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'


const Blo = () => {
    if(isAuthentificated == true){
        console.log('conectado')
        const datos = await axios({
            method:'post',
            url:'/preguntas' ,
            data:{'pregunta':addData , 'user':'francis' , 'fecha':'331'}
        })
        setProbar(isAuthentificated)
    }else{
    setProbar(isAuthentificated)
    console.log(probar)
    }

   return (
       
        <div>

<BarradeNavegacion/>
<div>
    <h1>sdsdds</h1>
</div>
<div className = 'contenedor-pub'>
    <div className="container-img-pub container " >

    <div className ="row formulario-contenedor-text " >
    <div className ="col s12 texto-encabezado-formulario">
        <p>elige el grupo</p>
    </div>
    <div id = 'editor'>
    <CKEditor editor= {ClassicEditor} />
    </div>
    <form className ="formulario" >

        <div className ="input-field contenedor-input  col s12">
            <input 
            type="text" 
            className ="input-text" 
            name="articulo" required
            placeholder="Escribe el nombre del articulo" />
        </div>
        <button 
        className ="btn btn-small" 
        type="submit" 
        >
         enviar
        </button>
    </form>
</div>
    {(!probar && (
        <>
    <div className ="row   formulario-contenedor-iniciar-seccion-pregunta ">
    <div className ="col s12 texto-encabezado">
        <h4>inicia session</h4>
    </div>
    <form className ="formulario" >
        <Input
        nombre = "email"
        type = "email"
        
        />
        <Input
        nombre = "contrasena"
        type = "password"
       
        />
        <div className="respuestaError">
            <p></p>
        </div>
        <BotonSubmit/>
    </form>
    </div>
        </>
    )) ||
    (
        <>
        

        <div className ="estilos-preguntas">
        <div className ="contenedor-titulo-fecha-pregunta">
        <div className ="contenedor-titulo-fecha">
            <div className ="contenedor-fecha">
                <p>hace 10 min</p>
            </div>
            <div className ="contenedor-user">
            <p></p>
            </div>
        </div>
        <div className ="contenedor-titulo-pregunta">
            <h4>Monsieur le DIRECTEUR je reviens vers vous pour affirmer notre accord de príncipe suite a nos echanges recents ; portant sur votre solicitude de nos prestation au sein de votre ecole de formation qui est un organismo no 
                lucrative. En effet il est question pour vous que l’entreprise HTP Expert assure </h4>
        </div>
        <div className ="contenedor-ver-y-responder">
            <div className ="contenedor-numero-respuestas">
                <p><span>65</span> respuestas </p><a href="/respuesta " className ="btn btn-small">responder</a>
            </div>
            <div className ="contenedor-responder">
            </div>
        </div>
        </div>
        </div>
        </>
    )}


    <div className ="estilos-preguntas">
            <div className ="contenedor-titulo-fecha-pregunta">
            <div className ="contenedor-titulo-fecha">
                <div className ="contenedor-fecha">
                    <p>hace 10 min</p>
                </div>
                <div className ="contenedor-user">
                   <p>pedro</p>
                </div>
            </div>
            <div className ="contenedor-titulo-pregunta">
                <h4>Monsieur le DIRECTEUR je reviens vers vous pour affirmer notre accord de príncipe suite a nos echanges recents ; portant sur votre solicitude de nos prestation au sein de votre ecole de formation qui est un organismo no 
                    lucrative. En effet il est question pour vous que l’entreprise HTP Expert assure </h4>
            </div>
            <div className ="contenedor-ver-y-responder">
                <div className ="contenedor-numero-respuestas">
                <p> <span>65</span> respuestas </p><a href="/respuesta " className ="btn btn-small">responder</a>
                </div>
                <div className ="contenedor-responder">
                </div>
            </div>
            </div>
    </div>

    <div className ="estilos-preguntas">
            <div className ="contenedor-titulo-fecha-pregunta">
            <div className ="contenedor-titulo-fecha">
                <div className ="contenedor-fecha">
                    <p>hace 10 min</p>
                </div>
                <div className ="contenedor-user">
                   <p>pedro</p>
                </div>
            </div>
            <div className ="contenedor-titulo-pregunta">
                <h4>ftctrc rfrct tfctftv  tfctcffr trctrctrd rtctrdxctdrc trctrfcrtdt  tftctdrc trcftf trfct trctrc quien me puede desir la formula de pitagoras quien me puede desir la formula de pitagoras</h4>
            </div>
            <div className ="contenedor-ver-y-responder">
                <div className ="contenedor-numero-respuestas">
                <p> <span>65</span> respuestas </p><a href="/respuestas/ " className ="btn btn-small">ver</a>
                </div>
                <div className ="contenedor-responder">
                <a href="/respuesta" className ="btn btn-small">responder</a>
                </div>
            </div>
            </div>
    </div>


    <div className ="estilos-preguntas">
            <div className ="contenedor-titulo-fecha-pregunta">
            <div className ="contenedor-titulo-fecha">
                <div className ="contenedor-fecha">
                    <p>hace 10 min</p>
                </div>
                <div className ="contenedor-user">
                   <p>pedro</p>
                </div>
            </div>
            <div className ="contenedor-titulo-pregunta">
                <h4>quien me puede desir la formula de pitagoras quien me puede desir la formula de pitagoras<a href="/respuestas/">leer mas</a></h4>
            </div>
            <div className ="contenedor-ver-y-responder">
                <div className ="contenedor-numero-respuestas">
                <p> <span>65</span> respuestas </p><a href="/respuestas/ " className ="btn btn-small">ver</a>
                </div>
                <div className ="contenedor-responder">
                <a href="/respuesta" className ="btn btn-small">responder</a>
                </div>
            </div>
            </div>
    </div>

    </div>
    
</div>
            
        </div>
    )
}
export default Blo;