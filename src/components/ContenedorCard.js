import React from 'react';
import Card from '../components/Card'
import '../styles/ContenedorCard.css'
import ImagenCard1  from '../img/mat.jpg';
import ImagenCard2  from '../img/apre.jpeg';
import ImagenCard3  from '../img/stu.png';
import ImagenCard4  from '../img/nino.jpg';


class ContenedorCard extends React.Component {
    render() { return(
            <div className ="container contenedor-pub ">
                <div className ="contenedor-img-pub ">
                    <Card
                    img = {ImagenCard2}
                    titulo = "Examenes de selectividad" 
                    description = "En esta seccion podras ienes a clase"/>
                    <Card
                    img = {ImagenCard1}
                    titulo = "Anuncios" 
                    description = "Aqui encontraras en los distintos centros del paiz"/>
                    <Card
                    img = {ImagenCard3}
                    titulo = "Tecnicas de estudios" 
                    description = "Aqui te ensenaremos como concentrase y aprovechar"/>
                    <Card
                    img = {ImagenCard4}
                    titulo = "Tecnicas de estudios" 
                    description = "Aqui te ensenaremos como concentrase y aprovechar"/>
                 
                </div>
            </div>
    )}
}
export default ContenedorCard ;