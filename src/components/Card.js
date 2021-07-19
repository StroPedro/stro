import React from 'react';

import {Link} from 'react-router-dom'

class Card extends React.Component {
    render() { 
        const {img , titulo, description} = this.props;
        return(
        <div className ="contenedor-50">
            <Link className ="card targeta" to="#">
                <div className ="card-image waves-effect waves-block waves-light">
                    <img className ="activator" src={img}/>
                </div>
            </Link>
            <div className ="targeta-link">
                <Link to="/preguntas">{titulo}</Link>
                <h6>{description}</h6>
            </div>
        </div>
    )}
}

export default Card;