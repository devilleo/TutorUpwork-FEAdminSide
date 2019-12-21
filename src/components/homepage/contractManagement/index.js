import React from 'react';
import { Col, Button, Modal, Form, Select, Icon, Table, Spin } from 'antd';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';

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
      detail: {},
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

  onClose = () => {
    this.setState({
      currentStatus: ''
    })
  }

  onBlur = () => {
  }

  onFocus = () => {
  }

  onSearch = () => {
  }

  render() {
    const columns = [
      {
        title: 'Số thứ tự',
        dataIndex: 'stt',
        render: (value, record) => (
          <div className="antd-pro-pages-list-basic-list-style-listContentItem">
            <p>{record.stt}</p>
          </div>
        ),
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        sorter: (a, b) => a.stt - b.stt,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Kỹ năng',
        dataIndex: 'skill',
        render: (value, record) => (
          <div className="antd-pro-pages-list-basic-list-style-listContentItem">
            <p>{record.skill}</p>
          </div>
        ),
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.skill === value,
        sorter: (a, b) => (a.skill ? a.skill.length : 0) - (b.skill ? b.skill.length : 0),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Chi phí',
        dataIndex: 'totalPrice',
        render: (value, record) => (
          <div className="antd-pro-pages-list-basic-list-style-listContentItem">
            <p>{record.totalPrice}</p>
          </div>
        ),
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        sorter: (a, b) => a.totalPrice - b.totalPrice,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        render: (value, record) => (
          <div className="antd-pro-pages-list-basic-list-style-listContentItem">
            <p>
              {
                record.status === "Đã thanh toán" && (
                  <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                )
              }
              {
                record.status === "Chưa thanh toán" && (
                  <Icon type="close-circle" theme="twoTone" twoToneColor="#E43343" />
                )
              }
              {
                record.status === "Đang khiếu nại" && (
                  <Icon type="frown" theme="twoTone" twoToneColor="#E8C812" />
                )
              }
              {
                record.status === "Hoàn thành" && (
                  <Icon type="smile" theme="twoTone" />
                )
              }
              {` ${record.status}`}
            </p>
          </div>

        ),
        filters: [
          {
            text: 'Đã thanh toán',
            value: 'Đã thanh toán',
          },
          {
            text: 'Chưa thanh toán',
            value: 'Chưa thanh toán',
          },
          {
            text: 'Đang khiếu nại',
            value: 'Đang khiếu nại',
          },
          {
            text: 'Hoàn thành',
            value: 'Hoàn thành',
          },
        ],
        // specify the condition of filtering result
        // here is that finding the name started with `value
        onFilter: (value, record) => record.status === value,
        sorter: (a, b) => (a.status ? a.status.length : 0) - (b.status ? b.status.length : 0),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Thao tác',
        key: 'action',
        render: (value, record) => (
          <ul className="ant-list-item-action" style={{ marginLeft: '0px' }}>
            <li>
              <Button
                className="btnDetail"
                onClick={() => this.showInfoDrawer(record)}
                type="primary"
              >
                Chi tiết
              </Button>
              <em className="ant-list-item-action-split" />
            </li>
            <li>
              <Button
                onClick={() => this.showChangeInfoModal(record)}
                type="primary"
              >
                Chỉnh sửa
              </Button>
            </li>
          </ul>
        ),
      },
    ];
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
      contractsList[item].key = contractsList[item].id
      contractsList[item].stt = Number(item) + 1;
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
                  <span>Chi phí</span>
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
                placeholder="Chọn trạng thái"
                optionFilterProp="children"
                onChange={this.onChange}
                onClose={this.onClose}
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
                <Option value="Đang khiếu nại">Đang khiếu nại</Option>
                <Option value="Hoàn thành">Hoàn thành</Option>
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
            <div className="ant-spin-container" style={{ textAlign: 'center' }}>
              {displaycontractsList.length === 0 && <Spin size="large" />}
            </div>
            <Table columns={columns} dataSource={Object.values(contractsList)} />
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
