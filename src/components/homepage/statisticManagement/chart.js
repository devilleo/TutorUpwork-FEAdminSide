/* eslint-disable no-continue */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Bar } from 'react-chartjs-2'
import { Row, Col, DatePicker } from 'antd'
import moment from 'moment'

import MyTimeType from './timeType'

class Chart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            typeTime: 'Week',

            currentDay: moment(),
            totalMoneyInDay: 0,

            week: moment(),
            chartWeekData: {
                labels: [],
                datasets: [
                    {
                        label: 'VND',
                        data: ['Chu nhat', 'Thu 2', 'Thu 3', 'Thu 4', 'Thu 5', 'Thu 6', 'Thu 7'],
                        backgroundColor: [
                            'rgba(0, 23, 0, 0.1)',
                            'rgba(12, 0, 0, 0.1)',
                            'rgba(67, 0, 0, 0.1)',
                            'rgba(0, 0, 78, 0.1)',
                            'rgba(0, 65, 0, 0.1)',
                            'rgba(100, 200, 12, 0.1)',
                            'rgba(100, 200, 12, 0.3)',
                        ]
                    }
                ],
            }
        }
    }

    componentDidMount() {
        this.setDay(moment())
    }

    setTypeTime = value => {
        this.setState({
            typeTime: value
        })
    }

    setDay = value => {
        const { contractsList } = this.props
        const arrayContractsList = Object.values(contractsList)
        let totalMoney = 0
        for (let i = 0; i <= arrayContractsList.length; i += 1) {
            if (arrayContractsList[i]?.beginTime === undefined) {
                continue;
            }

            const currentItemDate = ((moment(arrayContractsList[i].beginTime))).format('DD-MM-YYYY')
            if (currentItemDate ===
                (moment(value).format('DD-MM-YYYY')
                )) {
                totalMoney += arrayContractsList[i].totalPrice
                continue;
            }
        }
        this.setState({
            currentDay: value,
            totalMoneyInDay: totalMoney
        })
    }

    setWeek = value => {
        const { contractsList } = this.props
        this.setState({
            week: value
        })

        const arrayContractsList = Object.values(contractsList)
        // set data for statistic by week
        const weekDataArr = Array(7).fill(0)

        for (let i = 0; i <= arrayContractsList.length; i += 1) {
            if (arrayContractsList[i]?.beginTime === undefined) {
                continue;
            }

            const currentItemDate = ((moment(arrayContractsList[i].beginTime))).format('DD-MM-YYYY')
            if (currentItemDate ===
                (moment(value.startOf('week')).add(0, 'day')).format('DD-MM-YYYY')
            ) {
                weekDataArr[0] += arrayContractsList[i].totalPrice
                continue;
            }
            if (currentItemDate ===
                (moment(value.startOf('week')).add(1, 'day')).format('DD-MM-YYYY')
            ) {
                weekDataArr[1] += arrayContractsList[i].totalPrice
                continue;
            }
            if (currentItemDate ===
                (moment(value.startOf('week')).add(2, 'day')).format('DD-MM-YYYY')
            ) {
                weekDataArr[2] += arrayContractsList[i].totalPrice
                continue;
            }
            if (currentItemDate ===
                (moment(value.startOf('week')).add(3, 'day')).format('DD-MM-YYYY')
            ) {
                weekDataArr[3] += arrayContractsList[i].totalPrice
                continue;
            }
            if (currentItemDate ===
                (moment(value.startOf('week')).add(4, 'day')).format('DD-MM-YYYY')
            ) {
                weekDataArr[4] += arrayContractsList[i].totalPrice
                continue;
            }
            if (currentItemDate ===
                (moment(value.startOf('week')).add(5, 'day')).format('DD-MM-YYYY')
            ) {
                weekDataArr[5] += arrayContractsList[i].totalPrice
                continue;
            }
            if (currentItemDate ===
                (moment(value.startOf('week')).add(6, 'day')).format('DD-MM-YYYY')
            ) {
                weekDataArr[6] += arrayContractsList[i].totalPrice
                continue;
            }

        }


        this.setState({
            chartWeekData: {
                labels: ['Chu nhat', 'Thu 2', 'Thu 3', 'Thu 4', 'Thu 5', 'Thu 6', 'Thu 7'],
                datasets: [
                    {
                        label: 'VND',
                        data: weekDataArr,
                        backgroundColor: [
                            'rgba(0, 23, 0, 0.1)',
                            'rgba(12, 0, 0, 0.1)',
                            'rgba(67, 0, 0, 0.1)',
                            'rgba(0, 0, 78, 0.1)',
                            'rgba(0, 65, 0, 0.1)',
                            'rgba(100, 200, 12, 0.1)',
                            'rgba(100, 200, 12, 0.3)',
                        ]
                    },
                ],
            }
        })
    }

    render() {
        const { chartWeekData, typeTime, currentDay, totalMoneyInDay, week } = this.state

        return (
            <Row>
                <Row style={{ marginBottom: '20px' }}>
                    <Col span={16}>
                        <MyTimeType
                            typeTime={typeTime}
                            setTypeTime={this.setTypeTime}
                            week={week}
                            setWeek={this.setWeek}
                        />
                        {typeTime === "Week" && (
                            <Row style={{ marginTop: '30px' }}>
                                <Bar
                                    data={typeTime === "Week" ? chartWeekData : null}
                                    option={{ maintainAspectRatio: false }}
                                />
                            </Row>
                        )}
                    </Col>
                    <Col span={2} />
                    <Col span={6}>
                        <Row style={{ textAlign: 'center', marginBottom: '20px' }}>
                            Doanh thu trong ngay
                        </Row>
                        <Row style={{ textAlign: 'right' }}>
                            <DatePicker
                                defaultValue={currentDay}
                                onChange={this.setDay}
                            />
                        </Row>
                        <Row style={{ textAlign: 'center', marginTop: '80px' }}>
                            {totalMoneyInDay}
                        </Row>
                    </Col>
                </Row>


            </Row>
        )
    }
}

Chart.propTypes = {
    contractsList: PropTypes.objectOf(PropTypes.object),
    // week: PropTypes.objectOf(PropTypes.object),
}

Chart.defaultProps = {
    contractsList: {},
    // week: moment(),
}

export default Chart