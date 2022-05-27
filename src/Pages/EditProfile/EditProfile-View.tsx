import * as React from 'react'
import { Form, Input, Button } from 'antd'
import { editUserName, editUserLogin, editUserPassword } from '../../store/slices/edit-slice'
import Modal from '../../components/Modal/Modal'
import './Edit.scss'

const EditProfileView = ({
    dispatch,
    onFinish,
    deleteClickHandler,
    modalHandler,
    showModal,
    deleteUserModalHandler,
}) => {
    return (
        <>
            {showModal && (
                <Modal onConfirm={modalHandler}>
                    <header className="header">
                        <h2>Do You want to delete an account?</h2>
                    </header>
                    <footer className="actions">
                        <Button type="primary" onClick={deleteUserModalHandler}>
                            Delete
                        </Button>
                        <Button type="primary" onClick={modalHandler}>
                            Cancel
                        </Button>
                    </footer>
                </Modal>
            )}
            <div className="edit-profile">
                <h3>Edit profile</h3>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="New Name"
                        name="new-name"
                        rules={[{ required: true, message: 'Please input your new name!' }]}
                    >
                        <Input
                            onChange={(e) => {
                                dispatch(editUserName(e.target.value))
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="New Login"
                        name="new-login"
                        rules={[{ required: true, message: 'Please input your new login!' }]}
                    >
                        <Input
                            onChange={(e) => {
                                dispatch(editUserLogin(e.target.value))
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="New Password"
                        name="new-password"
                        rules={[{ required: true, message: 'Please input your new password!' }]}
                    >
                        <Input
                            onChange={(e) => {
                                dispatch(editUserPassword(e.target.value))
                            }}
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="button" onClick={deleteClickHandler}>
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
        </>
    )
}

export default EditProfileView
