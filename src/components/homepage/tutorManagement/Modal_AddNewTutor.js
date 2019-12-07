import React, { useState } from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import { Form, Input, Modal, Button } from 'antd';

const ModalAddNewTutor = props => {
  const { visible, handleok, confirmloading, handlecancel, addNewAdmin, adminInfo } = props;
  const [isLoading, setIsLoading] = useState(false);

  const done = () => {
    setIsLoading(false);
  };
  const submit = e => {
    e.preventDefault();
    setIsLoading(true);
    const formVal = $('.formAddNewAdmin').serializeArray();
    addNewAdmin(adminInfo.token, formVal[0].value, formVal[1].value, formVal[2].value, done);
  };

  return (
    <Modal
      title="Thêm mới admin"
      visible={visible}
      onOk={handleok}
      confirmLoading={confirmloading}
      onCancel={handlecancel}
    >
      <Form onSubmit={e => submit(e)} className="formAddNewAdmin">
        <Form.Item label="Email">
          <Input type="email" name="email" required placeholder="email..." />
        </Form.Item>
        <Form.Item label="Mật khẩu">
          <Input minLength="6" name="password" type="password" required placeholder="password..." />
        </Form.Item>
        <Form.Item label="Họ tên">
          <Input name="name" required placeholder="nhập họ tên..." />
        </Form.Item>
        {/* <Form.Item label="Chức vụ" hasFeedback>
          <Select name="role" defaultValue="adminLV1">
            <Select.Option value="adminLV1">Admin Level 1</Select.Option>
            <Select.Option value="adminLV2">Admin Level 2</Select.Option>
          </Select>
        </Form.Item> */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button registerBtn"
            style={{ fontWeight: 'bold' }}
            loading={isLoading}
          >
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

ModalAddNewTutor.propTypes = {
  adminInfo: PropTypes.objectOf(PropTypes.string, PropTypes.string),
  visible: PropTypes.bool,
  handleok: PropTypes.func,
  confirmloading: PropTypes.bool,
  handlecancel: PropTypes.func,
  addNewAdmin: PropTypes.func,
};

ModalAddNewTutor.defaultProps = {
  adminInfo: { token: '', role: '' },
  visible: false,
  handleok: () => {},
  confirmloading: false,
  handlecancel: () => {},
  addNewAdmin: () => {},
};

export default ModalAddNewTutor;
