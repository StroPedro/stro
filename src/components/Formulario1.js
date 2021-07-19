import React from 'react'
import '../styles/Formulario.css'
import Input from './Input'
import BotonSubmit from './BotonSubmit'
import  BarradeNavegacion from './BarradeNavegacion'
import FetchDatos from './FetchDatos'


class Formulario extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre:''  ,
            apellidos:''
        }
        this.FuncionCambio = this.FuncionCambio.bind(this);
        this.Enviar = this.Enviar.bind(this);
        this.datos = this.datos.bind(this);

    }
    componentDidMount(){


    }
    Enviar(e){
        e.preventDefault();
        fetch('/form1',{
            method: 'POST',
            body: JSON.stringify({
                content: this.state
            }),
            headers: {
                "Content-type": "application/json; charser-UTF-8"
            }
        }).then(response => response.json())
          .then(message => {
                sessionStorage.setItem("user" , message)
            }) 
              
              
    }
    FuncionCambio(e){
         this.setState({
             [e.target.name]: e.target.value
         })
    }
    datos(){
        return this.state;
    }
    render() 
    {
        if(sessionStorage.getItem('user') != null){
            return (
                <div>
                 < BarradeNavegacion/>
                </div>
            )
        }
        else{
            return (
                <div>
                 <div>
                     < BarradeNavegacion/>
                 </div>
               
                <div className ="row formulario-contenedor   ">
                    <div class="col s12 texto-encabezado">
                        <h4>inicia session</h4>
                        {sessionStorage.getItem('user')}
                    </div>
                    <form className ="formulario" onSubmit={this.Enviar}>
                        <Input
                         value = {this.state.nombre}
                         nombre = "nombre"
                         type = "text"
                         onChange={this.FuncionCambio}/>
                        
                        <Input
                         value = {this.state.apellidos}
                         nombre = "apellidos"
                         type = "password"
                         onChange={this.FuncionCambio}/>
    
                        <BotonSubmit
                                    Links = "/user"/>
                    </form>
                </div>
                </div>
            )
        }

    }
}

export default Formulario;