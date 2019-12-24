/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React from 'react';
import { Drawer, Button, Card, Row } from 'antd';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';

// import $ from 'jquery';

const MessagesDrawer = props => {
    // eslint-disable-next-line react/prop-types
    const {
        onClose,
        visible,
        messages,
        currentIdContract,
        changeInfoContract,
        docontractsListAPI
    } = props;
    const cookies = new Cookies();
    const showMessages = []
    const messagesArray = Object.values(messages || {})
    for (let i = 0; i < messagesArray.length; i += 1) {
        showMessages.push(
            <Row
                style={{
                    margin: '1px',
                    float: messagesArray[i].id !== messagesArray[0].id ?
                        'right' :
                        'left'
                }}
                key={i}
            >
                <Card
                    size="small"
                    width="300"
                    style={{ minWidth: '300px' }}
                    title={messagesArray[i].id}
                    extra={<p>{messagesArray[i].date}</p>}
                >
                    <p>
                        {messagesArray[i].content}
                    </p>
                </Card>
            </Row>
        )
    }

    return (
        <Drawer
            title="Thông tin chi tiết"
            width={500}
            onClose={onClose}
            visible={visible}
            bodyStyle={{ paddingBottom: 80 }}
            placement="left"
        >
            {showMessages}
            {showMessages.length === 0 && <p>Khong co tin nhan</p>}
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
                <Button
                    onClick={
                        () => changeInfoContract(
                            cookies.get('token'),
                            currentIdContract,
                            'Đã hủy',
                            docontractsListAPI
                        )
                    }
                    style={{ marginRight: 8, borderColor: 'red' }}
                >
                    Hủy hợp đồng
                </Button>
                <Button
                    onClick={
                        () => changeInfoContract(
                            cookies.get('token'),
                            currentIdContract,
                            'Hoàn thành',
                            docontractsListAPI
                        )
                    }
                    style={{ marginRight: 8, borderColor: 'blue' }}
                >
                    Hoàn thành hợp đồng
                </Button>
                <Button onClick={onClose} style={{ marginRight: 8 }}>
                    Cancel
                </Button>
            </div>
        </Drawer>
    );
};

MessagesDrawer.propTypes = {
    onClose: PropTypes.func,
    visible: PropTypes.bool,
};

MessagesDrawer.defaultProps = {
    onClose: () => { },
    visible: false,
};

export default MessagesDrawer;
