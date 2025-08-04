import React, { useState } from "react";
import styles from "./CalendarSidebar.module.css";
import ScheduleModal from "./ScheduleModal";

export default function CalendarSidebar({ tags, selectedTags, onTagChange, onAddTodo }) {
    const [todo, setTodo] = useState("");
    const [showModal, setShowModal] = useState(false);

    return (
        <aside className={styles.sidebar}>
            <button className={styles.addBtn} onClick={() => setShowModal(true)}>일정 등록</button>
            <div className={styles.section}>
                <div className={styles.sectionTitle}>일정 유형</div>
                <div className={styles.tags}>
                    {tags.map(tag => (
                        <label key={tag.id} className={styles.tagLabel}>
                            <input
                                type="checkbox"
                                style={{ accentColor: tag.color, borderColor: tag.color }}
                                checked={selectedTags.includes(tag)}
                                onChange={() => onTagChange(tag)}
                            />
                            <span className={styles.tagText}>{tag.name}</span>
                        </label>
                    ))}
                </div>
            </div>
            {showModal && (
                <ScheduleModal
                    tags={tags}
                    onClose={() => setShowModal(false)}
                    onSubmit={onAddTodo}
                />
            )}
        </aside>
    );
}