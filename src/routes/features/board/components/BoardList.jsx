// BoardList.jsx
/**
 * - 게시글 목록
 */
import React from "react"
import styles from './BoardList.module.css'


function BoardList({ approvals, setApprovals, page, totalPages, onPageChange, onPostClick }) {

  const handlePostClick = (postId) => {
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
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles['board-pagination']}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            className={`${styles['board-pagination-btn']}${page === i ? ' ' + styles.active : ''}`}
            key={i}
            onClick={() => onPageChange(i)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default BoardList
