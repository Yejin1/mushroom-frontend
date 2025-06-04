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
      <div className={styles.docHeader}>
        <h2>휴가 신청서</h2>
        <label className={styles.urgentLabel}>
          <input
            type="checkbox"
            name="urgentYn"
            checked={form.urgentYn === "Y"}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, urgentYn: e.target.checked ? "Y" : "N" }))
            }
            className={styles.formCheckbox}
          />
          <span>긴급</span>
        </label>
      </div>
      <div className={styles.docRow}>
        <label className={styles.docLabel}>제목</label>
        <input
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          placeholder="문서 제목 입력"
          className={styles.docInput}
        />
      </div>
      <div className={styles.docRow}>
        <label className={styles.docLabel}>시작일</label>
        <input
          name="startDate"
          type="date"
          value={form.startDate}
          onChange={handleChange}
          className={styles.docInput}
        />
      </div>
      <div className={styles.docRow}>
        <label className={styles.docLabel}>종료일</label>
        <input
          name="endDate"
          type="date"
          value={form.endDate}
          onChange={handleChange}
          className={styles.docInput}
        />
      </div>
      <div className={styles.docRow}>
        <label className={styles.docLabel}>사유</label>
        <textarea
          name="reason"
          value={form.reason}
          onChange={handleChange}
          rows="4"
          placeholder="휴가 사유 입력"
          className={styles.docTextarea}
        />
      </div>
      {/* 제출 버튼은 ApprovalWriteBtn의 [상신] 버튼 사용 */}
    </form>
  );
}

export default VacationWrite;
