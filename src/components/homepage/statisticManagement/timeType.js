/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React, { useState } from 'react'
import { Row, Col, Radio, DatePicker } from 'antd'
import moment from 'moment'

const MyTimeType = () => {
    const { MonthPicker, WeekPicker } = DatePicker;

    const [type, setType] = useState(false);

    const [week, setWeek] = useState(false)
    const [month, setMonth] = useState(false)
    const [year, setYear] = useState(false)
    const [visibleYearPicker, setVisibleYearPicker] = useState(false)

    const handleClickType = typeDate => {
        setType(typeDate)
    }

    const handlePickWeek = value => {
        setWeek(value)
        console.log(value)
    }

    const handlePickMonth = value => {
        setMonth(value)
        console.log(value)
    }

    const handlePickYear = value => {
        setYear(value)
        setVisibleYearPicker(false)
        console.log(value)
    }

    return (
        <Row gutter={10}>
            <Col span={6} />
            <Col span={6} />
            <Col span={6}>
                <Radio.Group>
                    <Radio.Button
                        onClick={() => handleClickType('Week')}
                        value="Week"
                    >
                        Week
                    </Radio.Button>
                    <Radio.Button
                        onClick={() => handleClickType('Month')}
                        value="Month"
                    >
                        Month
                    </Radio.Button>
                    <Radio.Button
                        onClick={() => handleClickType('Year')}
                        value="Year"
                    >
                        Year
                    </Radio.Button>
                </Radio.Group>
            </Col>
            <Col span={6}>
                {type === 'Week' && (
                    <WeekPicker
                        value={week ? moment(week) : null}
                        onChange={value => handlePickWeek(value)}
                    />
                )}
                {type === 'Month' && (
                    <MonthPicker
                        value={month ? moment(month) : null}
                        onChange={value => handlePickMonth(value)}
                    />
                )}
                {type === 'Year' && (
                    <DatePicker
                        onPanelChange={value => handlePickYear(value)}
                        mode='year'
                        format='YYYY'
                        value={year ? moment(year) : null}
                        open={visibleYearPicker}
                        onOpenChange={() => setVisibleYearPicker(true)}
                    />
                )}
            </Col>
        </Row>
    )
}

export default MyTimeType