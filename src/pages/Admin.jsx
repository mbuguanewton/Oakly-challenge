import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import AdminDashboard from '../components/admin/AdminDashboard'
import AdminLogin from '../components/admin/AdminLogin'
import Navbar from '../components/common/Navbar'

function Admin() {
    const [admin, setAdmin] = useState(false)

    let isAdmin

    if (typeof window !== 'undefined') {
        isAdmin = localStorage.getItem('foodieAdmin')
    }

    useEffect(() => {
        if (isAdmin) {
            setAdmin(true)
        } else {
            setAdmin(false)
        }
    }, [isAdmin])

    return (
        <>
            <Navbar />
            <Box width='100%' height='auto' minHeight='90vh' p='20px'>
                {admin ? <AdminDashboard /> : <AdminLogin />}
            </Box>
        </>
    )
}

export default Admin
