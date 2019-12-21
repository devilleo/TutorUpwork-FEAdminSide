/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import { Row } from 'antd'

import MyTimeType from './timeType'

class Chart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chartData: {
                labels: ['Boston', 'dasdsada', 'hihi', 'huhu', 'hehe', 'haha'],
                datasets: [
                    {
                        label: 'Population',
                        data: [
                            123,
                            234,
                            345,
                            567,
                            678,
                            901
                        ],
                        backgroundColor: [
                            'rgba(0, 23, 0, 0.1)',
                            'rgba(12, 0, 0, 0.1)',
                            'rgba(67, 0, 0, 0.1)',
                            'rgba(0, 0, 78, 0.1)',
                            'rgba(0, 65, 0, 0.1)',
                            'rgba(100, 200, 12, 0.1)',
                        ]
                    }
                ],

            }
        }
    }

    render() {
        const { chartData } = this.state

        return (
            <div className="chart">
                <MyTimeType />
                <br />
                <Row>
                    <Bar
                        data={chartData}
                        option={{ maintainAspectRatio: false }}
                    />
                </Row>
            </div>
        )
    }
}

export default Chart