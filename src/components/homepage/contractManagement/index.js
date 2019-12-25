import React from 'react';
import { Button, Modal, Form, Select, Icon, Table, Input } from 'antd';
import Highlighter from 'react-highlight-words';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';

import MyInfoDraw from "./infoDrawer"
import MessageDraw from "./messagesDrawer"

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

      visibleMessagesDrawer: false,
      messages: {},
      currentIdContract: '',

      searchText: '',
      searchedColumn: '',
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

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Tìm ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Tìm
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Khôi phục
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) => {
      if (record[dataIndex] === undefined)
        return null
      return record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase())
    },
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      // eslint-disable-next-line react/destructuring-assignment
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          // eslint-disable-next-line react/destructuring-assignment
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
          text
        ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

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

  // open complains resolve Drawer
  onOpenComplainsResolveDrawer = (contract) => {
    const { getMessagesConversation } = this.props;
    const cookies = new Cookies();
    this.setState({
      visibleMessagesDrawer: true,
      currentIdContract: contract.id,
    })
    getMessagesConversation(
      cookies.get('token'),
      contract.tutorId,
      contract.studentId,
      this.updateConversation
    );
  }

  updateConversation = (messages) => {
    this.setState({
      messages
    })
  }

  onCloseMessagesDrawer = () => {
    this.setState({
      visibleMessagesDrawer: false
    })
  }

  render() {
    const columns = [
      {
        title: 'STT',
        dataIndex: 'stt',
        width: 80,
        fixed: 'left',
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
        title: 'ID Giáo viên',
        dataIndex: 'tutorId',
        ...this.getColumnSearchProps('tutorId'),
        render: (value, record) => (
          <p>{record.tutorId}</p>
        ),
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.tutorId === value,
        sorter: (a, b) => (a.tutorId ? a.tutorId.length : 0) - (b.tutorId ? b.tutorId.length : 0),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'ID Học sinh',
        dataIndex: 'studentId',
        ...this.getColumnSearchProps('studentId'),
        render: (value, record) => (
          <p>{record.studentId}</p>
        ),
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.studentId === value,
        sorter: (a, b) =>
          (a.studentId ? a.studentId.length : 0) - (b.studentId ? b.studentId.length : 0),
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
        ...this.getColumnSearchProps('totalPrice'),
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
                  <Icon type="meh" theme="twoTone" twoToneColor="#E8C812" />
                )
              }
              {
                record.status === "Đang khiếu nại" && (
                  <Icon type="frown" theme="twoTone" twoToneColor="#9368B7" />
                )
              }
              {
                record.status === "Đã hủy" && (
                  <Icon type="close-circle" theme="twoTone" twoToneColor="#E43343" />

                )
              }
              {
                record.status === "Đang thực hiện" && (
                  <Icon type="sync" spin style={{ color: 'blue' }} />
                )
              }
              {
                record.status === "Hoàn thành" && (
                  <svg
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    viewBox="0 0 1024 1024"
                    color="hotpink"
                  >
                    {/* eslint-disable-next-line max-len */}
                    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
                  </svg>
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
            text: 'Đang thực hiện',
            value: 'Đang thực hiện',
          },
          {
            text: 'Đã hủy',
            value: 'Đã hủy',
          },
          {
            text: 'Hoàn thành',
            value: 'Hoàn thành',
          },
          {
            text: 'Đang khiếu nại',
            value: 'Đang khiếu nại',
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
        width: 370,
        fixed: 'right',
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
                disabled={record.status === "Hoàn thành"}
                type="primary"
              >
                Chỉnh sửa
              </Button>
              <em className="ant-list-item-action-split" />
            </li>

            <li>
              <Button
                type="danger"
                ghost
                style={{ borderColor: '#9368B7' }}
                onClick={() => this.onOpenComplainsResolveDrawer(record)}
                disabled={record.status !== "Đang khiếu nại"}
              >
                Xử lý khiếu nại
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
      visibleMessagesDrawer,
      messages,
      currentIdContract
    } = this.state;
    const { contractsList, changeInfoContract } = this.props;

    // render admins list
    Object.keys(contractsList).forEach(item => {
      contractsList[item].key = contractsList[item].id
      contractsList[item].stt = Number(item) + 1;
    });

    return (
      <div style={{ padding: '30px' }}>
        <MyInfoDraw
          visible={visibleInfoDrawer}
          onClose={this.onCloseInfoDrawer}
          detail={detail}
        />
        <MessageDraw
          visible={visibleMessagesDrawer}
          onClose={this.onCloseMessagesDrawer}
          messages={messages}
          changeInfoContract={changeInfoContract}
          docontractsListAPI={this.docontractsListAPI}
          currentIdContract={currentIdContract}
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
                <Option value="Đang thực hiện">Đang thực hiện</Option>
                <Option value="Đã hủy">Đã hủy</Option>
                <Option value="Hoàn thành">Hoàn thành</Option>
                <Option value="Đang khiếu nại">Đang khiếu nại</Option>
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
            <Table
              loading={Object.values(contractsList).length === 0}
              columns={columns}
              dataSource={Object.values(contractsList)}
              scroll={{ x: 1500, y: 400 }}
            />
          </div>
        </div>
      </div>
    );
  }
}

ContractManagement.propTypes = {
  getContractsList: PropTypes.func,
  getMessagesConversation: PropTypes.func,
  contractsList: PropTypes.objectOf(PropTypes.object),
  changeInfoContract: PropTypes.func,
};

ContractManagement.defaultProps = {
  getContractsList: () => { },
  getMessagesConversation: () => { },
  contractsList: {},
  changeInfoContract: () => { },
};

export default ContractManagement;
