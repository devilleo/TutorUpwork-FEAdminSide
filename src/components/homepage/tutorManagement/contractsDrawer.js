/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React from 'react';
import { Drawer, Collapse, Col } from 'antd';
import moment from 'moment';

// import $ from 'jquery';

const MyContractsDrawer = props => {
    const { contracts, visible, onClose } = props
    const { Panel } = Collapse;
    // display contracts list
    const signedContracts = [];
    if (contracts !== undefined) {
        for (let i = 0; i < Object.values(contracts).length; i += 1) {
            signedContracts.push(
                <Panel header={`Hợp đồng ${i}`} key={i}>
                    <p>{`ID: ${contracts[i].id}`}</p>
                    <p>{`Student ID: ${contracts[i].studentId}`}</p>
                    <p>{`Tutor ID: ${contracts[i].tutorId}`}</p>
                    <p>{`Kỹ năng: ${contracts[i].skill}`}</p>
                    <p>{`Ngày bắt đầu: ${moment(contracts[i].beginTime).format('DD/MM/YYYY')}`}</p>
                    <p>{`Ngày kết thúc: ${moment(contracts[i].endTime).format('DD/MM/YYYY')}`}</p>
                    <p>{`Price per hour: ${contracts[i].totalHour}`}</p>
                    <p>{`Total hour: ${contracts[i].pricePerHour}`}</p>
                    <p>{`Total Price: ${contracts[i].totalPrice}`}</p>
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
