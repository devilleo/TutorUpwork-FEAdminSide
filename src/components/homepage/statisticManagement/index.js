/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React from 'react'
import PropTypes from 'prop-types'
import { Statistic, Card, Row, Col, Icon } from 'antd'
import RevenueChart from './revenueChart'
import SkillChart from './skillChart'


class StatisticManagement extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            noTitleKey: 'Doanh thu',
        };

    }

    componentDidMount() {

    }

    onTabChange = (key, type) => {
        this.setState({ [type]: key });
    };


    render() {
        const tabListNoTitle = [
            {
                key: 'Doanh thu',
                tab: 'Doanh thu',
            },
            {
                key: 'Kỹ năng',
                tab: 'Kỹ năng',
            },
            {
                key: 'Người dạy',
                tab: 'Người dạy',
            },
        ];
        const { contractsList, skillsList } = this.props
        const contentListNoTitle = {
            'Doanh thu': (
                <RevenueChart contractsList={contractsList} />
            ),
            'Kỹ năng': <SkillChart contractsList={contractsList} skillsList={skillsList} />,
            'Người dạy': <p>project content</p>,
        };
        const { noTitleKey } = this.state
        return (
            <div style={{ padding: '30px', backgroundColor: 'white' }}>
                <Row gutter={20} type="flex">
                    <Col span={8}>
                        <Card title="User" size="small">
                            <Col span={12}>
                                <Statistic
                                    title="Tutor"
                                    value={10}
                                    valueStyle={{ overflow: 'auto', display: 'flex' }}
                                    prefix={<Icon type="user" />}
                                />
                            </Col>
                            <Col span={12}>
                                <Statistic
                                    title="Student"
                                    value={11}
                                    valueStyle={{ overflow: 'auto', display: 'flex' }}
                                    prefix={<Icon type="user" />}
                                />
                            </Col>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Ky nang" size="small">
                            <Col span={12}>
                                <Statistic
                                    title="So ky nang"
                                    value={11}
                                    valueStyle={{ overflow: 'auto', display: 'flex' }}
                                    prefix={<Icon type="user" />}
                                />
                            </Col>
                            <Col span={12}>
                                <Statistic
                                    title="Ky nang hoc nhieu nhat"
                                    value={11}
                                    valueStyle={{ overflow: 'auto', display: 'flex' }}
                                    prefix={<Icon type="user" />}
                                />
                            </Col>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Luot xem" size="small">
                            <Col span={12}>
                                <Statistic
                                    title="Luong truy cap"
                                    value={`${11}/ngay`}
                                    valueStyle={{ overflow: 'auto', display: 'flex' }}
                                    prefix={<Icon type="user" />}
                                />
                            </Col>
                            <Col span={12}>
                                <Statistic
                                    title="So nguoi dang online"
                                    value={11}
                                    valueStyle={{ overflow: 'auto', display: 'flex' }}
                                    prefix={<Icon type="user" />}
                                />
                            </Col>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={20} type="flex" style={{ marginTop: '20px' }}>
                    <Col span={24}>
                        <Card
                            style={{ width: '100%' }}
                            tabList={tabListNoTitle}
                            activeTabKey={noTitleKey}
                            onTabChange={e => {
                                this.onTabChange(e, 'noTitleKey');
                            }}
                        >
                            {contentListNoTitle[noTitleKey]}
                        </Card>
                    </Col>
                </Row>

            </div>
        )
    }
}

StatisticManagement.propTypes = {
    contractsList: PropTypes.objectOf(PropTypes.object),
    skillsList: PropTypes.objectOf(PropTypes.object)
}

StatisticManagement.defaultProps = {
    contractsList: {},
    skillsList: {},
}

export default StatisticManagement;