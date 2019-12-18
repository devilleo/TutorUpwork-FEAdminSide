import React from 'react';
import { Col, Button, Modal, Form, Select, Icon } from 'antd';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';

import PaginacionTabla from "../pagination";
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
      idContractForChangeInfo: contract.id,
      currentStatus: contract.status,
    });
  };

  submitChangeInfoForm = () => {
    const cookies = new Cookies();
    const { changeInfoContract } = this.props;
    const { idContractForChangeInfo, currentStatus } = this.state;
    this.setState({ loadingChangeInfoModal: true });
    setTimeout(() => {
      changeInfoContract(
        cookies.get('token'),
        idContractForChangeInfo,
        currentStatus,
        this.docontractsListAPI,
      );
    }, 1000);
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

  // update status
  onChange = value => {
    this.setState({
      currentStatus: value
    })
  }

  onBlur = () => {
  }

  onFocus = () => {
  }

  onSearch = () => {
  }

  render() {
    const { Option } = Select;
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
                  <p>
                    {
                      contractsList[item].status === "Đã thanh toán" && (
                        <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                      )
                    }
                    {
                      contractsList[item].status === "Chưa thanh toán" && (
                        <Icon type="close-circle" theme="twoTone" twoToneColor="#E43343" />
                      )
                    }
                    {` ${contractsList[item].status}`}
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
          title="Cập nhật trạng thái"
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
            <Form.Item label="Trạng thái">
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onSearch={this.onSearch}
                value={currentStatus}
                filterOption={
                  (input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="Chưa thanh toán">Chưa thanh toán</Option>
                <Option value="Đã thanh toán">Đã thanh toán</Option>
              </Select>
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
              itemsperpage={5}
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
  changeInfoContract: PropTypes.func,
};

ContractManagement.defaultProps = {
  getContractsList: () => { },
  contractsList: {},
  changeInfoContract: () => { },
};

export default ContractManagement;
