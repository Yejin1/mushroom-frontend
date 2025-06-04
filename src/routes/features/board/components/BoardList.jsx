// BoardList.jsx
/**
 * - 게시글 목록
 */
import React, { useEffect, useState } from "react"
import axios from 'axios'
import styles from './BoardList.module.css'


function BoardList({ onPostClick }) {

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
        page: page,
        size: 10,
        sort: 'createdDt,desc'
      }
    })
      .then((response) => {
        console.log(' response ', response);
        setTotalPages(response.data.totalPages);
        setApprovals(response.data.content);
        console.log(' 성공 ', response.data);
      })
      .catch((error) => {
        console.error(' 실패 ', error);
        if (error.response && error.response.status === 403) {
          alert('로그인이 필요합니다. 다시 로그인 해주세요.');
          window.location.href = '/login'; // 로그인 페이지로 리다이렉트
        }
      });
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePostClick = (postId) => {
    console.log('게시글 클릭:', postId);
    onPostClick(postId);
  }

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

  return (
    <div className={styles.boardInWrapper}>
      <div className={styles.menuName}>공지사항</div>
      <div className={styles.boardSearchWrapper}>
        <div className={styles.boardSearch}>
          <div>제목 <span className={styles.boardSearchS}>▼</span></div>
          <input />
          <img src={'/search.png'} />
        </div>
        <div className={styles.boardSearch}>
          <div>작성일 <span className={styles.boardSearchS}>▼</span></div>
          <input />
        </div>
      </div>
      <div className={styles.boardListWrapper}>
        <table className={styles.boardListTable}>
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
                <td>
                  <span onClick={() => handlePostClick(doc.id)} className={styles.boardTitle}>
                    {doc.title}
                  </span>
                </td>
                <td>{doc.authorName}</td>
                <td>{formatDateTime(doc.createdDt)}</td>
                <td>{doc.viewCount}</td>
                <td>{doc.viewCount}</td>
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
  )
}

export default BoardList
