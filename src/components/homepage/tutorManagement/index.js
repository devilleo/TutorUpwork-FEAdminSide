import React from 'react';
import { Col, Button } from 'antd';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faGooglePlusSquare } from '@fortawesome/free-brands-svg-icons'
import { faCreditCard } from '@fortawesome/free-regular-svg-icons'


// import $ from 'jquery';
import Cookies from 'universal-cookie';

import PaginacionTabla from '../pagination'
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
                  <p>{tutorsList[item].email}</p>
                </div>
              </Col>
              <Col span={2} />
              <Col span={7}>
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
