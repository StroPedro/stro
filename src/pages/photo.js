import React , {useState , useEffect} from "react"
import axios from "axios"

const Photo = () => {
    const [archivos , setArchivos] = useState(null) ;
    const [pdf , setPdf] = useState(null) ;
    const [materia , setMateria] = useState("matematicas") ;
    const [año , setAño] = useState("2020") ;
    const [mes , setMes] = useState("junio") ;
    const [grupo , setGrupo] = useState(null);
    const [ver , setVer] = useState(false);

    const handleChange = e =>{
        setArchivos(e)
    }

    const handleChangeRadio = event => {
        const target = event.target
        const name = target.name
        const value = target.value
  
        setGrupo(value)
        console.log(grupo)
    }

    const Archivo = e =>{
        setPdf(e)
    }

    const AgregarMat = async (e) => {
        e.preventDefault()
        console.log(grupo)
        console.log(materia)
        console.log(mes)
        console.log(año)
        console.log(pdf)
        const fs = new FormData()
        fs.append("file" , pdf[0])
        fs.append("año" , año)
        fs.append("mes" , mes)
        fs.append("materia" , materia)
        fs.append("face" , grupo)
        const respo = await axios.post("/materias" , fs , {headers :{"Content-Type":"multipart/form-data"}} )
        console.log(respo)
   }

    const EnviarArchivos = async  (e) => {
        e.preventDefault()
        for (let index = 0; index < pdf.length; index++) {
            fs.append("file" , pdf[index])
            
        }
        const respo = await axios.post("/lasfotos" , fs , {headers :{"Content-Type":"multipart/form-data"}} )
        console.log(respo)
    }
    return(
        <div>
            <form onSubmit = {EnviarArchivos}>
                <input type="file" name = "file" onChange={(e)=>handleChange(e.target.files)}/>
                <button>enviar</button>
             </form>
        <img src="http://127.0.0.1:5000/static/photos/MASCARILLA.jpg" alt="" />
        <embed src={`http://127.0.0.1:5000/static/materias/ESPECIFICA_CCSS__junio_2017.pdf`} type="application/pdf" />


        <form onSubmit = {AgregarMat}>
                <input type="text" name = "file" onChange={(e)=>handleChanges(e.target.files)}/>


                <div className ="input-field contenedor-input  col s12">
                            <select  className ="browser-default" onChange = {e =>{setGrupo(e.target.value) ;
                            if (grupo == "anales") {
                                setVer(false)
                            }else{
                                setVer(true)
                            }
                            }} >
                                <option  disabled selected>Elige el mes</option>
                                <option value = "anales">anales</option>
                                <option value= "examen">solo examen</option>
                            </select>
                </div>
                <p className ="contenedor-de-radio">
                    <label>
                    <input 
                    name="grupos" 
                    type="radio" 
                    value = 'especifica'
                    onChange = {handleChangeRadio}
                     />
                    <span>face especifica</span>
                    </label>
                </p>
                <p className ="contenedor-de-radio">
                    <label>
                    <input 
                    name="grupos" 
                    type="radio" 
                    value = "general"
                    onChange = {handleChangeRadio}
                     />
                    <span>face general</span>
                    </label>
                </p>
                <select  className ="browser-default" onChange = {(e) =>{setMateria(e.target.value)}}>
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
                <select  className ="browser-default" onChange = {(e) =>{setAño(e.target.value)}}>
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
                <select  className ="browser-default" onChange = {(e) =>{setMes(e.target.value)}}>
                    <option value="" disabled selected>Elige el mes</option>
                    <option value="junio">junio</option>
                    <option value="septiembre">septiembre</option>
                </select>

                <input type="file" name = "file" onChange={(e)=>Archivo(e.target.files)}/>
                <button type = "submit">enviar</button>
        </form>
        </div>
    )
}

export default Photo