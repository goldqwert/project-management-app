import React from 'react';
import EditProfileView, { dispatchStore } from './EditProfile-view';
import { useDispatch } from 'react-redux';
import { getCookie } from 'typescript-cookie';
import { editProfileData } from '../../store/actions/edit-actions';

const EditProfileContainer = () => {
  const dispatch = useDispatch();
  const userId = getCookie("id");

  const onFinish = () => {
    userData = {
      name,
      login,
      password,
    }
    dispatchStore(editProfileData(userData, userId))
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return <EditProfileView onFinish={onFinish} onFinishFailed={onFinishFailed} dispatch={dispatch} />
};

export default EditProfileContainer;
