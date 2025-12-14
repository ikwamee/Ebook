import { useContext, useState } from 'react';
import './LoginPage.css';
import { UserContext } from '../context/UserContext';

function LoginPage({ setCurrentPage }) {
    const { loginUser } = useContext(UserContext);
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.username.trim() || !formData.password.trim()) {
            setError('Username and password are required');
            return;
        }

        const result = loginUser(formData.username, formData.password);
        if (result.success) {
            setFormData({ username: '', password: '' });
            setCurrentPage('home');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="login-page">
            <button className="back-button" onClick={() => setCurrentPage('welcome')}>← Back</button>
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                {error && <div className="error-message">{error}</div>}
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Username" 
                    value={formData.username}
                    onChange={handleChange}
                    required 
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={formData.password}
                    onChange={handleChange}
                    required 
                />
                <h3>
                    <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('signin'); }}>
                    Don't have an account? Register here.
                    </a>
                </h3>
                <button type="submit" className="login-button">LogIn</button>
            </form>
        </div>
    );
}

export default LoginPage;