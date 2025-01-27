import React,{useState,useEffect} from 'react'
import {jwtDecode} from 'jwt-decode'
import Admin from './Admin'
import Customer from './Customer'
import Runner from './Runner'

const Dashboard = () => {
   const [user, setUser] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const { role } = jwtDecode(token); // Safely decode the token
        setUser(role);
      } catch (error) {
        console.error('Failed to decode token:', error);
        // Optionally handle the invalid token case here, like logging out the user
      }
    }
  }, []);
  
   
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