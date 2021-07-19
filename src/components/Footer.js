import React from 'react';
import '../styles/Footer.css'
import InputSuscripcion from './InputSuscripcion'
import TextoSuscripcion from './TextoLinkSuscripcion'




class Footer extends React.Component{
    render(){return(
      <div className ="suscription-mapa">
      <div className ="suscription">
        <div className ="text-suscription">
          <h1></h1>
        </div>
         <InputSuscripcion/>
      </div>
      <div className="mapa">
         <TextoSuscripcion/>
      </div>
    </div>
    )}
}

export default Footer ;