/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React from 'react';
import { Drawer, Button, Form, Row, Col, Input, Avatar, Rate, Card, Collapse } from 'antd';
import PropTypes from 'prop-types';
import { addressDetail } from '../../../utils/location';
// import $ from 'jquery';

const MyInfoDrawer = props => {
  // eslint-disable-next-line react/prop-types
  const { onClose, visible, tutorDetail } = props;
  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
  const { Panel } = Collapse;

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

  // display contracts list
  const signedContracts = [];
  if (tutorDetail !== undefined && tutorDetail.contracts !== undefined) {
    for (let i = 0; i < tutorDetail.contracts.length; i += 1) {
      signedContracts.push(
        <Panel header={`Hợp đồng ${i}`} key={i}>
          <p>{`Ngày bắt đầu: ${tutorDetail.contracts[i].beginTime}`}</p>
          <p>{`Ngày kết thúc: ${tutorDetail.contracts[i].endTime}`}</p>
          <p>{`Chi phí: ${tutorDetail.contracts[i].totalPrice}`}</p>
          <p>{`Đối tác: ${tutorDetail.contracts[i].name}`}</p>
        </Panel>,
      );
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
              <Input value={tutorDetail.name} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Email">
              <Input value={tutorDetail.email} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Mô tả về bản thân">
              <Input.TextArea
                rows={4}
                placeholder="please enter url description"
                value={tutorDetail.intro}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Giới tính">
              <Input value={tutorDetail.gender} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Tuổi">
              <Input value={tutorDetail.age} />
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
              <Input value={tutorDetail.price} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Địa chỉ">
              <Input value={`${address.cityName}, ${address.disName}`} />
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
              <Collapse bordered={false}>{signedContracts}</Collapse>
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
  onClose: () => {},
  visible: false,
};

export default MyInfoDrawer;
