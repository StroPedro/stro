import React , {useState , useEffect } from "react"
import {useParams} from "react-router-dom"
import "../styles/materiaPdf.css"
import Loader from "react-loader-spinner";

const MostrarMateria = () => {
    const {id} = useParams()

    useEffect(()=>{
        const altura = screen.height;
        const alturaEnpixel = altura + "px"
        const al = document.documentElement.scrollHeight
        const alt = al + "px"
        const ancho = screen.width;
        console.log(al)
        document.getElementById("p2").style.background = "#fff"
        document.getElementById("p2").style.height = `${alt}`

    } , [])
    return(
   
        
<div className ='spinner-contenedor'> 

<div className="content-spinerr">
        <div className="loader">
                <span></span>
        </div>

</div>





<div className="no-ver">
<div className="spinner-contenedor" id = "p2">

<Loader
        type="TailSpin"
        color="#0d47a1"
        height={50}
        width={50}
         
/>

</div>


<Loader
        type="Bars"
        color="#00BFFF"
        height={100}
        width={100}
         
/>
<Loader
        type="Circles"
        color="#00BFFF"
        height={100}
        width={100}
         
/>
<Loader
        type="Circles"
        color="#00BFFF"
        height={100}
        width={100}
         
/>
<Loader
        type="Audio"
        color="#00BFFF"
        height={100}
        width={100}
         
/>

<Loader
        type="Oval"
        color="#00BFFF"
        height={100}
        width={100}
         
/>

<Loader
        type="Rings"
        color="#00BFFF"
        height={100}
        width={100}
         
/>

<Loader
        type="TailSpin"
        color="#00BFFF"
        height={50}
        width={50}
         
/>

<Loader
        type="ThreeDots"
        color="#00BFFF"
        height={100}
        width={100}
         
/>

</div>
</div>

    )
}

export default MostrarMateria