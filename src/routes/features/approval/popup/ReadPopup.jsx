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
import ApprovalStatus from '../components/ApprovalStatus';

function ReadPopup() {
  const params = new URLSearchParams(window.location.search);
  const docId = params.get('docId');
  const formId = params.get('formId');
  const lineId = params.get('lineId'); // 결재 라인 ID
  const own = params.get('own');  // 결재 작성자 여부
  const boxType = params.get('boxType');
  const token = localStorage.getItem('accesToken');

  //문서 양식 컴포넌트 목록 변수화(양식 신규 생성할때마다 여기 추가해줘야함)
  const formComponents = { VacationRead, DraftRead };

  //양식명으로 컴포넌트 할당
  const [FormComponent, setFormComponent] = useState(null);

  // 예시: approvalLine, writer 정보는 실제 데이터에 맞게 받아와야 합니다.
  const [approvalLine, setApprovalLine] = useState([]);
  const [writer, setWriter] = useState(null);
  const [docData, setDocData] = useState(null);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    axios.get(`${BASE_URL}/api/approvals/formInfo`, {
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

  useEffect(() => {
    axios.get(`${BASE_URL}/api/approvals/read`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { docId }
    })
      .then((response) => {
        // ApprovalDocDetailResponseDto 구조에 맞게 분해
        const { body, approvalLines } = response.data;
        setDocData(body); // body는 기존 docData와 유사하게 폼 내용
        setApprovalLine(approvalLines || []);

        // 작성자 정보 세팅 (body.writer 등에서 추출, 예시)
        if (body && body.writer) {
          setWriter({
            usrId: body.writer.id,
            usrNm: body.writer.name,
            posNm: body.writer.position,
            deptNm: body.writer.department,
            email: body.writer.email,
          });
        } else {
          setWriter(null);
        }
      })
      .catch((error) => { /* 에러 처리 */ });
  }, [docId, token]);

  // 버튼별 API 실행 함수
  const handleApprove = async () => {
    try {
      await axios.post(`${BASE_URL}/api/approval-line/${lineId}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('결재가 완료되었습니다.');
      window.close();
    } catch (e) {
      alert('결재 처리 중 오류가 발생했습니다.');
    }
  };

  const handleReject = async () => {
    try {
      await axios.post(`${BASE_URL}/api/approval-line/${lineId}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('반려 처리되었습니다.');
      window.close();
    } catch (e) {
      alert('반려 처리 중 오류가 발생했습니다.');
    }
  };

  const handleWithdraw = async () => {
    try {
      await axios.post(`${BASE_URL}/api/approval-line/${lineId}/withdraw`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('회수 처리되었습니다.');
      window.close();
    } catch (e) {
      alert('회수 처리 중 오류가 발생했습니다.');
    }
  };

  // 예시: 참조 저장 함수
  const handleReferenceSave = async () => {
    await axios.post('/api/approvals/reference', {
      docId,
      refUsrIds: selectedUserIds,   // 선택된 사용자 ID 배열
      refDeptIds: selectedDeptIds,  // 선택된 부서 ID 배열
    });
  };

  if (!FormComponent) {
    return (
      <div className="read-popup-loading">
        {/* 로딩 아이콘이나 스켈레톤 UI */}
        <p>Loading form...</p>
      </div>
    );
  }

  return (
    <div>
      <ApprovalReadBtn
        boxType={boxType}
        onApprove={handleApprove}
        onReject={handleReject}
        onWithdraw={handleWithdraw}
        showWithdraw={boxType === "my-in-progress" && own === "Y"}
        docId={docId}
      />
      <ApprovalStatus approvalLine={approvalLine} writer={writer} status={docData?.status} />
      <FormComponent docData={docData} />
    </div>
  );
}

export default ReadPopup;