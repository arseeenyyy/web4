import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        errors.password = 'Passwords should be equals';
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
        <h1>Hello world</h1>
    )
}


export default Register;