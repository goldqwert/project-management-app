import React from 'react';
import SignUpView from './SignUp-View';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchStore, RootState } from '../../../types/types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { sendingFormSignUp } from '../../../store/actions/signUp-actions';
import { FormState } from './SignUp-Types';

const SignUpContainer = () => {
  const { name, login, password, error } = useSelector((state: RootState) => state.signUp);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goToLogin = () => navigate('/login');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormState>({ mode: 'onChange' });

  const handleFormSubmit = () => {
    reset();
    const formData = {
      name,
      login,
      password,
    };
    dispatchStore(sendingFormSignUp(formData));
    goToLogin();
  };

  return (
    <SignUpView
      handleSubmit={handleSubmit}
      handleFormSubmit={handleFormSubmit}
      register={register}
      errors={errors}
      error={error}
      watch={watch}
      dispatch={dispatch}
    />
  );
};
export default SignUpContainer;
