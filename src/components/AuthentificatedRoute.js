import Auth from '../contexts/Auth'
import React , {useContext} from 'react'
import  { Redirect ,Route} from 'react-router-dom'


const AuthentificatedRoute = ({path , component})  => {
    const { isAuthentificated } = useContext(Auth);

    return isAuthentificated ? (
        <Route exact path = {path} component = {component}/>
    ) : (
        <Redirect to = '/iniciar'/>
    )
}

export default AuthentificatedRoute ;