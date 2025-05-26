// 📦 VacationRead.jsx
/**
 * - 결재 양식 : 휴가 신청서(조회)
 * - 양식 코드 : VACATION
 */

import React, {useEffect, useState} from "react";
import axios from 'axios';

function VacationRead() {
  const token = localStorage.getItem('accesToken');
  const [form, setForm] = useState({
    title: "",
    urgentYn: "N",
  });
  const [cont, setCont] = useState([]);

    useEffect(() => {
    axios.get('http://localhost:8080/api/approvals/read', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        docId: 67
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
  },[]);



  return (
    <div>
      <h2>휴가 신청서</h2>

      <div>
        <label>제목</label>
        <div>{form.title}</div>
      </div>

      <div>
        <label>시작일</label>
        <div>{cont.startDate}</div>
      </div>

      <div>
        <label>종료일</label>
        <div>{cont.endDate}</div>
      </div>

      <div>
        <label>사유</label>
        <div>{cont.reason}</div>
      </div>

      <div>
        <label>
          <span>긴급</span>
          <div>{form.urgentYn}</div>
        </label>

      </div>
    </div>
  );
};

export default VacationRead;
