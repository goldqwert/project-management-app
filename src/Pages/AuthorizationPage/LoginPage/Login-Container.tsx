import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import LoginView from './Login-View';
import React from 'react';
import { sendingSignInData } from '../../../store/actions/signIn-actions';
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
  } = useSelector((state: RootState) => state.signUp);
  const { login, password } = useSelector((state: RootState) => state.signIn);

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
      navigate('/main');
    } else {
      dispatch(showError('Password and login are incorrect!Try again!'));
      navigate('/', { replace: true });
      return;
    }
  };
  return (
    <LoginView
      dispatch={dispatch}
      error={error}
      errors={errors}
      handleFormSubmit={handleFormSubmit}
      handleSubmit={handleSubmit}
      register={register}
    />
  );
};
export default LoginContainer;
