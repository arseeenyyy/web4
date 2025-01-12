import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';


const validateForm = (login, password) => {
    const errors = {};
    if (!login) {
        errors.login = 'Please enter login';
    }
    if (!password) {
        errors.password = 'Please enter password';
    } else if (password.length < 5) {
        errors.password = 'Password must be 6 characters or longer';
    }
    return errors;
};

const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(''); 
    const [passwordError, setPasswordError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const onButtonClick = async(e) => {
        e.preventDefault();
        setLoginError('');
        setPasswordError('');
        setErrorMessage('');

        const errors = validateForm(login, password);
        if (errors.login) {
            setLoginError(errors.login);
        }
        if (errors.password) {
            setPasswordError(errors.password);
        }
        if (Object.keys(errors).length > 0) {
            return;
        }

        const requestData = {
            login: login, 
            password: password,
        };
        try {
            const response = await fetch('http://localhost:8080/web4/login', {
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
        <div className={'mainContainer'}>
            <div className={'titleContainer'}>
                <div>Login</div>
            </div>
            <br />
            <div className={'inputContainer'}>
                <input 
                    value={login}
                    placeholder="Enter your login here"
                    onChange={(ev) => setLogin(ev.target.value)}
                    className={'inputBox'}
                />
                <label className='errorLabel'>{loginError}</label>
            </div>
            <br />
            <div className={'inputContainer'}>
                <input 
                value={password}
                placeholder='Enter your password here'
                onChange={(ev) => setPassword(ev.target.value)} 
                className={'inputBox'}
                />
                <label className='errorLabel'>{passwordError}</label>
            </div>
            <br />
            <div className={'inputContainer'}>
                <input className={'inputButton'} type='button' onClick={onButtonClick} value={'Log in'}/>
            </div>
            <br />
            <div className={'inputContainer'}><label className='errorLabel'>{errorMessage}</label></div>
            <br />
            <div className={'inputContainer'}>
                <Link to='/register'>
                    <button className={'inputButton'}>Go to registration page</button>
                </Link>
            </div>
        </div>
    )
}

export default Login;
