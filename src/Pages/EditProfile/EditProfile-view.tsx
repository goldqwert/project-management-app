import * as React from "react";
import { Form, Input, Button } from 'antd';
export const dispatchStore = store.dispatch;
import {editUser} from "../../store/slices/edit-slice";
import store from '../../store';
import "./Edit.scss";


const EditProfileView = ({dispatch, onFinish, onFinishFailed }) => {
  return (
    <div className="edit-profile">
      <h3>Edit profile</h3>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Current Login"
        name="login"
        rules={[{ required: true, message: 'Please input your login!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="New Login"
        name="new-login"
        rules={[{ required: true, message: 'Please input your new login!' }]}
        onMetaChange:(e) =>{dispatch(editUser(e.target.value))}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="button">
          Delete account
        </Button>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
      </div>
  );
};

export default EditProfileView;