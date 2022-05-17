import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import LoginView from './Login-View';
import React from 'react';
import { sendingSignInData } from '../../../store/actions/signIn-actions';
import { setIsAuth } from '../../../store/slices/signin-slice';
import { showError } from '../../../store/slices/signUp-slice';
import { useForm } from 'react-hook-form';
import { LoginState } from './Login-Types';

const LoginContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    login: loginForSignUp,
    password: passwordForSignUp,
    error,
    userData,
  } = useSelector((state: RootState) => state.signUp);
  const { login, password, isAuth } = useSelector((state: RootState) => state.signIn);

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<LoginState>({ mode: 'onChange' });

  let formSignInData = {};
  const handleFormSubmit = () => {
    reset();
    if (login === loginForSignUp && password === passwordForSignUp) {
      formSignInData = {
        login,
        password,
      };
      dispatch(sendingSignInData(formSignInData));
      dispatch(setIsAuth(true));
    } else {
      dispatch(showError('Password and login are incorrect!Try again!'));
      return;
    }
    console.log(formSignInData, userData);
    navigate('/main', { replace: true });
  };
  return <LoginView dispatch={dispatch} error={error} errors={errors} handleFormSubmit={handleFormSubmit} handleSubmit={handleSubmit} register={register} />
}
export default LoginContainer;