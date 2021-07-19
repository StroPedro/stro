import React from 'react'
import '../styles/Link.css'
import {Link} from 'react-router-dom'

function Enlaces(props){
    const {titulo , link , clase} = props ;
    return (
        <li><Link to={link} className = {clase} >{titulo}</Link></li>
    )
}

export default Enlaces ;