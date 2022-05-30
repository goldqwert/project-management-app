import { useState } from 'react';

import { Layout, Form, Divider, Typography, Input, Button } from 'antd';
import { LockOutlined, LaptopOutlined, UserOutlined } from '@ant-design/icons';

import { useAuth, useCookiesStorage } from '../../hooks';
import { usersService } from '../../api';

import './index.scss';
import { getMessageFromError, openNotification } from '../../helpers';
import { ModalConfirmation } from '../../components';
import { useTranslation } from 'react-i18next';

const { Content } = Layout;
const { Title } = Typography;

const EditProfile = () => {
  const { t } = useTranslation();
  const { cookies, onLogout } = useCookiesStorage(['authToken', 'authUserId']);
  const [isEditProfileLoading, setIsEditProfileLoading] = useState(false);
  const [isEditProfileDisabled, setIsEditProfileDisabled] = useState(false);

  useAuth();

  const [form] = Form.useForm();

  const onFinish = async (values: ISignUpData) => {
    setIsEditProfileLoading(true);
    try {
      await usersService.editUser(cookies.authUserId, cookies.authToken, values);
      openNotification('success', t('newUserDataSaved'));
      form.resetFields();
    } catch (error) {
      openNotification('error', getMessageFromError(error));
    } finally {
      setIsEditProfileLoading(false);
    }
  };

  const onDeleteUser = async () => {
    try {
      await usersService.deleteUser(cookies.authUserId, cookies.authToken);
      openNotification('success', t('userDeleted'));
      onLogout();
    } catch (error) {
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
          <ModalConfirmation
            title={t('wantToDeleteUser')}
            description={t('userWillDeleted')}
            onOk={onDeleteUser}
          />
        </div>
        <Divider />
        <Form
          layout="vertical"
          form={form}
          name="normal_login"
          className="login-form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onFieldsChange={onFieldsChange}
        >
          <Form.Item
            label="Name"
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
              placeholder={t('newName')}
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
              placeholder="New login"
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
              placeholder={t('newPassword')}
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
              {t('edit')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Content>
  );
};

export default EditProfile;
