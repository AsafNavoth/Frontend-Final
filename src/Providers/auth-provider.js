import {createContext, useEffect, useState} from "react";

export const AuthContext = createContext(null);

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);

    // Set user credentials using localStorage in case of refresh/close
    useEffect(() => {
        const str = localStorage.getItem('credentials')
        if (str) {
            setUser(JSON.parse(str))
        }
    }, []);

    const signIn = (user) => {
        // Check if valid
        setUser(user)
        localStorage.setItem('credentials', JSON.stringify(user))
    }

    const signOut = () => {
        setUser(null);
        localStorage.removeItem('credentials')

    }

    const value = {user, signIn, signOut}

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}