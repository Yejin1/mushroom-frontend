// ApprovalReadBtn.jsx
/**
 * - 결재 조회 화면 버튼 (조회/읽기용)
 */
import { useState } from 'react';
import styles from './ApprovalBtn.module.css'
import ApprovalLineModal from './ApprovalLineModal';
import ReferenceStatusModal from './ReferenceStatusModal'; // 참조현황 모달 import

function ApprovalReadBtn({
    boxType,
    onWithdraw,
    onReject,
    onApprove,
    docId, // 문서 ID 추가
    referenceUsers = [], // 기본값 빈 배열
}) {
    const [referenceModalOpen, setReferenceModalOpen] = useState(false);
    const [referenceStatusOpen, setReferenceStatusOpen] = useState(false); // 참조현황 모달 상태
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedDepts, setSelectedDepts] = useState([]);

    const handleReady = () => {
        alert('준비중입니다.');
    };

    const handleReferenceSave = () => {
        // Save reference logic here
        setReferenceModalOpen(false);
    };

    const handleReferenceSelect = (users) => {
        setReferenceModalOpen(false);
    };

    // 결재함별 버튼 노출 조건
    const showReject = boxType === 'my-approval';
    const showApprove = boxType === 'my-approval';
    const showWithdraw = false; // 필요시 추가

    const showRefer = [
        'my-in-progress',
        'my-completed',
        'my-referenced',
        'dept-completed',
        'dept-referenced'
    ].includes(boxType);

    const showReuse = [
        'my-completed',
        'my-rejected',
        'dept-completed'
    ].includes(boxType);

    return (
        <div className={styles.btnWrapper}>
            <div className={styles.leftGroup}>
                {showRefer && (
                    <button
                        className={styles.btn}
                        onClick={() => setReferenceStatusOpen(true)}
                        style={{ marginRight: 8 }}
                    >
                        참조현황
                    </button>
                )}
            </div>
            <div className={styles.rightGroup}>
                {showRefer && (
                    <button className={styles.btn} onClick={() => setReferenceModalOpen(true)}>참조</button>
                )}
                {showReuse && (
                    <button className={styles.btn} onClick={handleReady}>재사용</button>
                )}
                {showWithdraw && (
                    <button onClick={onWithdraw}>회수</button>
                )}
                {showReject && (
                    <button className={styles.btn} onClick={onReject || handleReady}>반려</button>
                )}
                {showApprove && (
                    <button className={styles.btn} onClick={onApprove || handleReady}>결재</button>
                )}
            </div>
            {referenceModalOpen && (
                <ApprovalLineModal
                    open={referenceModalOpen}
                    onClose={() => setReferenceModalOpen(false)}
                    mode="reference"
                    docId={docId} // 문서 ID를 ApprovalLineModal에 전달
                    defaultSelectedUsers={referenceUsers} // 기본 선택 사용자 전달
                />
            )}
            {referenceStatusOpen && (
                <ReferenceStatusModal
                    open={referenceStatusOpen}
                    onClose={() => setReferenceStatusOpen(false)}
                    docId={docId}
                    referenceUsers={referenceUsers}
                />
            )}
        </div>
    );
}

export default ApprovalReadBtn;