import React from 'react';
import styles from './ApprovalBtn.module.css';

function ReferenceStatusModal({ open, onClose, referenceList = [] }) {
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
                                        <td>{ref.refDate ? ref.refDate : '-'}</td>
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