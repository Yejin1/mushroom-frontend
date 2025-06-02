// BoardList.jsx
/**
 * - 게시글 목록
 */
import BoardMenu from "./BoardMenu"
import React, { useEffect, useState } from "react"
import axios from 'axios'
import './BoardList.css'
import './BoardMenu.css'

function BoardList() {

  const [approvals, setApprovals] = useState([]);
  const [page, setPage] = useState(0);
  const token = localStorage.getItem('accesToken');
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8080/api/board/list', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        usrId: 1,
        statusCd: 3,
        page: page,
        size: 10,
        sort: 'createDt,desc'
      }
    })
      .then((response) => {
        setTotalPages(response.data.totalPages);
        setApprovals(response.data.content);
      })
      .catch((error) => {
        console.error(' 실패 ', error);
      });
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleOpenDoc = (docId, formId) => {
    window.open(`/approval/read?formId=${formId}&docId=${docId}`,
      '_blank',
      'width=800,height=600,top=100,left=200');
  };

  return (
    <div className="approval-wrapper">
      <BoardMenu>
      </BoardMenu>
      <div className="approval-in-wrapper">
        <div className="menu-name">공지사항</div>
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
        </div>
        <div className="approval-list-wrapper">
          <table className="approval-list-table">
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>조회수</th>
                <th>추천</th>
              </tr>
            </thead>
            <tbody>
              {approvals.map((doc, index) => (
                <tr key={doc.id}>
                  <td>{index + page * 10 + 1}</td>
                  <td>{doc.formNm}</td>
                  <td><span onClick={() => handleOpenDoc(doc.id, doc.formId)}>{doc.title}</span></td>
                  <td>{doc.writerNm}</td>
                  <td>{doc.createDt}</td>
                  <td>{doc.completedDt}</td>
                </tr>
              ))
              }
            </tbody>
          </table>
        </div>
        <div>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => handlePageChange(i)}>
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BoardList
