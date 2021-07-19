import React ,  {useState} from 'react'
import { Switch , Route, BrowserRouter,HashRouter  } from 'react-router-dom'
import Login from "./users/Login"
import RegisT from './RegisT'
import Profil from './users/Profil'
import {hasAuthentificated} from './services/AuthApi'
import Auth from './contexts/Auth'
import AuthentificatedRoute from './components/AuthentificatedRoute'
import Resptas from "./Resptas"
import Respuestas from "./pages/Respuestas"
import PageNotFoun from './pages/PageNotFoun'
import Materias from './pages/materias'
import ExamenesSelec from './ExamenesSelec'
import Homme from "./Homme"
import LLogin from "./LLogin"
import BBlog from './BBlog'
import DescargarExam from "./pages/DescargarExam"
import Examenes from './pages/materias'
import ExamenesCC from "./pages/examenesCC"
import ExamenesSC from "./pages/examenesSC"
import Photo from './pages/photo'
import analesCC from "./pages/analesCC"
import analesSC from "./pages/analesSC"


function App(){
    const [isAuthentificated , setIsAuthentificated] = useState(hasAuthentificated())
    return(
        <Auth.Provider value = {{isAuthentificated , setIsAuthentificated}} >
            <HashRouter>
                    <Switch>
                            <Route exact path = "/" component = {Homme }/>
                            <Route exact  path= "/registro" component = {RegisT}/>
                            <Route exact  path = "/iniciar" component = {LLogin}/>
                            <Route exact  path= "/preguntas" component = {BBlog}/>
                            <Route exact  path= "/materias" component = {Photo}/>
                            <Route exact  path= "/examenesCC/:id" component = {ExamenesCC}/> 
                            <Route exact  path= "/analesCC/:id" component = {analesCC}/> 
                            <Route exact  path= "/analesSC/:id" component = {analesSC}/> 
                            <Route exact  path= "/examenesSC/:id" component = {ExamenesSC}/> 
                            <Route exact  path= "/respuestas/:id" exact component = {Resptas}/>
                            <AuthentificatedRoute  path = "/profil" component = {Profil}/>
                            <Route   component = {PageNotFoun}/>                       
                    </Switch>
            </HashRouter> 
        </Auth.Provider>
    )
   
}

export default App;