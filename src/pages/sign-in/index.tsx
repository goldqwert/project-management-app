import { Layout, Form, Divider, Typography, Input, Button } from 'antd';
import { LockOutlined, LaptopOutlined } from '@ant-design/icons';

import { ButtonGoHome } from '../../components';

import './index.scss';
import { Link } from 'react-router-dom';

const { Content } = Layout;
const { Title } = Typography;

const SignInPage = () => {
  const onFinish = (values: unknown) => console.log('Received values of form: ', values);

  return (
    <Content className="sign-in">
      <div className="sign-in__content">
        <Title>Sign In</Title>
        <div className="sign-up__go-home">
          <ButtonGoHome />
        </div>
        <Divider />
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="login"
            rules={[
              {
                required: true,
                message: 'Please input your login!',
                whitespace: true,
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
            rules={[{ required: true, message: 'Please input your password!', whitespace: true }]}
          >
            <Input
              autoComplete="off"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
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
