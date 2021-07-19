import React , {useEffect , useState} from "react"
import {useParams} from "react-router-dom"
import axios from "axios"
import "../styles/examenesCC.css"
import Pdf from "../img/EXAMEN HISTORIA AFRICA Y GE-1.pdf"




const ExamenesCC = () => {
    const {id} = useParams()
    const [datos , setDatos] = useState([])
    const [materia , setMateria] = useState([])

    const TraerArchivo = async () =>{
        const data = await axios({
            method:"get",
            url:`/examenesCC/${id}`,
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
        <div className="pdfVista">
            <iframe src ={Pdf} frameborder="0"></iframe>
        </div>
    )
}

export default ExamenesCC 