import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "./Header";
import kitty from '../images/kitty2.gif';

const validateForm = (login, password, repeat_password) => {
    const errors = {};
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    if (!login) {
        errors.login = 'Please enter login';
    } else if (!alphanumericRegex.test(login)) {
        errors.login = 'Login can contain only letters and numbers';
    }
    if (!password) {
        errors.password = 'Please enter password';
    } else if (password.length < 5) {
        errors.password = 'Password must be 6 characters or longer';
    } else if (password !== repeat_password) {
        errors.password = 'Passwords don’t match';
    } else if (!alphanumericRegex.test(password)) {
        errors.password = 'Password can contain only letters and numbers';
    }
    return errors;
};

const Register = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [repeat_password, setRepeat_password] = useState('');
    const [loginError, setLoginError] = useState(''); 
    const [passwordError, setPasswordError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("id") !== null) {
            navigate("/main");
        }
    }, []); 
    const onButtonClick = async (e) => {
        e.preventDefault();
        setLoginError(''); 
        setPasswordError('');
        setErrorMessage('');

        const errors = validateForm(login, password, repeat_password);
        if (errors.login) setLoginError(errors.login);
        if (errors.password) setPasswordError(errors.password);
        if (Object.keys(errors).length > 0) return;

        const requestData = { login, password }; 
        try {
            const response = await fetch('http://localhost:8080/web4/register', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            }); 
            const result = await response.json();
            if (response.ok) {
                localStorage.setItem("id", result.message); 
                navigate('/main');
            } else {
                setErrorMessage(result.message);
            }
        } catch (error) {
            setErrorMessage("Network error: " + error);
        }
    };

    return (
        <div className="registration-page">
            <Header />
            <div className="form-container">
                <div className="title-container">
                    <h2>Registration</h2>
                </div>
                <div className="input-container">
                    <input  
                        value={login}
                        placeholder="Enter your login here"
                        onChange={(ev) => setLogin(ev.target.value)}
                        className="input-box"
                    />
                    <label className="error-label">{loginError}</label>
                </div>
                <div className="input-container">
                    <input 
                        type="password"
                        value={password}
                        placeholder="Enter your password here" 
                        onChange={(ev) => setPassword(ev.target.value)}
                        className="input-box"
                    />
                </div>
                <div className="input-container">
                    <input
                        type="password"
                        value={repeat_password}
                        placeholder="Repeat your password here"
                        onChange={(ev) => setRepeat_password(ev.target.value)}
                        className="input-box"
                    />
                    <label className="error-label">{passwordError}</label>
                </div>
                <div className="button-container">
                    <input 
                        className="input-button" 
                        type="button" 
                        onClick={onButtonClick} 
                        value="Register"
                    />
                </div>
                <label className="error-label">{errorMessage}</label>
                <Link to="/">
                    <button className="input-button">Go to login page</button>
                </Link>
            </div>
            <img src={kitty} alt="" />
        </div>
    );
};

export default Register;
