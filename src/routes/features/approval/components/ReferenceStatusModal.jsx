import React, { useEffect, useState } from 'react';
import styles from './ApprovalBtn.module.css';
import axios from 'axios';

function ReferenceStatusModal({ open, onClose, docId }) {
    const [referenceList, setReferenceList] = useState([]);
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        if (!open || !docId) return;
        const fetchRefs = async () => {
            try {
                const token = localStorage.getItem('accesToken');
                const res = await axios.get(`${BASE_URL}/api/approvals/reference?docId=${docId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const { userRefs = [], deptRefs = [] } = res.data || {};
                // 통합 표로 변환
                const userRows = userRefs.map(ref => ({
                    creatorNm: ref.createdBy,
                    refUsrNm: ref.usrName,
                    refDeptNm: '-',
                    refDate: ref.createdDt ? ref.createdDt.replace('T', ' ').slice(0, 16) : '-'
                }));
                const deptRows = deptRefs.map(ref => ({
                    creatorNm: ref.createdBy,
                    refUsrNm: '-',
                    refDeptNm: ref.deptName,
                    refDate: ref.createdDt ? ref.createdDt.replace('T', ' ').slice(0, 16) : '-'
                }));
                setReferenceList([...userRows, ...deptRows]);
            } catch (e) {
                setReferenceList([]);
            }
        };
        fetchRefs();
    }, [open, docId]);

    if (!open) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2>참조 현황</h2>
                    <button className={styles.closeBtn} onClick={onClose}>✕</button>
                </div>
                <div style={{ padding: 16 }}>
                    {referenceList.length === 0 ? (
                        <div style={{ color: '#bbb' }}>참조 이력이 없습니다.</div>
                    ) : (
                        <table className={styles.refTable}>
                            <thead>
                                <tr>
                                    <th>생성인</th>
                                    <th>참조인</th>
                                    <th>참조부서</th>
                                    <th>참조일시</th>
                                </tr>
                            </thead>
                            <tbody>
                                {referenceList.map((ref, idx) => (
                                    <tr key={idx}>
                                        <td>{ref.creatorNm || '-'}</td>
                                        <td>{ref.refUsrNm || '-'}</td>
                                        <td>{ref.refDeptNm || '-'}</td>
                                        <td>{ref.refDate || '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ReferenceStatusModal;