/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Row, Radio, DatePicker } from 'antd'
import moment from 'moment'

const MyTimeType2 = (
    {
        typeTime,
        setTypeTime,
        day,
        setDay,
        week,
        setWeek,
        month,
        setMonth,
        year,
        setYear
    }
) => {
    const { WeekPicker, MonthPicker } = DatePicker;

    const [visibleYearPicker, setVisibleYearPicker] = useState(false)

    const handlePickDay = value => {
        setDay(value)
    }

    const handlePickWeek = value => {
        setWeek(value)
    }

    const handlePickMonth = value => {
        setMonth(value)
    }

    const handlePickYear = value => {
        setYear(value)
        setVisibleYearPicker(false)
    }

    return (
        <Row>
            <Radio.Group defaultValue='Week'>
                <Radio.Button
                    onClick={() => setTypeTime('Day')}
                    value="Day"
                >
                    Day
                </Radio.Button>
                <Radio.Button
                    onClick={() => setTypeTime('Week')}
                    value="Week"
                >
                    Week
                </Radio.Button>
                <Radio.Button
                    onClick={() => setTypeTime('Month')}
                    value="Month"
                >
                    Month
                </Radio.Button>
                <Radio.Button
                    onClick={() => setTypeTime('Year')}
                    value="Year"
                >
                    Year
                </Radio.Button>
            </Radio.Group>

            {typeTime === 'Day' && (
                <DatePicker
                    onChange={value => handlePickDay(value)}
                    value={day ? moment(day) : null}
                />
            )}
            {typeTime === 'Week' && (
                <WeekPicker
                    value={week ? moment(week) : null}
                    onChange={value => handlePickWeek(value)}
                />
            )}
            {typeTime === 'Month' && (
                <MonthPicker
                    value={month ? moment(month) : null}
                    onChange={value => handlePickMonth(value)}
                />
            )}
            {typeTime === 'Year' && (
                <DatePicker
                    onPanelChange={value => handlePickYear(value)}
                    mode='year'
                    format='YYYY'
                    value={year ? moment(year) : null}
                    open={visibleYearPicker}
                    onOpenChange={() => setVisibleYearPicker(true)}
                />
            )}
        </Row>
    )
}

MyTimeType2.propTypes = {
    typeTime: PropTypes.string,
    setTypeTime: PropTypes.func,
    day: PropTypes.shape(),
    setDay: PropTypes.func,
    week: PropTypes.shape(),
    setWeek: PropTypes.func,
    month: PropTypes.shape(),
    setMonth: PropTypes.func,
    year: PropTypes.shape(),
    setYear: PropTypes.func,
};

MyTimeType2.defaultProps = {
    typeTime: 'Week',
    setTypeTime: () => { },
    day: moment(),
    setDay: () => { },
    week: moment(),
    setWeek: () => { },
    month: moment(),
    setMonth: () => { },
    year: moment(),
    setYear: () => { },
};

export default MyTimeType2