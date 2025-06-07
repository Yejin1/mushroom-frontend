// 📦 VacationWrite.jsx
/**
 * - 결재 양식 : 휴가 신청서(작성)
 * - 양식 코드 : VACATION
 */

import React from "react";
import styles from './WriteForms.module.css';

function VacationWrite({ form, setForm, setEditorYn }) {
  React.useEffect(() => {
    setEditorYn && setEditorYn("N");
  }, [setEditorYn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className={styles.docForm} onSubmit={e => e.preventDefault()}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h2 className={styles.formHeaderTitle}>휴가 신청서</h2>
          <span className={styles.urgentLabel}>
            <input
              type="checkbox"
              name="urgentYn"
              checked={form.urgentYn === "Y"}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, urgentYn: e.target.checked ? "Y" : "N" }))
              }
              className={styles.formCheckbox}
            /> 긴급
          </span>
        </div>
        <div className={styles.formRow}>
          <div className={styles.formLabel}>제목</div>
          <input
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="문서 제목 입력"
            className={styles.formInput}
          />
        </div>
        <div className={styles.formRow}>
          <div className={styles.formLabel}>시작일</div>
          <input
            name="startDate"
            type="date"
            value={form.startDate}
            onChange={handleChange}
            className={styles.formInput}
          />
        </div>
        <div className={styles.formRow}>
          <div className={styles.formLabel}>종료일</div>
          <input
            name="endDate"
            type="date"
            value={form.endDate}
            onChange={handleChange}
            className={styles.formInput}
          />
        </div>
        <div className={styles.formRow}>
          <div className={styles.formLabel}>사유</div>
          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            rows="4"
            placeholder="휴가 사유 입력"
            className={styles.formTextarea}
          />
        </div>
        <div className={styles.formFooter}>
          {/* 제출 버튼은 ApprovalWriteBtn의 [상신] 버튼 사용 */}
        </div>
      </div>
    </form>
  );
}

export default VacationWrite;
