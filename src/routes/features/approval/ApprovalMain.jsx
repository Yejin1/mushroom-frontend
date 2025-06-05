// ApprovalMain.jsx
/**
 * - 결재 목록 화면
 * - 전자결재 로그인 시 가장 먼저 보이는 화면
 */
import Sidebar from './components/Sidebar'
import React, { useEffect, useState } from "react"
import axios from 'axios'
import './ApprovalMain.css'

function ApprovalMain() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [approvals, setApprovals] = useState([]);
  const [page, setPage] = useState(0);
  // 처음 접속 시 'my-completed'(결재완료함)로 고정
  const [boxType, setBoxType] = useState('my-completed');
  const token = localStorage.getItem('accesToken');
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/approvals/list`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        page: page,
        size: 10,
        sort: 'createdDt,desc',
        boxType: boxType // boxType 추가
      }
    })
      .then((response) => {
        setTotalPages(response.data.totalPages);
        setApprovals(response.data.content);
      })
      .catch((error) => {
        console.error(' 실패 ', error);
        if (error.response && error.response.status === 403) {
          alert('로그인이 필요합니다. 다시 로그인 해주세요.');
          window.location.href = '/login';
        }
      });
  }, [page, boxType]); // boxType 변경 시 재조회

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // 결재함 타입 변경 핸들러
  const handleBoxTypeChange = (type) => {
    console.log(type);
    setBoxType(type);
    setPage(0); // 결재함 변경 시 첫 페이지로 이동
  };

  const handleOpenDoc = (docId, formId, lineId, userId, writer) => {
    let own = 'N';
    if (userId == writer) own = 'Y';
    window.open(
      `/approval/read?formId=${formId}&docId=${docId}&boxType=${boxType}&lineId=${lineId}&own=${own}`,
      '_blank',
      'width=800,height=600,top=100,left=200'
    );
  };

  function formatDateTime(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const MM = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const mi = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${yyyy}-${MM}-${dd} ${hh}:${mi}:${ss}`;
  }

  // 결재함 타입에 따른 이름 매핑
  const boxTypeNames = {
    'my-approval': '결재함',
    'my-in-progress': '진행함',
    'my-completed': '완료함',
    'my-temp': '임시저장함',
    'my-referenced': '참조함',
    'my-rejected': '반려함',
    'dept-completed': '완료함',
    'dept-referenced': '참조함',
  };

  return (
    <div className="approval-wrapper">
      <Sidebar onBoxTypeChange={handleBoxTypeChange} />
      <div className="approval-in-wrapper">
        <div className="menu-name">{boxTypeNames[boxType] || '결재함'}</div>
        <div className="approval-search-wrapper">
          <div className="approval-search">
            <div>제목 <span className="approval-search-s">▼</span></div>
            <input></input>
            <img src={'/search.png'}></img>
          </div>
          <div className="approval-search">
            <div>작성일 <span className="approval-search-s">▼</span></div>
            <input></input>
          </div>
          {/* 
          <div className="approval-search-open-wrapper">
            <img src="./options.png" className="approval-search-open-img"></img>
            <div className="approval-search-open">상세검색</div>
          </div>
          */}
        </div>
        <div className="approval-list-wrapper">
          <table className="approval-list-table">
            <thead>
              <tr>
                <th>번호</th>
                <th>양식</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>완료일</th>
              </tr>
            </thead>
            <tbody>
              {approvals.map((doc, index) => (
                <tr key={doc.id}>
                  <td>{index + page * 10 + 1}</td>
                  <td>{doc.formNm}</td>
                  <td>
                    <span
                      className="approval-title"
                      onClick={() => handleOpenDoc(doc.id, doc.formId, doc.lineId, doc.userId, doc.writer)}
                    >
                      {doc.title}
                    </span>
                  </td>
                  <td>{doc.writerNm}</td>
                  <td>{formatDateTime(doc.createdDt)}</td>
                  <td>{formatDateTime(doc.completedDt)}</td>
                </tr>
              ))
              }
            </tbody>
          </table>
        </div>
        <div className="approval-pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`approval-pagination-btn${page === i ? ' active' : ''}`}
              onClick={() => handlePageChange(i)}
              disabled={page === i}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ApprovalMain
