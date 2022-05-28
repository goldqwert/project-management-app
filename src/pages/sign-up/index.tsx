import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Layout, Form, Input, Button, Divider, Typography } from 'antd';
import { UserOutlined, LockOutlined, LaptopOutlined } from '@ant-design/icons';

import { ButtonGoHome } from '../../components';
import { authService } from '../../api';
import { getMessageFromError, openNotification } from '../../helpers';

import './index.scss';
import { useCookiesStorage } from '../../hooks';

const { Content } = Layout;
const { Title } = Typography;

const SignUpPage = () => {
  const navigate = useNavigate();
  const { cookies } = useCookiesStorage(['authToken']);
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);
  const [isSignUpDisabled, setIsSignUpDisabled] = useState(false);

  if (cookies.authToken) {
    return <Navigate replace to="/main" />;
  }

  const onFinish = async (values: ISignUpData) => {
    setIsSignUpLoading(true);
    try {
      await authService.signUp(values);
      openNotification('success', 'User successfully created! You can login!');
      setIsSignUpLoading(false);
      navigate('/sign-in');
    } catch (error) {
      setIsSignUpLoading(false);
      openNotification('error', getMessageFromError(error));
    }
  };

  const onFinishFailed = () => setIsSignUpDisabled(true);

  const onFieldsChange = () => setIsSignUpDisabled(false);

  return (
    <Content className="sign-up">
      <div className="sign-up__content">
        <Title>Sign Up</Title>
        <div className="sign-up__go-home">
          <ButtonGoHome />
        </div>
        <Divider />
        <Form
          name="normal_login"
          className="login-form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onFieldsChange={onFieldsChange}
        >
          <Form.Item
            name="name"
            tooltip="What is your name?"
            rules={[
              {
                required: true,
                message: 'Name is required and must be no more 30 symbols',
                whitespace: true,
                max: 30,
              },
            ]}
          >
            <Input
              autoComplete="off"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Name"
            />
          </Form.Item>

          <Form.Item
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
              disabled={isSignUpDisabled}
              loading={isSignUpLoading}
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Register
            </Button>
            <Divider />
            <div>
              If you have an account, you can <Link to="/sign-in">login!</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Content>
  );
};

export default SignUpPage;
