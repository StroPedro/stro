import React from 'react';
import Formulario from './Formulario'



function FetchDatos(props){
const {datos} = props ;
const EnviarDatosform = (e) => {
    console.log(Formulario.datos)
    fetch('/api/create',{
        method: 'POST',
        body: JSON.stringify({
            content:Formulario.datos
        }),
        headers: {
            "Content-type": "application/json; charser-UTF-8"
        }
    }).then(response => response.json)
      .then(message => console.log(message))
}
}

export default FetchDatos ;