// BoardList.jsx
/**
 * - 게시글 목록
 */
import React, { useEffect, useState } from "react"
import axios from 'axios'
import styles from './PostRead.module.css'
import MainViewer from '../../../components/editor/MainViewer'


function PostRead({ postId }) {

  const [title, setTitle] = useState('');
  const [cont, setCont] = useState('');
  const token = localStorage.getItem('accesToken');
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    axios.get(`${BASE_URL}/api/board/read`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        postId: postId
      }
    })
      .then((response) => {
        console.log(response.data);
        //제목, 긴급여부 데이터 세팅
        setTitle(response.data.title);

        //문서 내용 json 파싱 및 세팅 
        setCont(response.data.content);
        console.log(response.data.content);

      })
      .catch((error) => {
        console.error(' 실패 ', error);
      });
  }, [postId]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className={styles.boardInWrapper}>
      <div className={styles.menuName}>공지사항</div>
      <div>제목</div>
      <div className={styles.postTitle}>{title}</div>
      <div>
        <MainViewer markdownContent={cont} />
      </div>
      <div />
    </div>
  )
}

export default PostRead
