import React, { useState, useEffect } from "react";
import axios from 'axios';
import styles from "./ScheduleModal.module.css";

export default function ScheduleModal({
    tags,
    onClose,
    onSubmit,
    mode = "create", // "create" | "edit" | "view"
    schedule = null, // {title, start, end, desc, tag, allDay, id}
    onEdit,
    onDelete
}) {
    const [title, setTitle] = useState(schedule?.title || "");
    const [start, setStart] = useState(schedule?.start || "");
    const [end, setEnd] = useState(schedule?.end || "");
    const [desc, setDesc] = useState(schedule?.desc || "");
    const [tag, setTag] = useState(schedule?.tag || (tags[0]?.id || ""));
    const [allDay, setAllDay] = useState(schedule?.allDay || false);

    useEffect(() => {
        if (schedule) {
            setTitle(schedule.title || "");
            setStart(schedule.start || "");
            setEnd(schedule.end || "");
            setDesc(schedule.desc || "");
            setTag(schedule.tag || (tags[0]?.id || ""));
            setAllDay(schedule.allDay || false);
        }
    }, [schedule, tags]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !start || !end) {
            alert("제목, 시작일시, 종료일시를 모두 입력하세요.");
            return;
        }
        if (mode === "create") {
            try {
                const token = localStorage.getItem('accesToken');
                const BASE_URL = import.meta.env.VITE_BASE_URL;
                await axios.post(`${BASE_URL}/api/schedules`, {
                    title,
                    description: desc,
                    startDateTime: start,
                    endDateTime: end,
                    tagIds: tag ? [tag] : [],
                    attendeeIds: [],
                    allDay
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                alert('일정이 등록되었습니다.');
                if (onSubmit) onSubmit({ title, start, end, desc, tag, allDay });
                onClose();
            } catch (error) {
                alert('일정 등록에 실패했습니다.');
            }
        } else if (mode === "edit") {
            try {
                const token = localStorage.getItem('accesToken');
                const BASE_URL = import.meta.env.VITE_BASE_URL;
                await axios.put(`${BASE_URL}/api/schedules`, {
                    id: schedule.id,
                    title,
                    description: desc,
                    startDateTime: start,
                    endDateTime: end,
                    tagIds: tag ? [tag] : [],
                    attendeeIds: [],
                    allDay
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                alert('일정이 수정되었습니다.');
                if (onSubmit) onSubmit({ title, start, end, desc, tag, allDay });
                onClose();
            } catch (error) {
                alert('일정 수정에 실패했습니다.');
            }
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;
        try {
            const token = localStorage.getItem('accesToken');
            const BASE_URL = import.meta.env.VITE_BASE_URL;
            await axios.delete(`${BASE_URL}/api/schedules`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    id: schedule?.id
                }
            });
            alert('일정이 삭제되었습니다.');
            if (onDelete) onDelete(schedule?.id);
            onClose();
        } catch (error) {
            alert('일정 삭제에 실패했습니다.');
        }
    };

    const isReadOnly = mode === "view";

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <span>
                        {mode === "create" && "일정 등록"}
                        {mode === "edit" && "일정 수정"}
                        {mode === "view" && "일정 조회"}
                    </span>
                    <button className={styles.closeBtn} onClick={onClose}>✕</button>
                </div>
                <form className={styles.modalForm} onSubmit={handleSubmit}>
                    <div className={styles.formRow}>
                        <label className={styles.inputLabel}>제목</label>
                        <input
                            className={styles.inputBox}
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                            readOnly={isReadOnly}
                        />
                    </div>
                    <div className={styles.formRow}>
                        <label className={styles.inputLabel}>시작일시</label>
                        <input
                            className={`${styles.inputBox} ${styles.dateTime}`}
                            type={allDay ? "date" : "datetime-local"}
                            value={start}
                            onChange={e => setStart(e.target.value)}
                            required
                            readOnly={isReadOnly}
                        />
                        <span className={styles.allDayCheckbox}>
                            <input
                                type="checkbox"
                                checked={allDay}
                                onChange={e => setAllDay(e.target.checked)}
                                id="allDay"
                                disabled={isReadOnly}
                            />
                            <label htmlFor="allDay" style={{ cursor: isReadOnly ? 'default' : 'pointer' }}>하루종일</label>
                        </span>
                    </div>
                    <div className={styles.formRow}>
                        <label className={styles.inputLabel}>종료일시</label>
                        <input
                            className={`${styles.inputBox} ${styles.dateTime}`}
                            type={allDay ? "date" : "datetime-local"}
                            value={end}
                            onChange={e => setEnd(e.target.value)}
                            required
                            readOnly={isReadOnly}
                        />
                    </div>
                    <div className={styles.formRow}>
                        <label className={styles.inputLabel}>설명</label>
                        <textarea
                            className={styles.inputBox}
                            value={desc}
                            onChange={e => setDesc(e.target.value)}
                            readOnly={isReadOnly}
                        />
                    </div>
                    <div className={styles.formRow}>
                        <label className={styles.inputLabel}>유형(태그)</label>
                        <select
                            className={styles.inputBox}
                            value={tag}
                            onChange={e => setTag(e.target.value)}
                            disabled={isReadOnly}
                        >
                            {tags.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                        </select>
                    </div>
                    {mode === "create" && (
                        <button type="submit" className={styles.addBtn}>등록</button>
                    )}
                    {mode === "edit" && (
                        <div style={{ display: "flex", gap: "10px" }}>
                            <button type="submit" className={styles.addBtn}>수정</button>
                            <button type="button" className={styles.deleteBtn} onClick={handleDelete}>삭제</button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}