import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Layout, Form, Input, Button, Divider, Typography } from 'antd';
import { UserOutlined, LockOutlined, LaptopOutlined } from '@ant-design/icons';

import { ButtonGoHome } from '../../components';
import { authService } from '../../api';
import { getMessageFromError, openNotification } from '../../helpers';

import './index.scss';
import { useCookiesStorage } from '../../hooks';
import { useTranslation } from 'react-i18next';

const { Content } = Layout;
const { Title } = Typography;

const SignUpPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { cookies } = useCookiesStorage(['authToken']);
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);
  const [isSignUpDisabled, setIsSignUpDisabled] = useState(false);

  if (cookies.authToken) {
    return <Navigate replace to="/boards" />;
  }

  const onFinish = async (values: ISignUpData) => {
    setIsSignUpLoading(true);
    try {
      await authService.signUp(values);
      openNotification('success', t('youCanLogin'));
      navigate('/sign-in');
    } catch (error) {
      openNotification('error', getMessageFromError(error));
    } finally {
      setIsSignUpLoading(false);
    }
  };

  const onFinishFailed = () => setIsSignUpDisabled(true);

  const onFieldsChange = () => setIsSignUpDisabled(false);

  return (
    <Content className="sign-up">
      <div className="sign-up__content">
        <Title>{t('signUp')}</Title>
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
            label={t('name')}
            name="name"
            tooltip={t('whatYourName')}
            rules={[
              {
                required: true,
                message: t('nameRequiredFrom3To30'),
                whitespace: true,
                min: 3,
                max: 30,
              },
            ]}
          >
            <Input
              autoComplete="off"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder={t('name')}
            />
          </Form.Item>

          <Form.Item
            label={t('login')}
            name="login"
            rules={[
              {
                required: true,
                message: t('loginRequiredFrom3To30'),
                whitespace: true,
                min: 3,
                max: 30,
              },
            ]}
          >
            <Input
              autoComplete="off"
              prefix={<LaptopOutlined className="site-form-item-icon" />}
              placeholder={t('login')}
            />
          </Form.Item>

          <Form.Item
            label={t('password')}
            name="password"
            rules={[
              {
                required: true,
                message: t('passwordRequiredFrom8To30'),
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
              placeholder={t('password')}
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
              {t('register')}
            </Button>
            <Divider />
            <div>
              {t('ifYouHaveAccount')} <Link to="/sign-in">{t('loginAlert')}</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Content>
  );
};

export default SignUpPage;
