import { Outlet, Navigate } from 'react-router-dom'
import { useIsTokenExpired } from '../hooks/useIsTokenExpired'

const PrivateRoute = () => {


    const isTokenExpired = useIsTokenExpired()
    return (
        isTokenExpired ? <Navigate to='/auth/signin' /> : <Outlet />
    )
}

export default PrivateRoute