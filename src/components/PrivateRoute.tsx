import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {


    return (
        authToken ? <Outlet /> : <Navigate to='/auth/signin' />
    )
}

export default PrivateRoute