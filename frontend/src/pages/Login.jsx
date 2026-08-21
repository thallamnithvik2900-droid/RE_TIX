import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Notification from '../components/Notification';

const Login = () => {
    const { login, error, loading } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(form);
            navigate('/dashboard');
        } catch (_) { }
    };

    return (
        <section className="form-page">
            <div className="form-card">
                <h2>Welcome Back</h2>
                <p>Login to access your Re-Tix dashboard and secure ticket transfers.</p>
                <Notification message={error} type="error" />
                <form onSubmit={handleSubmit}>
                    <label>
                        Email
                        <input type="email" name="email" value={form.email} onChange={handleChange} required />
                    </label>
                    <label>
                        Password
                        <input type="password" name="password" value={form.password} onChange={handleChange} required />
                    </label>
                    <button type="submit" className="primary-button" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Login;
