import Dropdown from 'react-bootstrap/Dropdown';
import '../styles/Calendar.css';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Calendar(){
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    const currDay = new Date().getDate();
    const currYear = new Date().getFullYear();
    const latestMonth = new Date().getMonth();
    const [curMonth, setCurMonth] = useState(new Date().getMonth());
    const daysInAMonth = (month) => new Date(currYear, month + 1, 0).getDate();
    const firstDayOfAMonth = (month) => new Date(currYear, month, 1).getDay();

    const navigate = useNavigate();

    return (
        <>
            <div className="calendar">
                <h1 className="calendarHeading">Task Calendar {currYear}</h1>
                <Dropdown className="dropdown">
                    <Dropdown.Toggle variant="info" id="dropdown-basic">
                        {months[curMonth]}
                    </Dropdown.Toggle>

                    <Dropdown.Menu id="dropdown-menu">
                        {months.map((month, ind) => (
                            <Dropdown.Item key={ind} className="dropdownItem" onClick={() => (setCurMonth(ind))}>
                                {month}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                <div className="month">
                    {week.map((day) => (
                        <div className="day">{day}</div>
                    ))}

                    {Array.from({ length: firstDayOfAMonth(curMonth) - 1 }, (_, i) => (
                        <div></div>
                    ))}
                    {Array.from({ length: daysInAMonth(curMonth) }, (_, i) => {
                        const isToday = currDay === i + 1;
                        const isCurrMonth = latestMonth === curMonth;
                        const handleDayClick = () => {
                            const day = String(i + 1).padStart(2, '0');
                            const month = String(curMonth + 1).padStart(2, '0');
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
