import React , { useContext , useEffect} from 'react' 
import Auth from '../contexts/Auth'
import '../styles/BarradeNavegacion.css'
import {Link} from 'react-router-dom'
import Enlaces from './Enlaces'
import M from 'materialize-css'
import Side from "./sideNav"
import {logout} from '../services/AuthApi'

const BarradeNavegacion = () =>{
  const {isAuthentificated , setIsAuthentificated} = useContext(Auth)

  const handleClick = () => {
    logout()
    setIsAuthentificated(false)
    console.log('deconecte')
   
}
  if (isAuthentificated) {
    return (
      <div>
        <Side></Side>
      <div className="navbar-fixed">
      
      <nav >
        <div className="nav-wrapper container">
              <Link to="/" className = "brand-logo left ">  M </Link>              
          <ul id="nav-mobile" className ="right hide-on-med-and-down">  
              <Enlaces
              titulo = "Blog"
              link = "/preguntas"
              clase = ""
              /> 
              <Enlaces
              titulo = {window.sessionStorage.getItem('user')}
              link = "/user"
              clase = ""
              />  
              <li>< Link onClick = {handleClick}> Salir </Link> </li>           
          </ul>     
          <a href="#" data-target="slide-out" className ="sidenav-trigger right menu-btn"><i className ="material-icons grey-text ">menu</i></a>             
        </div>
      </nav>
         
    </div>
      </div>
     )
  }
  return (
    <div>
 
     <Side></Side>
        <div className="navbar-fixed">
          <nav >
            <div className="nav-wrapper container">
                  <Link to="/" className = "brand-logo left ">  M </Link>              
              <ul id="nav-mobile" className ="right hide-on-med-and-down"> 
                  <Enlaces
                  titulo = "Iniciar"
                  link = "/iniciar"
                  clase = ""
                  />
                  <Enlaces
                  titulo = "Registrarse"
                  link = "/registro"
                  clase = ""
                  /> 
                  <Enlaces
                  titulo = "Blog"
                  link = "/preguntas"
                  clase = ""
                  />                
              </ul>     
              <a href="#" data-target="slide-out" className="sidenav-trigger right menu-btn"><i className ="material-icons grey-text ">menu</i></a>             
            </div>
          </nav>
      </div>
    </div>
  )
}

export default BarradeNavegacion ;