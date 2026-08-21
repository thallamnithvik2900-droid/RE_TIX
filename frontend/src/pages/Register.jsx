import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Notification from '../components/Notification';

const Register = () => {
    const { register, error, loading, setError } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'buyer' });

    const handleChange = (e) => {
        if (error) setError(null);
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await register({
                name: form.name,
                email: form.email,
                password: form.password,
                role: form.role
            });
            navigate('/dashboard');
        } catch (_) { }
    };

    return (
        <section className="form-page">
            <div className="form-card register-card">
                <Link to="/" className="back-link">← Back to Home</Link>
                <div className="register-brand">
                    <div className="register-icon">🎫</div>
                    <h1>Create Account</h1>
                    <p>Join ReTix and start your journey</p>
                </div>
                <div className="register-heading">
                    <h2>Register</h2>
                    <p>Create your account to get started</p>
                </div>
                <Notification message={error} type="error" />
                <form onSubmit={handleSubmit}>
                    <label>
                        Full Name
                        <input name="name" value={form.name} onChange={handleChange} required />
                    </label>
                    <label>
                        Email Address
                        <input type="email" name="email" value={form.email} onChange={handleChange} required />
                    </label>
                    <label>
                        Select Your Role
                        <select name="role" value={form.role} onChange={handleChange}>
                            <option value="buyer">🛍️ Buyer - Browse and purchase tickets</option>
                            <option value="seller">💼 Resale Seller - Sell unused tickets</option>
                            <option value="seller">🏢 Original Ticket Partner - Direct ticket sales</option>
                            <option value="verifier">✅ Verifier - Scan and verify tickets</option>
                            <option value="admin">🛠️ Admin - Platform management</option>
                        </select>
                    </label>
                    <label>
                        Password
                        <input type="password" name="password" value={form.password} onChange={handleChange} required minLength={6} />
                    </label>
                    <label>
                        Confirm Password
                        <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required minLength={6} />
                    </label>
                    <p className="register-terms">
                        By registering, you agree to our Terms of Service and Privacy Policy.
                    </p>
                    <button type="submit" className="primary-button" disabled={loading}>
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>
                <p className="login-link">
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </div>
        </section>
    );
};

export default Register;
