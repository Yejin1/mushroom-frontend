import React, { useState } from "react";
import styles from "./CalendarSidebar.module.css";
import ScheduleModal from "./ScheduleModal";
import AddTagModal from "./AddTagModal";
import axios from 'axios';

export default function CalendarSidebar({ tags, selectedTags, onTagChange, onAddTodo, setTagRefreshKey }) {
    const [todo, setTodo] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showTagInput, setShowTagInput] = useState(false);
    const [selectedTag, setSelectedTag] = useState(null);
    const [editTag, setEditTag] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleDeleteTag = async (id) => {
        if (!window.confirm("태그에 등록된 일정이 함께 삭제됩니다. \n정말 삭제하시겠습니까?")) return;
        try {
            const token = localStorage.getItem('accesToken');
            const BASE_URL = import.meta.env.VITE_BASE_URL;
            await axios.delete(`${BASE_URL}/api/schedules/tags`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    id
                }
            });
            alert('삭제되었습니다.');
            setTagRefreshKey(prev => prev + 1);
        } catch (error) {
            alert('삭제에 실패했습니다.');
            console.error('일정 삭제에 실패했습니다.', error);
        }
    };

    return (
        <aside className={styles.sidebar}>
            <button className={styles.addBtn} onClick={() => setShowModal(true)}>일정 등록</button>
            <div className={styles.section}>
                <div className={styles.sectionTitle}>일정 유형
                </div>
                <div className={styles.tags}>
                    {tags.map(tag => (
                        <div
                            key={tag.id}
                            className={styles.tagItem}
                            onMouseEnter={() => setSelectedTag(tag)}
                            onMouseLeave={() => setSelectedTag(null)}
                            style={{ display: 'inline-flex', alignItems: 'center', position: 'relative' }}
                        >
                            <label className={styles.tagLabel} style={{ marginRight: 4 }}>
                                <input
                                    type="checkbox"
                                    style={{ accentColor: tag.color, borderColor: tag.color }}
                                    checked={selectedTags.includes(tag)}
                                    onChange={() => onTagChange(tag)}
                                />
                                <span className={styles.tagText}>{tag.name}</span>
                            </label>
                            {selectedTag?.id === tag.id && (
                                <button
                                    className={styles.tagDeleteBtn}
                                    onClick={() => {
                                        handleDeleteTag(tag.id);
                                    }}
                                    style={{ marginLeft: 2 }}
                                >X</button>
                            )}
                        </div>
                    ))}
                </div>
                <button
                    className={styles.addTagBtn}
                    style={{ marginLeft: 8, fontSize: 13, padding: '2px 10px' }}
                    onClick={() => setShowTagInput(true)}
                >+ 추가</button>
            </div>
            {
                showModal && (
                    <ScheduleModal
                        tags={tags}
                        onClose={() => setShowModal(false)}
                        onSubmit={onAddTodo}
                    />
                )
            }
            {
                showTagInput && (
                    <AddTagModal
                        onClose={() => setShowTagInput(false)}
                        onAdd={(newTag) => {
                            onTagChange(newTag);
                            setShowTagInput(false);
                            setTagRefreshKey(prev => prev + 1);
                        }}
                        selectedTag={selectedTag}
                    />
                )
            }
            {
                showEditModal && editTag && (
                    <AddTagModal
                        mode="edit"
                        tag={editTag}
                        onClose={() => {
                            setShowEditModal(false);
                            setEditTag(null);
                        }}
                        onAdd={(updatedTag) => {
                            setShowEditModal(false);
                            setEditTag(null);
                            setTagRefreshKey(prev => prev + 1);
                        }}
                        onDelete={(id) => {
                            setShowEditModal(false);
                            setEditTag(null);
                            handleDeleteTag(id);
                        }}
                    />
                )
            }
        </aside >
    );
}