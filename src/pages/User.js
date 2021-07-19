import React , {useState , useEffect} from 'react'
import axios from "axios"
import BarradeNavegacion from '../components/BarradeNavegacion'
import Footer from '../components/Footer'
import UserContenedor from '../components/UserContenedor'
import CollectionExamenes from '../components/CollectionExamenes'
import '../styles/User.css'


const User = () =>{

      return (
            <div>
                <BarradeNavegacion/>
                <div className="container">
                    <div>
                        <UserContenedor/>
                        <CollectionExamenes/>
                    </div>
                </div>
            </div>
        )
}


export default User; 