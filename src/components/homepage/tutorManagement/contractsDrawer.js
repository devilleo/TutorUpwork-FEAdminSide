/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React from 'react';
import { Drawer, Collapse, Col } from 'antd';
import moment from 'moment';

// import $ from 'jquery';

const MyContractsDrawer = props => {
    const { tutorContracts, visible, onClose } = props
    const { Panel } = Collapse;
    // display contracts list
    const signedContracts = [];
    if (tutorContracts !== undefined) {
        for (let i = 0; i < Object.values(tutorContracts).length; i += 1) {
            signedContracts.push(
                <Panel header={`Hợp đồng ${i}`} key={i}>
                    <p>{`ID: ${tutorContracts[i].id}`}</p>
                    <p>{`Student ID: ${tutorContracts[i].studentId}`}</p>
                    <p>{`Tutor ID: ${tutorContracts[i].tutorId}`}</p>
                    <p>{`Ngày bắt đầu: ${moment(tutorContracts[i].beginTime).format('DD/MM/YYYY')}`}</p>
                    <p>{`Ngày kết thúc: ${moment(tutorContracts[i].endTime).format('DD/MM/YYYY')}`}</p>
                    <p>{`Price per hour: ${tutorContracts[i].totalHour}`}</p>
                    <p>{`Total hour: ${tutorContracts[i].pricePerHour}`}</p>
                    <p>{`Total Price: ${tutorContracts[i].totalPrice}`}</p>
                </Panel>,
            );
        }

    }
    return (
        <Drawer
            title="Danh sách hợp đồng"
            width={500}
            onClose={onClose}
            visible={visible}
            bodyStyle={{ paddingBottom: 80 }}
            placement="left"
        >
            <Col span={24}>
                <Collapse bordered={false}>{signedContracts}</Collapse>
            </Col>
        </Drawer>
    );
};

MyContractsDrawer.propTypes = {

};

MyContractsDrawer.defaultProps = {

};

export default MyContractsDrawer;
