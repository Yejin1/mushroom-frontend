// ApprovalReadBtn.jsx
/**
 * - 결재 조회 화면 버튼 (조회/읽기용)
 */
import styles from './ApprovalBtn.module.css'

function ApprovalReadBtn({
    showWithdraw = false,
    showReject = false,
    showApprove = false,
    onWithdraw,
    onReject,
    onApprove,
}) {
    const handleReady = () => {
        alert('준비중입니다.');
    };

    return (
        <div className={styles.btnWrapper}>
            <div className={styles.leftGroup}>
            </div>
            <div className={styles.rightGroup}>
                <button className={styles.btn} onClick={handleReady}>참조</button>
                <button className={styles.btn} onClick={handleReady}>재사용</button>
                {showWithdraw && (
                    <button className={styles.btn} onClick={onWithdraw || handleReady}>회수</button>
                )}
                {showReject && (
                    <button className={styles.btn} onClick={onReject || handleReady}>반려</button>
                )}
                {showApprove && (
                    <button className={styles.btn} onClick={onApprove || handleReady}>결재</button>
                )}
            </div>
        </div>
    );
}

export default ApprovalReadBtn;