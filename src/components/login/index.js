import React from 'react';
import { Form, Icon, Input, Button, Row, Typography } from 'antd';
import '../css/form.css';
import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

const LoginForm = () => {
  const handleSubmit = e => {
    e.preventDefault();
  };

  const { Title } = Typography;
  return (
    <div className="loginPage">
      <Row type="flex" justify="center" align="middle" className="loginRow">
        <Form onSubmit={handleSubmit} className="login-form customLoginForm">
          <Title level={3}>Đăng nhập</Title>
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
            <a className="login-form-forgot" href="/">
              Quên mật khẩu ?
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Đăng nhập
            </Button>
            <p>hoặc đăng nhập bằng</p>
            <div className="socialBtnLogin">
              <GoogleLogin
                className="googleBtn"
                clientId=""
                // onSuccess={}
                // onFailure={}
                buttonText=""
              />
              <FacebookLogin
                textButton=""
                appId=""
                fields="name,email,picture"
                icon="fa-facebook"
                // callback={}
                cssClass="fbBtn"
              />
            </div>
            <p>Chưa có tài khoản ?</p>
            <Link to="/register"> Đăng ký ngay !</Link>
          </Form.Item>
        </Form>
      </Row>
    </div>
  );
};

export default LoginForm;
