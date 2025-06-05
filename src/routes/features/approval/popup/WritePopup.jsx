// 📦 WritePopup.jsx
/**
 * - 결재 작성 화면
 * - 조직도 선택, 결재양식 선택, 저장/제출 기능 포함
 */
import './WritePopup.module.css'
import React, { useState } from 'react';
import ApprovalWriteBtn from '../components/ApprovalWriteBtn';
import VacationWrite from '../WriteForms/VacationWrite';
import DraftWrite from '../WriteForms/DraftWrite';
import ApprovalLinePreview from '../components/ApprovalLinePreview';
import axios from 'axios';

function WritePopup() {
  const params = new URLSearchParams(window.location.search);
  const form = params.get('form') + 'Write';
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  //문서 양식 컴포넌트 목록 변수화(양식 신규 생성할때마다 여기 추가해줘야함)
  const formComponents = { VacationWrite, DraftWrite };

  //양식명으로 컴포넌트 할당
  const FormComponent = formComponents[form];

  // 상태를 WritePopup에서 관리
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    reason: "",
    urgentYn: "N",
  });
  const [approvalLine, setApprovalLine] = useState([]);

  // editorYn 상태 추가 (폼별로 다르게 전달)
  const [editorYn, setEditorYn] = useState("N");

  // 상신 버튼 클릭 시 실행
  const handleSubmit = async () => {
    const token = localStorage.getItem('accesToken');
    const payload = {
      formId: 1, // 휴가신청서라면 1, 기안서라면 2 등으로 구분
      title: formData.title,
      writer: 1, // 실제 로그인 사용자 ID로 교체
      urgentYn: formData.urgentYn,
      editorYn: editorYn, // 추가
      formContent: {
        startDate: formData.startDate,
        endDate: formData.endDate,
        reason: formData.reason
      },
      approvalLine: approvalLine // 결재선 정보 (stepOrder 포함)
    };

    try {
      await axios.post(`${BASE_URL}/api/approvals`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("상신이 완료되었습니다.");
      window.close();
    } catch (error) {
      alert("상신에 실패했습니다.");
    }
  };

  return (
    <div>
      <ApprovalLinePreview approvalLine={approvalLine} />
      <ApprovalWriteBtn
        approvalLine={approvalLine}
        setApprovalLine={setApprovalLine}
        onSubmit={handleSubmit}
        onTempSave={() => alert('임시저장 기능 구현 필요')}
      />
      <FormComponent
        form={formData}
        setForm={setFormData}
        setEditorYn={setEditorYn} // 추가
      />
    </div>
  );
}

export default WritePopup;