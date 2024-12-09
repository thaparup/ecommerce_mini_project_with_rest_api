import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
import { RootState } from '../states/store/store'

const PrivateRoute = () => {

    const authToken = useSelector((state: RootState) => state.auth)

    return (
        JSON.stringify(authToken.auth) === "{}" ? <Navigate to='/auth/signin' /> : <Outlet />
    )
}

export default PrivateRoute