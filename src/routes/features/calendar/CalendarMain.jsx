// CalendarMain.jsx
/**
 * - 캘린더 메인 컴포넌트
 * - 캘린더 기능을 위한 메인 컴포넌트로, 일정관리 기능 제공
 */

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";
import styles from './CalendarMain.module.css';
import './fullCalendar.css'

function CalendarMain() {

    const [date, setDate] = useState(new Date());

    const [events, setEvents] = useState([]);

    return (
        <div className={styles['calendar-container']}>
            <FullCalendar
                locale={koLocale}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                dayCellContent={(arg) => {
                    return arg.date.getDate();
                }}
                events={events}
                editable={true}
                titleFormat={{ year: 'numeric', month: 'long' }}
                headerToolbar={{
                    left: "prev,next",
                    center: "title",
                    right: "today dayGridMonth,timeGridWeek,timeGridDay",
                }}
                dateClick={(info) => {
                    // const title = prompt("Enter Event Title");
                    // const calendarApi = info.view.calendar;
                    // calendarApi.addEvent({
                    //     id: Date.now(),
                    //     title,
                    //     start: info.date,
                    //     allDay: info.allDay
                    // });
                }}
            />
        </div>
    );
}

export default CalendarMain;
