import { Navigate, Outlet } from 'react-router-dom'




// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PrivateRoute = () => {
    const auth=localStorage.getItem('token') || sessionStorage.getItem('token')
    

    return (
        auth? <Outlet/>:<Navigate to ={'/login'} replace/>
    )
  }

  export default PrivateRoute

