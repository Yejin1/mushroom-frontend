// ApprovalLineModal.jsx
/**
 * - 결재선 선택 팝업 모달
 */
import React, { useEffect, useState } from 'react';
import styles from './ApprovalLineModal.module.css';

function ApprovalLineModal({ open, onClose, onComplete, mode = "approval", defaultSelectedUsers = [], docId }) {
    const token = localStorage.getItem('accesToken');
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState(defaultSelectedUsers);
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        if (!open) return;
        fetch(`${BASE_URL}/api/usr/users`, {
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

    useEffect(() => {
        if (open) {
            setSelectedUsers(defaultSelectedUsers || []);
        }
    }, [open]);

    if (!open) return null;

    // 사용자 클릭 시 선택/해제
    const handleUserClick = (user) => {
        let newSelected;
        if (selectedUsers.find(u => u.usrId === user.usrId)) {
            newSelected = selectedUsers.filter(u => u.usrId !== user.usrId)
                .map((u, idx) => mode === "approval" ? { ...u, stepOrder: idx + 1 } : u);
        } else {
            newSelected = [
                ...selectedUsers,
                mode === "approval"
                    ? { ...user, stepOrder: selectedUsers.length + 1 }
                    : { ...user }
            ];
        }
        setSelectedUsers(newSelected);
    };

    // 완료 버튼 클릭 시
    const handleComplete = async () => {
        if (mode === "reference") {
            // 참조 모드에서 바로 API 호출
            try {
                await fetch(`${BASE_URL}/api/approvals/reference`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        docId: docId,
                        refUsrIds: selectedUsers.map(u => u.usrId),
                        refDeptIds: [], // 부서 참조자 선택 기능 추가 시 여기에 배열로 전달
                    }),
                });
                alert("참조가 완료되었습니다.");
            } catch (e) {
                alert("참조 요청에 실패했습니다.");
            }
            onClose();
            return;
        }
        // 결재선 모드는 기존대로
        if (onComplete) onComplete(selectedUsers);
        onClose();
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2>{mode === "reference" ? "참조자 선택" : "결재선 선택"}</h2>
                    <button className={styles.closeBtn} onClick={onClose}>✕</button>
                </div>
                <div>
                    <div style={{ marginBottom: '12px', minHeight: '32px' }}>
                        <b>선택된 {mode === "reference" ? "참조자" : "결재선"}:</b>
                        {selectedUsers.length === 0 ? (
                            <span style={{ color: '#bbb', marginLeft: 8 }}>없음</span>
                        ) : (
                            selectedUsers.map(user => (
                                <span
                                    key={user.usrId}
                                    style={{
                                        display: 'inline-block',
                                        background: mode === "reference" ? '#e6f0fa' : '#eaffc2',
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