// 📦 DraftRead.jsx
/**
 * - 결재 양식 : 일반기안서 
 * - 화면 구분 : 조회
 * - 양식 코드 : DRAFT
 */

import React from "react";
import MainViewer from '../../../components/editor/MainViewer';
import styles from './ReadForms.module.css';

function DraftRead({ docData }) {
  if (!docData) return null;
  const form = docData.doc;
  const cont = docData.editorContent;

  return (
    <div className={styles.draftContainer}>
      <div className={styles.draftTitle}>일반기안서</div>

      <div className={styles.draftRow}>
        <div className={styles.draftLabel}>제목</div>
        <div className={styles.draftValue}>{form.title}</div>
      </div>

      <div className={styles.draftRow}>
        <div className={styles.draftLabel}>본문</div>
        <div className={styles.draftContentBox}>
          <MainViewer markdownContent={cont} />
        </div>
      </div>
    </div>
  );
}

export default DraftRead;
