// BoardList.jsx
/**
 * - 게시글 목록
 */
import BoardMenu from "./BoardMenu"
import PostRead from "./posts/PostRead"
import React, { useEffect, useState } from "react"
import axios from 'axios'
import styles from './BoardMain.module.css'
import BoardList from "./components/BoardList"

function BoardMain() {

  const token = localStorage.getItem('accesToken');
  const [isRead, setIsRead] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [approvals, setApprovals] = useState([]); // approvals 상태를 BoardMain에서 관리
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    axios.get(`${BASE_URL}/api/board/list`, {
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
  }, [page, BASE_URL, token]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePostClick = async (postId) => {
    if (postId === selectedPostId && isRead) {
      setIsRead(!isRead);
    } else {
      try {
        const res = await axios.get(`${BASE_URL}/api/board/viewCnt`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            postId: postId
          }
        });
        // viewCount가 응답에 있다면 화면에 즉시 반영
        if (res.data && typeof res.data.viewCount === 'number') {
          setApprovals(prev => prev.map(doc =>
            doc.id === postId ? { ...doc, viewCount: res.data.viewCount } : doc
          ));
        } else {
          setApprovals(prev => prev.map(doc =>
            doc.id === postId ? { ...doc, viewCount: (doc.viewCount || 0) + 1 } : doc
          ));
        }
      } catch (error) {
        console.error('조회수 증가 실패', error);
      }
      setSelectedPostId(postId);
      setIsRead(true);
    }
  };


  return (
    <div className={styles.boardWrapper}>
      <BoardMenu>
      </BoardMenu>
      <BoardList
        approvals={approvals}
        setApprovals={setApprovals}
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onPostClick={handlePostClick}
      />
      {isRead && <PostRead postId={selectedPostId} />}
    </div>
  )
}

export default BoardMain
