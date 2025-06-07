// 📦 DraftWrite.jsx
/**
 * - 결재 양식 : 일반기안서 
 * - 화면 구분 : 작성
 * - 양식 코드 : DRAFT
 */

import React from "react";
import MainEditor from "../../../components/editor/MainEditor";
import styles from './WriteForms.module.css';

function DraftWrite({ form, setForm, content, setContent, setEditorYn }) {
  React.useEffect(() => {
    if (setEditorYn) setEditorYn("Y"); // 에디터 있는 양식이므로 무조건 Y로 세팅
  }, [setEditorYn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.formContainerLarge}>
      <div className={styles.formHeader}>
        <h2 className={styles.formHeaderTitle}>일반기안서</h2>
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
        <div style={{ flex: 1 }}>
          <MainEditor
            initialContent={content}
            onContentChange={setContent}
          />
        </div>
      </div>
    </div>
  );
}

export default DraftWrite;
