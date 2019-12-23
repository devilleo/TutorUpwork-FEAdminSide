/* eslint-disable no-continue */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { HorizontalBar } from 'react-chartjs-2'
import { Row, Col } from 'antd'
import moment from 'moment'

import MyTimeType2 from './timePicker/timeType2'



class SkillChart extends Component {
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

            day: moment(),
            chartDayData: {},

            week: moment(),
            chartWeekData: {},

            month: moment(),
            chartMonthData: {},

            year: moment(),
            chartYearData: {},

            customRange: [moment(), moment()],
            chartCustomData: {}
        }
    }

    componentDidMount() {
        this.setDay(moment())
        this.setWeek(moment())
        this.setMonth(moment())
        this.setYear(moment())
        this.setCustomRange([moment(), moment()])
    }

    componentDidUpdate() {
    }

    setTypeTime = value => {
        this.setState({
            typeTime: value
        })
    }

    setDay = value => {
        const { contractsList, skillsList } = this.props
        const { colorTemplate } = this.state

        const arrayContractsList = Object.values(contractsList)
        const arraySkillsList = Object.values(skillsList)

        const listSkilsName = Array(arraySkillsList.length);
        for (let k = 0; k < arraySkillsList.length; k += 1) {
            listSkilsName[k] = arraySkillsList[k].name
        }
        const arrMoney = Array(arraySkillsList.length).fill(0)
        for (let i = 0; i <= arrayContractsList.length; i += 1) {
            if (arrayContractsList[i]?.beginTime === undefined) {
                continue;
            }

            const currentItemDate = ((moment(arrayContractsList[i].beginTime))).format('MM-DD-YYYY')
            for (let j = 0; j < arraySkillsList.length; j += 1) {
                if (currentItemDate ===
                    (moment(value).format('MM-DD-YYYY')) &&
                    arraySkillsList[j].name ===
                    (arrayContractsList[i].skill ? arrayContractsList[i].skill : '')
                ) {
                    arrMoney[j] += arrayContractsList[i].totalPrice
                    break;
                }
            }
        }
        this.setState({
            day: value,
            chartDayData: {
                labels: listSkilsName,
                datasets: [
                    {
                        label: 'VND',
                        data: arrMoney,
                        backgroundColor: colorTemplate
                    },
                ],
            }
        })
    }

    setWeek = value => {
        const { contractsList, skillsList } = this.props
        const { colorTemplate } = this.state

        const arrayContractsList = Object.values(contractsList)
        const arraySkillsList = Object.values(skillsList)

        const listSkilsName = Array(arraySkillsList.length);
        for (let k = 0; k < arraySkillsList.length; k += 1) {
            listSkilsName[k] = arraySkillsList[k].name
        }
        const arrMoney = Array(arraySkillsList.length).fill(0)
        for (let i = 0; i <= arrayContractsList.length; i += 1) {
            if (arrayContractsList[i]?.beginTime === undefined) {
                continue;
            }

            if (new Date((moment(arrayContractsList[i].beginTime))) >=
                new Date((moment(value).startOf('week').add(0, 'day'))) &&
                new Date((moment(arrayContractsList[i].beginTime))) <=
                new Date((moment(value).startOf('week').add(6, 'day'))) &&
                arrayContractsList[i].skill !== undefined
            ) {
                for (let j = 0; j < arraySkillsList.length; j += 1) {

                    if (arraySkillsList[j].name === arrayContractsList[i].skill) {
                        arrMoney[j] += arrayContractsList[i].totalPrice
                        break;
                    }
                }
            }
        }
        this.setState({
            week: value,
            chartWeekData: {
                labels: listSkilsName,
                datasets: [
                    {
                        label: 'VND',
                        data: arrMoney,
                        backgroundColor: colorTemplate
                    },
                ],
            }
        })
    }

    setMonth = value => {
        const { contractsList, skillsList } = this.props
        const { colorTemplate } = this.state

        const arrayContractsList = Object.values(contractsList)
        const arraySkillsList = Object.values(skillsList)

        const listSkilsName = Array(arraySkillsList.length);
        for (let k = 0; k < arraySkillsList.length; k += 1) {
            listSkilsName[k] = arraySkillsList[k].name
        }
        const arrMoney = Array(arraySkillsList.length).fill(0)
        for (let i = 0; i <= arrayContractsList.length; i += 1) {
            if (arrayContractsList[i]?.beginTime === undefined) {
                continue;
            }

            if (new Date((moment(arrayContractsList[i].beginTime))) >=
                new Date((moment(value).startOf('month'))) &&
                new Date((moment(arrayContractsList[i].beginTime))) <=
                new Date((moment(value).endOf('month'))) &&
                arrayContractsList[i].skill !== undefined
            ) {
                for (let j = 0; j < arraySkillsList.length; j += 1) {

                    if (arraySkillsList[j].name === arrayContractsList[i].skill) {
                        arrMoney[j] += arrayContractsList[i].totalPrice
                        break;
                    }
                }
            }
        }
        this.setState({
            month: value,
            chartMonthData: {
                labels: listSkilsName,
                datasets: [
                    {
                        label: 'VND',
                        data: arrMoney,
                        backgroundColor: colorTemplate
                    },
                ],
            }
        })
    }

    setYear = value => {
        const { contractsList, skillsList } = this.props
        const { colorTemplate } = this.state

        const arrayContractsList = Object.values(contractsList)
        const arraySkillsList = Object.values(skillsList)

        const listSkilsName = Array(arraySkillsList.length);
        for (let k = 0; k < arraySkillsList.length; k += 1) {
            listSkilsName[k] = arraySkillsList[k].name
        }
        const arrMoney = Array(arraySkillsList.length).fill(0)
        for (let i = 0; i <= arrayContractsList.length; i += 1) {
            if (arrayContractsList[i]?.beginTime === undefined) {
                continue;
            }

            if (new Date((moment(arrayContractsList[i].beginTime))) >=
                new Date((moment(value).startOf('year'))) &&
                new Date((moment(arrayContractsList[i].beginTime))) <=
                new Date((moment(value).endOf('year'))) &&
                arrayContractsList[i].skill !== undefined
            ) {
                for (let j = 0; j < arraySkillsList.length; j += 1) {

                    if (arraySkillsList[j].name === arrayContractsList[i].skill) {
                        arrMoney[j] += arrayContractsList[i].totalPrice
                        break;
                    }
                }
            }
        }
        this.setState({
            year: value,
            chartYearData: {
                labels: listSkilsName,
                datasets: [
                    {
                        label: 'VND',
                        data: arrMoney,
                        backgroundColor: colorTemplate
                    },
                ],
            }
        })
    }

    setCustomRange = value => {
        const { contractsList, skillsList } = this.props
        const { colorTemplate } = this.state

        const arrayContractsList = Object.values(contractsList)
        const arraySkillsList = Object.values(skillsList)

        const listSkilsName = Array(arraySkillsList.length);
        for (let k = 0; k < arraySkillsList.length; k += 1) {
            listSkilsName[k] = arraySkillsList[k].name
        }
        const arrMoney = Array(arraySkillsList.length).fill(0)
        for (let i = 0; i <= arrayContractsList.length; i += 1) {
            if (arrayContractsList[i]?.beginTime === undefined) {
                continue;
            }

            if (
                new Date((moment(arrayContractsList[i].beginTime)).format("MM-DD-YYYY")) >=
                new Date(moment(value[0]).format('MM-DD-YYYY')) &&
                new Date((moment(arrayContractsList[i].beginTime)).format("MM-DD-YYYY")) <=
                new Date(moment(value[1]).format('MM-DD-YYYY')) &&
                arrayContractsList[i].skill !== undefined
            ) {
                for (let j = 0; j < arraySkillsList.length; j += 1) {

                    if (arraySkillsList[j].name === arrayContractsList[i].skill) {
                        arrMoney[j] += arrayContractsList[i].totalPrice
                        break;
                    }
                }
            }
        }
        this.setState({
            customRange: value,
            chartCustomData: {
                labels: listSkilsName,
                datasets: [
                    {
                        label: 'VND',
                        data: arrMoney,
                        backgroundColor: colorTemplate
                    },
                ],
            }
        })
    }

    render() {
        const {
            typeTime,
            day,
            chartDayData,
            week,
            chartWeekData,
            month,
            chartMonthData,
            year,
            chartYearData,
            customRange,
            chartCustomData
        } = this.state
        return (
            <Row>
                <Col span={24}>
                    <MyTimeType2
                        typeTime={typeTime}
                        setTypeTime={this.setTypeTime}
                        day={day}
                        setDay={this.setDay}
                        week={week}
                        setWeek={this.setWeek}
                        month={month}
                        setMonth={this.setMonth}
                        year={year}
                        setYear={this.setYear}
                        customRange={customRange}
                        setCustomRange={this.setCustomRange}
                    />
                    <Row style={{ marginTop: '30px' }}>
                        <HorizontalBar
                            data={
                                // eslint-disable-next-line no-nested-ternary
                                typeTime === "Day" ? chartDayData : (
                                    // eslint-disable-next-line no-nested-ternary
                                    typeTime === "Week" ?
                                        chartWeekData :
                                        // eslint-disable-next-line no-nested-ternary
                                        (typeTime === "Month" ?
                                            chartMonthData :
                                            (typeTime === "Year" ?
                                                chartYearData :
                                                chartCustomData
                                            )
                                        )
                                )
                            }
                            option={{ maintainAspectRatio: false }}
                        />
                    </Row>
                </Col>
            </Row>
        )
    }
}

SkillChart.propTypes = {
    contractsList: PropTypes.objectOf(PropTypes.object),
    skillsList: PropTypes.objectOf(PropTypes.object),
    // week: PropTypes.objectOf(PropTypes.object),
}

SkillChart.defaultProps = {
    contractsList: {},
    skillsList: {},
    // week: moment(),
}

export default SkillChart