import { useState } from 'react';

import { Layout, Form, Divider, Typography, Input, Button } from 'antd';
import { LockOutlined, LaptopOutlined, UserOutlined } from '@ant-design/icons';

import { useCookiesStorage } from '../../hooks';
import { usersService } from '../../api';

import './index.scss';
import { getMessageFromError, openNotification } from '../../helpers';
import { ModalDeleteUser } from '../../components';

const { Content } = Layout;
const { Title } = Typography;

const EditProfile = () => {
  const { cookies } = useCookiesStorage(['authToken', 'authUserId']);
  const [isEditProfileLoading, setIsEditProfileLoading] = useState(false);
  const [isEditProfileDisabled, setIsEditProfileDisabled] = useState(false);

  const [form] = Form.useForm();

  const onFinish = async (values: ISignUpData) => {
    setIsEditProfileLoading(true);
    try {
      await usersService.editUser(cookies.authUserId, cookies.authToken, values);

      openNotification('success', 'New user data succesfully saved!');
      form.resetFields();

      setTimeout(() => {
        setIsEditProfileLoading(false);

        // navigate('/main');
      }, 1000);
    } catch (error) {
      setIsEditProfileLoading(false);
      openNotification('error', getMessageFromError(error));
    }
  };

  const onFinishFailed = () => setIsEditProfileDisabled(true);

  const onFieldsChange = () => setIsEditProfileDisabled(false);

  return (
    <Content className="edit-profile">
      <div className="edit-profile__content">
        <Title>Edit profile</Title>
        <div className="edit-profile__delete-account">
          <ModalDeleteUser />
        </div>
        <Divider />
        <Form
          form={form}
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
              placeholder="New name"
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
              placeholder="New login"
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
              placeholder="New password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              disabled={isEditProfileDisabled}
              loading={isEditProfileLoading}
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Edit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Content>
  );
};

export default EditProfile;
