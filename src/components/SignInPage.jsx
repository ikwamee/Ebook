import { useContext, useState } from 'react';
import './SignInPage.css';
import { UserContext } from '../context/UserContext';

function SignInpage({ setCurrentPage }) {
    const { signUpUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!formData.username.trim() || !formData.email.trim() || !formData.password.trim()) {
            setError('All fields are required');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Invalid email address');
            return;
        }

        const result = signUpUser(formData.username, formData.email, formData.password);
        if (result.success) {
            setSuccess(result.message);
            setFormData({ username: '', email: '', password: '', confirmPassword: '' });
            setTimeout(() => {
                setCurrentPage('login');
            }, 1500);
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="Sign-page">
            <button className="back-button" onClick={() => setCurrentPage('welcome')}>← Back</button>
            <form className="Sigin-form" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Username" 
                    value={formData.username}
                    onChange={handleChange}
                    required 
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required 
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="New Password" 
                    value={formData.password}
                    onChange={handleChange}
                    required 
                />
                <input 
                    type="password" 
                    name="confirmPassword" 
                    placeholder="Re-enter Password" 
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required 
                />
                <h3>
                    <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('login'); }}>
                    Already have an account? SignIn here.
                    </a>
                </h3>
                <button type="submit" className="login-button">Sign-Up</button>
            </form>
        </div>
    );
}

export default SignInpage;