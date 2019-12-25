import React from 'react';
import { Col, Button } from 'antd';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faFacebookSquare, faGooglePlusSquare } from '@fortawesome/free-brands-svg-icons'
import { faCreditCard } from '@fortawesome/free-regular-svg-icons'
// import $ from 'jquery';
import Cookies from 'universal-cookie';

import MyInfoDraw from './infoDrawer';
import PaginacionTabla from '../pagination'

class StudentManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRequestBlockOrUnblock: false,
      idButtonProcessing: '',

      visibleInfoDrawer: false,
    };
  }

  componentDidMount() {
    const { getStudentsList } = this.props;
    const cookies = new Cookies();
    getStudentsList(cookies.get('token'));
  }

  // info drawer
  showInfoDrawer = id => {
    const { getStudentDetail } = this.props;
    const cookies = new Cookies();
    getStudentDetail(cookies.get('token'), id);
    this.setState({
      visibleInfoDrawer: true,
    });
  };

  onCloseInfoDrawer = () => {
    const { removeInfoStudentInDrawer, removeContractsInDrawer } = this.props
    removeInfoStudentInDrawer()
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
      blockUser(cookies.get('token'), id, this.updateStudentsList);
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
      unblockUser(cookies.get('token'), id, this.updateStudentsList);
      this.setState({
        isRequestBlockOrUnblock: false,
        idButtonProcessing: '',
      });
    }, 1000);
  };

  updateStudentsList = () => {
    const { getStudentsList } = this.props;
    const cookies = new Cookies();
    getStudentsList(cookies.get('token'));
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { studentsList, studentDetail, studentContracts, getContracts } = this.props;
    const { isRequestBlockOrUnblock, idButtonProcessing, visibleInfoDrawer } = this.state;
    const displayStudentsList = [];
    // render admins list
    Object.keys(studentsList).forEach(item => {
      displayStudentsList.push(
        // eslint-disable-next-line no-underscore-dangle
        <li key={studentsList[item]._id} className="ant-list-item">
          <Col span={2}>
            <ul className="ant-list-item-action" style={{ marginRight: '10px' }}>
              <li>
                <div>{item}</div>
              </li>
            </ul>
          </Col>

          <Col span={2}>
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
              <Col span={15}>
                <div className="antd-pro-pages-list-basic-list-style-listContentItem">
                  <span>Email</span>
                  <p>{studentsList[item].email}</p>
                </div>
              </Col>
              <Col span={2} />
              <Col span={7}>
                <div className="antd-pro-pages-list-basic-list-style-listContentItem">
                  <span>Loại tài khoản</span>
                  <p>
                    {studentsList[item].type === 1 &&
                      <FontAwesomeIcon size="2x" icon={faCreditCard} />}
                    {studentsList[item].type === 2 &&
                      <FontAwesomeIcon size="2x" color="#4267B2" icon={faFacebookSquare} />}
                    {studentsList[item].type === 3 && (
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
                  onClick={() => this.showInfoDrawer(studentsList[item].id)}
                  type="primary"
                >
                  Chi tiết
                </Button>
                <em className="ant-list-item-action-split" />
              </li>

              <li>
                {studentsList[item].valid !== undefined &&
                  !studentsList[item].valid && <em className="ant-list-item-action-split" /> && (
                    <Button
                      style={{ backgroundColor: 'green', borderColor: 'green' }}
                      onClick={() => this.handleUnblockRequest(studentsList[item].id)}
                      loading={
                        isRequestBlockOrUnblock && idButtonProcessing === studentsList[item].id
                      }
                      type="primary"
                    >
                      Bỏ chặn
                    </Button>
                  )}
                {
                  (studentsList[item].valid === undefined || studentsList[item].valid) && (
                    // eslint-disable-next-line react/jsx-indent
                    <em className="ant-list-item-action-split" />
                  ) && (
                    // eslint-disable-next-line react/jsx-indent
                    <Button
                      onClick={() => this.handleBlockRequest(studentsList[item].id)}
                      type="danger"
                      loading={
                        isRequestBlockOrUnblock && idButtonProcessing === studentsList[item].id
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
          studentContracts={studentContracts}
          studentDetail={studentDetail}
          getContracts={getContracts}
        />
        <div className="ant-card antd-pro-pages-list-basic-list-style-listCard">
          <div className="ant-card-head">
            <div className="ant-card-head-wrapper">
              <div className="ant-card-head-title">Danh sách tài khoản học viên</div>
            </div>
          </div>
          <div className="ant-card-body" style={{ padding: '0px 32px 40px' }}>
            <PaginacionTabla
              itemsperpage={5}
              items={displayStudentsList}
              pagesspan={3}
            />
          </div>
        </div>
      </div>
    );
  }
}

StudentManagement.propTypes = {
  studentsList: PropTypes.objectOf(PropTypes.object, PropTypes.array),
  getStudentsList: PropTypes.func,
  blockUser: PropTypes.func,
  unblockUser: PropTypes.func,
  getStudentDetail: PropTypes.func,
  removeInfoStudentInDrawer: PropTypes.func,
  removeContractsInDrawer: PropTypes.func,
};

StudentManagement.defaultProps = {
  studentsList: {},
  getStudentsList: () => { },
  blockUser: () => { },
  unblockUser: () => { },
  getStudentDetail: () => { },
  removeInfoStudentInDrawer: () => { },
  removeContractsInDrawer: () => { },
};

export default StudentManagement;
