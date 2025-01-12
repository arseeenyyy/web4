import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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
    return (
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
                    value={password}
                    placeholder="Enter your password here" 
                    onChange={(ev) => setPassword(ev.target.value)}
                    className={'inputBox'}
                />
            </div>
            <br />
            <div className={'inputContainer'}>
                <input
                    value={repeat_password}
                    placeholder="Repeat your password here"
                    onChange={(ev) => setRepeat_password(ev.target.value)}
                    className={'inputBox'}
                />
                <label className="errorLabel">{passwordError}</label>
            </div>
            <div className={'inputContainer'}>
                {/* <input  className={'inputButton'} type="button" onClick={onButtonClick} value={'Register'}/> */}
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
    )
}


export default Register;