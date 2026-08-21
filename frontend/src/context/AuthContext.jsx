import { createContext, useContext, useEffect, useState } from 'react';
import { login as loginRequest, register as registerRequest } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('reTixUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const saveUser = (data) => {
        const userData = { id: data.id, name: data.name, email: data.email, role: data.role };
        localStorage.setItem('reTixToken', data.token);
        localStorage.setItem('reTixUser', JSON.stringify(userData));
        setUser(userData);
    };

    const login = async (credentials) => {
        setLoading(true);
        setError(null);
        try {
            const data = await loginRequest(credentials);
            saveUser(data);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const register = async (values) => {
        setLoading(true);
        setError(null);
        try {
            const data = await registerRequest(values);
            saveUser(data);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('reTixToken');
        localStorage.removeItem('reTixUser');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, register, logout, setError }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
