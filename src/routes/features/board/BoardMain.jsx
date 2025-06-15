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
import PostWrite from "./posts/PostWrite"

function BoardMain() {

  const token = localStorage.getItem('accesToken');
  const [isRead, setIsRead] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [approvals, setApprovals] = useState([]); // approvals 상태를 BoardMain에서 관리
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isWriting, setIsWriting] = useState(false);
  const [menuId, setMenuId] = useState(4);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    axios.get(`${BASE_URL}/api/board/list`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        page: page,
        size: 10,
        sort: 'createdDt,desc',
        menuId: menuId // 메뉴 ID를 파라미터로 전달
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
  }, [page, BASE_URL, token, isWriting, menuId]);

  // 재접속(새로고침) 시 isWriting 초기화
  useEffect(() => {
    setIsWriting(false);
  }, []);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleWriteClick = () => {
    setIsWriting(true);
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
      <BoardMenu
        handleWriteClick={handleWriteClick}
        setMenuId={setMenuId}>
      </BoardMenu>
      {!isWriting && (
        <BoardList
          approvals={approvals}
          setApprovals={setApprovals}
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onPostClick={handlePostClick}
        />)}
      {!isWriting && isRead && <PostRead postId={selectedPostId} />}
      {isWriting && <PostWrite setIsWriting={setIsWriting} />}
    </div>
  )
}

export default BoardMain
