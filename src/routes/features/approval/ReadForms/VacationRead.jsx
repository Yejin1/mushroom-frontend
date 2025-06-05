// 📦 VacationRead.jsx
/**
 * - 결재 양식 : 휴가 신청서(조회)
 * - 양식 코드 : VACATION
 */

import React, { useEffect, useState } from "react";
import axios from 'axios';
import styles from './ReadForms.module.css';

function VacationRead({ docId, docData }) {
  const token = localStorage.getItem('accesToken');

  if (!docData) return null;
  const form = docData.doc;
  const content = JSON.parse(docData.formContent);


  return (
    <div className={styles.vacationContainer}>
      <div className={styles.vacationTitle}>
        휴가 신청서
        {form.urgentYn === "Y" && (
          <span className={styles.vacationUrgent}>긴급</span>
        )}
      </div>

      <div className={styles.vacationRow}>
        <div className={styles.vacationLabel}>제목</div>
        <div className={styles.vacationValue}>{form.title}</div>
      </div>
      <div className={styles.vacationRow}>
        <div className={styles.vacationLabel}>시작일</div>
        <div className={styles.vacationValue}>{content.startDate}</div>
      </div>
      <div className={styles.vacationRow}>
        <div className={styles.vacationLabel}>종료일</div>
        <div className={styles.vacationValue}>{content.endDate}</div>
      </div>
      <div className={styles.vacationRow}>
        <div className={styles.vacationLabel}>사유</div>
        <div className={styles.vacationValue}>{content.reason}</div>
      </div>
    </div>
  );
};

export default VacationRead;
