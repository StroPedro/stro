import React from 'react';
import '../styles/InputSuscripcion.css'




class InputSuscripcion extends React.PureComponent{
    render(){return(
           <div className ="input-suscription">
            <form action="">
              <input type="text" placeholder="suscribete "/>
              <a className  ="waves-effect  btn btn-small">enviar</a>
            </form>
           </div>
    )}
}

export default InputSuscripcion ;