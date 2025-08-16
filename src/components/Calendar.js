import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from "react";
import '../styles/Calendar.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Task from "./Task";
import { useNavigate } from 'react-router-dom';


const Calendar = () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    const [curMonth, setCurMonth] = useState(new Date().getMonth());
    const daysinamonth = (month) => new Date(2025, month + 1, 0).getDate();
    const firstdayofamonth = (month) => new Date(2025, month, 1).getDay();
    const currday = new Date().getDate();
    const curryear = new Date().getFullYear();
    const currmonth = new Date().getMonth();

    const navigate = useNavigate();

    const [showModal, setModal] = useState(false);
    const handleCloseModal = () => setModal(false);


    return (
        <>
            <div className="calendar">
                <h1 className="calendarHeading">Task Calendar {curryear}</h1>
                <Dropdown className="dropdown">
                    <Dropdown.Toggle variant="info" id="dropdown-basic">
                        {months[curMonth]}
                    </Dropdown.Toggle>

                    <Dropdown.Menu id="dropdown-menu">
                        {months.map((month, ind) => (
                            <Dropdown.Item key={ind} className="dropdownItem" onClick={() => (setCurMonth(ind))}>{month}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                <div className="month">
                    {week.map((day) => (
                        <div className="day">{day}</div>
                    ))}

                    {Array.from({ length: firstdayofamonth(curMonth) - 1 }, (_, i) => (
                        <div></div>
                    ))}
                    {Array.from({ length: daysinamonth(curMonth) }, (_, i) => {
                        const isToday = currday === i + 1;
                        const isCurrMonth = currmonth === curMonth;
                        const handleDayClick = () => {
                            const day = String(i + 1).padStart(2, '0');
                            const month = String(curMonth + 1).padStart(2, '0');
                            const dateStr = `${curryear}-${month}-${day}`;

                            navigate(`/tasks/${dateStr}`);
                            setModal(true);
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
