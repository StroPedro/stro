import React from 'react';
import '../styles/Input.css'


function Input(props){
    const {nombre , value , onChange , type} = props ;
    return(
        <div className ="input-field input-text-text col s12">
             <input className ="input-text" type="text" 
             name={nombre}
             value={value}
             type={type}
             onChange = {onChange}/>
        </div> 
    )
}

export default Input;