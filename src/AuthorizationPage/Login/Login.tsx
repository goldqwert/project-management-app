import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {useNavigate} from "react-router-dom";
import Button from '../../components/UI/Button/Button';
import { RootState } from '../../store';
import { sendingSignInData } from '../../store/actions/signIn-actions';
import {getLoginForSignIn, getPasswordForSignIn} from "../../store/slices/signin-slice";
import {showError} from "../../store/slices/signUp-slice";
import {setIsAuth} from "../../store/slices/signin-slice";
import "../SignUp/Sign-up.scss";
import WelcomePage from '../../WelcomePage/WelcomePage';

export interface LoginState {
  login: string;
  password: string;
}
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {login: loginForSignUp, password: passwordForSignUp, error, userData} = useSelector((state: RootState) => state.signUp);
  const {login, password, isAuth} = useSelector((state: RootState) => state.signIn);
  const {handleSubmit, formState: {errors}, register, reset } = useForm<LoginState>({mode: "onChange"});
  let formSignInData = {};


  console.log(isAuth);

  const handleFormSubmit = () => {
  reset()
  if (login === loginForSignUp && password === passwordForSignUp) {
    formSignInData = {
       login,
       password
    }
    dispatch(sendingSignInData(formSignInData));
    dispatch(setIsAuth(true));
  } else {
    dispatch(showError("Password and login are incorrect!Try again!"));
    return;
  }
  console.log(formSignInData, userData);
  navigate("/main", {replace:true});
  }

  return (
    <>
      <div className="form">
        <h3>Login to account</h3>
        <form className="form-profile" onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="form-content">
            <label htmlFor="login">Login</label>
            <input
              name="login"
              placeholder="Enter your login"
              type="text"
              className={`${errors?.login ? "input error-input" : "input"}`}
              {...register("login", {
                onChange: (e) => {dispatch(getLoginForSignIn(e.target.value))},
                required: "Login is required",
                minLength: {
                  value: 4,
                  message: "Minimum 4 symbols"
                }
              })}
            />
            {errors?.login && (<p className="text-invalid">{`${errors?.login?.message || "Error"}`}</p>)}
            <label htmlFor="password">Password</label>
            <input
              name="password"
              placeholder="Enter your password"
              type="password"
              id="password"
              className={`${errors?.password ? "input error-input" : "input"}`}
              {...register("password", {
                onChange: (e) => {dispatch(getPasswordForSignIn(e.target.value))},
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Minimum 8 symbols"
                }
              })}
            />
            {errors?.password && (<p className="text-invalid">{`${errors?.password.message || "Error"}`}</p>)}
            {error && (<p className="text-invalid">{`${error}`}</p>)}
          </div>
          <div className="button-send">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </>
  )
}
export default Login;