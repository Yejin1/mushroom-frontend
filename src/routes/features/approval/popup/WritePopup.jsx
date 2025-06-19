// 📦 WritePopup.jsx
/**
 * - 결재 작성 화면
 * - 조직도 선택, 결재양식 선택, 저장/제출 기능 포함
 */
import './WritePopup.module.css'
import React, { useState, useRef } from 'react';
import ApprovalWriteBtn from '../components/ApprovalWriteBtn';
import VacationWrite from '../WriteForms/VacationWrite';
import DraftWrite from '../WriteForms/DraftWrite';
import SaleRegistWrite from '../WriteForms/SaleRegistWrite';
import ApprovalLinePreview from '../components/ApprovalLinePreview';
import axios from 'axios';

function WritePopup() {
  const params = new URLSearchParams(window.location.search);
  const form = params.get('form') + 'Write';
  const formId = params.get('formId'); // 양식 ID
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  //문서 양식 컴포넌트 목록 변수화(양식 신규 생성할때마다 여기 추가해줘야함)
  const formComponents = { VacationWrite, DraftWrite, SaleRegistWrite };

  //양식명으로 컴포넌트 할당
  const FormComponent = formComponents[form];

  // 상태를 WritePopup에서 관리
  const [formData, setFormData] = useState({
    formId: formId,
    editorContent: "",
    title: "",
    startDate: "",
    endDate: "",
    reason: "",
    urgentYn: "N",
  });
  const writer = Number(localStorage.getItem('usrId')); // 또는 로그인 정보에서 가져오기
  const [approvalLine, setApprovalLine] = useState([]);

  // editorYn 상태 추가 (폼별로 다르게 전달)
  const [editorYn, setEditorYn] = useState("N");
  const getPayloadRef = useRef(null); // 추가

  React.useEffect(() => {
    setFormData(prev => ({ ...prev, formId }));
  }, [formId]);

  // 상신 버튼 클릭 시 실행
  const handleSubmit = async () => {
    const token = localStorage.getItem('accesToken');
    if (!getPayloadRef.current) {
      alert("양식 데이터가 준비되지 않았습니다.");
      return;
    }
    const payload = getPayloadRef.current(); // 자식에서 만든 payload 사용
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
        onTempSave={() => alert('준비중입니다.')}
      />
      <FormComponent
        form={formData}
        setForm={setFormData}
        setEditorYn={setEditorYn}
        getPayloadRef={getPayloadRef}
        writer={writer}
        approvalLine={approvalLine}
      />
    </div>
  );
}

export default WritePopup;