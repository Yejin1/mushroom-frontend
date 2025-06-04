// ApprovalLineModal.jsx
/**
 * - 결재선 선택 팝업 모달
 */
import React, { useEffect, useState } from 'react';
import styles from './ApprovalLineModal.module.css';

function ApprovalLineModal({ open, onClose, onComplete }) {
    const token = localStorage.getItem('accesToken');
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        if (!open) return;
        fetch('http://localhost:8080/api/usr/users', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                if (res.status === 403) {
                    alert('로그인이 필요합니다. 다시 로그인 해주세요.');
                    return Promise.reject('로그인 필요');
                }
                return res.ok ? res : Promise.reject(res);
            })
            .then(res => res.json())
            .then(data => {
                setUsers(data);
            })
            .catch(() => setUsers([]));
    }, [open, token]);

    if (!open) return null;

    // 사용자 클릭 시 선택/해제 (결재 순서 stepOrder 부여)
    const handleUserClick = (user) => {
        let newSelected;
        if (selectedUsers.find(u => u.usrId === user.usrId)) {
            // 선택 해제 시 stepOrder 재정렬
            newSelected = selectedUsers.filter(u => u.usrId !== user.usrId)
                .map((u, idx) => ({ ...u, stepOrder: idx + 1 }));
        } else {
            // 선택 추가 시 stepOrder 부여
            newSelected = [
                ...selectedUsers,
                { ...user, stepOrder: selectedUsers.length + 1 }
            ];
        }
        setSelectedUsers(newSelected);
    };

    // 완료 버튼 클릭 시
    const handleComplete = () => {
        if (onComplete) {
            onComplete(selectedUsers);
        }
        onClose();
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2>결재선 선택</h2>
                    <button className={styles.closeBtn} onClick={onClose}>✕</button>
                </div>
                <div>
                    <div style={{ marginBottom: '12px', minHeight: '32px' }}>
                        <b>선택된 결재선:</b>
                        {selectedUsers.length === 0 ? (
                            <span style={{ color: '#bbb', marginLeft: 8 }}>없음</span>
                        ) : (
                            selectedUsers.map(user => (
                                <span
                                    key={user.usrId}
                                    style={{
                                        display: 'inline-block',
                                        background: '#eaffc2',
                                        color: '#3a4a1f',
                                        borderRadius: 8,
                                        padding: '2px 10px',
                                        marginRight: 6,
                                        fontSize: 14,
                                    }}
                                >
                                    {user.usrNm}({user.posNm})
                                </span>
                            ))
                        )}
                    </div>
                </div>
                <div className={styles.body}>
                    <div className={styles.userListColumn}>
                        {users.map(user => (
                            <div
                                key={user.usrId}
                                className={`${styles.userCard} ${selectedUsers.find(u => u.usrId === user.usrId) ? styles.selected : ''}`}
                                onClick={() => handleUserClick(user)}
                            >
                                <div className={styles.userName}>
                                    {user.usrNm} <span className={styles.userPos}>({user.posNm})</span>
                                </div>
                                <div className={styles.userDept}>{user.deptNm}</div>
                                <div className={styles.userEmail}>{user.email}</div>
                            </div>
                        ))}
                        {users.length === 0 && <div className={styles.emptyMsg}>사용자 정보가 없습니다.</div>}
                    </div>
                </div>
                <div style={{ textAlign: 'right', marginTop: 16 }}>
                    <button
                        className={styles.completeBtn}
                        onClick={handleComplete}
                        disabled={selectedUsers.length === 0}
                    >
                        완료
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ApprovalLineModal;