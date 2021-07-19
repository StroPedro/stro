import React from 'react';
import '../styles/AbajoFooter.css'





class AbajoFooter extends React.PureComponent{
    render(){return(
        <div className ="suscription-mapa">
        <div className ="suscription">
          <div className ="text-suscription">
            <h1></h1>
          </div>
           <InputSuscripcion/>
        </div>
        <div className ="mapa">
           <TextoSuscripcion/>
        </div>
      </div>
    )}
}

export default AbajoFooter ;