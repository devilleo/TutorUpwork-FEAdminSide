/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React, { useState } from 'react';
import { Drawer, Button, Form, Row, Col, Input, Avatar, Card } from 'antd';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import moment from 'moment';
import { addressDetail } from '../../../utils/location';
import MyContractsDrawer from '../tutorManagement/contractsDrawer';

// import $ from 'jquery';

const MyInfoDrawer = props => {
  // eslint-disable-next-line react/prop-types
  const { onClose, visible, studentDetail, studentContracts } = props;
  const [visibleContractsDrawer, setVisibleContractsDrawer] = useState(false);

  const onCloseContractsDrawer = () => {
    setVisibleContractsDrawer(false)
  }

  const onOpenContractsDrawer = () => {
    const { getContracts } = props
    const cookies = new Cookies();
    getContracts(
      cookies.get('token'),
      (studentDetail.contracts !== undefined) ? studentDetail.contracts : []
    )
    setVisibleContractsDrawer(true)
  }

  let address = {};
  if (studentDetail !== undefined && studentDetail.address !== undefined) {
    address = {
      ...address,
      cityName: addressDetail(
        studentDetail.address.city,
        studentDetail.address.district
      ).cityName.name,
      disName: addressDetail(
        studentDetail.address.city,
        studentDetail.address.district
      ).disName.name,
    };
  }

  // display skills list
  const displayListSkill = [];
  if (studentDetail !== undefined && studentDetail.skills !== undefined) {
    for (let i = 0; i < studentDetail.skills.length; i += 1) {
      displayListSkill.push(<p key={studentDetail.skills[i]}>{studentDetail.skills[i]}</p>);
    }
  }

  return (
    <Drawer
      title="Thông tin chi tiết"
      width={720}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      placement="left"
    >
      <MyContractsDrawer
        visible={visibleContractsDrawer}
        contracts={studentContracts}
        onClose={onCloseContractsDrawer}
      />
      <Form layout="vertical" hideRequiredMark>
        <Row style={{ textAlign: 'center' }} gutter={16}>
          <Col span={24}>
            <Avatar src={studentDetail.avatar} size={100} icon="user" />
          </Col>
        </Row>
        <br />
        <br />
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Họ tên">
              <Input placeholder="chưa cập nhật..." value={studentDetail.name} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Email">
              <Input placeholder="chưa cập nhật..." value={studentDetail.email} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item label="Giới tính">
              <Input placeholder="chưa cập nhật..." value={studentDetail.gender} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Ngày sinh">
              <Input
                placeholder="chưa cập nhật..."
                value={
                  studentDetail.birthday ?
                    moment(studentDetail.birthday).format('DD/MM/YYYY') :
                    null
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Địa chỉ">
              {address.cityName && (
                <Input
                  placeholder="chưa cập nhật..."
                  value={`${address.cityName}, ${address.disName}`}
                />
              )}
              {!address.cityName && (
                <Input
                  placeholder="chưa cập nhật..."
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Card size="small" title="Hợp đồng đã ký">
              <Button onClick={onOpenContractsDrawer}>Xem</Button>
            </Card>
          </Col>
        </Row>
      </Form>
      <div
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }}
      >
        <Button onClick={onClose} style={{ marginRight: 8 }}>
          Cancel
        </Button>
      </div>
    </Drawer>
  );
};

MyInfoDrawer.propTypes = {
  onClose: PropTypes.func,
  visible: PropTypes.bool,
};

MyInfoDrawer.defaultProps = {
  onClose: () => { },
  visible: false,
};

export default MyInfoDrawer;
