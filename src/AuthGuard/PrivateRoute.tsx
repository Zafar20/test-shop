import { useEffect, type FC } from 'react'
import { Outlet, useNavigate } from "react-router-dom"
import { getUserData } from "../api/common"
import { userStore } from "../store/userStore"

const PrivateRoute:FC = () => {
    
    const access_token = localStorage.access_token
    const navigate = useNavigate()
    const { data } = getUserData()
    const { setUser } = userStore()
    
    useEffect(() => {
        if(data) {
            setUser(data)
        }
    }, [data])
    
    useEffect(() => {
        if(!access_token) {
            navigate('/login')
        }
    }, [])
    
  return <Outlet/>
}

export default PrivateRoute