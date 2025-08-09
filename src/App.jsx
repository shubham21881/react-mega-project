import appwriteUrl from "./conf/conf"
import './App.css'
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import authService from "./appwrite/Auth"
import {login,logout}  from './store/authSlice'

function App() {
    const [loading,setloading]=useState(true)
    const dispatch= useDispatch()
    
    useEffect(()=>{
        authService.getCurrentUser()
        .then((userdata)=>{
          if(userdata){
            dispatch(login({userdata}))
          }else{
            dispatch(logout())
          }
        })
        .finally(()=> setloading(false))
    },[])




  return ! loading ? (<div></div>):(<div></div>)
}

export default App
