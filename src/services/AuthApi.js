import jwtDecode from 'jwt-decode'
import axios from 'axios'
import {getItem , addItem , removeItem} from './LocalStorage'
import {Clave } from '../components/clave'
import {useState} from 'react'


export function hasAuthentificated(){
    const token = getItem('miniblog');
    const tokenIsVal = token ? tokenIsValid(token) : false;
    if (false === tokenIsVal) {
        removeItem('miniblog')     
    }
    else{ 
        return tokenIsVal ;
    }
 
}

export function  login(credentials){
                if(credentials == Clave){
                    addItem('miniblog' , credentials)
                    return true;
                }
                addItem('respuseta' , credentials)
                return false;
           
}


export function registrar(credentials){
               if(credentials == Clave){
                    addItem('miniblog' , credentials)
                    console.log(credentials)
                    return true ;
               }
               return false ;
         
}


export function logout(){
    removeItem('miniblog')
}

function tokenIsValid(token){
    const clave = Clave;
    if(clave === token) {
        return true ;
    }

    return false;
}

