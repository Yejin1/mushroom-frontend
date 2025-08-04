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

        //console.log('게시글 조회:', response.data);

      })
      .catch((error) => {
        console.error(' 실패 ', error);
      });
  }, [postId]);

  // 삭제 버튼 클릭 시
  const handleDelete = async () => {
    if (!window.confirm('게시글을 삭제하시겠습니까?')) return;
    try {
      await axios.delete(`${BASE_URL}/api/board/delete`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          postId: postId
        }
      });
      alert('게시글이 삭제되었습니다.');
      window.location.href = '/board'; // 게시글 삭제 후 게시판 목록으로 이동
    } catch (error) {
      alert('본인이 작성한 게시글만 삭제할 수 있습니다.');
    }
  };

  return (
    <div className={styles.boardInWrapper}>
      <div className={styles.titleRow}>
        <label className={styles.titleLabel}>제목</label>
        <div className={styles.postTitle}>{title}</div>
        <button className={styles.deleteBtn} onClick={handleDelete}>삭제</button>
      </div>
      <div className={styles.contentArea}>
        <MainViewer markdownContent={cont} />
      </div>
    </div>
  )
}

export default PostRead
