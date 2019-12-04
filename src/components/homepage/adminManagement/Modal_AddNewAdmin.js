import React from 'react';
import { Form, Input, Modal, Select } from 'antd';

const ModalAddNewAdmin = props => {
  // eslint-disable-next-line react/prop-types
  const { visible, confirmloading, handleok, handlecancel } = props;

  return (
    <Modal
      title="Thêm mới admin"
      visible={visible}
      onOk={handleok}
      confirmLoading={confirmloading}
      onCancel={handlecancel}
    >
      <Form>
        <Form.Item label="Họ tên">
          <Input placeholder="nhập họ tên..." />
        </Form.Item>
        <Form.Item label="Email">
          <Input placeholder="email..." />
        </Form.Item>
        <Form.Item label="Chức vụ" hasFeedback>
          <Select defaultValue="1">
            <Select.Option value="1">Thượng tá</Select.Option>
            <Select.Option value="2">Thiếu tá</Select.Option>
            <Select.Option value="3">Lam di</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddNewAdmin;
