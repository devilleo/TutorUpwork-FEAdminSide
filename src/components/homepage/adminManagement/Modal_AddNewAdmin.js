import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import $ from 'jquery';
import PropTypes from 'prop-types';
import { Form, Input, Modal, Button } from 'antd';

const ModalAddNewAdmin = props => {
  const { visible, addNewAdmin, closeModal, getAdminsList } = props;
  const [isLoading, setIsLoading] = useState(false);
  const done = () => {
    setIsLoading(false);
    const cookies = new Cookies();
    getAdminsList(cookies.get('token'));
  };
  const submit = e => {
    e.preventDefault();
    setIsLoading(true);
    const formVal = $('.formAddNewAdmin').serializeArray();
    const cookies = new Cookies();
    // eslint-disable-next-line max-len
    addNewAdmin(cookies.get('token'), formVal[0].value, formVal[1].value, formVal[2].value, done);
  };

  return (
    <Modal title="Thêm mới admin" visible={visible} footer={null} onCancel={closeModal}>
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
        <br />
        <br />
        <Form.Item style={{ paddingLeft: '10%', paddingRight: '10%' }}>
          <Button
            type="ghost"
            htmlType="button"
            className="login-form-button"
            style={{ fontWeight: 'bold', width: '40%', marginRight: '10%' }}
            onClick={closeModal}
          >
            Huỷ
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button submitBtn"
            style={{
              fontWeight: 'bold',
              width: '40%',
              marginLeft: '10%',
            }}
            loading={isLoading}
          >
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

ModalAddNewAdmin.propTypes = {
  visible: PropTypes.bool,
  addNewAdmin: PropTypes.func,
  closeModal: PropTypes.func,
  getAdminsList: PropTypes.func,
};

ModalAddNewAdmin.defaultProps = {
  visible: false,
  addNewAdmin: () => {},
  closeModal: () => {},
  getAdminsList: () => {},
};

export default ModalAddNewAdmin;
