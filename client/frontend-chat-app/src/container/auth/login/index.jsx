import React, {  useState } from 'react';
import '@assets/style/auth.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, resetState } from '@redux/actions/login';

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loginError = useSelector(state => state.login.error)
  const [userDetails, setUserDetails] = useState({ Email: "", Password: "" });
  const [errorState, setErrorState] = useState({ EmailValidation: "", PasswordValidation: "" });


  const handleInputChange = (text, field) => {
    setUserDetails({ ...userDetails, [field]: text });
    if (loginError) {
      dispatch(resetState())
    }
    if (text === "") {
      setErrorState({ ...errorState, [`${field}Validation`]: `${field.replace(/([a-z])([A-Z])/g, '$1 $2')} field is required*` });
    } else {
      setErrorState({ ...errorState, [`${field}Validation`]: "" });
    }
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

  const handleLogin = async (e) => {
    e.preventDefault();
    const flag = formValidation();
    if (flag) {
      dispatch(loginRequest({
        email: userDetails.Email,
        password: userDetails.Password, callback: () => {
          navigate("/home");
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
        <h3>Login Here</h3>
        <label>Email</label>
        <input type="text" onChange={handleEmailChange} value={userDetails.Email} />
        <div className="errorState">{errorState.EmailValidation}</div>
        <label>Password</label>
        <input type="password" onChange={handlePasswordChange} value={userDetails.Password} />
        <div className="errorState">{errorState.PasswordValidation}</div>
        <div className="errorResponse">{loginError}</div>
        <button onClick={handleLogin}>Login</button>
        <div className="social">
          <div className="go"><i className="fab fa-google"></i> Google</div>
          <div className="fb"><i className="fab fa-facebook"></i> Facebook</div>
        </div>
      </form>
    </div>
  );
};

export default Login;
