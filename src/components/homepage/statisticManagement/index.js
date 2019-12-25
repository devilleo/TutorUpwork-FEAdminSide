/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React from 'react'
import PropTypes from 'prop-types'
import { Statistic, Card, Row, Col, Icon } from 'antd'
import Cookies from 'universal-cookie';

import RevenueChart from './revenueChart'
import SkillChart from './skillChart'
import TutorRevenue from './tutorRevenue'

class StatisticManagement extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            noTitleKey: 'Doanh thu',
        };

    }

    componentDidMount() {
        const { getContractsList, getSkillsList, getStudentsList, getTutorsList } = this.props;
        const cookies = new Cookies();
        getContractsList(cookies.get('token'));
        getSkillsList(cookies.get('token'));
        getStudentsList(cookies.get('token'));
        getTutorsList(cookies.get('token'));
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
        const { contractsList, skillsList, tutorsList, studentsList, getContractsList } = this.props
        const theMostSkill = { name: '', count: 0 }
        const arrayContractsList = Object.values(contractsList);
        const { length } = arrayContractsList;
        for (let i = 0; i < length - 1; i += 1) {
            if (arrayContractsList[i].skill === undefined) {
                // eslint-disable-next-line no-continue
                continue;
            }
            const tempName = arrayContractsList[i].skill;
            let tempCount = 1;
            for (let j = i + 1; j < length; j += 1) {
                if (arrayContractsList[j].skill === tempName) {
                    tempCount += 1;
                }
            }
            if (tempCount > theMostSkill.count) {
                theMostSkill.name = tempName;
                theMostSkill.count = tempCount;
            }
        }

        const contentListNoTitle = {
            'Doanh thu': (
                <RevenueChart contractsList={contractsList} getContractsList={getContractsList} />
            ),
            'Kỹ năng': <SkillChart contractsList={contractsList} skillsList={skillsList} />,
            'Người dạy': <TutorRevenue contractsList={contractsList} tutorsList={tutorsList} />,
        };
        const { noTitleKey } = this.state
        return (
            <div style={{ padding: '30px', backgroundColor: 'white' }}>
                <Row gutter={20} type="flex">
                    <Col span={8}>
                        <Card title="Người dùng" size="small">
                            <Col span={12}>
                                <Statistic
                                    title="Giáo viên"
                                    value={Object.values(tutorsList).length}
                                    valueStyle={{ overflow: 'auto', display: 'flex' }}
                                    prefix={<Icon type="user" style={{ color: '#AD343E' }} />}
                                />
                            </Col>
                            <Col span={12}>
                                <Statistic
                                    title="Học sinh"
                                    value={Object.values(studentsList).length}
                                    valueStyle={{ overflow: 'auto', display: 'flex' }}
                                    prefix={<Icon type="team" style={{ color: '#00A896' }} />}
                                />
                            </Col>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Kỹ năng" size="small">
                            <Col span={12}>
                                <Statistic
                                    title="Số kỹ năng"
                                    value={Object.values(skillsList).length}
                                    valueStyle={{ overflow: 'auto', display: 'flex' }}
                                    prefix={<Icon type="bars" style={{ color: '#E2980C' }} />}
                                />

                            </Col>
                            <Col span={12}>
                                <Statistic
                                    title="Kỹ năng học nhiều nhất"
                                    value={theMostSkill.name}
                                    valueStyle={{ overflow: 'auto', display: 'flex' }}
                                    prefix={(
                                        <Icon
                                            type="star"
                                            theme="twoTone"
                                            twoToneColor="#eb2f96"
                                        />
                                    )}
                                />
                            </Col>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Luot xem" size="small">
                            <Col span={14}>
                                <Statistic
                                    title="Lượng truy cập"
                                    value={`${200}/ngay`}
                                    valueStyle={{ overflow: 'auto', display: 'flex' }}
                                    prefix={<Icon type="cluster" style={{ color: '#5B965F' }} />}
                                />
                            </Col>
                            <Col span={10}>
                                <Statistic
                                    title="Đang trực tuyến"
                                    value={3}
                                    valueStyle={{ overflow: 'auto', display: 'flex' }}
                                    prefix={<Icon type="global" style={{ color: '#2892D7' }} />}
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
    skillsList: PropTypes.objectOf(PropTypes.object),
    tutorsList: PropTypes.objectOf(PropTypes.object),
    studentsList: PropTypes.objectOf(PropTypes.object),
    getContractsList: PropTypes.func,
    getSkillsList: PropTypes.func,
    getStudentsList: PropTypes.func,
    getTutorsList: PropTypes.func,
}

StatisticManagement.defaultProps = {
    contractsList: {},
    skillsList: {},
    tutorsList: {},
    studentsList: {},
    getContractsList: () => { },
    getSkillsList: () => { },
    getStudentsList: () => { },
    getTutorsList: () => { },
}

export default StatisticManagement;