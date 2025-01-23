import React,{useState} from 'react'
import {jwtDecode} from 'jwt-decode'
import Admin from './Admin'
import Customer from './Customer'
import Runner from './Runner'

const Dashboard = () => {
  const token = localStorage.getItem('token')
  const user = jwtDecode(token).role
   
  return (
    <div>
       {
        user === "admin" ? (
            <Admin />
        ) : user === "runner" ? (
            <Runner />
        ) : (
            <Customer />
        )
       }
    </div>
  )
}

export default Dashboard