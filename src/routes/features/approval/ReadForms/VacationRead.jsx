// 📦 VacationRead.jsx
/**
 * - 결재 양식 : 휴가 신청서(조회)
 * - 양식 코드 : VACATION
 */

import React, { useEffect, useState } from "react";
import axios from 'axios';
import styles from './ReadForms.module.css';

function VacationRead({ docId }) {
  const token = localStorage.getItem('accesToken');
  const [form, setForm] = useState({
    title: "",
    urgentYn: "N",
  });
  const [cont, setCont] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8080/api/approvals/read', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        docId: docId
      }
    })
      .then((response) => {
        //제목, 긴급여부 데이터 세팅
        setForm(response.data.doc);

        //문서 내용 json 파싱 및 세팅 
        const obj = JSON.parse(response.data.formContent);
        setCont(obj);

      })
      .catch((error) => {
        console.error(' 실패 ', error);
      });
  }, [docId, token]);



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
        <div className={styles.vacationValue}>{cont.startDate}</div>
      </div>
      <div className={styles.vacationRow}>
        <div className={styles.vacationLabel}>종료일</div>
        <div className={styles.vacationValue}>{cont.endDate}</div>
      </div>
      <div className={styles.vacationRow}>
        <div className={styles.vacationLabel}>사유</div>
        <div className={styles.vacationValue}>{cont.reason}</div>
      </div>
    </div>
  );
};

export default VacationRead;
