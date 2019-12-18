/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React from 'react';
import { Drawer, Button } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';

// import $ from 'jquery';

const MyInfoDrawer = props => {
  // eslint-disable-next-line react/prop-types
  const { onClose, visible, detail } = props;

  return (
    <Drawer
      title="Thông tin chi tiết"
      width={500}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      placement="left"
    >
      <p>{`ID hợp đồng: ${detail.id}`}</p>
      <p>{`ID Học viên: ${detail.studentId}`}</p>
      <p>{`ID Giáo viên: ${detail.tutorId}`}</p>
      <p>{`Kỹ năng: ${detail.skill}`}</p>
      <p>{`Ngày bắt đầu: ${moment(detail.beginTime).format('DD/MM/YYYY')}`}</p>
      <p>{`Ngày kết thúc: ${moment(detail.endTime).format('DD/MM/YYYY')}`}</p>
      <p>{`Giá theo giờ: ${detail.totalHour}`}</p>
      <p>{`Tổng giờ: ${detail.pricePerHour}`}</p>
      <p>{`Tổng giá: ${detail.totalPrice}`}</p>
      <p>{`Trạng thái: ${detail.status}`}</p>
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
