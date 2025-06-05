// ApprovalReadBtn.jsx
/**
 * - 결재 조회 화면 버튼 (조회/읽기용)
 */
import styles from './ApprovalBtn.module.css'

function ApprovalReadBtn({
    boxType,
    onWithdraw,
    onReject,
    onApprove,
}) {
    const handleReady = () => {
        alert('준비중입니다.');
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
            </div>
            <div className={styles.rightGroup}>
                {showRefer && (
                    <button className={styles.btn} onClick={handleReady}>참조</button>
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
        </div>
    );
}

export default ApprovalReadBtn;