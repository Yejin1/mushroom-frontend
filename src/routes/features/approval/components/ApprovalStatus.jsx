import React from "react";
import styles from "./ApprovalStatus.module.css";

/**
 * 결재현황 컴포넌트
 * @param {Array} approvalLine - 결재선(결재자) 배열 (ApprovalLineDto)
 * @param {Object} writer - 작성자 정보
 * @param {string} status - 결재문서 상태(선택)
 */
function ApprovalStatus({ approvalLine = [], writer, status }) {
    return (
        <div className={styles.statusWrapper}>
            <div className={styles.statusTitle}>결재현황</div>
            <div className={styles.statusLineRow}>
                {approvalLine && approvalLine.length > 0 ? (
                    approvalLine.map((user, idx) => (
                        <React.Fragment key={idx}>
                            <div className={styles.approvalStep}>
                                <div
                                    className={`${styles.statusBadge} ${user.status === "APPROVED"
                                        ? styles.statusApproved
                                        : user.status === "REJECTED"
                                            ? styles.statusRejected
                                            : user.status === "CREATED"
                                                ? styles.statusCreated
                                                : styles.statusWaiting
                                        }`}
                                >
                                    {user.status === "CREATED" && "상신"}
                                    {user.status === "APPROVED" && "승인"}
                                    {user.status === "REJECTED" && "반려"}
                                    {user.status === "WAITING" && "미결"}
                                    {user.status === "WRITING" && "대기"}
                                </div>
                                <div className={styles.userInfo}>
                                    <div className={styles.userImg}>
                                        <img
                                            src={
                                                user.empNo
                                                    ? `/img_profile/${user.empNo}.png`
                                                    : "/img_profile/default.png"
                                            }
                                            alt="profile"
                                            onError={e => { e.target.src = "/img_profile/default.png"; }}
                                        />
                                    </div>
                                    <div className={styles.userNamePos}>
                                        <span className={styles.userName}>{user.approverName}</span>
                                        <span className={styles.userPos}>{user.approverPosition}</span>
                                    </div>
                                    <div className={styles.userDate}>
                                        {user.approvedDt && user.status === "APPROVED"
                                            ? new Date(user.approvedDt).toLocaleDateString()
                                            : ""}
                                    </div>
                                </div>
                            </div>
                            {idx !== approvalLine.length - 1 && (
                                <span className={styles.arrow}>→</span>
                            )}
                        </React.Fragment>
                    ))
                ) : (
                    <span className={styles.empty}>결재선 없음</span>
                )}
            </div>
            {status && <div className={styles.statusDoc}>문서상태: {status}</div>}
        </div>
    );
}

export default ApprovalStatus;