import React from 'react' ;
import {Link} from 'react-router-dom'
import '../styles/UserContenedor.css'

class UserContenedor extends React.Component {
    render() {
        return (
            <div className  = "contenedor-card ">
                <div className  = "nombre-user">
                <h6>Te damos la bienvenida  </h6> <h5>{sessionStorage.getItem('user')}</h5>
                </div>
                <div className  = "link-compra-examen">
                <Link to = '' className ="btn btn-small ">compra examen</Link>
                </div>
            </div>
        )
    }
}

export default UserContenedor;