import React from 'react';
import { Col, Button, Modal, Form, Input } from 'antd';
import PropTypes from 'prop-types';
// import $ from 'jquery';
import Cookies from 'universal-cookie';

import PaginacionTabla from "./pagination";
import MyInfoDraw from "./infoDrawer"

class ContractManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // idContractForChangeInfo: '',
      currentStatus: '',
      visibleChangeInfoModal: false,
      loadingChangeInfoModal: false,

      visibleInfoDrawer: false,
      detail: {}
    };
  }

  componentDidMount() {
    const { getContractsList } = this.props;
    const cookies = new Cookies();
    getContractsList(cookies.get('token'));
  }

  // componentDidUpdate() {
  //   const { getContractsList } = this.props;
  //   const cookies = new Cookies();
  //   getContractsList(cookies.get('token'));
  // }

  // Change Info
  showChangeInfoModal = contract => {
    this.setState({
      visibleChangeInfoModal: true,
      // eslint-disable-next-line no-underscore-dangle
      // idContractForChangeInfo: contract.id,
      currentStatus: contract.status,
    });
  };

  handleCurrentStatusOnChange = e => {
    this.setState({
      currentStatus: e.target.value,
    });
  };

  submitChangeInfoForm = () => {
    // const cookies = new Cookies();
    // const { changeInfoSkill } = this.props;
    // const formVal = $('#ChangeInfoForm').serializeArray();
    // const { idContractForChangeInfo } = this.state;
    // this.setState({ loadingChangeInfoModal: true });
    // setTimeout(() => {
    //   changeInfoSkill(
    //     cookies.get('token'),
    //     idContractForChangeInfo,
    //     formVal[0].value,
    //     this.docontractsListAPI,
    //   );
    // }, 1000);
  };

  handleCancelChangeInfo = () => {
    this.setState({ visibleChangeInfoModal: false });
  };

  showInfoDrawer = (contract) => {
    this.setState({
      detail: contract,
      visibleInfoDrawer: true
    })
  }

  onCloseInfoDrawer = () => {
    this.setState({
      visibleInfoDrawer: false
    })
  }

  docontractsListAPI = () => {
    const { getContractsList } = this.props;
    const cookies = new Cookies();
    getContractsList(cookies.get('token'));
    this.setState({ loadingChangeInfoModal: false, visibleChangeInfoModal: false });
  };

  render() {
    const {
      visibleChangeInfoModal,
      loadingChangeInfoModal,
      visibleInfoDrawer,
      currentStatus,
      detail,
    } = this.state;
    const { contractsList } = this.props;
    const displaycontractsList = [];
    // render admins list
    Object.keys(contractsList).forEach(item => {
      displaycontractsList.push(
        // eslint-disable-next-line no-underscore-dangle
        <li key={contractsList[item]._id} className="ant-list-item">
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
              <Col span={8}>
                <div className="antd-pro-pages-list-basic-list-style-listContentItem">
                  <span>Kỹ năng</span>
                  <p>{contractsList[item].skill}</p>
                </div>
              </Col>
              <Col span={8}>
                <div className="antd-pro-pages-list-basic-list-style-listContentItem">
                  <span>Tổng tiền</span>
                  <p>{contractsList[item].totalPrice}</p>
                </div>
              </Col>
              <Col span={8}>
                <div className="antd-pro-pages-list-basic-list-style-listContentItem">
                  <span>Trạng thái</span>
                  <p>{contractsList[item].status}</p>
                </div>
              </Col>
            </div>
          </Col>
          <Col>
            <ul className="ant-list-item-action">
              <li>
                <Button
                  className="btnDetail"
                  onClick={() => this.showInfoDrawer(contractsList[item])}
                  type="primary"
                >
                  Chi tiết
                </Button>
                <em className="ant-list-item-action-split" />
              </li>
              <li>
                <Button
                  onClick={() => this.showChangeInfoModal(contractsList[item])}
                  type="primary"
                >
                  Chỉnh sửa
                </Button>
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
          detail={detail}
        />
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
                value={currentStatus}
                onChange={e => this.handleCurrentStatusOnChange(e)}
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
              <div className="ant-card-head-title">Danh sách hợp đồng</div>
            </div>
          </div>
          <div className="ant-card-body" style={{ padding: '0px 32px 40px' }}>
            <PaginacionTabla
              itemsperpage={10}
              items={displaycontractsList}
              pagesspan={3}
            />
          </div>
        </div>
      </div>
    );
  }
}

ContractManagement.propTypes = {
  getContractsList: PropTypes.func,
  contractsList: PropTypes.objectOf(PropTypes.object),
  // changeInfoSkill: PropTypes.func,
};

ContractManagement.defaultProps = {
  getContractsList: () => { },
  contractsList: {},
  // changeInfoSkill: () => { },
};

export default ContractManagement;
