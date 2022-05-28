import { Layout, Form, Input, Button, Divider, Typography } from 'antd';
import { UserOutlined, LockOutlined, LaptopOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { ButtonGoHome } from '../../components';

import './index.scss';

const { Content } = Layout;
const { Title } = Typography;

const SignUpPage = () => {
  const onFinish = (values: unknown) => console.log('Received values of form: ', values);

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
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            tooltip="What is your name?"
            rules={[
              {
                required: true,
                message: 'Please input your name!',
                whitespace: true,
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
