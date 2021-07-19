import React , {useEffect , useState} from "react"
import {useParams} from "react-router-dom"
import axios from "axios"




const analesCC = () => {
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
            {setMateria.map((data)=><iframe src= {`/static/materias/ESPECIFICA_CCSS__junio_2017.pdf`} type="application/pdf" />)}
        </div>
    )
}

export default analesCC