import React from 'react';
import { Col, Button, Modal, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import $ from 'jquery';
import Cookies from 'universal-cookie';

import ModalAddNewAdmin from './Modal_AddNewAdmin';
import PaginacionTabla from '../pagination'

class AdminManagement extends React.Component {
  constructor(props) {
    super(props);
    this.showDeleteConfirm = this.showDeleteConfirm.bind(this);
    this.state = {
      openModalAddNewAdmin: false,

      visibleChangePasswordModal: false,
      loadingChangePasswordModal: false,
      idAdminForChangePassword: '',

      visibleChangeInfoModal: false,
      loadingChangeInfoModal: false,
      idAdminForChangeInfo: '',
      currentEmail: '',
      currentName: '',
    };
  }

  componentDidMount() {
    const { getAdminsList } = this.props;
    const cookies = new Cookies();
    getAdminsList(cookies.get('token'));
  }

  // componentDidUpdate() {
  //   const { getAdminsList } = this.props;
  //   const cookies = new Cookies();
  //   getAdminsList(cookies.get('token'));
  // }

  showModalAddNewAdmin = () => {
    this.setState({
      openModalAddNewAdmin: true,
    });
  };

  closeModalAddNewAdmin = () => {
    this.setState({
      openModalAddNewAdmin: false,
    });
  };

  showDeleteConfirm = admin => {
    const { removeAdmin } = this.props;
    const cookies = new Cookies();
    const { confirm } = Modal;
    confirm({
      title: `Bạn có chắc muốn xoá Admin: ${admin.name} ?`,
      content: 'Bạn đã suy nghĩ kĩ chưa?!',
      okText: 'Xoá',
      okType: 'danger',
      cancelText: 'Huỷ',
      onOk: () => {
        // eslint-disable-next-line no-underscore-dangle
        removeAdmin(cookies.get('token'), admin._id, this.doAdminsListAPI);
      },
      onCancel() { },
    });
  };

  // Change password Modal
  showChangePasswordModal = admin => {
    this.setState({
      visibleChangePasswordModal: true,
      // eslint-disable-next-line no-underscore-dangle
      idAdminForChangePassword: admin._id,
    });
  };

  submitChangePasswordForm = e => {
    e.preventDefault();
    const formVal = $('#ChangePasswordForm').serializeArray();
    const cookies = new Cookies();
    const { changePasswordAdmin } = this.props;
    const { idAdminForChangePassword } = this.state;
    this.setState({ loadingChangePasswordModal: true });
    setTimeout(() => {
      changePasswordAdmin(
        cookies.get('token'),
        idAdminForChangePassword,
        formVal[0].value,
        this.doAdminsListAPI
      );
    }, 1000);
  };

  handleCancelChangePassword = () => {
    this.setState({ visibleChangePasswordModal: false });
  };

  // Change Info
  showChangeInfoModal = admin => {
    this.setState({
      visibleChangeInfoModal: true,
      // eslint-disable-next-line no-underscore-dangle
      idAdminForChangeInfo: admin._id,
      currentEmail: admin.email,
      currentName: admin.name,
    });
  };

  handleCurrentEmailOnChange = e => {
    this.setState({
      currentEmail: e.target.value,
    });
  };

  handleCurrentNameOnChange = e => {
    this.setState({
      currentName: e.target.value,
    });
  };

  submitChangeInfoForm = () => {
    const cookies = new Cookies();
    const { changeInfoAdmin } = this.props;
    const formVal = $('#ChangeInfoForm').serializeArray();
    const { idAdminForChangeInfo } = this.state;
    this.setState({ loadingChangeInfoModal: true });
    setTimeout(() => {
      changeInfoAdmin(
        cookies.get('token'),
        idAdminForChangeInfo,
        formVal[0].value,
        formVal[1].value,
        this.doAdminsListAPI,
      );
    }, 1000);
  };

  handleCancelChangeInfo = () => {
    this.setState({ visibleChangeInfoModal: false });
  };

  doAdminsListAPI = () => {
    const { getAdminsList } = this.props;
    const cookies = new Cookies();
    getAdminsList(cookies.get('token'));
    this.setState({ loadingChangeInfoModal: false, visibleChangeInfoModal: false });
    this.setState({ loadingChangePasswordModal: false, visibleChangePasswordModal: false });
  };

  render() {
    const {
      openModalAddNewAdmin,
      visibleChangePasswordModal,
      loadingChangePasswordModal,
      visibleChangeInfoModal,
      loadingChangeInfoModal,
      currentEmail,
      currentName,
    } = this.state;
    const { addNewAdmin, adminsList, getAdminsList } = this.props;
    const displayAdminsList = [];
    // render admins list
    Object.keys(adminsList).forEach(item => {
      displayAdminsList.push(
        // eslint-disable-next-line no-underscore-dangle
        <li key={adminsList[item]._id} className="ant-list-item">
          <Col span={2}>
            <ul className="ant-list-item-action" style={{ marginRight: '10px' }}>
              <li>
                <div>{item}</div>
              </li>
            </ul>
          </Col>

          <Col span={4}>
            <div className="ant-list-item-meta">
              <div className="ant-list-item-meta-avatar">
                {/* eslint-disable-next-line max-len */}
                <span className="ant-avatar ant-avatar-lg ant-avatar-square ant-avatar-image">
                  <img
                    alt=""
                    // eslint-disable-next-line max-len
                    src="https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png"
                  />
                </span>
              </div>
            </div>
          </Col>
          <Col span={10}>
            <div
              className="antd-pro-pages-list-basic-list-style-listContent"
              style={{ display: 'flex' }}
            >
              <Col span={10}>
                <div className="antd-pro-pages-list-basic-list-style-listContentItem">
                  <span>Admin</span>
                  <p>{adminsList[item].name}</p>
                </div>
              </Col>
              <Col span={2} />
              <Col span={10}>
                <div className="antd-pro-pages-list-basic-list-style-listContentItem">
                  <span>Email</span>
                  <p>{adminsList[item].email}</p>
                </div>
              </Col>
            </div>
          </Col>
          <Col>
            <ul className="ant-list-item-action">
              <li>
                <Button onClick={() => this.showChangeInfoModal(adminsList[item])} type="primary">
                  Chỉnh sửa
                </Button>
                <em className="ant-list-item-action-split" />
              </li>
              <li>
                <Button
                  onClick={() => this.showChangePasswordModal(adminsList[item])}
                  type="dashed"
                >
                  Đổi mật khẩu
                </Button>
                <em className="ant-list-item-action-split" />
              </li>
              <li>
                <Button onClick={() => this.showDeleteConfirm(adminsList[item])} type="danger">
                  Xoá
                </Button>
              </li>
            </ul>
          </Col>
        </li>,
      );
    });
    return (
      <div style={{ padding: '30px' }}>
        {/* change info modal */}
        <Modal
          visible={visibleChangeInfoModal}
          title="Đổi thông tin"
          onCancel={this.handleCancelChangeInfo}
          footer={[
            <Button key="back" onClick={this.handleCancelChangeInfo}>
              Huỷ
            </Button>,
            <Button
              form="ChangeInfoForm"
              key="submit"
              htmlType="submit"
              type="primary"
              loading={loadingChangeInfoModal}
              onClick={this.submitChangeInfoForm}
            >
              Đổi
            </Button>,
          ]}
        >
          <Form id="ChangeInfoForm">
            <Form.Item label="Email mới">
              <Input
                value={currentEmail}
                onChange={e => this.handleCurrentEmailOnChange(e)}
                type="email"
                name="email"
                required
                placeholder="email..."
              />
            </Form.Item>
            <Form.Item label="Họ tên mới">
              <Input
                value={currentName}
                onChange={e => this.handleCurrentNameOnChange(e)}
                name="name"
                required
                placeholder="nhập họ tên..."
              />
            </Form.Item>
          </Form>
        </Modal>
        {/* change password modal */}
        <Modal
          visible={visibleChangePasswordModal}
          title="Đổi mật khẩu"
          onCancel={this.handleCancelChangePassword}
          footer={[
            <Button key="back" onClick={this.handleCancelChangePassword}>
              Huỷ
            </Button>,
            <Button
              form="ChangePasswordForm"
              key="submit"
              htmlType="submit"
              type="primary"
              loading={loadingChangePasswordModal}
            >
              Đổi
            </Button>,
          ]}
        >
          <Form onSubmit={e => this.submitChangePasswordForm(e)} id="ChangePasswordForm">
            <Form.Item label="Mật khẩu mới">
              {/* eslint-disable-next-line max-len */}
              <Input
                minLength="6"
                name="password"
                type="password"
                required
                placeholder="nhâp mật khẩu mới..."
                autoComplete="on"
              />
            </Form.Item>
          </Form>
        </Modal>
        <ModalAddNewAdmin
          visible={openModalAddNewAdmin}
          addNewAdmin={addNewAdmin}
          closeModal={this.closeModalAddNewAdmin}
          getAdminsList={getAdminsList}
        />
        <div className="ant-card antd-pro-pages-list-basic-list-style-listCard">
          <div className="ant-card-head">
            <div className="ant-card-head-wrapper">
              <div className="ant-card-head-title">Danh sách Admin</div>
            </div>
          </div>
          <div className="ant-card-body" style={{ padding: '0px 32px 40px' }}>
            <button
              type="button"
              className="ant-btn ant-btn-dashed"
              style={{ width: '100%', marginBottom: '8px' }}
              ant-click-animating-without-extra-node="false"
              onClick={this.showModalAddNewAdmin}
            >
              <i aria-label="icon: plus" className="anticon anticon-plus">
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  className=""
                  data-icon="plus"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" />
                  <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" />
                </svg>
              </i>
              <span>Thêm mới</span>
            </button>
            <PaginacionTabla
              itemsperpage={5}
              items={displayAdminsList}
              pagesspan={3}
            />
          </div>
        </div>
      </div>
    );
  }
}

AdminManagement.propTypes = {
  addNewAdmin: PropTypes.func,
  getAdminsList: PropTypes.func,
  adminsList: PropTypes.objectOf(PropTypes.object),
  removeAdmin: PropTypes.func,
  changePasswordAdmin: PropTypes.func,
  changeInfoAdmin: PropTypes.func,
};

AdminManagement.defaultProps = {
  addNewAdmin: () => { },
  getAdminsList: () => { },
  adminsList: {},
  removeAdmin: () => { },
  changePasswordAdmin: () => { },
  changeInfoAdmin: () => { },
};

export default AdminManagement;
