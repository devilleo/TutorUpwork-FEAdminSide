import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import $ from 'jquery';
import PropTypes from 'prop-types';
import { Form, Input, Modal, Button } from 'antd';

const ModalAddNewTutor = props => {
  const { visible, handleok, confirmloading, handlecancel, addNewTutor } = props;
  const [isLoading, setIsLoading] = useState(false);

  const done = () => {
    setIsLoading(false);
  };
  const submit = e => {
    e.preventDefault();
    // eslint-disable-next-line no-alert
    alert('chưa làm chức năng này...');
    return;
    // eslint-disable-next-line no-unreachable
    setIsLoading(true);
    const cookies = new Cookies();
    const formVal = $('.formAddNewAdmin').serializeArray();
    // eslint-disable-next-line max-len
    addNewTutor(
      cookies.get('token').token,
      formVal[0].value,
      formVal[1].value,
      formVal[2].value,
      done,
    );
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
          {/* eslint-disable-next-line max-len */}
          <Input
            minLength="6"
            name="password"
            type="password"
            required
            placeholder="password..."
            autoComplete="on"
          />
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
  visible: PropTypes.bool,
  handleok: PropTypes.func,
  confirmloading: PropTypes.bool,
  handlecancel: PropTypes.func,
  addNewTutor: PropTypes.func,
};

ModalAddNewTutor.defaultProps = {
  visible: false,
  handleok: () => {},
  confirmloading: false,
  handlecancel: () => {},
  addNewTutor: () => {},
};

export default ModalAddNewTutor;
