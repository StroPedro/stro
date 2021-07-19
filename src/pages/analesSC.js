import React , {useEffect , useState} from "react"
import {useParams} from "react-router-dom"
import axios from "axios"




const analesSC = () => {
    const {id} = useParams()
    const [datos , setDatos] = useState([])
    const [materia , setMateria] = useState("")

    const TraerArchivo = async () =>{
        const data = await axios({
            method:"get",
            url:`/analesCC/${id}`,
        })

        console.log(data.data)
        const datosDelServidor = data.data
        setMateria(datosDelServidor)
    }

    useEffect(()=>{
        TraerArchivo()
        console.log(id)

    } , [])
    return(
        <div>
            
            <embed src= "http://127.0.0.1:5000/static/materias/ESPECIFICA_CCSS__junio_2017.pdf" type="application/pdf" />

        </div>
    )
}

export default analesSC