import React from 'react';
import { Col, Button, Modal, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import $ from 'jquery';
import Cookies from 'universal-cookie';

import PaginacionTabla from '../pagination'

class SkillManagement extends React.Component {
  constructor(props) {
    super(props);
    this.showDeleteConfirm = this.showDeleteConfirm.bind(this);
    this.state = {
      idSkillForChangeInfo: '',
      currentName: '',
      visibleChangeInfoModal: false,
      loadingChangeInfoModal: false,

      visibleAddNewSkillModal: false,
      loadingAddNewSkillModal: false,
    };
  }

  componentDidMount() {
    const { getSkillsList } = this.props;
    const cookies = new Cookies();
    getSkillsList(cookies.get('token'));
  }

  // componentDidUpdate() {
  //   const { getSkillsList } = this.props;
  //   const cookies = new Cookies();
  //   getSkillsList(cookies.get('token'));
  // }

  // remove skill Modal
  showDeleteConfirm = skill => {
    const { removeSkill } = this.props;
    const cookies = new Cookies();
    const { confirm } = Modal;
    confirm({
      title: `Bạn có chắc muốn xoá Skill: ${skill.name} ?`,
      content: 'Bạn đã suy nghĩ kĩ chưa?!',
      okText: 'Xoá',
      okType: 'danger',
      cancelText: 'Huỷ',
      onOk: () => {
        // eslint-disable-next-line no-underscore-dangle
        removeSkill(cookies.get('token'), skill._id, this.doSkillsListAPI);
      },
      onCancel() { },
    });
  };

  // Change Info
  showChangeInfoModal = skill => {
    this.setState({
      visibleChangeInfoModal: true,
      // eslint-disable-next-line no-underscore-dangle
      idSkillForChangeInfo: skill._id,
      currentName: skill.name,
    });
  };

  handleCurrentNameOnChange = e => {
    this.setState({
      currentName: e.target.value,
    });
  };

  submitChangeInfoForm = () => {
    const cookies = new Cookies();
    const { changeInfoSkill } = this.props;
    const formVal = $('#ChangeInfoForm').serializeArray();
    const { idSkillForChangeInfo } = this.state;
    this.setState({ loadingChangeInfoModal: true });
    setTimeout(() => {
      changeInfoSkill(
        cookies.get('token'),
        idSkillForChangeInfo,
        formVal[0].value,
        this.doSkillsListAPI,
      );
    }, 1000);
  };

  handleCancelChangeInfo = () => {
    this.setState({ visibleChangeInfoModal: false });
  };

  doSkillsListAPI = () => {
    const { getSkillsList } = this.props;
    const cookies = new Cookies();
    getSkillsList(cookies.get('token'));
    this.setState({ loadingAddNewSkillModal: false, visibleAddNewSkillModal: false });
    this.setState({ loadingChangeInfoModal: false, visibleChangeInfoModal: false });
  };

  // add new skill area
  showModalAddNewAdmin = () => {
    this.setState({ visibleAddNewSkillModal: true });
  };

  handleCancelAddNewSkill = () => {
    this.setState({ visibleAddNewSkillModal: false });
  };

  submitAddNewSkillForm = () => {
    const cookies = new Cookies();
    const { addNewSkillRequest } = this.props;
    const formVal = $('#AddNewSkillForm').serializeArray();
    this.setState({ loadingAddNewSkillModal: true });
    setTimeout(() => {
      addNewSkillRequest(cookies.get('token'), formVal[0].value, this.doSkillsListAPI);
    }, 1000);
  };

  render() {
    const {
      visibleChangeInfoModal,
      loadingChangeInfoModal,
      visibleAddNewSkillModal,
      loadingAddNewSkillModal,
      currentName,
    } = this.state;
    const { skillsList } = this.props;
    const displaySkillsList = [];
    // render admins list
    Object.keys(skillsList).forEach(item => {
      displaySkillsList.push(
        // eslint-disable-next-line no-underscore-dangle
        <li key={skillsList[item]._id} className="ant-list-item">
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
              <Col span={24}>
                <div className="antd-pro-pages-list-basic-list-style-listContentItem">
                  <span>Kỹ năng</span>
                  <p>{skillsList[item].name}</p>
                </div>
              </Col>
            </div>
          </Col>
          <Col>
            <ul className="ant-list-item-action">
              <li>
                <Button onClick={() => this.showChangeInfoModal(skillsList[item])} type="primary">
                  Chỉnh sửa
                </Button>
                <em className="ant-list-item-action-split" />
              </li>

              <li>
                <Button onClick={() => this.showDeleteConfirm(skillsList[item])} type="danger">
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
        {/* add new skill modal */}
        <Modal
          visible={visibleAddNewSkillModal}
          title="Thêm mới kỹ năng"
          onCancel={this.handleCancelAddNewSkill}
          footer={[
            <Button key="back" onClick={this.handleCancelAddNewSkill}>
              Huỷ
            </Button>,
            <Button
              form="AddNewSkillForm"
              key="submit"
              htmlType="submit"
              type="primary"
              loading={loadingAddNewSkillModal}
              onClick={this.submitAddNewSkillForm}
            >
              Thêm
            </Button>,
          ]}
        >
          <Form id="AddNewSkillForm">
            <Form.Item label="Tên kỹ năng">
              <Input name="name" required placeholder="nhập tên kỹ năng..." />
            </Form.Item>
          </Form>
        </Modal>

        {/* change info modal */}
        <Modal
          visible={visibleChangeInfoModal}
          title="Đổi thông tin kỹ năng"
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
            <Form.Item label="Tên mới">
              <Input
                value={currentName}
                onChange={e => this.handleCurrentNameOnChange(e)}
                name="name"
                required
                placeholder="nhập tên mới..."
              />
            </Form.Item>
          </Form>
        </Modal>

        <div className="ant-card antd-pro-pages-list-basic-list-style-listCard">
          <div className="ant-card-head">
            <div className="ant-card-head-wrapper">
              <div className="ant-card-head-title">Danh sách kỹ năng</div>
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
              items={displaySkillsList}
              pagesspan={3}
            />
          </div>
        </div>
      </div>
    );
  }
}

SkillManagement.propTypes = {
  getSkillsList: PropTypes.func,
  skillsList: PropTypes.objectOf(PropTypes.object),
  removeSkill: PropTypes.func,
  changeInfoSkill: PropTypes.func,
  addNewSkillRequest: PropTypes.func,
};

SkillManagement.defaultProps = {
  getSkillsList: () => { },
  skillsList: {},
  removeSkill: () => { },
  changeInfoSkill: () => { },
  addNewSkillRequest: () => { },
};

export default SkillManagement;
