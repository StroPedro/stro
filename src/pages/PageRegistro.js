import React from 'react';
import Footer from '../components/Footer'
import Registro from '../users/Registro'
import BarradeNavegacion from '../components/BarradeNavegacion'


class PageRegistro extends React.Component {
    render() { return(
        <div className="alargar-heig">
            <BarradeNavegacion/>
            <Registro/>
            <Footer/>
        </div>
    )}
}

export default PageRegistro ;