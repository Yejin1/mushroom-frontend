// PostRead.jsx
/**
 * - 게시글 조회
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
        //제목, 긴급여부 데이터 세팅
        setTitle(response.data.title);

        //문서 내용 json 파싱 및 세팅 
        setCont(response.data.content);

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
      <div className={styles.titleRow}>
        <label className={styles.titleLabel}>제목</label>
        <div className={styles.postTitle}>{title}</div>
      </div>
      <div className={styles.contentArea}>
        <MainViewer markdownContent={cont} />
      </div>
    </div>
  )
}

export default PostRead
