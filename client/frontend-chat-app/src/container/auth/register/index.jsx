import React, { useState } from 'react';
import '@assets/style/auth.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerRequest } from '@redux/actions/register';
import { resetState } from '@redux/actions/login'

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const registerError = useSelector(state => state.register.error)
    const [userDetails, setUserDetails] = useState({ Name: "", Email: "", Password: "" });
    const [errorState, setErrorState] = useState({ NameValidation: "", EmailValidation: "", PasswordValidation: "" });

    const handleInputChange = (text, field) => {
        setUserDetails({ ...userDetails, [field]: text });
        if (registerError) {
            dispatch(resetState())
        }
        if (text === "") {
            setErrorState({ ...errorState, [`${field}Validation`]: `${field.replace(/([a-z])([A-Z])/g, '$1 $2')} field is required*` });
        } else {
            setErrorState({ ...errorState, [`${field}Validation`]: "" });
        }
    };

    const handleNameChange = (e) => {
        handleInputChange(e.target.value, 'Name');
    };

    const handleEmailChange = (e) => {
        handleInputChange(e.target.value, 'Email');
    };

    const handlePasswordChange = (e) => {
        handleInputChange(e.target.value, 'Password');
    };

    const formValidation = () => {
        const isValid = { ...errorState };
        let flag = true;
        Object.keys(userDetails).forEach(key => {
            const value = userDetails[key];
            if (value === "") {
                let respectiveField = key.replace(/([a-z])([A-Z])/g, '$1 $2');
                isValid[key + "Validation"] = `${respectiveField} field is required*`;
                flag = false;
            } else {
                isValid[key + "Validation"] = '';
            }
        });
        setErrorState(isValid);
        return flag;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const flag = formValidation();
        if (flag) {
            dispatch(registerRequest({
                name: userDetails.Name,
                email: userDetails.Email,
                password: userDetails.Password, callback: () => {
                    navigate("/login");
                },
            }))
        }
    };

    return (
        <div className="container">
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form>
                <h3>Register Here</h3>
                <label>Name</label>
                <input type="text" onChange={handleNameChange} value={userDetails.Name} />
                <div className="errorState">{errorState.NameValidation}</div>
                <label>Email</label>
                <input type="text" onChange={handleEmailChange} value={userDetails.Email} />
                <div className="errorState">{errorState.EmailValidation}</div>
                <label>Password</label>
                <input type="password" onChange={handlePasswordChange} value={userDetails.Password} />
                <div className="errorState">{errorState.PasswordValidation}</div>
                <div className="errorResponse">{registerError}</div>

                <button onClick={handleRegister}>Register</button>
            </form>
        </div>
    );
};

export default Register;
