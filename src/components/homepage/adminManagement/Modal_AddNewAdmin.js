import React from 'react';
import $ from 'jquery';
import { Form, Input, Modal, Select, Button } from 'antd';

const ModalAddNewAdmin = props => {
  // eslint-disable-next-line react/prop-types
  const { visible, handleok, confirmloading, handlecancel } = props;

  const submit = e => {
    e.preventDefault();
    // khong get đc thông tin của form ở đây!!!
    const formVal = $('.formAddNewAdmin').serializeArray();
    console.log(formVal);
  };
  return (
    <Modal
      title="Thêm mới admin"
      visible={visible}
      onOk={handleok}
      confirmLoading={confirmloading}
      onCancel={handlecancel}
    >
      <Form onSubmit={submit} className="formAddNewAdmin">
        <Form.Item label="Họ tên">
          <Input required placeholder="nhập họ tên..." />
        </Form.Item>
        <Form.Item label="Email">
          <Input required placeholder="email..." />
        </Form.Item>
        <Form.Item label="Mật khẩu">
          <Input type="password" required placeholder="email..." />
        </Form.Item>
        <Form.Item label="Chức vụ" hasFeedback>
          <Select defaultValue="1">
            <Select.Option value="1">Thượng tá</Select.Option>
            <Select.Option value="2">Thiếu tá</Select.Option>
            <Select.Option value="3">Lam di</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button registerBtn"
            style={{ fontWeight: 'bold' }}
          >
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddNewAdmin;
