import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "./Header";
import kitty from '../images/kitty2.gif'

const validateForm = (login, password, repeat_password) => {
    const errors = {};
    if (!login) {
        errors.login = 'Please enter login';
    }
    if (!password) {
        errors.password = 'Please enter password';
    } else if (password.length < 5) {
        errors.password = 'Password must be 6 characters or longer';
    } else if(password != repeat_password) {
        errors.password = 'Passwords dont match';
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
        if (localStorage.getItem("id") != null) navigate("/main");
    })
    const onButtonClick = async(e) => {
        e.preventDefault();
        setLoginError(''); 
        setPasswordError('');
        setErrorMessage('');

        const errors = validateForm(login, password, repeat_password);
        if (errors.login) 
            setLoginError(errors.login);
        if (errors.password) setPasswordError(errors.password);
        if (Object.keys(errors).length > 0) return;

        const requestData = {
            login: login, 
            password: password,
        }; 
        try {
            const response = await fetch('http://localhost:8080/web4/register', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            }); 
            const result = await response.json();
            console.log(response);
            console.log(result);
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
        <div>
            <Header />
            <div className={'mainContainer'}>
                <div className={'titleContainer'}>
                    <div>Registration</div>
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
                        type="password"
                        value={password}
                        placeholder="Enter your password here" 
                        onChange={(ev) => setPassword(ev.target.value)}
                        className={'inputBox'}
                    />
                </div>
                <br />
                <div className={'inputContainer'}>
                    <input
                        type="password"
                        value={repeat_password}
                        placeholder="Repeat your password here"
                        onChange={(ev) => setRepeat_password(ev.target.value)}
                        className={'inputBox'}
                    />
                    <label className="errorLabel">{passwordError}</label>
                </div>
                <br />
                <div className={'inputContainer'}>
                    <input  className={'inputButton'} type="button" onClick={onButtonClick} value={'Register'}/>
                </div>
                <br />
                <div className={'inputContainer'}><label className='errorLabel'>{errorMessage}</label></div>
                <br />
                <div className={'inputContainer'}>
                    <Link to='/'>
                        <button className={'inputButton'}>Go to login page</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}


export default Register;