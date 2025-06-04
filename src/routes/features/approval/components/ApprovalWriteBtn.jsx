// ApprovalWriteBtn.jsx
/**
 * - 결재 작성 화면 버튼 (작성용)
 */
import React, { useState } from 'react';
import ApprovalLineModal from './ApprovalLineModal';
import styles from './ApprovalBtn.module.css';

function ApprovalWriteBtn({ approvalLine, setApprovalLine, onTempSave, onSubmit }) {
    const [showLineModal, setShowLineModal] = useState(false);

    return (
        <div className={styles.btnWrapper}>
            <div className={styles.leftGroup}>
                <button className={styles.btn} onClick={() => setShowLineModal(true)}>결재선</button>
            </div>
            <div className={styles.rightGroup}>
                <button className={styles.btn} onClick={onTempSave}>임시저장</button>
                <button className={`${styles.btn} ${styles.redBtn}`} onClick={onSubmit}>상신</button>
            </div>
            <ApprovalLineModal
                open={showLineModal}
                onClose={() => setShowLineModal(false)}
                onComplete={setApprovalLine}
            />
        </div>
    );
}

export default ApprovalWriteBtn;