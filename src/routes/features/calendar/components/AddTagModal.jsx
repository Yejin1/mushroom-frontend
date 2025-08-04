import React, { useState, useEffect } from "react";
import axios from 'axios';
import styles from "./CalendarSidebar.module.css";

export default function AddTagModal({ onClose, onAdd, mode = "create", tag = null, onDelete }) {
    const [name, setName] = useState(tag?.name || "");
    const [type, setType] = useState(tag?.scopeType || "PERSONAL");
    const [color, setColor] = useState(tag?.color || "#7fa650");

    useEffect(() => {
        if (mode === "edit" && tag) {
            setName(tag.name || "");
            setType(tag.scopeType || "PERSONAL");
            setColor(tag.color || "#7fa650");
        }
    }, [mode, tag]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) {
            alert("유형 이름을 입력하세요.");
            return;
        }
        if (mode === "create") {
            try {
                const token = localStorage.getItem('accesToken');
                const BASE_URL = import.meta.env.VITE_BASE_URL;
                console.log("Adding new tag:", { name, type, color });
                console.log(BASE_URL);
                await axios.post(`${BASE_URL}/api/schedules/tags`, {
                    name: name,
                    scopeType: type,
                    color: color,
                    priority: 0
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                alert('일정 유형이 등록되었습니다.');
                if (onAdd) onAdd({ name, type, color });
                onClose();
            } catch (error) {
                console.error('일정 유형 등록에 실패했습니다.', error);
                alert('일정 유형 등록에 실패했습니다.');
            }
        } else if (mode === "edit") {
            try {
                const token = localStorage.getItem('accesToken');
                const BASE_URL = import.meta.env.VITE_BASE_URL;
                await axios.put(`${BASE_URL}/api/schedules/tags`, {
                    id: tag.id,
                    name: name,
                    scopeType: type,
                    color: color
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                alert('일정 유형이 수정되었습니다.');
                if (onAdd) onAdd({ name, type, color });
                onClose();
            } catch (error) {
                alert('일정 유형 수정에 실패했습니다.');
            }
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;
        try {
            const token = localStorage.getItem('accesToken');
            const BASE_URL = import.meta.env.VITE_BASE_URL;
            await axios.delete(`${BASE_URL}/api/schedules/tags`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    id: tag.id
                }
            });
            alert('일정 유형이 삭제되었습니다.');
            if (onDelete) onDelete(tag.id);
            onClose();
        } catch (error) {
            alert('일정 유형 삭제에 실패했습니다.');
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent} style={{ minWidth: 320 }}>
                <div className={styles.modalHeader}>
                    <span>{mode === "edit" ? "일정 유형 수정" : "일정 유형 추가"}</span>
                    <button className={styles.closeBtn} onClick={onClose}>✕</button>
                </div>
                <form className={styles.modalForm} onSubmit={handleSubmit}>
                    <div className={styles.formRow}>
                        <label className={styles.inputLabel}>유형 이름</label>
                        <input
                            className={styles.inputBox}
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formRow}>
                        <label className={styles.inputLabel}>구분</label>
                        <select
                            className={styles.inputBox}
                            value={type}
                            onChange={e => setType(e.target.value)}
                        >
                            <option value="PERSONAL">개인</option>
                            <option value="DEPARTMENT">팀</option>
                            <option value="COMPANY">회사</option>
                        </select>
                    </div>
                    <div className={styles.formRow}>
                        <label className={styles.inputLabel}>색상</label>
                        <input
                            className={styles.inputBox}
                            type="color"
                            value={color}
                            onChange={e => setColor(e.target.value)}
                        />
                    </div>
                    {mode === "edit" ? (
                        <div className={styles.modalBtnRow}>
                            <button type="submit" className={styles.addBtn}>수정</button>
                            <button type="button" className={styles.deleteBtn} onClick={handleDelete}>삭제</button>
                        </div>
                    ) : (
                        <button type="submit" className={styles.addBtn}>추가</button>
                    )}
                </form>
            </div>
        </div>
    );
}
