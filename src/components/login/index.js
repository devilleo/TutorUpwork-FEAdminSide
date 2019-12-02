import React from 'react';
import { Form, Icon, Input, Button, Row, Typography } from 'antd';
import '../css/form.css';

const LoginForm = () => {
  const handleSubmit = e => {
    e.preventDefault();
  };

  const { Title } = Typography;
  return (
    <div className="loginPage">
      <Row type="flex" justify="center" align="middle" className="loginRow">
        <Form onSubmit={handleSubmit} className="login-form customLoginForm">
          <Title level={3}>Đăng nhập Admin</Title>
          <Form.Item>
            <Input
              type="email"
              required
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item>
            <Input
              required
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </div>
  );
};

export default LoginForm;
