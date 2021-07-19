import React from 'react'
import {Link} from 'react-router-dom'
import ImagenBanner  from '../img/apre.jpeg'
import '../styles/Banner.css'

class Banner extends React.Component {
    render() {
        return (
            // <div className ="pub container">
            //     <div className ="img-pub ">
                    <div className ="pub-img container">
                            <div className  = "link-a">
                            <h4 ></h4>
                                <div className  = "link-enlace">
                                <Link to = '' className ="btn btn-small">Registrate</Link>
                                <Link to = ''  className ="btn btn-small">Iniciar Session</Link>
                                </div>
                            </div>
                            <div className ="">
                            <img className ="" src={ImagenBanner}/>  
                            </div>
                    </div>  
            //     </div>
            // </div>          
        )
    }
}

export default Banner ;