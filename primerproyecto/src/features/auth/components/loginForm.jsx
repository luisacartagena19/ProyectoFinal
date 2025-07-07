import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import '../../../shared/estiloLanding.css';

const LoginForm = () => {
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { login, isLoading, error } = useAuth();
    const navigate = useNavigate();

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setEmailError('Formato de correo inválido');
        } else {
            setEmailError('');
        }
    };

    const validatePassword = (value) => {
        if (value.length > 10) {
            setPasswordError('No más de 10 caracteres');
        } else {
            setPasswordError('');
        }
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        validateEmail(value);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        validatePassword(value);
    };

    const handleSubmit = async (a) => {
        a.preventDefault();
        if (emailError || passwordError) return;
        const result = await login({ email, password });
        if (result && !result.error) {
            navigate('/dashboard');
        }
    };

    const isSubmitDisabled = isLoading || emailError || passwordError;

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                
                <h2>Iniciar Sesión <img src="/src/assets/login.png" alt="Icono de login" className="login" /></h2>  
                
                {/* error si existe */}
                {error && <div className="error-message">{error}</div>}

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        placeholder="usuario@ejemplo.com"
                    />
                    {emailError && <div className="error-message">{emailError}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        placeholder="Tu contraseña"
                    />
                    {passwordError && <div className="error-message">{passwordError}</div>}
                </div>

                <button type="submit" disabled={isSubmitDisabled} className="login-button">
                    {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
                </button>

                <div className="login-info">
                    <p>Para pruebas usar:</p>
                    <p>Email: maria@mail.com</p>
                    <p>Contraseña: 12345</p>
                </div>
                <div style={{ marginTop: '15px', textAlign: 'center' }}>
                    <Link to="/" className="btn-landing-link">Volver a Landing</Link>
                </div>
            </form>
        </div>
    );

}

export default LoginForm;
