/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React, { useState } from 'react';
import { Drawer, Button, Form, Row, Col, Input, Avatar, Rate, Card } from 'antd';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import moment from 'moment';
import { addressDetail } from '../../../utils/location';
import MyContractsDrawer from './contractsDrawer';

// import $ from 'jquery';

const MyInfoDrawer = props => {
  // eslint-disable-next-line react/prop-types
  const { onClose, visible, tutorDetail, tutorContracts } = props;
  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
  const [visibleContractsDrawer, setVisibleContractsDrawer] = useState(false);

  const onCloseContractsDrawer = () => {
    setVisibleContractsDrawer(false)
  }

  const onOpenContractsDrawer = () => {
    const { getContracts } = props
    const cookies = new Cookies();
    getContracts(
      cookies.get('token'),
      (tutorDetail.contracts !== undefined) ? tutorDetail.contracts : []
    )
    setVisibleContractsDrawer(true)
  }

  let address = {};
  if (tutorDetail !== undefined && tutorDetail.address !== undefined) {
    address = {
      ...address,
      cityName: addressDetail(tutorDetail.address.city, tutorDetail.address.district).cityName.name,
      disName: addressDetail(tutorDetail.address.city, tutorDetail.address.district).disName.name,
    };
  }

  // display skills list
  const displayListSkill = [];
  if (tutorDetail !== undefined && tutorDetail.skills !== undefined) {
    for (let i = 0; i < tutorDetail.skills.length; i += 1) {
      displayListSkill.push(<p key={tutorDetail.skills[i]}>{tutorDetail.skills[i]}</p>);
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
        tutorContracts={tutorContracts}
        onClose={onCloseContractsDrawer}
      />
      <Form layout="vertical" hideRequiredMark>
        <Row style={{ textAlign: 'center' }} gutter={16}>
          <Col span={24}>
            <Avatar src={tutorDetail.avatar} size={100} icon="user" />
          </Col>
        </Row>
        <br />
        <br />
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Họ tên">
              <Input placeholder="chưa cập nhật..." value={tutorDetail.name} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Email">
              <Input placeholder="chưa cập nhật..." value={tutorDetail.email} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Mô tả về bản thân">
              {tutorDetail.intro && (
                <div
                  style={{ padding: '4px 11px' }}
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: tutorDetail.intro }}
                />
              )}
              {!tutorDetail.intro && (
                <Input placeholder="chưa cập nhật..." value={tutorDetail.intro} />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Giới tính">
              <Input placeholder="chưa cập nhật..." value={tutorDetail.gender} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Ngày sinh">
              <Input
                placeholder="chưa cập nhật..."
                value={moment(tutorDetail.birthday).format('DD/MM/YYYY')}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Đánh giá">
              <span>
                <Rate tooltips={desc} value={tutorDetail.star} />
                <span className="ant-rate-text">{desc[tutorDetail.star - 1]}</span>
              </span>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Lương theo giờ">
              <Input placeholder="chưa cập nhật..." value={tutorDetail.price} />
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
            <Card size="small" title="Kỹ năng">
              {displayListSkill}
            </Card>
          </Col>
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
