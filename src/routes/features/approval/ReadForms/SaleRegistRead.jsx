// 📦 SaleRegistRead.jsx
/**
 * - 결재 양식 : 판매 실적 등록(조회)
 * - 양식 코드 : SALE_REGISTRATION
 */

import React, { useEffect, useState } from "react";
import axios from 'axios';
import styles from './ReadForms.module.css';

function SaleRegistRead({ docId, docData }) {
  const token = localStorage.getItem('accesToken');
  console.log("SaleRegistRead docData", docData);
  if (!docData) return null;
  const form = docData.doc;
  const content = JSON.parse(docData.formContent);


  return (
    <div className={styles.vacationContainer}>
      <div className={styles.formTitle}>
        판매 실적 등록
        {form.urgentYn === "Y" && (
          <span className={styles.vacationUrgent}>긴급</span>
        )}
      </div>

      <div className={styles.formRow}>
        <div className={styles.formLabel}>제목</div>
        <div className={styles.formValue}>{form.title}</div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formLabel}>판매 항목</div>
        <div className={styles.formValue}>{content.saleItem}</div>
        <div className={styles.formLabel} style={{ marginLeft: '32px' }}>개당 금액</div>
        <div className={styles.formValue + ' ' + styles.right}>{content.unitPrice}</div>
      </div>
      <div className={styles.formRow}>
        <div className={styles.formLabel}>판매 수량</div>
        <div className={styles.formValue}>{content.quantity}</div>
        <div className={styles.formLabel} style={{ marginLeft: '32px' }}>판매 금액</div>
        <div className={styles.formValue + ' ' + styles.right}>{content.amount}</div>
      </div>

    </div>
  );
};

export default SaleRegistRead;
