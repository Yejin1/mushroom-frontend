// 📦 VacationWrite.jsx
/**
 * - 결재 양식 : 휴가 신청서(작성)
 * - 양식 코드 : VACATION
 */

import React from "react";
import styles from './WriteForms.module.css';
import { use } from "react";

function VacationWrite({ form, setForm, setEditorYn, getPayloadRef, writer, approvalLine, validateRef }) {
  React.useEffect(() => {
    setEditorYn && setEditorYn("N");
  }, [setEditorYn]);

  // payload 생성 함수 (DTO에 맞게)
  const getPayload = () => ({
    formId: form.formId,
    title: form.title,
    writer: writer, // 부모에서 전달받은 작성자 ID
    urgentYn: form.urgentYn,
    editorYn: "N",
    formContent: {
      startDate: form.startDate,
      endDate: form.endDate,
      reason: form.reason,
    },
    editorContent: "", // 휴가신청서는 에디터 내용 없음
    approvalLine: approvalLine || [],
  });

  // 부모에서 참조할 수 있도록 ref에 할당
  React.useEffect(() => {
    if (getPayloadRef) getPayloadRef.current = getPayload;
  }, [form, getPayloadRef, writer, approvalLine]);

  // 유효성 검사 함수
  React.useEffect(() => {
    if (validateRef) validateRef.current = () => {
      const errors = [];
      if (!form.title) errors.push("제목을 입력해주세요.");
      if (!form.startDate) errors.push("시작일을 선택해주세요.");
      if (!form.endDate) errors.push("종료일을 선택해주세요.");
      if (!form.reason) errors.push("사유를 입력해주세요.");

      // 결재선에 팀장 포함 필수
      const hasManager = approvalLine.some(line => line.posNm === "팀장");
      if (!hasManager) errors.push("결재선에 팀장이 포함되어야 합니다.");

      // 날짜 유효성 검사
      if (form.startDate && form.endDate) {
        if (new Date(form.startDate) > new Date(form.endDate)) {
          errors.push("시작일은 종료일보다 이전이어야 합니다.");
        }
      }

      if (errors.length > 0) {
        alert(errors.join('\n'));
        return false;
      }
      return true;
    };
  }, [form, validateRef, approvalLine]);

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
