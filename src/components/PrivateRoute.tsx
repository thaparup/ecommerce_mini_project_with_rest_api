import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
import { RootState } from '../states/store/store'
import { useIsTokenExpired } from '../hooks/useIsTokenExpired'

const PrivateRoute = () => {


    const isTokenExpired = useIsTokenExpired()
    return (
        isTokenExpired ? <Navigate to='/auth/signin' /> : <Outlet />
    )
}

export default PrivateRoute