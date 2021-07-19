import React , {useEffect , useState} from "react"
import {useParams} from "react-router-dom"
import axios from "axios"




const ExamenesSC = () => {
    const {id} = useParams()
    const [datos , setDatos] = useState([])
    const [materia , setMateria] = useState("")
    const [verDatos , setVerDatos] = useState(false)

    const TraerArchivo = async () =>{
        const data = await axios({
            method:"get",
            url:`/examenesSC/${id}`,
        })

        console.log(data.data)
        const datosDelServidor = data.data
        if (data.data != "") {
            setVerDatos(true)
            setMateria(datosDelServidor)
        }
    }

    useEffect(()=>{
        TraerArchivo()
        console.log(id)

    } , [])
  
    return(
        <div>
            {verDatos?            
                <embed src = "https://www.amazon.es/clouddrive/share/HGVBgyxaozXwcn4vhi1hKH4sjbjvCjIYMpevfL6Pjr5" type="application/pdf" ></embed >
            :""}
        </div>
    )
}

export default ExamenesSC 