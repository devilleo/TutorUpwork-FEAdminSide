import React from 'react';
import { Col, Button, Spin } from 'antd';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faGooglePlusSquare } from '@fortawesome/free-brands-svg-icons'
import { faCreditCard } from '@fortawesome/free-regular-svg-icons'


// import $ from 'jquery';
import Cookies from 'universal-cookie';

import MyInfoDraw from './infoDrawer';

class TutorManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRequestBlockOrUnblock: false,
      idButtonProcessing: '',

      visibleInfoDrawer: false,
    };
  }

  componentDidMount() {
    const { getTutorsList } = this.props;
    const cookies = new Cookies();
    getTutorsList(cookies.get('token'));
  }

  // info drawer
  showInfoDrawer = id => {
    const { getTutorDetail } = this.props;
    const cookies = new Cookies();
    getTutorDetail(cookies.get('token'), id);
    this.setState({
      visibleInfoDrawer: true,
    });
  };

  onCloseInfoDrawer = () => {
    const { removeInfoInDrawer, removeContractsInDrawer } = this.props
    removeInfoInDrawer()
    removeContractsInDrawer()
    this.setState({
      visibleInfoDrawer: false,
    });
  };

  // block/unblock
  handleBlockRequest = id => {
    this.setState({
      isRequestBlockOrUnblock: true,
      idButtonProcessing: id,
    });
    const { blockUser } = this.props;
    const cookies = new Cookies();
    setTimeout(() => {
      blockUser(cookies.get('token'), id, this.updateTutorsList);
      this.setState({
        isRequestBlockOrUnblock: false,
        idButtonProcessing: '',
      });
    }, 1000);
  };

  handleUnblockRequest = id => {
    this.setState({
      isRequestBlockOrUnblock: true,
      idButtonProcessing: id,
    });
    const { unblockUser } = this.props;
    const cookies = new Cookies();
    setTimeout(() => {
      unblockUser(cookies.get('token'), id, this.updateTutorsList);
      this.setState({
        isRequestBlockOrUnblock: false,
        idButtonProcessing: '',
      });
    }, 1000);
  };

  updateTutorsList = () => {
    const { getTutorsList } = this.props;
    const cookies = new Cookies();
    getTutorsList(cookies.get('token'));
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { tutorsList, tutorDetail, tutorContracts, getContracts } = this.props;
    const { isRequestBlockOrUnblock, idButtonProcessing, visibleInfoDrawer } = this.state;
    const displayAdminsList = [];
    // render admins list
    Object.keys(tutorsList).forEach(item => {
      displayAdminsList.push(
        // eslint-disable-next-line no-underscore-dangle
        <li key={tutorsList[item]._id} className="ant-list-item">
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
                  <span></span>
                  <p>{tutorsList[item].email}</p>
                </div>
              </Col>
              <Col span={2} />
              <Col span={10}>
                <div className="antd-pro-pages-list-basic-list-style-listContentItem">
                  <span>Loại tài khoản</span>
                  <p>
                    {tutorsList[item].type === 1 &&
                      <FontAwesomeIcon size="2x" icon={faCreditCard} />}
                    {tutorsList[item].type === 2 && (
                      <FontAwesomeIcon
                        size="2x"
                        color="#4267B2"
                        icon={faFacebookSquare}
                      />
                    )}
                    {tutorsList[item].type === 3 && (
                      <FontAwesomeIcon
                        size="2x"
                        color="#d34836"
                        icon={faGooglePlusSquare}
                      />
                    )}
                  </p>
                </div>
              </Col>
            </div>
          </Col>
          <Col>
            <ul className="ant-list-item-action">
              <li>
                <Button
                  className="btnDetail"
                  onClick={() => this.showInfoDrawer(tutorsList[item].id)}
                  type="primary"
                >
                  Chi tiết
                </Button>
                <em className="ant-list-item-action-split" />
              </li>

              <li>
                {tutorsList[item].valid !== undefined &&
                  !tutorsList[item].valid && <em className="ant-list-item-action-split" /> && (
                    <Button
                      style={{ backgroundColor: 'green', borderColor: 'green' }}
                      onClick={() => this.handleUnblockRequest(tutorsList[item].id)}
                      loading={
                        isRequestBlockOrUnblock && idButtonProcessing === tutorsList[item].id
                      }
                      type="primary"
                    >
                      Bỏ chặn
                    </Button>
                  )}
                {
                  (tutorsList[item].valid === undefined || tutorsList[item].valid) && (
                    // eslint-disable-next-line react/jsx-indent
                    <em className="ant-list-item-action-split" />
                  ) && (
                    // eslint-disable-next-line react/jsx-indent
                    <Button
                      onClick={() => this.handleBlockRequest(tutorsList[item].id)}
                      type="danger"
                      loading={
                        isRequestBlockOrUnblock && idButtonProcessing === tutorsList[item].id
                      }
                    >
                      Chặn
                    </Button>
                  )
                }
              </li>
            </ul>
          </Col>
        </li>,
      );
    });
    return (
      <div style={{ padding: '30px' }}>
        <MyInfoDraw
          visible={visibleInfoDrawer}
          onClose={this.onCloseInfoDrawer}
          tutorContracts={tutorContracts}
          tutorDetail={tutorDetail}
          getContracts={getContracts}
        />
        <div className="ant-card antd-pro-pages-list-basic-list-style-listCard">
          <div className="ant-card-head">
            <div className="ant-card-head-wrapper">
              <div className="ant-card-head-title">Danh sách tài khoản gia sư</div>
            </div>
          </div>
          <div className="ant-card-body" style={{ padding: '0px 32px 40px' }}>
            <div className="ant-list ant-list-lg ant-list-split ant-list-something-after-last-item">
              <div className="ant-spin-nested-loading">
                <div className="ant-spin-container">
                  {displayAdminsList.length === 0 && <Spin size="large" />}
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

TutorManagement.propTypes = {
  tutorsList: PropTypes.objectOf(PropTypes.object, PropTypes.array),
  getTutorsList: PropTypes.func,
  blockUser: PropTypes.func,
  unblockUser: PropTypes.func,
  getTutorDetail: PropTypes.func,
  removeInfoInDrawer: PropTypes.func,
  removeContractsInDrawer: PropTypes.func,
};

TutorManagement.defaultProps = {
  tutorsList: {},
  getTutorsList: () => { },
  blockUser: () => { },
  unblockUser: () => { },
  getTutorDetail: () => { },
  removeInfoInDrawer: () => { },
  removeContractsInDrawer: () => { },
};

export default TutorManagement;
