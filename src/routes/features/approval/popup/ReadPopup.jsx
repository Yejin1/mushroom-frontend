//  ReadPopup.jsx
/**
 * - 결재 조회 화면
 * - 참조 기능 포함함
 */
import axios from 'axios';
import ApprovalReadBtn from '../components/ApprovalReadBtn';
import VacationRead from '../ReadForms/VacationRead'
import DraftRead from '../ReadForms/DraftRead';
import React, { useEffect, useState } from 'react';

function ReadPopup() {
  const params = new URLSearchParams(window.location.search);
  const docId = params.get('docId');
  const formId = params.get('formId');
  const token = localStorage.getItem('accesToken');

  //문서 양식 컴포넌트 목록 변수화(양식 신규 생성할때마다 여기 추가해줘야함)
  const formComponents = { VacationRead, DraftRead };

  //양식명으로 컴포넌트 할당
  const [FormComponent, setFormComponent] = useState(null);


  useEffect(() => {
    axios.get('http://localhost:8080/api/approvals/formInfo', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        formId: formId
      }
    })
      .then((response) => {
        const reactName = response.data.reactName;
        const componentKey = `${reactName}Read`;
        const SelectedComp = formComponents[componentKey];
        setFormComponent(() => SelectedComp);
      })
      .catch((error) => {
        console.error(' 실패 ', error);
        if (error.response && error.response.status === 401) {
          alert('로그인이 필요합니다. 다시 로그인 해주세요.');
          window.location.href = '/login'; // 로그인 페이지로 리다이렉트
        }
      });
  }, [formId, token]);

  if (!FormComponent) {
    return (
      <div className="read-popup-loading">
        {/* 로딩 아이콘이나 스켈레톤 UI */}
        <p>Loading form...</p>
      </div>
    );
  }

  return (
    <div >
      <ApprovalReadBtn></ApprovalReadBtn>
      <FormComponent docId={docId}></FormComponent>
    </div>
  );
}

export default ReadPopup;