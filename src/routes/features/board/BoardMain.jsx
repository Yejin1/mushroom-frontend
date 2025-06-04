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

  const handlePostClick = (postId) => {
    if (postId === selectedPostId && isRead) {
      // 이미 선택된 게시글을 다시 클릭하면 읽기 상태를 토글 
      setIsRead(!isRead);
    } else {
      // 새로운 게시글을 클릭하면 읽기 상태를 true로 설정
      setSelectedPostId(postId);
      setIsRead(true);
    }
  };


  return (
    <div className={styles.boardWrapper}>
      <BoardMenu>
      </BoardMenu>
      <BoardList onPostClick={handlePostClick}></BoardList>
      {isRead && <PostRead postId={selectedPostId} />}
    </div>
  )
}

export default BoardMain
