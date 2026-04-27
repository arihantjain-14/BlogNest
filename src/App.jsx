import { useEffect, useState } from 'react'
import {useDispatch} from "react-redux"
import authservice from "./appwrite/Auth"
import {login,logout} from "./store/authSlice"
import {Header,Footer} from "./components/index"
import './App.css'
import { Outlet,useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

function App() {
  const [loading,setLoading] = useState(true);
  const themeStatus = useSelector((state)=> state.theme.themeMode)
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);

  useEffect(()=>{
    authservice.getUserAccount()
    .then((userdata)=>{
      if(userdata){
        dispatch(login(userdata))
      }
      else{
        dispatch(logout());
      }
    })
    .finally(()=>{
      setLoading(false);
    })
  },[])

  useEffect(()=>{
    document.querySelector('html').classList.remove("light","dark");
    document.querySelector('html').classList.add(themeStatus);
  },[themeStatus])

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <div className={`page-wrapper ${isAuthPage ? 'page-wrapper-auth' : ''}`}>
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
