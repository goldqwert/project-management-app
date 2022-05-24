import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { getLoginForSignIn, getPasswordForSignIn } from '../../../store/slices/signin-slice';
import '../SignUpPage/Sign-up.scss';

const LoginView = ({ dispatch, handleSubmit, handleFormSubmit, errors, register, error }) => {
  return (
      <div className="form">
        <h3>Login to account</h3>
        <form className="form-profile" onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="form-content">
            <label htmlFor="login">Login</label>
            <input
              name="login"
              placeholder="Enter your login"
              type="text"
              className={`${errors?.login ? 'input error-input' : 'input'}`}
              {...register('login', {
                onChange: (e) => {
                  dispatch(getLoginForSignIn(e.target.value));
                },
                required: 'LoginPage is required',
                minLength: {
                  value: 4,
                  message: 'Minimum 4 symbols',
                },
              })}
            />
            {errors?.login && (
              <p className="text-invalid">{`${errors?.login?.message || 'Error'}`}</p>
            )}
            <label htmlFor="password">Password</label>
            <input
              name="password"
              placeholder="Enter your password"
              type="password"
              id="password"
              className={`${errors?.password ? 'input error-input' : 'input'}`}
              {...register('password', {
                onChange: (e) => {
                  dispatch(getPasswordForSignIn(e.target.value));
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
            {error && <p className="text-invalid">{`${error}`}</p>}
            <Link to="/sign-up">
              <div className="account-settings">
                <p>Do not have an account yet? Sign Up</p>
              </div>
            </Link>
          </div>

          <div className="button-send">
            <Button type="primary" htmlType="submit">Submit</Button>
          </div>
        </form>
      </div>
  );
};
export default LoginView;
