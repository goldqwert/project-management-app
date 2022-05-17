import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../UI/Button/Button';
import { useForm } from "react-hook-form";
import { RootState } from '../../../store';
import {getNameData, getLoginData, getPasswordData, getConfirmPasswordData} from "../../../store/slices/signUp-slice";
import { sendingFormSignUp } from '../../../store/actions/signUp-actions';
import "./Sign-up.scss";
import WelcomePage from '../../WelcomePage/WelcomePage';

export interface FormState {
  firstName: string;
  login: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const { name, login, password, error} = useSelector((state: RootState) => state.signUp)
  const dispatch = useDispatch();
  const {register, handleSubmit, formState: {errors}, reset, watch} = useForm<FormState>({mode:"onChange"});
  const navigate = useNavigate();
  const goToLogin = () => navigate("/login");
  const goBack = () => navigate("/sign-up", {replace: true});

  const handleFormSubmit = () => {
    reset();
    const formData = {
      name,
      login,
      password,
    }
   dispatch(sendingFormSignUp(formData));
    error ? goBack() : goToLogin();
  }

  return (
    <>
      <div className="form">
        <h3>Sign Up to create an account</h3>
        <form className="form-profile" onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="form-content">
            <label htmlFor="name">
            Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className={` ${errors?.firstName ? 'input error-input' : 'input'}`}
             {...register("firstName", {
               onChange: (e) => {dispatch(getNameData(e.target.value))},
               required: "Name is required",
               minLength: {
                 value: 3,
                 message: "Minimum 3 symbols"
               }
             })}
            />
            {errors?.firstName && (<p className="text-invalid">{`${errors?.firstName.message || "Error"}`}</p>)}
            <label htmlFor="login">Login</label>
            <input
              name="login"
              placeholder="Enter your login"
              type="text"
              id="login"
              className={`${errors?.login ? "input error-input" : "input"}`}
              {...register("login", {
                onChange: (e) => {dispatch(getLoginData(e.target.value))},
                required: "Login is required",
                minLength: {
                  value: 4,
                  message: "Minimum 4 symbols"
                }
              })}
            />
            {errors?.login && (<p className="text-invalid">{`${errors?.login.message || "Error"}`}</p>)}
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="text"
              id="password"
              placeholder="Enter your password"
              className={`${errors?.password ? "input error-input" : "input"}`}
              {...register("password", {
                onChange: (e) => {dispatch(getPasswordData(e.target.value))},
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Minimum 8 symbols"
                }
              })}
            />
            {errors?.password && (<p className="text-invalid">{`${errors?.password.message || "Error"}`}</p>)}
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              name="confirmPassword"
              placeholder="Confirm password"
              type="password"
              id="confirmPassword"
              className={`${errors?.confirmPassword ? "input error-input" : "input"}`}
              {...register("confirmPassword", {
                onChange: (e) => {dispatch(getConfirmPasswordData(e.target.value))},
                required: "Confirm password",
                validate: (value: string) => {
                  if (watch("password") !== value) {
                    return "Passwords doesn't match"
                  }
                }
              })}
            />
            {errors?.confirmPassword && (<p className="text-invalid">{`${errors?.confirmPassword.message || "Error"}`}</p>)}
            <Link to="/login">
              <div className="account-settings">
                <p>Do you already have an account? Login</p>
              </div>
            </Link>
          </div>
          <div className="button-send">
            <Button type="submit">Submit</Button>
          </div>
          {error && (<p>{`${error}`}</p>)}
        </form>
      </div>
    </>
  )
};
export default SignUp;