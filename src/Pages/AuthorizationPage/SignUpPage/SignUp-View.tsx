import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import {
  getNameData,
  getLoginData,
  getPasswordData,
  getConfirmPasswordData,
} from '../../../store/slices/signUp-slice';
import './Sign-up.scss';

const SignUpView = ({
  handleSubmit,
  handleFormSubmit,
  errors,
  register,
  dispatch,
  watch,
  error,
}) => {
  return (
    <>
      <div className="form">
        <h3>Sign Up to create an account</h3>
        <form className="form-profile" onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="form-content">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className={` ${errors?.firstName ? 'input error-input' : 'input'}`}
              {...register('firstName', {
                onChange: (e) => {
                  dispatch(getNameData(e.target.value));
                },
                required: 'Name is required',
                minLength: {
                  value: 3,
                  message: 'Minimum 3 symbols',
                },
              })}
            />
            {errors?.firstName && (
              <p className="text-invalid">{`${errors?.firstName.message || 'Error'}`}</p>
            )}
            <label htmlFor="login">Login</label>
            <input
              name="login"
              placeholder="Enter your login"
              type="text"
              id="login"
              className={`${errors?.login ? 'input error-input' : 'input'}`}
              {...register('login', {
                onChange: (e) => {
                  dispatch(getLoginData(e.target.value));
                },
                required: 'LoginPage is required',
                minLength: {
                  value: 4,
                  message: 'Minimum 4 symbols',
                },
              })}
            />
            {errors?.login && (
              <p className="text-invalid">{`${errors?.login.message || 'Error'}`}</p>
            )}
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="text"
              id="password"
              placeholder="Enter your password"
              className={`${errors?.password ? 'input error-input' : 'input'}`}
              {...register('password', {
                onChange: (e) => {
                  dispatch(getPasswordData(e.target.value));
                },
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Minimum 8 symbols',
                },
              })}
            />
            {errors?.password && (
              <p className="text-invalid">{`${errors?.password.message || 'Error'}`}</p>
            )}
            <label htmlFor="confirm-password">Confirm password</label>
            <input
              name="confirm-password"
              placeholder="Confirm password"
              type="password"
              id="confirm-password"
              className={`${errors?.confirmPassword ? 'input error-input' : 'input'}`}
              {...register('confirmPassword', {
                onChange: (e) => {
                  dispatch(getConfirmPasswordData(e.target.value));
                },
                required: 'Confirm password',
                validate: (value: string) => {
                  if (watch('password') !== value) {
                    return "Passwords doesn't match";
                  }
                },
              })}
            />
            {errors?.confirmPassword && (
              <p className="text-invalid">{`${errors?.confirmPassword.message || 'Error'}`}</p>
            )}
            <Link to="/login">
              <div className="account-settings">
                <p>Do you already have an account? Login</p>
              </div>
            </Link>
          </div>
          <div className="button-send">
            <Button type="submit">Submit</Button>
          </div>
          {error && <p>{`${error}`}</p>}
        </form>
      </div>
    </>
  );
};
export default SignUpView;
