// CalendarMain.jsx
/**
 * - 캘린더 메인 컴포넌트
 * - 캘린더 기능을 위한 메인 컴포넌트로, 일정관리 기능 제공
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";
import styles from './CalendarMain.module.css';
import './fullCalendar.css'
import CalendarSidebar from './components/CalendarSidebar';
import ScheduleModal from './components/ScheduleModal'; // 추가

function CalendarMain() {

    const [date, setDate] = useState(new Date());

    const [events, setEvents] = useState([]);

    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [modalOpen, setModalOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [tagRefreshKey, setTagRefreshKey] = useState(0);
    const [selectedSchedule, setSelectedSchedule] = useState(null);

    const handleTagChange = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleAddTodo = (todo) => {
        // 일정 등록되면 새로고침
        setRefreshKey(prev => prev + 1);
    };

    // 일정 클릭 시 모달 오픈 (수정모드)
    const handleEventClick = (info) => {
        // info.event.extendedProps 등에서 상세 정보 추출
        const event = info.event;
        setSelectedSchedule({
            id: event.id,
            title: event.title.replace(/^\[.*?\]\s*/, ""), // 태그명 제거
            start: event.extendedProps.startDateTime,
            end: event.extendedProps.endDateTime,
            desc: event.extendedProps?.description || "",
            tag: event.extendedProps?.tags?.[0]?.id || "",
            allDay: event.allDay,
        });
        setModalOpen(true);
    };

    // 일정 수정/삭제 콜백 예시
    const handleEdit = (updated) => {
        // 수정 API 호출 후 목록 새로고침 등
        setModalOpen(false);
    };
    const handleDelete = (id) => {
        // 삭제 API 호출 후 목록 새로고침 등
        setModalOpen(false);
    };

    useEffect(() => {

        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const token = localStorage.getItem('accesToken');

        axios.get(`${BASE_URL}/api/schedules`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                startDate,
                endDate
            }
        })
            .then(res => {
                // 선택된 태그 id 배열로 변환
                const selectedTagIds = selectedTags.map(tag => tag.id);
                // 선택된 태그에 해당하는 일정만 필터링
                const filtered = res.data.filter(item =>
                    item.tags.some(tag => selectedTagIds.includes(tag.id))
                );
                const mappedEvents = filtered.map((item) => ({
                    id: item.id,
                    title: '[' + item.tags[0]?.name + '] ' + item.title,
                    start: item.start,
                    end: item.end,
                    color: item.color,
                    allDay: item.allDay,
                    extendedProps: {
                        scheduleId: item.id,
                        tags: item.tags,
                        description: item.description,
                        startDateTime: item.start,
                        endDateTime: item.end
                    }
                }));
                setEvents(mappedEvents);
            })
            .catch(err => {
                //console.error('스케줄 목록 조회 실패:', err);
            });
    }, [startDate, endDate, modalOpen, refreshKey, selectedTags]);


    useEffect(() => {

        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const token = localStorage.getItem('accesToken');

        axios.get(`${BASE_URL}/api/schedules/tags`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
            .then(res => {
                //console.log('태그 목록:', res.data);
                setTags(res.data);
                setSelectedTags(res.data); // 초기 선택된 태그 설정
                //console.log('초기 선택된 태그:', selectedTags);
            })
            .catch(err => {
                console.error('태그 목록 조회 실패:', err);
            });
    }, [tagRefreshKey]);

    return (
        <div className={styles['calendar-layout']}>
            <div className={styles['calendar-sidebar-area']}>
                <CalendarSidebar
                    tags={tags}
                    selectedTags={selectedTags}
                    onTagChange={handleTagChange}
                    onAddTodo={handleAddTodo}
                    setTagRefreshKey={setTagRefreshKey}
                />
            </div>
            <div className={styles['calendar-main-area']}>
                <FullCalendar
                    locale={koLocale}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    dayCellContent={(arg) => arg.date.getDate()}
                    datesSet={(arg) => {
                        setStartDate(arg.startStr.slice(0, 10));
                        setEndDate(arg.endStr.slice(0, 10));
                    }}
                    events={events}
                    editable={true}
                    titleFormat={{ year: 'numeric', month: 'long' }}
                    headerToolbar={{
                        left: "prev,next",
                        center: "title",
                        right: "today dayGridMonth,timeGridWeek,timeGridDay",
                    }}
                    eventClick={handleEventClick} // 일정 클릭 시 모달 오픈
                    dateClick={(info) => {
                        // 일정 추가 로직
                    }}
                />
                {modalOpen && (
                    <ScheduleModal
                        tags={tags}
                        mode="edit"
                        schedule={selectedSchedule}
                        onClose={() => setModalOpen(false)}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
            </div>
        </div>
    );
}

export default CalendarMain;
