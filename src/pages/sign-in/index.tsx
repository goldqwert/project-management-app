import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import { Layout, Form, Divider, Typography, Input, Button } from 'antd';
import { LockOutlined, LaptopOutlined } from '@ant-design/icons';

import { useCookiesStorage } from '../../hooks';
import { ButtonGoHome } from '../../components';
import { authService } from '../../api';
import { getMessageFromError, openNotification } from '../../helpers';

import { AuthUserData } from './types';

import './index.scss';

const { Content } = Layout;
const { Title } = Typography;

const SignInPage = () => {
  const navigate = useNavigate();
  const { cookies, setCookie } = useCookiesStorage(['authToken', 'authUserId']);
  const [isSignInLoading, setIsSignInLoading] = useState(false);
  const [isSignInDisabled, setIsSignInDisabled] = useState(false);

  if (cookies.authToken) {
    return <Navigate replace to="/boards" />;
  }

  const onFinish = async (values: ISignInData) => {
    setIsSignInLoading(true);
    try {
      const { token } = await authService.signIn(values);
      openNotification('success', 'You are successfully logged!');
      setCookie('authToken', token);
      setCookie('authUserId', jwt_decode<AuthUserData>(token).userId);
      navigate('/boards');
    } catch (error) {
      openNotification('error', getMessageFromError(error));
    } finally {
      setIsSignInLoading(false);
    }
  };

  const onFinishFailed = () => setIsSignInDisabled(true);

  const onFieldsChange = () => setIsSignInDisabled(false);

  return (
    <Content className="sign-in">
      <div className="sign-in__content">
        <Title>Sign In</Title>
        <div className="sign-up__go-home">
          <ButtonGoHome />
        </div>
        <Divider />
        <Form
          layout="vertical"
          name="normal_login"
          className="login-form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onFieldsChange={onFieldsChange}
        >
          <Form.Item
            label="Login"
            name="login"
            rules={[
              {
                required: true,
                message: 'Login is required and must be at least 3 and no more than 30 symbols',
                whitespace: true,
                min: 3,
                max: 30,
              },
            ]}
          >
            <Input
              autoComplete="off"
              prefix={<LaptopOutlined className="site-form-item-icon" />}
              placeholder="Login"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Password is required and must be at least 8 and no more than 30 symbols',
                whitespace: true,
                min: 8,
                max: 30,
              },
            ]}
          >
            <Input
              autoComplete="off"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              disabled={isSignInDisabled}
              loading={isSignInLoading}
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            <Divider />
            <div>
              Or <Link to="/sign-up"> register now!</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Content>
  );
};

export default SignInPage;
