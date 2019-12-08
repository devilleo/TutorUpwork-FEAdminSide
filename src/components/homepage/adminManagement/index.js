import React from 'react';
import { Col } from 'antd';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';

import ModalAddNewAdmin from './Modal_AddNewAdmin';

class AdminManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalAddNewAdmin: false,
      confirmLoading: false,
    };
  }

  componentDidMount() {
    const { getAdminsList } = this.props;
    const cookies = new Cookies();
    getAdminsList(cookies.get('token'));
  }

  showModal = () => {
    this.setState({
      openModalAddNewAdmin: true,
    });
  };

  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        openModalAddNewAdmin: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel = () => {
    this.setState({
      openModalAddNewAdmin: false,
    });
  };

  render() {
    const { openModalAddNewAdmin, confirmLoading } = this.state;

    const { addNewAdmin, adminsList } = this.props;
    const displayAdminsList = [];
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
          <Col span={12}>
            <div
              className="antd-pro-pages-list-basic-list-style-listContent"
              style={{ display: 'flex' }}
            >
              <Col span={12}>
                <div className="antd-pro-pages-list-basic-list-style-listContentItem">
                  <span>Admin</span>
                  <p>{adminsList[item].name}</p>
                </div>
              </Col>
              <Col span={12}>
                <div className="antd-pro-pages-list-basic-list-style-listContentItem">
                  <span>Email</span>
                  <p>{adminsList[item].email}</p>
                </div>
              </Col>
            </div>
          </Col>
          <Col span={6} style={{ textAlign: 'center' }}>
            <ul className="ant-list-item-action">
              <li>
                <a href="/adminmanagement">Chỉnh sửa</a>
                <em className="ant-list-item-action-split" />
              </li>
              <li>
                <a href="/adminmanagement">Đổi mật khẩu</a>
                <em className="ant-list-item-action-split" />
              </li>
              <li>
                <a href="/adminmanagement" className="ant-dropdown-trigger">
                  Xoá
                </a>
              </li>
            </ul>
          </Col>
        </li>,
      );
    });
    return (
      <div style={{ padding: '30px' }}>
        <ModalAddNewAdmin
          visible={openModalAddNewAdmin}
          confirmloading={confirmLoading}
          handleok={this.handleOk}
          handlecancel={this.handleCancel}
          addNewAdmin={addNewAdmin}
        />
        <div className="ant-card antd-pro-pages-list-basic-list-style-listCard">
          <div className="ant-card-head">
            <div className="ant-card-head-wrapper">
              <div className="ant-card-head-title">Danh sách Admin kkk</div>
            </div>
          </div>
          <div className="ant-card-body" style={{ padding: '0px 32px 40px' }}>
            <button
              type="button"
              className="ant-btn ant-btn-dashed"
              style={{ width: '100%', marginBottom: '8px' }}
              ant-click-animating-without-extra-node="false"
              onClick={this.showModal}
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
            <div className="ant-list ant-list-lg ant-list-split ant-list-something-after-last-item">
              <div className="ant-spin-nested-loading">
                <div className="ant-spin-container">
                  <ul className="ant-list-items">{displayAdminsList}</ul>
                </div>
              </div>
              <div className="ant-list-pagination">
                <ul className="ant-pagination" unselectable="unselectable">
                  <li
                    title="Previous Page"
                    className="ant-pagination-disabled ant-pagination-prev"
                    aria-disabled="true"
                  >
                    <a href="/" className="ant-pagination-item-link">
                      <i aria-label="icon: left" className="anticon anticon-left">
                        <svg
                          viewBox="64 64 896 896"
                          focusable="false"
                          className=""
                          data-icon="left"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          {/* eslint-disable-next-line max-len */}
                          <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" />
                        </svg>
                      </i>
                    </a>
                  </li>
                  <li
                    title="1"
                    className="ant-pagination-item ant-pagination-item-1 ant-pagination-item-active"
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                    tabIndex="0"
                  >
                    <a href="/adminmanagement">1</a>
                  </li>
                  <li
                    title="2"
                    className="ant-pagination-item ant-pagination-item-2"
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                    tabIndex="0"
                  >
                    <a href="/adminmanagement">2</a>
                  </li>
                  <li
                    title="3"
                    className="ant-pagination-item ant-pagination-item-3"
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                    tabIndex="0"
                  >
                    <a href="/adminmanagement">3</a>
                  </li>
                  <li
                    title="Next 5 Pages"
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                    tabIndex="0"
                    className="ant-pagination-jump-next ant-pagination-jump-next-custom-icon"
                  >
                    <a href="/adminmanagement" className="ant-pagination-item-link">
                      <div className="ant-pagination-item-container">
                        <i
                          aria-label="icon: double-right"
                          className="anticon anticon-double-right ant-pagination-item-link-icon"
                        >
                          <svg
                            viewBox="64 64 896 896"
                            focusable="false"
                            className=""
                            data-icon="double-right"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            {/* eslint-disable-next-line max-len */}
                            <path d="M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 0 0 188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 0 0 492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z" />
                          </svg>
                        </i>
                        <span className="ant-pagination-item-ellipsis">•••</span>
                      </div>
                    </a>
                  </li>
                  <li
                    title="10"
                    className="ant-pagination-item ant-pagination-item-10"
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                    tabIndex="0"
                  >
                    <a href="/adminmanagement">10</a>
                  </li>
                  <li
                    title="Next Page"
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                    tabIndex="0"
                    className=" ant-pagination-next"
                    aria-disabled="false"
                  >
                    <a href="/adminmanagement" className="ant-pagination-item-link">
                      <i aria-label="icon: right" className="anticon anticon-right">
                        <svg
                          viewBox="64 64 896 896"
                          focusable="false"
                          className=""
                          data-icon="double-right"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          {/* eslint-disable-next-line max-len */}
                          <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" />
                        </svg>
                      </i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
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
};

AdminManagement.defaultProps = {
  addNewAdmin: () => {},
  getAdminsList: () => {},
  adminsList: {},
};

export default AdminManagement;
