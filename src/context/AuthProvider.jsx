import React, { createContext, useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../utils/localStorage'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        // 1) Check if we already have employees/admin in localStorage
        const existingEmployees = localStorage.getItem('employees')
        const existingAdmin = localStorage.getItem('admin')

        // 2) If nothing is there, setLocalStorage() with your default data
        if (!existingEmployees || !existingAdmin) {
            setLocalStorage() 
        }

        // 3) Now read employees from localStorage (possibly updated)
        const { employees } = getLocalStorage()
        setUserData(employees)
    }, [])

    return (
        <AuthContext.Provider value={[userData,setUserData]}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
