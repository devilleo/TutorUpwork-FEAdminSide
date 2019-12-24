/* eslint-disable no-continue */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Table } from 'antd'
import moment from 'moment'
import cloneDeep from 'lodash/cloneDeep'
import MyTimeType2 from './timePicker/timeType2'



class TutorRevenue extends Component {
    constructor(props) {
        super(props)

        this.state = {
            typeTime: 'Week',

            day: moment(),
            dataByDay: [],

            week: moment(),
            dataByWeek: [],

            month: moment(),
            dataByMonth: [],

            year: moment(),
            dataByYear: [],

            customRange: [moment(), moment()],
            dataByCustom: []
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
        const { contractsList, tutorsList } = this.props
        const tutorsListClone = cloneDeep(tutorsList)

        const arrayContractsList = Object.values(contractsList)
        Object.keys(tutorsListClone).forEach(item => {
            tutorsListClone[item].stt = Number(item) + 1
            tutorsListClone[item].key = Number(item) + 1
            // reset revenue and sign to 0
            tutorsListClone[item].revenue = 0
            tutorsListClone[item].singedContracts = 0
        })
        for (let i = 0; i <= arrayContractsList.length; i += 1) {
            if (arrayContractsList[i]?.beginTime === undefined) {
                continue;
            }

            const currentItemDate = ((moment(arrayContractsList[i].beginTime))).format('MM-DD-YYYY')
            if (currentItemDate === (moment(value).format('MM-DD-YYYY'))) {
                Object.keys(tutorsListClone).forEach(item => {
                    if (
                        tutorsListClone[item].id === arrayContractsList[i].tutorId) {
                        tutorsListClone[item].revenue =
                            (tutorsListClone[item].revenue || 0) +
                            (arrayContractsList[i].totalPrice || 0)
                        tutorsListClone[item].singedContracts =
                            (tutorsListClone[item].singedContracts || 0) + 1
                    }
                })
            }
        }
        this.setState({
            day: value,
            dataByDay: Object.values(tutorsListClone)
        })
    }

    setWeek = value => {
        const { contractsList, tutorsList } = this.props
        const tutorsListClone = cloneDeep(tutorsList)

        const arrayContractsList = Object.values(contractsList)
        Object.keys(tutorsListClone).forEach(item => {
            tutorsListClone[item].stt = Number(item) + 1
            tutorsListClone[item].key = Number(item) + 1
            // reset revenue and sign to 0
            tutorsListClone[item].revenue = 0
            tutorsListClone[item].singedContracts = 0
        })
        for (let i = 0; i <= arrayContractsList.length; i += 1) {
            if (arrayContractsList[i]?.beginTime === undefined) {
                continue;
            }

            if (new Date((moment(arrayContractsList[i].beginTime))) >=
                new Date((moment(value).startOf('week'))) &&
                new Date((moment(arrayContractsList[i].beginTime))) <=
                new Date((moment(value).endOf('week')))
            ) {
                Object.keys(tutorsListClone).forEach(item => {
                    if (
                        tutorsListClone[item].id === arrayContractsList[i].tutorId) {
                        tutorsListClone[item].revenue =
                            (tutorsListClone[item].revenue || 0) +
                            (arrayContractsList[i].totalPrice || 0)
                        tutorsListClone[item].singedContracts =
                            (tutorsListClone[item].singedContracts || 0) + 1
                    }
                })
            }
        }
        this.setState({
            week: value,
            dataByWeek: Object.values(tutorsListClone)
        })
    }

    setMonth = value => {
        const { contractsList, tutorsList } = this.props

        const tutorsListClone = cloneDeep(tutorsList)

        const arrayContractsList = Object.values(contractsList)
        Object.keys(tutorsListClone).forEach(item => {
            tutorsListClone[item].stt = Number(item) + 1
            tutorsListClone[item].key = Number(item) + 1
            // reset revenue and sign to 0
            tutorsListClone[item].revenue = 0
            tutorsListClone[item].singedContracts = 0
        })
        for (let i = 0; i <= arrayContractsList.length; i += 1) {
            if (arrayContractsList[i]?.beginTime === undefined) {
                continue;
            }

            if (new Date((moment(arrayContractsList[i].beginTime))) >=
                new Date((moment(value).startOf('month'))) &&
                new Date((moment(arrayContractsList[i].beginTime))) <=
                new Date((moment(value).endOf('month')))
            ) {
                Object.keys(tutorsList).forEach(item => {
                    if (
                        tutorsListClone[item].id === arrayContractsList[i].tutorId) {
                        tutorsListClone[item].revenue =
                            (tutorsListClone[item].revenue || 0) +
                            (arrayContractsList[i].totalPrice || 0)
                        tutorsListClone[item].singedContracts =
                            (tutorsListClone[item].singedContracts || 0) + 1
                    }
                })
            }
        }
        this.setState({
            month: value,
            dataByMonth: Object.values(tutorsListClone)
        })
    }

    setYear = value => {
        const { contractsList, tutorsList } = this.props

        const tutorsListClone = cloneDeep(tutorsList)

        const arrayContractsList = Object.values(contractsList)
        Object.keys(tutorsListClone).forEach(item => {
            tutorsListClone[item].stt = Number(item) + 1
            tutorsListClone[item].key = Number(item) + 1
            // reset revenue and sign to 0
            tutorsListClone[item].revenue = 0
            tutorsListClone[item].singedContracts = 0
        })
        for (let i = 0; i <= arrayContractsList.length; i += 1) {
            if (arrayContractsList[i]?.beginTime === undefined) {
                continue;
            }

            if (new Date((moment(arrayContractsList[i].beginTime))) >=
                new Date((moment(value).startOf('month'))) &&
                new Date((moment(arrayContractsList[i].beginTime))) <=
                new Date((moment(value).endOf('month')))
            ) {
                Object.keys(tutorsList).forEach(item => {
                    if (
                        tutorsListClone[item].id === arrayContractsList[i].tutorId) {
                        tutorsListClone[item].revenue =
                            (tutorsListClone[item].revenue || 0) +
                            (arrayContractsList[i].totalPrice || 0)
                        tutorsListClone[item].singedContracts =
                            (tutorsListClone[item].singedContracts || 0) + 1
                    }
                })
            }
        }
        this.setState({
            year: value,
            dataByYear: Object.values(tutorsListClone)
        })
    }

    setCustomRange = value => {
        const { contractsList, tutorsList } = this.props

        const tutorsListClone = cloneDeep(tutorsList)

        const arrayContractsList = Object.values(contractsList)
        Object.keys(tutorsListClone).forEach(item => {
            tutorsListClone[item].stt = Number(item) + 1
            tutorsListClone[item].key = Number(item) + 1
            // reset revenue and sign to 0
            tutorsListClone[item].revenue = 0
            tutorsListClone[item].singedContracts = 0
        })
        for (let i = 0; i <= arrayContractsList.length; i += 1) {
            if (arrayContractsList[i]?.beginTime === undefined) {
                continue;
            }

            if (new Date((moment(arrayContractsList[i].beginTime)).format("MM-DD-YYYY")) >=
                new Date(moment(value[0]).format("MM-DD-YYYY")) &&
                new Date((moment(arrayContractsList[i].beginTime)).format("MM-DD-YYYY")) <=
                new Date(moment(value[1]).format("MM-DD-YYYY"))
            ) {
                Object.keys(tutorsList).forEach(item => {
                    if (
                        tutorsListClone[item].id === arrayContractsList[i].tutorId) {
                        tutorsListClone[item].revenue =
                            (tutorsListClone[item].revenue || 0) +
                            (arrayContractsList[i].totalPrice || 0)
                        tutorsListClone[item].singedContracts =
                            (tutorsListClone[item].singedContracts || 0) + 1
                    }
                })
            }
        }
        this.setState({
            customRange: value,
            dataByCustom: Object.values(tutorsListClone)
        })
    }

    render() {
        const {
            typeTime,
            day,
            dataByDay,
            week,
            dataByWeek,
            month,
            dataByMonth,
            year,
            dataByYear,
            customRange,
            dataByCustom
        } = this.state

        const columns = [
            {
                title: 'Số thứ tự',
                dataIndex: 'stt',
                render: (value, record) => (
                    <div className="antd-pro-pages-list-basic-list-style-listContentItem">
                        <p>{record.stt}</p>
                    </div>
                ),
                // specify the condition of filtering result
                // here is that finding the name started with `value`
                sorter: (a, b) => a.stt - b.stt,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'ID Nguoi day',
                dataIndex: 'id',
                render: (value, record) => (
                    <div className="antd-pro-pages-list-basic-list-style-listContentItem">
                        <p>{record.id}</p>
                    </div>
                ),
                // specify the condition of filtering result
                // here is that finding the name started with `value`
                onFilter: (value, record) => record.skill === value,
                sorter: (a, b) => a.id - b.id,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Email',
                dataIndex: 'email',
                render: (value, record) => (
                    <div className="antd-pro-pages-list-basic-list-style-listContentItem">
                        <p>{record.email}</p>
                    </div>
                ),
                // specify the condition of filtering result
                // here is that finding the name started with `value`
                onFilter: (value, record) => record.email === value,
                sorter: (a, b) => (a.email ? a.email.length : 0) - (b.email ? b.email.length : 0),
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Tong thu nhap',
                dataIndex: 'revenue',
                render: (value, record) => (
                    <div className="antd-pro-pages-list-basic-list-style-listContentItem">
                        <p>{record.revenue}</p>
                    </div>
                ),
                // specify the condition of filtering result
                // here is that finding the name started with `value`
                sorter: (a, b) => a.revenue - b.revenue,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Hop dong da ki',
                dataIndex: 'singedContracts',
                render: (value, record) => (
                    <div className="antd-pro-pages-list-basic-list-style-listContentItem">
                        <p>{record.singedContracts}</p>
                    </div>
                ),
                // specify the condition of filtering result
                // here is that finding the name started with `value`
                sorter: (a, b) => a.singedContracts - b.singedContracts,
                sortDirections: ['descend', 'ascend'],
            },
        ];
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
                        <Table
                            columns={columns}
                            dataSource={
                                // eslint-disable-next-line no-nested-ternary
                                typeTime === "Day" ? dataByDay : (
                                    // eslint-disable-next-line no-nested-ternary
                                    typeTime === "Week" ? dataByWeek : (
                                        // eslint-disable-next-line no-nested-ternary
                                        typeTime === "Month" ? dataByMonth : (
                                            typeTime === "Year" ? dataByYear :
                                                dataByCustom
                                        )
                                    )
                                )
                            }
                        />
                    </Row>
                </Col>
            </Row>
        )
    }
}

TutorRevenue.propTypes = {
    contractsList: PropTypes.objectOf(PropTypes.object),
    tutorsList: PropTypes.objectOf(PropTypes.object),
    // week: PropTypes.objectOf(PropTypes.object),
}

TutorRevenue.defaultProps = {
    contractsList: {},
    tutorsList: {},
    // week: moment(),
}

export default TutorRevenue