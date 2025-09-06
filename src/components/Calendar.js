import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from "react";
import '../styles/Calendar.css';
import { useNavigate } from 'react-router-dom';


const Calendar = () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    const currYear = new Date().getFullYear();
    const currMonth = new Date().getMonth();
    const [month, setMonth] = useState(currMonth);
    const daysInAMonth = (month) => new Date(currYear, month + 1, 0).getDate();
    const firstDayOfAMonth = (month) => new Date(currYear, month, 1).getDay();
    const currday = new Date().getDate();

    const navigate = useNavigate();

    return (
        <>
            <div className="calendar">
                <h1 className="calendarHeading">Task Calendar {currYear}</h1>
                <Dropdown className="dropdown">
                    <Dropdown.Toggle variant="info" id="dropdown-basic">
                        {months[month]}
                    </Dropdown.Toggle>

                    <Dropdown.Menu id="dropdown-menu">
                        {months.map((month, ind) => (
                            <Dropdown.Item key={ind} className="dropdownItem" onClick={() => (setMonth(ind))}>{month}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                <div className="month">
                    {week.map((day) => (
                        <div className="day">{day}</div>
                    ))}

                    {Array.from({ length: firstDayOfAMonth(month) - 1 }, (_, i) => (
                        <div></div>
                    ))}
                    {Array.from({ length: daysInAMonth(month) }, (_, i) => {
                        const isToday = currday === i + 1;
                        const isCurrMonth = currMonth === month;
                        const handleDayClick = () => {
                            const day = String(i + 1).padStart(2, '0');
                            const month = String(month + 1).padStart(2, '0');
                            const dateStr = `${currYear}-${month}-${day}`;

                            navigate(`/tasks/${dateStr}`);
                        };
                        return (
                            <div
                                key={i}
                                onClick={handleDayClick}
                                className={`date ${isToday && isCurrMonth ? "date-today" : "date-normal"}`}>
                                {i + 1}
                            </div>
                        )
                    }
                    )}

                </div>
            </div>
        </>
    )
}

export default Calendar;
