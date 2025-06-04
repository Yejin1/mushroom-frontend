import React from 'react';
import styles from './ApprovalLinePreview.module.css';

function ApprovalLinePreview({ approvalLine }) {
    return (
        <div className={styles.previewWrapper}>
            <span className={styles.lineLabel}>결재선</span>
            {(!approvalLine || approvalLine.length === 0) ? (
                <span className={styles.empty}>선택된 결재선이 없습니다.</span>
            ) : (
                approvalLine.map((user, idx) => (
                    <span key={user.usrId} className={styles.userChip}>
                        {user.usrNm} <span style={{ color: '#7bb13c', marginLeft: 3 }}>({user.posNm})</span>
                    </span>
                ))
            )}
        </div>
    );
}

export default ApprovalLinePreview;