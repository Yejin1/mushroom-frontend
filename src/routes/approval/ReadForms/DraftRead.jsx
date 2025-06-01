// 📦 DraftRead.jsx
/**
 * - 결재 양식 : 일반기안서 
 * - 화면 구분 : 조회
 * - 양식 코드 : DRAFT
 */

import React, { useState, useEffect } from "react";
import axios from 'axios';
import MainViewer from "../../common/MainViewer";

function DraftRead({ docId }) {
  const [form, setForm] = useState({
    title: "",
    urgentYn: "N",
  });
  const [cont, setCont] = useState('');
  const token = localStorage.getItem('accesToken');

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
        setCont(response.data.editorContent);
        console.log(response.data.editorContent);

      })
      .catch((error) => {
        console.error(' 실패 ', error);
      });
  }, [cont]);

  return (
    <div>
      <h2>일반기안서</h2>

      <div>
        <label>제목</label>
        <div>{form.title}</div>
      </div>

      <div>
        <MainViewer markdownContent={cont} />
      </div>


      <div>



      </div>
    </div>
  );
};

export default DraftRead;
