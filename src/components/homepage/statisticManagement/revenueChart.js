/* eslint-disable no-continue */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Bar } from 'react-chartjs-2'
import { Row, Col, DatePicker } from 'antd'
import TweenOne from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';
import moment from 'moment'
import './statistic.css'

import MyTimeType from './timePicker/timeType'


TweenOne.plugins.push(Children);

class RevenueChart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            typeTime: 'Week',

            colorTemplate: [
                'rgba(239, 83, 80, 1)',
                'rgba(236, 64, 122, 1)',
                'rgba(171, 71, 188, 1)',
                'rgba(92, 107, 192, 1)',
                'rgba(66, 165, 245, 1)',
                'rgba(38, 198, 218, 1)',
                'rgba(102, 187, 106, 1)',

                'rgba(215, 204, 200, 1)',
                'rgba(255, 224, 130, 1)',
                'rgba(100, 181, 246, 1)',
                'rgba(100, 101, 186, 1)',
                'rgba(175, 180, 43, 1)',
                'rgba(121, 134, 203, 1)',
                'rgba(93, 64, 55, 1)',

                'rgba(144, 202, 249, 1)',
                'rgba(174, 213, 129, 1)',
                'rgba(224, 224, 224, 1)',
                'rgba(200, 230, 201, 1)',
                'rgba(174, 213, 129, 1)',
                'rgba(255, 167, 38, 1)',
                'rgba(102, 187, 106, 1)',

                'rgba(188, 170, 164, 1)',
                'rgba(220, 237, 200, 1)',
                'rgba(126, 87, 194, 1)',
                'rgba(244, 81, 30, 1)',
                'rgba(255, 224, 130, 1)',
                'rgba(186, 104, 200, 1)',
                'rgba(79, 195, 247, 1)',

                'rgba(0, 150, 136, 1)',
                'rgba(159, 168, 218, 1)',
                'rgba(255, 193, 7, 1)',
                'rgba(255, 202, 40, 1)',
                'rgba(120, 144, 156, 1)',
                'rgba(212, 225, 87, 1)',
                'rgba(144, 202, 249, 1)',


                'rgba(209, 196, 233, 1)',
                'rgba(159, 168, 218, 1)',
                'rgba(205, 220, 57, 1)',
                'rgba(38, 166, 154, 1)',
                'rgba(255, 152, 0, 1)',
                'rgba(109, 76, 65, 1)',
                'rgba(197, 202, 233, 1)',
            ],

            currentDay: moment(),

            week: moment(),
            chartWeekData: {},

            month: moment(),
            chartMonthData: {},
            Days31: [
                'Ngày 1', '',
                'Ngày 3', '',
                'Ngày 5', '',
                'Ngày 7', '',
                'Ngày 9', '',
                'Ngày 11', '',
                'Ngày 13', '',
                'Ngày 15', '',
                'Ngày 17', '',
                'Ngày 19', '',
                'Ngày 21', '',
                'Ngày 23', '',
                'Ngày 25', '',
                'Ngày 27', '',
                'Ngày 29', '',
                'Ngày 31'
            ],
            Days30: [
                'Ngày 1', '',
                'Ngày 3', '',
                'Ngày 5', '',
                'Ngày 7', '',
                'Ngày 9', '',
                'Ngày 11', '',
                'Ngày 13', '',
                'Ngày 15', '',
                'Ngày 17', '',
                'Ngày 19', '',
                'Ngày 21', '',
                'Ngày 23', '',
                'Ngày 25', '',
                'Ngày 27', '',
                'Ngày 29', '',
            ],
            Days29: [
                'Ngày 1', '',
                'Ngày 3', '',
                'Ngày 5', '',
                'Ngày 7', '',
                'Ngày 9', '',
                'Ngày 11', '',
                'Ngày 13', '',
                'Ngày 15', '',
                'Ngày 17', '',
                'Ngày 19', '',
                'Ngày 21', '',
                'Ngày 23', '',
                'Ngày 25', '',
                'Ngày 27', '',
                'Ngày 29'
            ],
            Days28: [
                'Ngày 1', '',
                'Ngày 3', '',
                'Ngày 5', '',
                'Ngày 7', '',
                'Ngày 9', '',
                'Ngày 11', '',
                'Ngày 13', '',
                'Ngày 15', '',
                'Ngày 17', '',
                'Ngày 19', '',
                'Ngày 21', '',
                'Ngày 23', '',
                'Ngày 25', '',
                'Ngày 27', '',
            ],

            year: moment(),
            chartYearData: {},

            animation: {
                Children: {},
                duration: 1000,
            }
        }
    }

    componentDidMount() {
        this.setDay(moment())
        this.setWeek(moment())
        this.setMonth(moment())
        this.setYear(moment())
    }

    componentDidUpdate() {
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

            const currentItemDate = ((moment(arrayContractsList[i].beginTime))).format('MM-DD-YYYY')
            if (currentItemDate ===
                (moment(value).format('MM-DD-YYYY')
                )) {
                totalMoney += arrayContractsList[i].totalPrice
                continue;
            }
        }
        this.setState({
            currentDay: value,
        })

        this.setState({
            animation: {
                Children: {
                    value: typeof totalMoney === 'number' ? totalMoney : 0, floatLength: 0
                },
                duration: 1000,
            }
        })
    }

    setWeek = value => {
        const { contractsList } = this.props
        const { colorTemplate } = this.state
        const arrayContractsList = Object.values(contractsList)
        // set data for statistic by week
        const weekDataArr = Array(7).fill(0)

        for (let i = 0; i <= arrayContractsList.length; i += 1) {
            if (arrayContractsList[i]?.beginTime === undefined) {
                continue;
            }

            const currentItemDate = ((moment(arrayContractsList[i].beginTime))).format('MM-DD-YYYY')
            for (let j = 0; j < 7; j += 1) {
                if (currentItemDate ===
                    (moment(value.startOf('week')).add(j, 'day')).format('MM-DD-YYYY')
                ) {
                    weekDataArr[j] += arrayContractsList[i].totalPrice
                    break;
                }
            }
        }


        this.setState({
            week: value,
            chartWeekData: {
                labels: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
                datasets: [
                    {
                        label: 'VND',
                        data: weekDataArr,
                        backgroundColor: colorTemplate
                    },
                ],
            }
        })
    }

    setMonth = value => {
        const { Days31, Days30, Days29, Days28 } = this.state
        let numberOfDaysArray
        const numberOfDays = moment(value).daysInMonth()
        if (numberOfDays === 31)
            numberOfDaysArray = Days31
        else if (numberOfDays === 30)
            numberOfDaysArray = Days30
        else if (numberOfDays === 29)
            numberOfDaysArray = Days29
        else
            numberOfDaysArray = Days28

        const { contractsList } = this.props
        const { colorTemplate } = this.state

        const arrayContractsList = Object.values(contractsList)
        // set data for statistic by month
        const monthDataArr = Array(numberOfDays).fill(0)

        for (let i = 0; i <= arrayContractsList.length; i += 1) {
            if (arrayContractsList[i]?.beginTime === undefined) {
                continue;
            }

            const currentItemDate = ((moment(arrayContractsList[i].beginTime))).format('MM-DD-YYYY')
            for (let j = 0; j < numberOfDays; j += 1) {
                if (currentItemDate ===
                    (moment(value.startOf('month')).add(j, 'day')).format('MM-DD-YYYY')
                ) {
                    monthDataArr[j] += arrayContractsList[i].totalPrice
                    break;
                }
            }

        }
        this.setState({
            month: value,
            chartMonthData: {
                labels: numberOfDaysArray,
                datasets: [
                    {
                        label: 'VND',
                        data: monthDataArr,
                        backgroundColor: colorTemplate
                    }
                ],
            }
        })
    }

    setYear = value => {
        const { contractsList } = this.props
        const { colorTemplate } = this.state

        const arrayContractsList = Object.values(contractsList)
        // set data for statistic by year
        const yearDataArr = Array(12).fill(0)
        for (let i = 0; i <= arrayContractsList.length; i += 1) {
            if (arrayContractsList[i]?.beginTime === undefined) {
                continue;
            }
            const currentItemDate = ((moment(arrayContractsList[i].beginTime))).format('MM-YYYY')
            for (let j = 0; j < 12; j += 1) {
                if (currentItemDate ===
                    (moment(value.startOf('year')).add(j, 'month')).format('MM-YYYY')
                ) {
                    yearDataArr[j] += arrayContractsList[i].totalPrice
                    break;
                }
            }

        }
        this.setState({
            year: value,
            chartYearData: {
                labels: [
                    'Tháng 1',
                    'Tháng 2',
                    'Tháng 3',
                    'Tháng 4',
                    'Tháng 5',
                    'Tháng 6',
                    'Tháng 7',
                    'Tháng 8',
                    'Tháng 9',
                    'Tháng 10',
                    'Tháng 11',
                    'Tháng 12',
                ],
                datasets: [
                    {
                        label: 'VND',
                        data: yearDataArr,
                        backgroundColor: colorTemplate
                    }
                ],
            }
        })
    }

    render() {
        const {
            typeTime,
            currentDay,
            week,
            chartWeekData,
            month,
            chartMonthData,
            year,
            chartYearData,
            animation
        } = this.state
        return (
            <Row>
                <Col span={16}>
                    <MyTimeType
                        typeTime={typeTime}
                        setTypeTime={this.setTypeTime}
                        week={week}
                        setWeek={this.setWeek}
                        month={month}
                        setMonth={this.setMonth}
                        year={year}
                        setYear={this.setYear}
                    />
                    <Row style={{ marginTop: '30px' }}>
                        <Bar
                            data={
                                // eslint-disable-next-line no-nested-ternary
                                typeTime === "Week" ?
                                    chartWeekData :
                                    (typeTime === "Month" ?
                                        chartMonthData :
                                        chartYearData
                                    )
                            }
                            option={{ maintainAspectRatio: false }}
                        />
                    </Row>
                </Col>
                <Col span={2} />
                <Col span={6}>
                    <Row style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <ul id="menu">
                            <li><div>Doanh thu trong ngày</div></li>
                        </ul>
                    </Row>
                    <Row style={{ textAlign: 'right' }}>
                        <DatePicker
                            className="myTimeType"
                            defaultValue={currentDay}
                            onChange={this.setDay}
                        />
                    </Row>
                    <Row style={{ textAlign: 'center', marginTop: '40px' }}>
                        <TweenOne
                            animation={animation}
                            style={{
                                fontSize: 30,
                            }}
                        >
                            0
                        </TweenOne>
                    </Row>
                </Col>
            </Row>
        )
    }
}

RevenueChart.propTypes = {
    contractsList: PropTypes.objectOf(PropTypes.object),
    // week: PropTypes.objectOf(PropTypes.object),
}

RevenueChart.defaultProps = {
    contractsList: {},
    // week: moment(),
}

export default RevenueChart