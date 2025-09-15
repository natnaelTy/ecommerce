import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'



export default function AdminRoute({ children }) {
  const { admin } = useSelector((state) => state.admin)

  if (!admin || admin.role !== 'ADMIN') {
    return <Navigate to="/admin-login" />
  }

  return children
}
